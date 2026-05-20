const STORAGE_KEY = "flowfreight-logistics-state";

const sampleState = {
  shipments: [
    {
      id: "shipment-1",
      reference: "FF-2401",
      origin: "Dallas, TX",
      destination: "Atlanta, GA",
      mode: "Road",
      priority: "High",
      status: "In Transit",
      eta: "2026-05-20T18:00",
      vehicleId: "veh-101",
      notes: "Temperature-sensitive medical supplies.",
      createdAt: "2026-05-20T06:25:00",
    },
    {
      id: "shipment-2",
      reference: "FF-2402",
      origin: "Long Beach, CA",
      destination: "Phoenix, AZ",
      mode: "Road",
      priority: "Normal",
      status: "Scheduled",
      eta: "2026-05-21T14:30",
      vehicleId: "veh-102",
      notes: "Retail replenishment order.",
      createdAt: "2026-05-20T07:10:00",
    },
    {
      id: "shipment-3",
      reference: "FF-2403",
      origin: "Chicago, IL",
      destination: "Newark, NJ",
      mode: "Rail",
      priority: "High",
      status: "Delayed",
      eta: "2026-05-20T21:15",
      vehicleId: "veh-103",
      notes: "Weather-driven reroute under review.",
      createdAt: "2026-05-20T05:40:00",
    },
    {
      id: "shipment-4",
      reference: "FF-2404",
      origin: "Seattle, WA",
      destination: "Denver, CO",
      mode: "Air",
      priority: "Low",
      status: "Delivered",
      eta: "2026-05-20T09:05",
      vehicleId: "veh-104",
      notes: "Delivered and signed off.",
      createdAt: "2026-05-19T18:50:00",
    },
  ],
  fleet: [
    {
      id: "veh-101",
      name: "Truck 18",
      type: "Refrigerated trailer",
      capacity: "18 pallets",
      driver: "Alicia Mendez",
      status: "Busy",
      maintenanceDue: "2026-06-04",
      location: "Memphis, TN",
    },
    {
      id: "veh-102",
      name: "Truck 07",
      type: "Dry van",
      capacity: "22 pallets",
      driver: "Jordan Lee",
      status: "Available",
      maintenanceDue: "2026-06-11",
      location: "Long Beach, CA",
    },
    {
      id: "veh-103",
      name: "Rail Unit 04",
      type: "Intermodal container",
      capacity: "40 ft container",
      driver: "Central dispatch",
      status: "Maintenance",
      maintenanceDue: "2026-05-24",
      location: "Chicago, IL",
    },
    {
      id: "veh-104",
      name: "Air Cargo 12",
      type: "Narrow-body cargo",
      capacity: "12 tons",
      driver: "Priya Raman",
      status: "Available",
      maintenanceDue: "2026-06-18",
      location: "Seattle, WA",
    },
  ],
  warehouses: [
    {
      id: "wh-1",
      name: "South Hub",
      city: "Dallas, TX",
      utilization: 76,
      inboundToday: 18,
      outboundToday: 24,
      criticalItems: ["Cold chain kits", "Medical labels"],
    },
    {
      id: "wh-2",
      name: "West Gateway",
      city: "Long Beach, CA",
      utilization: 88,
      inboundToday: 26,
      outboundToday: 21,
      criticalItems: ["Packing resin", "Barcode scanners"],
    },
    {
      id: "wh-3",
      name: "East Fulfillment",
      city: "Newark, NJ",
      utilization: 64,
      inboundToday: 11,
      outboundToday: 16,
      criticalItems: ["Safety seals"],
    },
  ],
  activity: [
    {
      id: "act-1",
      time: "2026-05-20T09:20:00",
      title: "Shipment FF-2404 delivered",
      detail: "Final confirmation received from Denver consignee.",
    },
    {
      id: "act-2",
      time: "2026-05-20T08:10:00",
      title: "Maintenance scheduled for Rail Unit 04",
      detail: "Brake system inspection prioritized due to sensor alert.",
    },
    {
      id: "act-3",
      time: "2026-05-20T07:30:00",
      title: "Stock pressure flagged in West Gateway",
      detail: "Warehouse utilization exceeded the 85% planning threshold.",
    },
  ],
};

const state = loadState();
const filters = {
  search: "",
  status: "All",
};

