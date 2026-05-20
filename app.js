const STORAGE_KEY = "routeflow-logistics-suite";

const seedState = {
  orders: [
    {
      id: "ORD-1001",
      customer: "Northwind Foods",
      origin: "Dallas, TX",
      destination: "Atlanta, GA",
      priority: "High",
      value: 18200,
      shipDate: "2026-05-21",
      status: "Ready to Ship",
    },
    {
      id: "ORD-1002",
      customer: "Blue Harbor Medical",
      origin: "Chicago, IL",
      destination: "Miami, FL",
      priority: "Critical",
      value: 32500,
      shipDate: "2026-05-22",
      status: "Awaiting Dispatch",
    },
    {
      id: "ORD-1003",
      customer: "Pioneer Retail",
      origin: "Phoenix, AZ",
      destination: "Seattle, WA",
      priority: "Normal",
      value: 8600,
      shipDate: "2026-05-24",
      status: "Scheduled",
    },
  ],
  shipments: [
    {
      id: "SHP-2048",
      reference: "SHP-2048",
      orderId: "ORD-1001",
      vehicleId: "FLT-301",
      warehouseId: "WH-01",
      eta: "2026-05-23",
      status: "In Transit",
    },
    {
      id: "SHP-2049",
      reference: "SHP-2049",
      orderId: "ORD-1002",
      vehicleId: "FLT-302",
      warehouseId: "WH-02",
      eta: "2026-05-24",
      status: "Delayed",
    },
    {
      id: "SHP-2050",
      reference: "SHP-2050",
      orderId: "ORD-1003",
      vehicleId: "FLT-304",
      warehouseId: "WH-03",
      eta: "2026-05-25",
      status: "Scheduled",
    },
  ],
  vehicles: [
    {
      id: "FLT-301",
      name: "Truck 14",
      type: "Truck",
      capacity: 18,
      status: "Assigned",
    },
    {
      id: "FLT-302",
      name: "Air Express 2",
      type: "Air Freight",
      capacity: 10,
      status: "Assigned",
    },
    {
      id: "FLT-303",
      name: "Van 8",
      type: "Van",
      capacity: 12,
      status: "Available",
    },
    {
      id: "FLT-304",
      name: "Container 6",
      type: "Container",
      capacity: 24,
      status: "Assigned",
    },
  ],
  warehouses: [
    {
      id: "WH-01",
      name: "South Hub",
      location: "Dallas, TX",
      capacity: 650,
      utilization: 480,
    },
    {
      id: "WH-02",
      name: "East Hub",
      location: "Atlanta, GA",
      capacity: 520,
      utilization: 418,
    },
    {
      id: "WH-03",
      name: "Northwest Hub",
      location: "Seattle, WA",
      capacity: 460,
      utilization: 244,
    },
  ],
  activity: [
    {
      id: uniqueId(),
      message: "Shipment SHP-2049 was flagged as delayed for Blue Harbor Medical.",
      time: "2026-05-20 09:20",
      tone: "Delayed",
    },
    {
      id: uniqueId(),
      message: "Truck 14 departed South Hub with the ORD-1001 load.",
      time: "2026-05-20 08:35",
      tone: "In Transit",
    },
    {
      id: uniqueId(),
      message: "Warehouse East Hub crossed 80% utilization.",
      time: "2026-05-20 07:55",
      tone: "High",
    },
  ],
};

const state = loadState();

const elements = {
  kpiGrid: document.querySelector("#kpiGrid"),
  alertsList: document.querySelector("#alertsList"),
  etaBoard: document.querySelector("#etaBoard"),
  ordersList: document.querySelector("#ordersList"),
  orderCount: document.querySelector("#orderCount"),
  shipmentsList: document.querySelector("#shipmentsList"),
  fleetList: document.querySelector("#fleetList"),
  vehicleCount: document.querySelector("#vehicleCount"),
  warehousesList: document.querySelector("#warehousesList"),
  warehouseCount: document.querySelector("#warehouseCount"),
  activityFeed: document.querySelector("#activityFeed"),
  orderForm: document.querySelector("#orderForm"),
  shipmentForm: document.querySelector("#shipmentForm"),
  vehicleForm: document.querySelector("#vehicleForm"),
  warehouseForm: document.querySelector("#warehouseForm"),
  shipmentOrderId: document.querySelector("#shipmentOrderId"),
  shipmentVehicleId: document.querySelector("#shipmentVehicleId"),
  shipmentWarehouseId: document.querySelector("#shipmentWarehouseId"),
  shipmentStatusFilter: document.querySelector("#shipmentStatusFilter"),
  shipmentSearch: document.querySelector("#shipmentSearch"),
  resetDataButton: document.querySelector("#resetDataButton"),
};

