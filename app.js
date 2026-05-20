const STORAGE_KEY = "logitrack-state-v1";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const sampleData = {
  shipments: [
    {
      id: "SHP-1001",
      customer: "Northstar Retail",
      origin: "Dallas, TX",
      destination: "Austin, TX",
      cargo: "Consumer electronics",
      weight: 1800,
      distance: 315,
      dueDate: offsetDate(2),
      vehicleId: "TRK-201",
      status: "In Transit",
    },
    {
      id: "SHP-1002",
      customer: "Harbor Medical",
      origin: "Phoenix, AZ",
      destination: "Las Vegas, NV",
      cargo: "Temperature-safe supplies",
      weight: 950,
      distance: 475,
      dueDate: offsetDate(1),
      vehicleId: "VAN-118",
      status: "Delayed",
    },
    {
      id: "SHP-1003",
      customer: "Blue Ridge Foods",
      origin: "Atlanta, GA",
      destination: "Nashville, TN",
      cargo: "Frozen goods",
      weight: 2400,
      distance: 399,
      dueDate: offsetDate(4),
      vehicleId: "REEF-44",
      status: "Pending",
    },
  ],
  vehicles: [
    {
      id: "TRK-201",
      type: "Box truck",
      driver: "Maya Chen",
      capacity: 2600,
      status: "Assigned",
      location: "Waco, TX",
    },
    {
      id: "VAN-118",
      type: "Cargo van",
      driver: "Andre Wilson",
      capacity: 1200,
      status: "Assigned",
      location: "Kingman, AZ",
    },
    {
      id: "REEF-44",
      type: "Refrigerated truck",
      driver: "Priya Shah",
      capacity: 3200,
      status: "Reserved",
      location: "Atlanta, GA",
    },
    {
      id: "FLT-09",
      type: "Flatbed",
      driver: "Oscar Ruiz",
      capacity: 5400,
      status: "Available",
      location: "Kansas City, MO",
    },
    {
      id: "TRK-330",
      type: "Semi truck",
      driver: "Lena Brooks",
      capacity: 8200,
      status: "Maintenance",
      location: "Denver, CO",
    },
  ],
  inventory: [
    {
      sku: "PKG-BOX-L",
      name: "Large corrugated boxes",
      warehouse: "Dallas DC",
      quantity: 1420,
      reorderPoint: 450,
    },
    {
      sku: "ICE-GEL-02",
      name: "Gel ice packs",
      warehouse: "Atlanta Cold Hub",
      quantity: 260,
      reorderPoint: 300,
    },
    {
      sku: "PAL-STD",
      name: "Standard pallets",
      warehouse: "Phoenix Crossdock",
      quantity: 780,
      reorderPoint: 500,
    },
    {
      sku: "SEAL-TMP",
      name: "Tamper seals",
      warehouse: "Kansas City DC",
      quantity: 88,
      reorderPoint: 150,
    },
  ],
};

let state = loadState();

const elements = {
  shipmentForm: document.querySelector("#shipmentForm"),
  shipmentSearch: document.querySelector("#shipmentSearch"),
  statusFilter: document.querySelector("#statusFilter"),
  vehicleSelect: document.querySelector("#vehicleId"),
  shipmentsTable: document.querySelector("#shipmentsTable"),
  fleetList: document.querySelector("#fleetList"),
  inventoryList: document.querySelector("#inventoryList"),
  resetDataButton: document.querySelector("#resetDataButton"),
  exportDataButton: document.querySelector("#exportDataButton"),
  activeShipments: document.querySelector("#activeShipments"),
  delayedShipments: document.querySelector("#delayedShipments"),
  fleetUtilization: document.querySelector("#fleetUtilization"),
  availableVehicles: document.querySelector("#availableVehicles"),
  stockHealth: document.querySelector("#stockHealth"),
  lowStockItems: document.querySelector("#lowStockItems"),
  projectedCost: document.querySelector("#projectedCost"),
  totalDistance: document.querySelector("#totalDistance"),
};