const elements = {
  activeMetric: document.querySelector("#metric-active"),
  activeMetricNote: document.querySelector("#metric-active-note"),
  onTimeMetric: document.querySelector("#metric-on-time"),
  delayedMetric: document.querySelector("#metric-delayed"),
  delayedMetricNote: document.querySelector("#metric-delay-note"),
  utilizationMetric: document.querySelector("#metric-utilization"),
  utilizationMetricNote: document.querySelector("#metric-utilization-note"),
  alertCount: document.querySelector("#alert-count"),
  alertsList: document.querySelector("#alerts-list"),
  warehouseCapacity: document.querySelector("#warehouse-capacity"),
  shipmentsTableBody: document.querySelector("#shipments-table-body"),
  fleetGrid: document.querySelector("#fleet-grid"),
  warehouseGrid: document.querySelector("#warehouse-grid"),
  timelineList: document.querySelector("#timeline-list"),
  shipmentForm: document.querySelector("#shipment-form"),
  formFeedback: document.querySelector("#form-feedback"),
  vehicleSelect: document.querySelector("#vehicle-select"),
  shipmentSearch: document.querySelector("#shipment-search"),
  shipmentFilter: document.querySelector("#shipment-filter"),
  seedDataButton: document.querySelector("#seed-data-button"),
  emptyStateTemplate: document.querySelector("#empty-state-template"),
};

bootstrap();

function bootstrap() {
  populateVehicleSelect();
  bindEvents();
  render();
}

function bindEvents() {
  elements.shipmentForm.addEventListener("submit", handleShipmentSubmit);
  elements.shipmentSearch.addEventListener("input", (event) => {
    filters.search = event.target.value.trim().toLowerCase();
    renderShipments();
  });
  elements.shipmentFilter.addEventListener("change", (event) => {
    filters.status = event.target.value;
    renderShipments();
  });
  elements.shipmentsTableBody.addEventListener("change", handleStatusChange);
  elements.seedDataButton.addEventListener("click", resetSampleData);
}

function handleShipmentSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const shipment = {
    id: `shipment-${crypto.randomUUID()}`,
    reference: formData.get("reference").trim(),
    origin: formData.get("origin").trim(),
    destination: formData.get("destination").trim(),
    mode: formData.get("mode"),
    priority: formData.get("priority"),
    status: formData.get("status"),
    eta: formData.get("eta"),
    vehicleId: formData.get("vehicleId"),
    notes: formData.get("notes").trim(),
    createdAt: new Date().toISOString(),
  };

  state.shipments.unshift(shipment);

  const vehicle = state.fleet.find((item) => item.id === shipment.vehicleId);
  if (vehicle && shipment.status !== "Delivered") {
    vehicle.status = "Busy";
    vehicle.location = shipment.origin;
  }

  state.activity.unshift({
    id: `activity-${crypto.randomUUID()}`,
    time: new Date().toISOString(),
    title: `Shipment ${shipment.reference} created`,
    detail: `${shipment.origin} to ${shipment.destination} via ${shipment.mode}.`,
  });

  persistState();
  event.currentTarget.reset();
  setDefaultEta();
  elements.formFeedback.textContent = `Shipment ${shipment.reference} added to the operations board.`;
  populateVehicleSelect();
  render();
}

function handleStatusChange(event) {
  const target = event.target;
  if (!target.matches("[data-shipment-status]")) {
    return;
  }

  const shipmentId = target.getAttribute("data-shipment-status");
  const shipment = state.shipments.find((item) => item.id === shipmentId);
  if (!shipment) {
    return;
  }

  shipment.status = target.value;

  const vehicle = state.fleet.find((item) => item.id === shipment.vehicleId);
  if (vehicle) {
    vehicle.status = shipment.status === "Delivered" ? "Available" : "Busy";
    vehicle.location = shipment.status === "Delivered" ? shipment.destination : shipment.origin;
  }

  state.activity.unshift({
    id: `activity-${crypto.randomUUID()}`,
    time: new Date().toISOString(),
    title: `Shipment ${shipment.reference} updated to ${shipment.status}`,
    detail: `Vehicle ${vehicle ? vehicle.name : shipment.vehicleId} synchronized with shipment status.`,
  });

  persistState();
  populateVehicleSelect();
  render();
}

