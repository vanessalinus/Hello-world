import { fleet as seedFleet, shipments as seedShipments, warehouses as seedWarehouses } from "./data.js";
import {
  calculateFleetUtilization,
  calculateShipmentMetrics,
  createShipment,
  getAllowedNextStatuses,
  getInventoryAlerts,
  getStatusLabel,
  searchShipments,
  summarizeWarehouseCapacity,
  transitionShipmentStatus
} from "./logistics.js";

const STORAGE_KEY = "logistics-management-state-v1";

const state = loadState();

const elements = {
  shipmentForm: document.querySelector("#shipment-form"),
  shipmentTableBody: document.querySelector("#shipment-table-body"),
  shipmentSearch: document.querySelector("#shipment-search"),
  metricCards: document.querySelector("#metric-cards"),
  fleetGrid: document.querySelector("#fleet-grid"),
  warehouseGrid: document.querySelector("#warehouse-grid"),
  inventoryAlerts: document.querySelector("#inventory-alerts"),
  originSelect: document.querySelector("#origin"),
  dispatcherLog: document.querySelector("#dispatcher-log"),
  resetButton: document.querySelector("#reset-data")
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  const savedState = localStorage.getItem(STORAGE_KEY);

  if (!savedState) {
    return {
      fleet: clone(seedFleet),
      shipments: clone(seedShipments),
      warehouses: clone(seedWarehouses),
      log: ["Loaded starter logistics workspace."]
    };
  }

  try {
    return JSON.parse(savedState);
  } catch {
    return {
      fleet: clone(seedFleet),
      shipments: clone(seedShipments),
      warehouses: clone(seedWarehouses),
      log: ["Starter data restored after a saved-state read error."]
    };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function log(message) {
  state.log.unshift(`${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${message}`);
  state.log = state.log.slice(0, 6);
  saveState();
  renderDispatcherLog();
}

function formatNumber(value) {
  return new Intl.NumberFormat().format(value);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

function renderMetricCards() {
  const shipmentMetrics = calculateShipmentMetrics(state.shipments);
  const fleetMetrics = calculateFleetUtilization(state.fleet, state.shipments);
  const inventoryAlerts = getInventoryAlerts(state.warehouses);

  const cards = [
    { label: "Active shipments", value: shipmentMetrics.active, note: `${shipmentMetrics.delayed} delayed` },
    { label: "Fleet utilization", value: `${fleetMetrics.utilizationRate}%`, note: `${fleetMetrics.assigned}/${fleetMetrics.available} available assigned` },
    { label: "Inventory alerts", value: inventoryAlerts.length, note: "at or below reorder point" },
    { label: "On-time score", value: `${shipmentMetrics.onTimeRate}%`, note: `${shipmentMetrics.delivered} delivered` }
  ];

  elements.metricCards.innerHTML = cards
    .map(
      (card) => `
        <article class="metric-card">
          <span>${card.label}</span>
          <strong>${card.value}</strong>
          <small>${card.note}</small>
        </article>
      `
    )
    .join("");
}

function renderShipmentTable() {
  const visibleShipments = searchShipments(state.shipments, elements.shipmentSearch.value);

  elements.shipmentTableBody.innerHTML = visibleShipments
    .map((shipment) => {
      const nextActions = getAllowedNextStatuses(shipment.status)
        .map(
          (status) => `
            <button class="table-action" data-shipment-id="${escapeHtml(shipment.id)}" data-status="${escapeHtml(status)}">
              ${escapeHtml(getStatusLabel(status))}
            </button>
          `
        )
        .join("");

      return `
        <tr>
          <td>
            <strong>${escapeHtml(shipment.id)}</strong>
            <span>${escapeHtml(shipment.customer)}</span>
          </td>
          <td>${escapeHtml(shipment.origin)}</td>
          <td>${escapeHtml(shipment.destination)}</td>
          <td>${formatNumber(shipment.weightKg)} kg</td>
          <td>${formatNumber(shipment.distanceKm)} km</td>
          <td><span class="priority priority-${escapeHtml(shipment.priority)}">${escapeHtml(shipment.priority)}</span></td>
          <td><span class="status status-${escapeHtml(shipment.status)}">${escapeHtml(getStatusLabel(shipment.status))}</span></td>
          <td>${escapeHtml(shipment.vehicleId ?? "Unassigned")}</td>
          <td>${escapeHtml(shipment.eta)}</td>
          <td class="actions">${nextActions || "<span class=\"muted\">Closed</span>"}</td>
        </tr>
      `;
    })
    .join("");
}

function renderFleet() {
  elements.fleetGrid.innerHTML = state.fleet
    .map((vehicle) => {
      const activeShipment = state.shipments.find(
        (shipment) =>
          shipment.vehicleId === vehicle.id &&
          ["scheduled", "in_transit", "delayed"].includes(shipment.status)
      );

      return `
        <article class="panel-card">
          <div>
            <strong>${escapeHtml(vehicle.id)}</strong>
            <span>${escapeHtml(vehicle.type)}</span>
          </div>
          <dl>
            <dt>Driver</dt><dd>${escapeHtml(vehicle.driver)}</dd>
            <dt>Capacity</dt><dd>${formatNumber(vehicle.maxWeightKg)} kg</dd>
            <dt>Range</dt><dd>${formatNumber(vehicle.maxRouteKm)} km</dd>
            <dt>Status</dt><dd>${escapeHtml(activeShipment ? `Assigned to ${activeShipment.id}` : vehicle.status)}</dd>
          </dl>
        </article>
      `;
    })
    .join("");
}

function renderWarehouses() {
  elements.warehouseGrid.innerHTML = summarizeWarehouseCapacity(state.warehouses)
    .map(
      (warehouse) => `
        <article class="panel-card">
          <div>
            <strong>${escapeHtml(warehouse.name)}</strong>
            <span>${escapeHtml(warehouse.city)} - ${escapeHtml(warehouse.region)}</span>
          </div>
          <div class="capacity-bar" aria-label="${warehouse.utilizationRate}% capacity used">
            <span style="width: ${warehouse.utilizationRate}%"></span>
          </div>
          <small>${formatNumber(warehouse.used)} of ${formatNumber(warehouse.capacity)} units stored</small>
        </article>
      `
    )
    .join("");
}

function renderInventoryAlerts() {
  const alerts = getInventoryAlerts(state.warehouses);

  if (alerts.length === 0) {
    elements.inventoryAlerts.innerHTML = "<li>No inventory risks detected.</li>";
    return;
  }

  elements.inventoryAlerts.innerHTML = alerts
    .map(
      (alert) => `
        <li>
          <strong>${escapeHtml(alert.sku)}</strong> ${escapeHtml(alert.name)} at ${escapeHtml(alert.warehouseId)}
          <span>${formatNumber(alert.shortage)} below target</span>
        </li>
      `
    )
    .join("");
}

function renderOriginOptions() {
  elements.originSelect.innerHTML = state.warehouses
    .map((warehouse) => `<option value="${escapeHtml(warehouse.id)}">${escapeHtml(warehouse.id)} - ${escapeHtml(warehouse.city)}</option>`)
    .join("");
}

function renderDispatcherLog() {
  elements.dispatcherLog.innerHTML = state.log.map((entry) => `<li>${escapeHtml(entry)}</li>`).join("");
}

function render() {
  renderMetricCards();
  renderShipmentTable();
  renderFleet();
  renderWarehouses();
  renderInventoryAlerts();
  renderDispatcherLog();
}

function handleShipmentSubmit(event) {
  event.preventDefault();

  const formData = new FormData(elements.shipmentForm);
  const input = Object.fromEntries(formData.entries());

  try {
    const shipment = createShipment(input, {
      warehouses: state.warehouses,
      fleet: state.fleet,
      shipments: state.shipments
    });

    state.shipments.unshift(shipment);
    elements.shipmentForm.reset();
    elements.originSelect.value = state.warehouses[0].id;
    saveState();
    render();
    log(`${shipment.id} created for ${shipment.customer}; ${shipment.vehicleId ?? "awaiting capacity"}.`);
  } catch (error) {
    log(error.message);
  }
}

function handleShipmentAction(event) {
  const button = event.target.closest("[data-shipment-id][data-status]");
  if (!button) {
    return;
  }

  const shipmentIndex = state.shipments.findIndex((shipment) => shipment.id === button.dataset.shipmentId);
  if (shipmentIndex === -1) {
    return;
  }

  try {
    const updatedShipment = transitionShipmentStatus(state.shipments[shipmentIndex], button.dataset.status);
    state.shipments[shipmentIndex] = updatedShipment;
    saveState();
    render();
    log(`${updatedShipment.id} moved to ${getStatusLabel(updatedShipment.status)}.`);
  } catch (error) {
    log(error.message);
  }
}

function resetData() {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}

renderOriginOptions();
render();

elements.shipmentForm.addEventListener("submit", handleShipmentSubmit);
elements.shipmentSearch.addEventListener("input", renderShipmentTable);
elements.shipmentTableBody.addEventListener("click", handleShipmentAction);
elements.resetButton.addEventListener("click", resetData);