elements.shipmentForm.addEventListener("submit", addShipment);
elements.shipmentSearch.addEventListener("input", render);
elements.statusFilter.addEventListener("change", render);
elements.resetDataButton.addEventListener("click", resetData);
elements.exportDataButton.addEventListener("click", exportData);

render();

function loadState() {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return structuredClone(sampleData);
  }

  try {
    return JSON.parse(savedState);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return structuredClone(sampleData);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  renderVehicleOptions();
  renderKpis();
  renderShipments();
  renderFleet();
  renderInventory();
}

function renderVehicleOptions() {
  const selectedVehicle = elements.vehicleSelect.value;

  elements.vehicleSelect.innerHTML = state.vehicles
    .map((vehicle) => {
      const assignmentCount = activeShipmentsForVehicle(vehicle.id).length;
      const disabled = vehicle.status === "Maintenance" ? "disabled" : "";
      const loadHint = assignmentCount ? ` - ${assignmentCount} active shipment(s)` : "";
      const vehicleId = escapeHtml(vehicle.id);
      const vehicleType = escapeHtml(vehicle.type);

      return `<option value="${vehicleId}" ${disabled}>${vehicleId} - ${vehicleType}${loadHint}</option>`;
    })
    .join("");

  if (selectedVehicle) {
    elements.vehicleSelect.value = selectedVehicle;
  }
}

function renderKpis() {
  const activeShipments = state.shipments.filter((shipment) => shipment.status !== "Delivered");
  const delayedShipments = state.shipments.filter((shipment) => shipment.status === "Delayed");
  const usableVehicles = state.vehicles.filter((vehicle) => vehicle.status !== "Maintenance");
  const availableVehicles = state.vehicles.filter((vehicle) => vehicle.status === "Available");
  const lowStockItems = state.inventory.filter((item) => item.quantity <= item.reorderPoint);
  const routeDistance = activeShipments.reduce((sum, shipment) => sum + shipment.distance, 0);
  const routeCost = activeShipments.reduce((sum, shipment) => sum + estimateShipmentCost(shipment), 0);
  const fleetUtilization = usableVehicles.length
    ? Math.round(((usableVehicles.length - availableVehicles.length) / usableVehicles.length) * 100)
    : 0;
  const stockHealth = state.inventory.length
    ? Math.round(((state.inventory.length - lowStockItems.length) / state.inventory.length) * 100)
    : 100;

  elements.activeShipments.textContent = activeShipments.length;
  elements.delayedShipments.textContent = `${delayedShipments.length} delayed`;
  elements.fleetUtilization.textContent = `${fleetUtilization}%`;
  elements.availableVehicles.textContent = `${availableVehicles.length} vehicles available`;
  elements.stockHealth.textContent = `${stockHealth}%`;
  elements.lowStockItems.textContent = `${lowStockItems.length} low-stock SKUs`;
  elements.projectedCost.textContent = currencyFormatter.format(routeCost);
  elements.totalDistance.textContent = `${routeDistance.toLocaleString()} km scheduled`;
}