function resetSampleData() {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function render() {
  renderMetrics();
  renderAlerts();
  renderWarehouseCapacity();
  renderShipments();
  renderFleet();
  renderWarehouses();
  renderTimeline();
}

function renderMetrics() {
  const activeShipments = state.shipments.filter(
    (shipment) => shipment.status === "Scheduled" || shipment.status === "In Transit" || shipment.status === "Delayed",
  );
  const delayedShipments = state.shipments.filter((shipment) => shipment.status === "Delayed");
  const trackedForOnTime = state.shipments.filter(
    (shipment) =>
      shipment.status === "Delivered" || shipment.status === "In Transit" || shipment.status === "Delayed",
  );
  const onTimeDenominator = trackedForOnTime.length || 1;
  const onTimeLoads = trackedForOnTime.filter((shipment) => shipment.status !== "Delayed").length;
  const busyVehicles = state.fleet.filter((vehicle) => vehicle.status === "Busy").length;
  const utilization = Math.round((busyVehicles / state.fleet.length) * 100);
  const onTimeRate = Math.round((onTimeLoads / onTimeDenominator) * 100);

  elements.activeMetric.textContent = String(activeShipments.length);
  elements.activeMetricNote.textContent = `${state.shipments.length} total shipments tracked`;
  elements.onTimeMetric.textContent = `${onTimeRate}%`;
  elements.delayedMetric.textContent = String(delayedShipments.length);
  elements.delayedMetricNote.textContent =
    delayedShipments.length > 0 ? "Escalation needed on impacted loads" : "No critical exceptions";
  elements.utilizationMetric.textContent = `${utilization}%`;
  elements.utilizationMetricNote.textContent = `${busyVehicles} of ${state.fleet.length} vehicles assigned`;
}

function renderAlerts() {
  const alerts = [
    ...state.shipments
      .filter((shipment) => shipment.status === "Delayed")
      .map((shipment) => ({
        severity: "Delayed",
        title: `${shipment.reference} delayed`,
        detail: `${shipment.origin} to ${shipment.destination} requires intervention before ${formatDateTime(
          shipment.eta,
        )}.`,
      })),
    ...state.warehouses
      .filter((warehouse) => warehouse.utilization >= 85)
      .map((warehouse) => ({
        severity: "Capacity",
        title: `${warehouse.name} nearing capacity`,
        detail: `${warehouse.utilization}% utilized in ${warehouse.city}. Review outbound prioritization.`,
      })),
    ...state.fleet
      .filter((vehicle) => daysUntil(vehicle.maintenanceDue) <= 7)
      .map((vehicle) => ({
        severity: "Maintenance",
        title: `${vehicle.name} maintenance due soon`,
        detail: `Preventive maintenance scheduled for ${formatDate(vehicle.maintenanceDue)}.`,
      })),
  ];

  elements.alertCount.textContent = `${alerts.length} alerts`;
  elements.alertsList.replaceChildren();

  if (alerts.length === 0) {
    elements.alertsList.appendChild(buildEmptyState("No active alerts. Network is operating within thresholds."));
    return;
  }

  alerts.forEach((alert) => {
    const item = document.createElement("article");
    item.className = "alert-item";
    item.innerHTML = `
      <header>
        <div>
          <strong>${alert.title}</strong>
          <p>${alert.detail}</p>
        </div>
        <span class="tag ${tagClass(alert.severity)}">${alert.severity}</span>
      </header>
    `;
    elements.alertsList.appendChild(item);
  });
}

function renderWarehouseCapacity() {
  elements.warehouseCapacity.replaceChildren();

  state.warehouses.forEach((warehouse) => {
    const card = document.createElement("article");
    card.className = "capacity-card";
    card.innerHTML = `
      <div class="capacity-label">
        <strong>${warehouse.name}</strong>
        <span>${warehouse.utilization}% utilized</span>
      </div>
      <p>${warehouse.city}</p>
      <div class="capacity-bar" aria-hidden="true">
        <span style="width: ${warehouse.utilization}%"></span>
      </div>
    `;
    elements.warehouseCapacity.appendChild(card);
  });
}

function renderShipments() {
  const shipments = state.shipments.filter((shipment) => {
    const matchesStatus = filters.status === "All" || shipment.status === filters.status;
    const haystack = `${shipment.reference} ${shipment.origin} ${shipment.destination}`.toLowerCase();
    const matchesSearch = filters.search === "" || haystack.includes(filters.search);
    return matchesStatus && matchesSearch;
  });

  elements.shipmentsTableBody.replaceChildren();

  if (shipments.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 7;
    cell.appendChild(buildEmptyState("No shipments match the current search and status filters."));
    row.appendChild(cell);
    elements.shipmentsTableBody.appendChild(row);
    return;
  }

  shipments.forEach((shipment) => {
    const row = document.createElement("tr");
    const vehicle = state.fleet.find((item) => item.id === shipment.vehicleId);
    row.innerHTML = `
      <td>
        <strong>${shipment.reference}</strong>
        <span>${shipment.notes || "No notes provided"}</span>
      </td>
      <td>${shipment.origin} to ${shipment.destination}</td>
      <td>${shipment.mode}</td>
      <td><span class="tag ${tagClass(shipment.priority)}">${shipment.priority}</span></td>
      <td>
        <div class="table-status">
          <span class="tag ${tagClass(shipment.status)}">${shipment.status}</span>
          <select data-shipment-status="${shipment.id}" aria-label="Update ${shipment.reference} status">
            ${["Scheduled", "In Transit", "Delayed", "Delivered"]
              .map(
                (status) =>
                  `<option value="${status}" ${status === shipment.status ? "selected" : ""}>${status}</option>`,
              )
              .join("")}
          </select>
        </div>
      </td>
      <td>${formatDateTime(shipment.eta)}</td>
      <td>${vehicle ? `${vehicle.name} (${vehicle.driver})` : shipment.vehicleId}</td>
    `;
    elements.shipmentsTableBody.appendChild(row);
  });
}

function renderFleet() {
  elements.fleetGrid.replaceChildren();

  state.fleet.forEach((vehicle) => {
    const card = document.createElement("article");
    card.className = "fleet-card";
    card.innerHTML = `
      <div class="fleet-card__header">
        <div>
          <strong>${vehicle.name}</strong>
          <p>${vehicle.type}</p>
        </div>
        <span class="tag ${tagClass(vehicle.status)}">${vehicle.status}</span>
      </div>
      <ul>
        <li>Driver: ${vehicle.driver}</li>
        <li>Capacity: ${vehicle.capacity}</li>
        <li>Current location: ${vehicle.location}</li>
        <li>Maintenance due: ${formatDate(vehicle.maintenanceDue)}</li>
      </ul>
    `;
    elements.fleetGrid.appendChild(card);
  });
}

function renderWarehouses() {
  elements.warehouseGrid.replaceChildren();

  state.warehouses.forEach((warehouse) => {
    const card = document.createElement("article");
    card.className = "warehouse-card";
    card.innerHTML = `
      <strong>${warehouse.name}</strong>
      <p>${warehouse.city}</p>
      <div class="warehouse-progress" aria-hidden="true">
        <span style="width: ${warehouse.utilization}%"></span>
      </div>
      <ul>
        <li>Utilization: ${warehouse.utilization}%</li>
        <li>Inbound today: ${warehouse.inboundToday}</li>
        <li>Outbound today: ${warehouse.outboundToday}</li>
        <li>Critical items: ${warehouse.criticalItems.join(", ")}</li>
      </ul>
    `;
    elements.warehouseGrid.appendChild(card);
  });
}

function renderTimeline() {
  elements.timelineList.replaceChildren();

  state.activity
    .slice()
    .sort((left, right) => new Date(right.time) - new Date(left.time))
    .slice(0, 8)
    .forEach((entry) => {
      const card = document.createElement("article");
      card.className = "timeline-item";
      card.innerHTML = `
        <time datetime="${entry.time}">${formatDateTime(entry.time)}</time>
        <div>
          <strong>${entry.title}</strong>
          <p>${entry.detail}</p>
        </div>
      `;
      elements.timelineList.appendChild(card);
    });
}

function populateVehicleSelect() {
  const selectedValue = elements.vehicleSelect.value;
  const activeVehicleIds = new Set(
    state.shipments
      .filter((shipment) => shipment.status !== "Delivered")
      .map((shipment) => shipment.vehicleId),
  );

  elements.vehicleSelect.replaceChildren();

  state.fleet.forEach((vehicle) => {
    const option = document.createElement("option");
    const isOccupied = activeVehicleIds.has(vehicle.id) && vehicle.id !== selectedValue;
    option.value = vehicle.id;
    option.textContent = `${vehicle.name} - ${vehicle.status}`;
    option.disabled = isOccupied;
    if (isOccupied) {
      option.textContent += " (assigned)";
    }
    elements.vehicleSelect.appendChild(option);
  });

  if (selectedValue) {
    elements.vehicleSelect.value = selectedValue;
  }

  setDefaultEta();
}

function setDefaultEta() {
  const etaInput = elements.shipmentForm.querySelector('input[name="eta"]');
  if (!etaInput.value) {
    const future = new Date();
    future.setHours(future.getHours() + 6);
    etaInput.value = formatForDateTimeInput(future);
  }
}

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return structuredClone(sampleState);
    }

    const parsed = JSON.parse(stored);
    return {
      shipments: parsed.shipments ?? structuredClone(sampleState.shipments),
      fleet: parsed.fleet ?? structuredClone(sampleState.fleet),
      warehouses: parsed.warehouses ?? structuredClone(sampleState.warehouses),
      activity: parsed.activity ?? structuredClone(sampleState.activity),
    };
  } catch (error) {
    console.error("Failed to load state", error);
    return structuredClone(sampleState);
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function buildEmptyState(message) {
  const fragment = elements.emptyStateTemplate.content.cloneNode(true);
  fragment.querySelector("p").textContent = message;
  return fragment;
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatForDateTimeInput(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}`;
}

function daysUntil(dateValue) {
  const now = new Date();
  const due = new Date(dateValue);
  const diff = due.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function tagClass(value) {
  const normalized = String(value).toLowerCase().replace(/\s+/g, "-");
  return `tag--${normalized}`;
}
