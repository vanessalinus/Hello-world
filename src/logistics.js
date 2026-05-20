const STATUS_LABELS = {
  created: "Created",
  scheduled: "Scheduled",
  in_transit: "In transit",
  delayed: "Delayed",
  delivered: "Delivered",
  cancelled: "Cancelled"
};

const STATUS_TRANSITIONS = {
  created: ["scheduled", "cancelled"],
  scheduled: ["in_transit", "delayed", "cancelled"],
  in_transit: ["delivered", "delayed"],
  delayed: ["in_transit", "delivered", "cancelled"],
  delivered: [],
  cancelled: []
};

const PRIORITY_MULTIPLIERS = {
  economy: 0.85,
  standard: 1,
  expedited: 1.35
};

const PRIORITY_SPEED_FACTOR = {
  economy: 0.8,
  standard: 1,
  expedited: 1.35
};

export function getStatusLabel(status) {
  return STATUS_LABELS[status] ?? status;
}

export function getAllowedNextStatuses(status) {
  return [...(STATUS_TRANSITIONS[status] ?? [])];
}

export function calculateShipmentCost({ distanceKm, weightKg, priority }) {
  const baseRate = 2.35;
  const weightRate = 0.18;
  const multiplier = PRIORITY_MULTIPLIERS[priority] ?? PRIORITY_MULTIPLIERS.standard;
  return Math.round((distanceKm * baseRate + weightKg * weightRate) * multiplier);
}

export function estimateTransitDays(distanceKm, priority = "standard") {
  const dailyKilometers = 560 * (PRIORITY_SPEED_FACTOR[priority] ?? PRIORITY_SPEED_FACTOR.standard);
  return Math.max(1, Math.ceil(distanceKm / dailyKilometers));
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

export function findWarehouse(warehouses, warehouseId) {
  return warehouses.find((warehouse) => warehouse.id === warehouseId);
}

export function assignBestVehicle(shipment, vehicles) {
  const eligibleVehicles = vehicles
    .filter((vehicle) => vehicle.status === "available")
    .filter((vehicle) => vehicle.maxWeightKg >= shipment.weightKg)
    .filter((vehicle) => vehicle.maxRouteKm >= shipment.distanceKm);

  if (eligibleVehicles.length === 0) {
    return null;
  }

  return eligibleVehicles.sort((left, right) => {
    const leftWaste = left.maxWeightKg - shipment.weightKg;
    const rightWaste = right.maxWeightKg - shipment.weightKg;
    const wasteDifference = leftWaste - rightWaste;

    if (wasteDifference !== 0) {
      return wasteDifference;
    }

    return left.maxRouteKm - right.maxRouteKm;
  })[0];
}

export function createShipment(input, context) {
  const requiredFields = ["customer", "origin", "destination", "distanceKm", "weightKg", "priority"];
  const missingFields = requiredFields.filter((field) => input[field] === undefined || input[field] === "");

  if (missingFields.length > 0) {
    throw new Error(`Missing required shipment fields: ${missingFields.join(", ")}`);
  }

  const origin = findWarehouse(context.warehouses, input.origin);
  if (!origin) {
    throw new Error(`Unknown origin warehouse: ${input.origin}`);
  }

  const distanceKm = Number(input.distanceKm);
  const weightKg = Number(input.weightKg);

  if (!Number.isFinite(distanceKm) || distanceKm <= 0) {
    throw new Error("Shipment distance must be a positive number.");
  }

  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    throw new Error("Shipment weight must be a positive number.");
  }

  const priority = input.priority in PRIORITY_MULTIPLIERS ? input.priority : "standard";
  const candidate = { distanceKm, weightKg, priority };
  const assignedVehicle = assignBestVehicle(candidate, context.fleet);
  const createdAt = context.createdAt ? new Date(context.createdAt) : new Date();
  const eta = formatDate(addDays(createdAt, estimateTransitDays(distanceKm, priority)));

  return {
    id: input.id ?? nextShipmentId(context.shipments),
    customer: String(input.customer).trim(),
    origin: input.origin,
    destination: String(input.destination).trim(),
    distanceKm,
    weightKg,
    priority,
    status: assignedVehicle ? "scheduled" : "created",
    vehicleId: assignedVehicle?.id ?? null,
    eta,
    cost: calculateShipmentCost(candidate)
  };
}