renderApp();
attachEvents();
primeDefaultDates();

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return cloneState(seedState);
  }

  try {
    const parsed = JSON.parse(stored);
    return {
      ...cloneState(seedState),
      ...parsed,
    };
  } catch (error) {
    return cloneState(seedState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderApp() {
  renderKpis();
  renderAlerts();
  renderEtaBoard();
  renderOrders();
  renderShipmentSelectors();
  renderShipments();
  renderFleet();
  renderWarehouses();
  renderActivity();
  saveState();
}

function attachEvents() {
  elements.orderForm.addEventListener("submit", handleOrderSubmit);
  elements.shipmentForm.addEventListener("submit", handleShipmentSubmit);
  elements.vehicleForm.addEventListener("submit", handleVehicleSubmit);
  elements.warehouseForm.addEventListener("submit", handleWarehouseSubmit);
  elements.shipmentStatusFilter.addEventListener("change", renderShipments);
  elements.shipmentSearch.addEventListener("input", renderShipments);
  elements.resetDataButton.addEventListener("click", resetData);

  elements.ordersList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-order-id]");
    if (!button) {
      return;
    }

    advanceOrderStatus(button.dataset.orderId);
  });

  elements.shipmentsList.addEventListener("click", (event) => {
    const actionButton = event.target.closest("button[data-shipment-id]");
    if (!actionButton) {
      return;
    }

    const { shipmentId, action } = actionButton.dataset;
    if (action === "advance") {
      advanceShipmentStatus(shipmentId);
    }

    if (action === "delay") {
      setShipmentDelayed(shipmentId);
    }
  });

  elements.fleetList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-vehicle-id]");
    if (!button) {
      return;
    }

    cycleVehicleStatus(button.dataset.vehicleId);
  });
}

function primeDefaultDates() {
  const tomorrow = shiftDate(1);
  const twoDays = shiftDate(2);
  elements.orderForm.querySelector('[name="shipDate"]').value = tomorrow;
  elements.shipmentForm.querySelector('[name="eta"]').value = twoDays;
}

function handleOrderSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const order = {
    id: buildId("ORD", state.orders.length + 1001),
    customer: form.get("customer").trim(),
    origin: form.get("origin").trim(),
    destination: form.get("destination").trim(),
    priority: form.get("priority"),
    value: Number(form.get("value")),
    shipDate: form.get("shipDate"),
    status: "Awaiting Dispatch",
  };

  state.orders.unshift(order);
  logActivity(
    `Order ${order.id} created for ${order.customer} to ${order.destination}.`,
    order.priority
  );
  event.currentTarget.reset();
  elements.orderForm.querySelector('[name="shipDate"]').value = shiftDate(1);
  renderApp();
}

function handleShipmentSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const order = findById(state.orders, form.get("orderId"));
  const vehicle = findById(state.vehicles, form.get("vehicleId"));
  const warehouse = findById(state.warehouses, form.get("warehouseId"));

  const shipment = {
    id: form.get("reference").trim(),
    reference: form.get("reference").trim(),
    orderId: form.get("orderId"),
    vehicleId: form.get("vehicleId"),
    warehouseId: form.get("warehouseId"),
    eta: form.get("eta"),
    status: form.get("status"),
  };

  state.shipments.unshift(shipment);

  if (order) {
    order.status = mapShipmentToOrderStatus(shipment.status);
  }

  if (vehicle && shipment.status !== "Delivered") {
    vehicle.status = "Assigned";
  }

  if (warehouse) {
    warehouse.utilization = Math.min(
      warehouse.capacity,
      warehouse.utilization + Math.max(15, Math.round((order?.value || 5000) / 1000))
    );
  }

  logActivity(
    `Shipment ${shipment.reference} dispatched from ${warehouse?.name || "warehouse"} using ${vehicle?.name || "vehicle"}.`,
    shipment.status
  );
  event.currentTarget.reset();
  elements.shipmentForm.querySelector('[name="eta"]').value = shiftDate(2);
  renderApp();
}

function handleVehicleSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const vehicle = {
    id: buildId("FLT", state.vehicles.length + 301),
    name: form.get("name").trim(),
    type: form.get("type"),
    capacity: Number(form.get("capacity")),
    status: form.get("status"),
  };

  state.vehicles.unshift(vehicle);
  logActivity(`Vehicle ${vehicle.name} was added to the fleet roster.`, vehicle.status);
  event.currentTarget.reset();
  renderApp();
}

function handleWarehouseSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const warehouse = {
    id: buildId("WH", state.warehouses.length + 1),
    name: form.get("name").trim(),
    location: form.get("location").trim(),
    capacity: Number(form.get("capacity")),
    utilization: Number(form.get("utilization")),
  };

  warehouse.utilization = Math.min(warehouse.capacity, warehouse.utilization);
  state.warehouses.unshift(warehouse);
  logActivity(
    `Warehouse ${warehouse.name} added in ${warehouse.location}.`,
    warehouse.utilization / warehouse.capacity > 0.8 ? "High" : "Available"
  );
  event.currentTarget.reset();
  renderApp();
}

function renderKpis() {
  const inTransit = state.shipments.filter((item) => item.status === "In Transit").length;
  const readyOrders = state.orders.filter((item) =>
    ["Ready to Ship", "Awaiting Dispatch", "Scheduled"].includes(item.status)
  ).length;
  const delayed = state.shipments.filter((item) => item.status === "Delayed").length;
  const availableFleet = state.vehicles.filter((item) => item.status === "Available").length;
  const averageUtilization = state.warehouses.length
    ? Math.round(
        (state.warehouses.reduce((sum, item) => sum + item.utilization / item.capacity, 0) /
          state.warehouses.length) *
          100
      )
    : 0;

  const cards = [
    {
      label: "Orders in queue",
      value: readyOrders,
      note: `${state.orders.length} total managed orders`,
    },
    {
      label: "Shipments in transit",
      value: inTransit,
      note: `${delayed} exception shipment${delayed === 1 ? "" : "s"}`,
    },
    {
      label: "Fleet available",
      value: availableFleet,
      note: `${state.vehicles.length} active fleet assets`,
    },
    {
      label: "Warehouse utilization",
      value: `${averageUtilization}%`,
      note: `${state.warehouses.length} sites in network`,
    },
  ];

  elements.kpiGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="kpi-card">
          <span>${card.label}</span>
          <strong>${card.value}</strong>
          <small>${card.note}</small>
        </article>
      `
    )
    .join("");
}

function renderAlerts() {
  const atRiskWarehouses = state.warehouses
    .filter((warehouse) => warehouse.utilization / warehouse.capacity > 0.8)
    .map(
      (warehouse) => `
        <div class="item">
          <div class="item-header">
            <h4 class="item-title">${warehouse.name}</h4>
            <span class="badge critical">Capacity risk</span>
          </div>
          <p class="item-subtitle">${warehouse.location}</p>
          <p class="item-meta">${warehouse.utilization}/${warehouse.capacity} units occupied</p>
        </div>
      `
    );

  const delayedShipments = state.shipments
    .filter((shipment) => shipment.status === "Delayed")
    .map((shipment) => {
      const order = findById(state.orders, shipment.orderId);
      return `
        <div class="item">
          <div class="item-header">
            <h4 class="item-title">${shipment.reference}</h4>
            <span class="badge delayed">Delayed</span>
          </div>
          <p class="item-subtitle">${order?.customer || "Unknown customer"}</p>
          <p class="item-meta">${order?.origin || "-"} to ${order?.destination || "-"}</p>
        </div>
      `;
    });

  const alertItems = [...delayedShipments, ...atRiskWarehouses];
  elements.alertsList.innerHTML =
    alertItems.join("") || '<div class="empty-state">No active exceptions right now.</div>';
}

function renderEtaBoard() {
  const etaItems = [...state.shipments]
    .sort((left, right) => left.eta.localeCompare(right.eta))
    .slice(0, 5)
    .map((shipment) => {
      const order = findById(state.orders, shipment.orderId);
      const vehicle = findById(state.vehicles, shipment.vehicleId);
      return `
        <div class="item">
          <div class="item-header">
            <h4 class="item-title">${shipment.reference}</h4>
            <span class="badge ${toSlug(shipment.status)}">${shipment.status}</span>
          </div>
          <p class="item-subtitle">${order?.destination || "Destination pending"}</p>
          <div class="item-meta">
            <span>ETA ${formatDate(shipment.eta)}</span>
            <span>${vehicle?.name || "Vehicle pending"}</span>
          </div>
        </div>
      `;
    });

  elements.etaBoard.innerHTML =
    etaItems.join("") || '<div class="empty-state">Create a shipment to populate ETAs.</div>';
}

function renderOrders() {
  elements.orderCount.textContent = `${state.orders.length} orders`;
  elements.ordersList.innerHTML =
    state.orders
      .map(
        (order) => `
          <div class="item">
            <div class="item-header">
              <div>
                <h4 class="item-title">${order.id} - ${order.customer}</h4>
                <p class="item-subtitle">${order.origin} to ${order.destination}</p>
              </div>
              <div class="item-actions">
                <span class="badge ${toSlug(order.priority)}">${order.priority}</span>
                <span class="pill">${formatCurrency(order.value)}</span>
              </div>
            </div>
            <div class="item-meta">
              <span>Requested ship date: ${formatDate(order.shipDate)}</span>
              <span>Status: ${order.status}</span>
            </div>
            <div class="item-actions">
              <button class="action-button" data-order-id="${order.id}">
                Advance order status
              </button>
            </div>
          </div>
        `
      )
      .join("") || '<div class="empty-state">No orders have been entered yet.</div>';
}

function renderShipmentSelectors() {
  const orderOptions = state.orders
    .map(
      (order) =>
        `<option value="${order.id}">${order.id} - ${order.customer} (${order.destination})</option>`
    )
    .join("");
  const vehicleOptions = state.vehicles
    .filter((vehicle) => vehicle.status !== "Maintenance")
    .map(
      (vehicle) =>
        `<option value="${vehicle.id}">${vehicle.name} - ${vehicle.type} (${vehicle.status})</option>`
    )
    .join("");
  const warehouseOptions = state.warehouses
    .map(
      (warehouse) =>
        `<option value="${warehouse.id}">${warehouse.name} - ${warehouse.location}</option>`
    )
    .join("");

  elements.shipmentOrderId.innerHTML =
    orderOptions || '<option value="">Create an order first</option>';
  elements.shipmentVehicleId.innerHTML =
    vehicleOptions || '<option value="">Create an available vehicle first</option>';
  elements.shipmentWarehouseId.innerHTML =
    warehouseOptions || '<option value="">Create a warehouse first</option>';
}

function renderShipments() {
  const statusFilter = elements.shipmentStatusFilter.value;
  const searchValue = elements.shipmentSearch.value.trim().toLowerCase();

  const shipments = state.shipments.filter((shipment) => {
    const order = findById(state.orders, shipment.orderId);
    const haystack = [
      shipment.reference,
      shipment.status,
      order?.customer || "",
      order?.destination || "",
      order?.origin || "",
    ]
      .join(" ")
      .toLowerCase();
    const matchesFilter = statusFilter === "All" || shipment.status === statusFilter;
    const matchesSearch = !searchValue || haystack.includes(searchValue);
    return matchesFilter && matchesSearch;
  });

  elements.shipmentsList.innerHTML =
    shipments
      .map((shipment) => {
        const order = findById(state.orders, shipment.orderId);
        const vehicle = findById(state.vehicles, shipment.vehicleId);
        const warehouse = findById(state.warehouses, shipment.warehouseId);
        return `
          <div class="item">
            <div class="item-header">
              <div>
                <h4 class="item-title">${shipment.reference}</h4>
                <p class="item-subtitle">${order?.customer || "Unknown customer"}</p>
              </div>
              <span class="badge ${toSlug(shipment.status)}">${shipment.status}</span>
            </div>
            <div class="item-meta">
              <span>${order?.origin || "-"} to ${order?.destination || "-"}</span>
              <span>ETA ${formatDate(shipment.eta)}</span>
              <span>${vehicle?.name || "Vehicle pending"}</span>
              <span>${warehouse?.name || "Warehouse pending"}</span>
            </div>
            <div class="item-actions">
              <button
                class="action-button"
                data-action="advance"
                data-shipment-id="${shipment.id}"
              >
                Advance shipment
              </button>
              <button
                class="action-button"
                data-action="delay"
                data-shipment-id="${shipment.id}"
              >
                Flag delayed
              </button>
            </div>
          </div>
        `;
      })
      .join("") || '<div class="empty-state">No shipments match the current filters.</div>';
}

function renderFleet() {
  elements.vehicleCount.textContent = `${state.vehicles.length} vehicles`;
  elements.fleetList.innerHTML =
    state.vehicles
      .map(
        (vehicle) => `
          <div class="item">
            <div class="item-header">
              <div>
                <h4 class="item-title">${vehicle.name}</h4>
                <p class="item-subtitle">${vehicle.id} - ${vehicle.type}</p>
              </div>
              <span class="badge ${toSlug(vehicle.status)}">${vehicle.status}</span>
            </div>
            <div class="item-meta">
              <span>${vehicle.capacity} pallet capacity</span>
            </div>
            <div class="item-actions">
              <button class="action-button" data-vehicle-id="${vehicle.id}">
                Cycle status
              </button>
            </div>
          </div>
        `
      )
      .join("") || '<div class="empty-state">No vehicles in the fleet.</div>';
}

function renderWarehouses() {
  elements.warehouseCount.textContent = `${state.warehouses.length} facilities`;
  elements.warehousesList.innerHTML =
    state.warehouses
      .map((warehouse) => {
        const utilizationPercent = Math.round((warehouse.utilization / warehouse.capacity) * 100);
        return `
          <div class="item">
            <div class="item-header">
              <div>
                <h4 class="item-title">${warehouse.name}</h4>
                <p class="item-subtitle">${warehouse.location}</p>
              </div>
              <span class="badge ${
                utilizationPercent > 80 ? "critical" : "available"
              }">${utilizationPercent}% used</span>
            </div>
            <div class="item-meta">
              <span>${warehouse.utilization}/${warehouse.capacity} units</span>
            </div>
            <div class="progress-track">
              <div class="progress-bar" style="width: ${utilizationPercent}%"></div>
            </div>
          </div>
        `;
      })
      .join("") || '<div class="empty-state">No warehouses have been created yet.</div>';
}

function renderActivity() {
  elements.activityFeed.innerHTML =
    state.activity
      .map(
        (item) => `
          <div class="item">
            <div class="item-header">
              <p class="item-title">${item.message}</p>
              <span class="badge ${toSlug(item.tone)}">${item.tone}</span>
            </div>
            <div class="item-meta">
              <span>${item.time}</span>
            </div>
          </div>
        `
      )
      .join("") || '<div class="empty-state">Activity will appear here.</div>';
}

function advanceOrderStatus(orderId) {
  const order = findById(state.orders, orderId);
  if (!order) {
    return;
  }

  const sequence = ["Awaiting Dispatch", "Ready to Ship", "Scheduled", "Delivered"];
  const currentIndex = sequence.indexOf(order.status);
  order.status = sequence[(currentIndex + 1) % sequence.length];
  logActivity(`Order ${order.id} moved to ${order.status}.`, order.priority);
  renderApp();
}

function advanceShipmentStatus(shipmentId) {
  const shipment = findById(state.shipments, shipmentId);
  if (!shipment) {
    return;
  }

  const sequence = ["Scheduled", "In Transit", "Delivered"];
  const currentIndex = sequence.indexOf(shipment.status);
  shipment.status = sequence[currentIndex + 1] || "Delivered";

  const linkedOrder = findById(state.orders, shipment.orderId);
  const linkedVehicle = findById(state.vehicles, shipment.vehicleId);
  if (linkedOrder) {
    linkedOrder.status = mapShipmentToOrderStatus(shipment.status);
  }

  if (linkedVehicle && shipment.status === "Delivered") {
    linkedVehicle.status = "Available";
  }

  logActivity(`Shipment ${shipment.reference} advanced to ${shipment.status}.`, shipment.status);
  renderApp();
}

function setShipmentDelayed(shipmentId) {
  const shipment = findById(state.shipments, shipmentId);
  if (!shipment) {
    return;
  }

  shipment.status = "Delayed";
  const linkedOrder = findById(state.orders, shipment.orderId);
  if (linkedOrder) {
    linkedOrder.status = "Exception";
  }
  logActivity(`Shipment ${shipment.reference} has been flagged as delayed.`, "Delayed");
  renderApp();
}

function cycleVehicleStatus(vehicleId) {
  const vehicle = findById(state.vehicles, vehicleId);
  if (!vehicle) {
    return;
  }

  const sequence = ["Available", "Assigned", "Maintenance"];
  const currentIndex = sequence.indexOf(vehicle.status);
  vehicle.status = sequence[(currentIndex + 1) % sequence.length];
  logActivity(`Vehicle ${vehicle.name} status changed to ${vehicle.status}.`, vehicle.status);
  renderApp();
}

function resetData() {
  Object.assign(state, cloneState(seedState));
  logActivity("Demo data was reset to the original operational baseline.", "Scheduled");
  renderApp();
}

function logActivity(message, tone) {
  state.activity.unshift({
    id: uniqueId(),
    message,
    time: currentTimestamp(),
    tone,
  });
  state.activity = state.activity.slice(0, 12);
}

function cloneState(source) {
  return JSON.parse(JSON.stringify(source));
}

function findById(collection, id) {
  return collection.find((item) => item.id === id);
}

function buildId(prefix, sequence) {
  return `${prefix}-${String(sequence).padStart(4, "0")}`;
}

function uniqueId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toSlug(value) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function shiftDate(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function currentTimestamp() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function mapShipmentToOrderStatus(status) {
  const statusMap = {
    Scheduled: "Scheduled",
    "In Transit": "On the Move",
    Delayed: "Exception",
    Delivered: "Delivered",
  };
  return statusMap[status] || "Awaiting Dispatch";
}
