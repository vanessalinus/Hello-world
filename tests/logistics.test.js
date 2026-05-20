import test from "node:test";
import assert from "node:assert/strict";
import {
  assignBestVehicle,
  calculateFleetUtilization,
  calculateShipmentMetrics,
  createShipment,
  estimateTransitDays,
  getInventoryAlerts,
  searchShipments,
  transitionShipmentStatus
} from "../src/logistics.js";

const warehouses = [
  {
    id: "WH-1",
    name: "Primary",
    city: "Atlanta",
    region: "Southeast",
    capacity: 1000,
    inventory: [
      { sku: "A", name: "Alpha", onHand: 10, reorderPoint: 20 },
      { sku: "B", name: "Beta", onHand: 50, reorderPoint: 25 }
    ]
  }
];

const fleet = [
  {
    id: "VAN-1",
    status: "available",
    maxWeightKg: 3000,
    maxRouteKm: 600
  },
  {
    id: "TRK-1",
    status: "available",
    maxWeightKg: 10000,
    maxRouteKm: 1500
  },
  {
    id: "TRK-2",
    status: "maintenance",
    maxWeightKg: 12000,
    maxRouteKm: 1800
  }
];

test("assignBestVehicle chooses the smallest available vehicle that can carry the route", () => {
  const assigned = assignBestVehicle({ weightKg: 2600, distanceKm: 400 }, fleet);

  assert.equal(assigned.id, "VAN-1");
});

test("assignBestVehicle returns null when no available vehicle can satisfy the shipment", () => {
  const assigned = assignBestVehicle({ weightKg: 13000, distanceKm: 400 }, fleet);

  assert.equal(assigned, null);
});

test("createShipment validates fields, assigns vehicle, cost, status, and ETA", () => {
  const shipment = createShipment(
    {
      customer: "Clinic Group",
      origin: "WH-1",
      destination: "Nashville, TN",
      distanceKm: 560,
      weightKg: 2600,
      priority: "standard"
    },
    {
      warehouses,
      fleet,
      shipments: [],
      createdAt: "2026-05-20T00:00:00.000Z"
    }
  );

  assert.equal(shipment.id, "SHP-1001");
  assert.equal(shipment.status, "scheduled");
  assert.equal(shipment.vehicleId, "VAN-1");
  assert.equal(shipment.eta, "2026-05-21");
  assert.equal(shipment.cost, 1784);
});

test("createShipment leaves oversized shipments unassigned for manual planning", () => {
  const shipment = createShipment(
    {
      customer: "Industrial Co",
      origin: "WH-1",
      destination: "Seattle, WA",
      distanceKm: 1900,
      weightKg: 20000,
      priority: "standard"
    },
    {
      warehouses,
      fleet,
      shipments: [],
      createdAt: "2026-05-20T00:00:00.000Z"
    }
  );

  assert.equal(shipment.status, "created");
  assert.equal(shipment.vehicleId, null);
});

test("transitionShipmentStatus enforces allowed lifecycle movement", () => {
  const shipment = { id: "SHP-99", status: "scheduled" };

  assert.equal(transitionShipmentStatus(shipment, "in_transit").status, "in_transit");
  assert.throws(() => transitionShipmentStatus(shipment, "delivered"), /Cannot move shipment/);
});

test("calculateShipmentMetrics summarizes active, delayed, delivered, and on-time counts", () => {
  const metrics = calculateShipmentMetrics([
    { status: "scheduled", weightKg: 100, distanceKm: 200 },
    { status: "delayed", weightKg: 150, distanceKm: 300 },
    { status: "delivered", weightKg: 200, distanceKm: 400 }
  ]);

  assert.deepEqual(metrics, {
    total: 3,
    active: 2,
    delivered: 1,
    delayed: 1,
    totalWeightKg: 250,
    totalDistanceKm: 500,
    onTimeRate: 67
  });
});

test("calculateFleetUtilization counts assigned available vehicles only", () => {
  const utilization = calculateFleetUtilization(fleet, [
    { status: "scheduled", vehicleId: "VAN-1" },
    { status: "delivered", vehicleId: "TRK-1" },
    { status: "delayed", vehicleId: "TRK-2" }
  ]);

  assert.equal(utilization.available, 2);
  assert.equal(utilization.assigned, 1);
  assert.equal(utilization.inMaintenance, 1);
  assert.equal(utilization.utilizationRate, 50);
});

test("getInventoryAlerts returns items at or below reorder point", () => {
  const alerts = getInventoryAlerts(warehouses);

  assert.equal(alerts.length, 1);
  assert.equal(alerts[0].sku, "A");
  assert.equal(alerts[0].shortage, 10);
});

test("searchShipments filters by customer, origin, destination, status, and priority", () => {
  const shipments = [
    { id: "SHP-1", customer: "Blue Retail", origin: "WH-1", destination: "Miami", status: "scheduled", priority: "standard" },
    { id: "SHP-2", customer: "Green Health", origin: "WH-2", destination: "Denver", status: "delayed", priority: "expedited" }
  ];

  assert.equal(searchShipments(shipments, "health").length, 1);
  assert.equal(searchShipments(shipments, "WH-1").length, 1);
  assert.equal(searchShipments(shipments, "expedited")[0].id, "SHP-2");
});

test("estimateTransitDays scales by priority with a one-day minimum", () => {
  assert.equal(estimateTransitDays(1, "standard"), 1);
  assert.equal(estimateTransitDays(1000, "economy"), 3);
  assert.equal(estimateTransitDays(1000, "expedited"), 2);
});