function renderShipments() {
  const searchTerm = elements.shipmentSearch.value.trim().toLowerCase();
  const statusFilter = elements.statusFilter.value;
  const filteredShipments = state.shipments.filter((shipment) => {
    const searchableText = [
      shipment.id,
      shipment.customer,
      shipment.origin,
      shipment.destination,
      shipment.cargo,
      shipment.vehicleId,
      shipment.status,
    ]
      .join(" ")
      .toLowerCase();
    const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
    const matchesStatus = statusFilter === "All" || shipment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (!filteredShipments.length) {
    elements.shipmentsTable.innerHTML = document.querySelector("#emptyStateTemplate").innerHTML;
    return;
  }

  elements.shipmentsTable.innerHTML = filteredShipments
    .map((shipment) => {
      const vehicle = findVehicle(shipment.vehicleId);

      return `
        <tr>
          <td>
            <span class="shipment-title">${escapeHtml(shipment.id)}</span>
            <span class="item-meta">${escapeHtml(shipment.customer)}</span>
          </td>
          <td>
            <span class="shipment-title">${escapeHtml(shipment.origin)}</span>
            <span class="item-meta">to ${escapeHtml(shipment.destination)} (${shipment.distance} km)</span>
          </td>
          <td>
            <span class="shipment-title">${escapeHtml(shipment.cargo)}</span>
            <span class="item-meta">${shipment.weight.toLocaleString()} kg</span>
          </td>
          <td>${vehicle ? `${escapeHtml(vehicle.id)}<br><span class="item-meta">${escapeHtml(vehicle.driver)}</span>` : escapeHtml(shipment.vehicleId)}</td>
          <td>${formatDate(shipment.dueDate)}</td>
          <td><span class="status-badge ${statusClass(shipment.status)}">${escapeHtml(shipment.status)}</span></td>
          <td>${currencyFormatter.format(estimateShipmentCost(shipment))}</td>
          <td>
            <div class="action-row">
              ${nextStatusButtons(shipment)}
              <button class="action-button" type="button" data-action="remove" data-id="${escapeHtml(shipment.id)}">Remove</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");

  elements.shipmentsTable.querySelectorAll("button[data-action]").forEach((button) => {
    button.addEventListener("click", handleShipmentAction);
  });
}

function renderFleet() {
  elements.fleetList.innerHTML = state.vehicles
    .map((vehicle) => {
      const activeShipments = activeShipmentsForVehicle(vehicle.id);
      const assignedWeight = activeShipments.reduce((sum, shipment) => sum + shipment.weight, 0);
      const loadPercent = Math.min(Math.round((assignedWeight / vehicle.capacity) * 100), 100);
      const meterClass = loadPercent > 90 ? "danger" : loadPercent > 70 ? "warning" : "";

      return `
        <article class="stack-item">
          <div class="item-topline">
            <div>
              <span class="item-title">${escapeHtml(vehicle.id)} - ${escapeHtml(vehicle.type)}</span>
              <span class="item-meta">${escapeHtml(vehicle.driver)} / ${escapeHtml(vehicle.location)}</span>
            </div>
            <span class="status-badge ${statusClass(vehicle.status)}">${escapeHtml(vehicle.status)}</span>
          </div>
          <div class="meter" aria-label="${loadPercent}% capacity used">
            <span class="${meterClass}" style="width: ${loadPercent}%"></span>
          </div>
          <span class="status-text">
            ${assignedWeight.toLocaleString()} of ${vehicle.capacity.toLocaleString()} kg assigned across ${activeShipments.length} active shipment(s)
          </span>
        </article>
      `;
    })
    .join("");
}

function renderInventory() {
  elements.inventoryList.innerHTML = state.inventory
    .map((item) => {
      const stockPercent = Math.min(Math.round((item.quantity / Math.max(item.reorderPoint * 2, 1)) * 100), 100);
      const isLowStock = item.quantity <= item.reorderPoint;

      return `
        <article class="stack-item">
          <div class="item-topline">
            <div>
              <span class="item-title">${escapeHtml(item.sku)} - ${escapeHtml(item.name)}</span>
              <span class="item-meta">${escapeHtml(item.warehouse)}</span>
            </div>
            <span class="status-badge ${isLowStock ? "low-stock" : "delivered"}">
              ${isLowStock ? "Reorder" : "Healthy"}
            </span>
          </div>
          <div class="meter" aria-label="${stockPercent}% stock target">
            <span class="${isLowStock ? "danger" : ""}" style="width: ${stockPercent}%"></span>
          </div>
          <span class="status-text">
            ${item.quantity.toLocaleString()} units available / reorder at ${item.reorderPoint.toLocaleString()}
          </span>
        </article>
      `;
    })
    .join("");
}

function addShipment(event) {
  event.preventDefault();

  const formData = new FormData(elements.shipmentForm);
  const vehicleId = formData.get("vehicleId");
  const vehicle = findVehicle(vehicleId);
  const weight = Number(formData.get("weight"));

  if (!vehicle || vehicle.status === "Maintenance") {
    alert("Choose a vehicle that is ready for dispatch.");
    return;
  }

  const assignedWeight = activeShipmentsForVehicle(vehicleId).reduce((sum, shipment) => sum + shipment.weight, 0);
  const availableCapacity = vehicle.capacity - assignedWeight;

  if (weight > availableCapacity) {
    alert(`${vehicle.id} only has ${availableCapacity.toLocaleString()} kg available capacity.`);
    return;
  }

  const shipment = {
    id: nextShipmentId(),
    customer: formData.get("customer").trim(),
    origin: formData.get("origin").trim(),
    destination: formData.get("destination").trim(),
    cargo: formData.get("cargo").trim(),
    weight,
    distance: Number(formData.get("distance")),
    dueDate: formData.get("dueDate"),
    vehicleId,
    status: formData.get("status"),
  };

  state.shipments.unshift(shipment);
  updateVehicleStatus(vehicleId);
  saveState();
  elements.shipmentForm.reset();
  render();
}

function handleShipmentAction(event) {
  const { action, id } = event.currentTarget.dataset;
  const shipment = state.shipments.find((item) => item.id === id);

  if (!shipment) {
    return;
  }

  if (action === "remove") {
    state.shipments = state.shipments.filter((item) => item.id !== id);
  } else {
    shipment.status = action;
  }

  state.vehicles.forEach((vehicle) => updateVehicleStatus(vehicle.id));
  saveState();
  render();
}

function nextStatusButtons(shipment) {
  const transitions = {
    Pending: ["In Transit", "Delayed"],
    "In Transit": ["Delivered", "Delayed"],
    Delayed: ["In Transit", "Delivered"],
    Delivered: ["In Transit"],
  };

  return (transitions[shipment.status] || transitions.Pending)
    .map(
      (status) =>
        `<button class="action-button" type="button" data-action="${status}" data-id="${escapeHtml(shipment.id)}">${status}</button>`,
    )
    .join("");
}

function updateVehicleStatus(vehicleId) {
  const vehicle = findVehicle(vehicleId);

  if (!vehicle || vehicle.status === "Maintenance") {
    return;
  }

  const activeAssignments = activeShipmentsForVehicle(vehicleId).length;

  if (activeAssignments > 0) {
    vehicle.status = activeAssignments > 1 ? "Reserved" : "Assigned";
  } else {
    vehicle.status = "Available";
  }
}

function activeShipmentsForVehicle(vehicleId) {
  return state.shipments.filter(
    (shipment) => shipment.vehicleId === vehicleId && shipment.status !== "Delivered",
  );
}

function findVehicle(vehicleId) {
  return state.vehicles.find((vehicle) => vehicle.id === vehicleId);
}

function nextShipmentId() {
  const highestId = state.shipments.reduce((highest, shipment) => {
    const numericId = Number(shipment.id.replace("SHP-", ""));
    return Number.isFinite(numericId) ? Math.max(highest, numericId) : highest;
  }, 1000);

  return `SHP-${highestId + 1}`;
}

function estimateShipmentCost(shipment) {
  const baseFee = 125;
  const distanceFee = shipment.distance * 1.85;
  const weightFee = shipment.weight * 0.18;
  const delayFee = shipment.status === "Delayed" ? 90 : 0;

  return Math.round(baseFee + distanceFee + weightFee + delayFee);
}

function statusClass(status) {
  return status.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function formatDate(dateValue) {
  return dateFormatter.format(new Date(`${dateValue}T12:00:00`));
}

function offsetDate(daysFromToday) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);

  return date.toISOString().slice(0, 10);
}

function resetData() {
  state = structuredClone(sampleData);
  saveState();
  render();
}

function exportData() {
  const file = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const downloadUrl = URL.createObjectURL(file);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = `logitrack-export-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(downloadUrl);
}