export function nextShipmentId(shipments) {
  const highestNumber = shipments.reduce((highest, shipment) => {
    const match = /^SHP-(\d+)$/.exec(shipment.id);
    return match ? Math.max(highest, Number.parseInt(match[1], 10)) : highest;
  }, 1000);

  return `SHP-${highestNumber + 1}`;
}

export function transitionShipmentStatus(shipment, nextStatus) {
  const allowedStatuses = getAllowedNextStatuses(shipment.status);

  if (!allowedStatuses.includes(nextStatus)) {
    throw new Error(`Cannot move shipment ${shipment.id} from ${shipment.status} to ${nextStatus}.`);
  }

  return { ...shipment, status: nextStatus };
}

export function calculateShipmentMetrics(shipments) {
  const activeStatuses = new Set(["created", "scheduled", "in_transit", "delayed"]);
  const delayedShipments = shipments.filter((shipment) => shipment.status === "delayed");
  const activeShipments = shipments.filter((shipment) => activeStatuses.has(shipment.status));
  const deliveredShipments = shipments.filter((shipment) => shipment.status === "delivered");
  const totalWeightKg = activeShipments.reduce((total, shipment) => total + shipment.weightKg, 0);
  const totalDistanceKm = activeShipments.reduce((total, shipment) => total + shipment.distanceKm, 0);

  return {
    total: shipments.length,
    active: activeShipments.length,
    delivered: deliveredShipments.length,
    delayed: delayedShipments.length,
    totalWeightKg,
    totalDistanceKm,
    onTimeRate: shipments.length === 0 ? 100 : Math.round(((shipments.length - delayedShipments.length) / shipments.length) * 100)
  };
}

export function calculateFleetUtilization(vehicles, shipments) {
  const activeVehicleIds = new Set(
    shipments
      .filter((shipment) => ["scheduled", "in_transit", "delayed"].includes(shipment.status))
      .map((shipment) => shipment.vehicleId)
      .filter(Boolean)
  );

  const availableVehicles = vehicles.filter((vehicle) => vehicle.status === "available");
  const assignedAvailableVehicles = availableVehicles.filter((vehicle) => activeVehicleIds.has(vehicle.id));

  return {
    total: vehicles.length,
    available: availableVehicles.length,
    inMaintenance: vehicles.filter((vehicle) => vehicle.status === "maintenance").length,
    assigned: assignedAvailableVehicles.length,
    utilizationRate: availableVehicles.length === 0 ? 0 : Math.round((assignedAvailableVehicles.length / availableVehicles.length) * 100)
  };
}

export function getInventoryAlerts(warehouses) {
  return warehouses.flatMap((warehouse) =>
    warehouse.inventory
      .filter((item) => item.onHand <= item.reorderPoint)
      .map((item) => ({
        warehouseId: warehouse.id,
        warehouseName: warehouse.name,
        sku: item.sku,
        name: item.name,
        onHand: item.onHand,
        reorderPoint: item.reorderPoint,
        shortage: item.reorderPoint - item.onHand
      }))
  );
}

export function summarizeWarehouseCapacity(warehouses) {
  return warehouses.map((warehouse) => {
    const used = warehouse.inventory.reduce((total, item) => total + item.onHand, 0);
    return {
      ...warehouse,
      used,
      available: warehouse.capacity - used,
      utilizationRate: Math.round((used / warehouse.capacity) * 100)
    };
  });
}

export function searchShipments(shipments, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return shipments;
  }

  return shipments.filter((shipment) =>
    [shipment.id, shipment.customer, shipment.origin, shipment.destination, shipment.status, shipment.priority]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery)
  );
}
