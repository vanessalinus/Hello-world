const Database = require('better-sqlite3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_PATH = path.join(__dirname, 'logistics.db');
const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

function initializeSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      address TEXT,
      city TEXT,
      country TEXT,
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS warehouses (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT,
      city TEXT,
      country TEXT,
      capacity INTEGER DEFAULT 1000,
      current_stock INTEGER DEFAULT 0,
      manager TEXT,
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS inventory (
      id TEXT PRIMARY KEY,
      sku TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      category TEXT,
      description TEXT,
      quantity INTEGER DEFAULT 0,
      unit TEXT DEFAULT 'units',
      unit_price REAL DEFAULT 0,
      warehouse_id TEXT,
      min_stock_level INTEGER DEFAULT 10,
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
    );

    CREATE TABLE IF NOT EXISTS drivers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT NOT NULL,
      license_number TEXT UNIQUE NOT NULL,
      license_expiry TEXT,
      vehicle_type TEXT,
      vehicle_plate TEXT,
      status TEXT DEFAULT 'available',
      rating REAL DEFAULT 5.0,
      trips_completed INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      customer_id TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      priority TEXT DEFAULT 'normal',
      origin TEXT,
      destination TEXT,
      total_weight REAL DEFAULT 0,
      total_volume REAL DEFAULT 0,
      estimated_value REAL DEFAULT 0,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL,
      inventory_id TEXT,
      item_name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price REAL DEFAULT 0,
      weight REAL DEFAULT 0,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (inventory_id) REFERENCES inventory(id)
    );

    CREATE TABLE IF NOT EXISTS shipments (
      id TEXT PRIMARY KEY,
      tracking_number TEXT UNIQUE NOT NULL,
      order_id TEXT,
      driver_id TEXT,
      warehouse_id TEXT,
      status TEXT DEFAULT 'pending',
      origin TEXT NOT NULL,
      destination TEXT NOT NULL,
      estimated_delivery TEXT,
      actual_delivery TEXT,
      weight REAL DEFAULT 0,
      distance REAL DEFAULT 0,
      cost REAL DEFAULT 0,
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (driver_id) REFERENCES drivers(id),
      FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
    );

    CREATE TABLE IF NOT EXISTS shipment_events (
      id TEXT PRIMARY KEY,
      shipment_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      location TEXT,
      description TEXT,
      timestamp TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (shipment_id) REFERENCES shipments(id)
    );

    CREATE TABLE IF NOT EXISTS routes (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      origin TEXT NOT NULL,
      destination TEXT NOT NULL,
      distance REAL DEFAULT 0,
      estimated_duration INTEGER DEFAULT 0,
      driver_id TEXT,
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (driver_id) REFERENCES drivers(id)
    );
  `);
}

function seedData() {
  const existingCustomers = db.prepare('SELECT COUNT(*) as count FROM customers').get();
  if (existingCustomers.count > 0) return;

  const insertCustomer = db.prepare(`
    INSERT INTO customers (id, name, email, phone, address, city, country, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const customers = [
    [uuidv4(), 'Acme Corporation', 'orders@acme.com', '+1-555-0101', '123 Business Ave', 'New York', 'USA', 'active'],
    [uuidv4(), 'Global Trade Ltd', 'logistics@globaltrade.com', '+1-555-0102', '456 Commerce St', 'Los Angeles', 'USA', 'active'],
    [uuidv4(), 'Pacific Imports', 'contact@pacificimports.com', '+1-555-0103', '789 Harbor Blvd', 'San Francisco', 'USA', 'active'],
    [uuidv4(), 'Euro Exports GmbH', 'shipping@euroexports.de', '+49-30-12345', 'Hauptstraße 10', 'Berlin', 'Germany', 'active'],
    [uuidv4(), 'Asian Markets Co', 'info@asianmarkets.sg', '+65-6123-4567', '10 Orchard Road', 'Singapore', 'Singapore', 'active'],
    [uuidv4(), 'South Trade Inc', 'ops@southtrade.com', '+1-555-0106', '321 Meridian Way', 'Miami', 'USA', 'active'],
  ];
  customers.forEach(c => insertCustomer.run(...c));

  const insertWarehouse = db.prepare(`
    INSERT INTO warehouses (id, name, address, city, country, capacity, current_stock, manager, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const warehouseData = [
    [uuidv4(), 'NYC Central Hub', '100 Warehouse Dr', 'New York', 'USA', 5000, 3200, 'John Smith', 'active'],
    [uuidv4(), 'LA Distribution Center', '200 Logistics Blvd', 'Los Angeles', 'USA', 8000, 5100, 'Maria Garcia', 'active'],
    [uuidv4(), 'Chicago Midwest Hub', '300 Industrial Park', 'Chicago', 'USA', 6000, 2800, 'Robert Johnson', 'active'],
    [uuidv4(), 'Miami Port Facility', '50 Port Ave', 'Miami', 'USA', 4000, 1900, 'Ana Rodriguez', 'active'],
  ];
  warehouseData.forEach(w => insertWarehouse.run(...w));

  const warehouses = db.prepare('SELECT id FROM warehouses').all();

  const insertInventory = db.prepare(`
    INSERT INTO inventory (id, sku, name, category, description, quantity, unit, unit_price, warehouse_id, min_stock_level)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const inventoryItems = [
    [uuidv4(), 'ELEC-001', 'Laptop Computer', 'Electronics', 'High-performance laptops', 150, 'units', 899.99, warehouses[0].id, 20],
    [uuidv4(), 'ELEC-002', 'Smartphone', 'Electronics', 'Latest model smartphones', 300, 'units', 699.99, warehouses[0].id, 50],
    [uuidv4(), 'FURN-001', 'Office Chair', 'Furniture', 'Ergonomic office chairs', 75, 'units', 249.99, warehouses[1].id, 15],
    [uuidv4(), 'FURN-002', 'Standing Desk', 'Furniture', 'Height-adjustable desks', 40, 'units', 599.99, warehouses[1].id, 10],
    [uuidv4(), 'CLTH-001', 'Cotton T-Shirts', 'Clothing', 'Premium cotton tees', 500, 'units', 24.99, warehouses[2].id, 100],
    [uuidv4(), 'CLTH-002', 'Denim Jeans', 'Clothing', 'Classic denim jeans', 200, 'units', 49.99, warehouses[2].id, 50],
    [uuidv4(), 'FOOD-001', 'Canned Goods', 'Food', 'Assorted canned goods', 1000, 'cases', 12.99, warehouses[3].id, 200],
    [uuidv4(), 'MACH-001', 'Power Tools Set', 'Machinery', 'Professional power tools', 60, 'sets', 349.99, warehouses[0].id, 10],
    [uuidv4(), 'PHARM-001', 'Medical Supplies', 'Pharmaceuticals', 'General medical supplies', 8, 'boxes', 89.99, warehouses[3].id, 20],
    [uuidv4(), 'AUTO-001', 'Car Parts Kit', 'Automotive', 'Standard maintenance kit', 120, 'kits', 129.99, warehouses[2].id, 25],
  ];
  inventoryItems.forEach(i => insertInventory.run(...i));

  const insertDriver = db.prepare(`
    INSERT INTO drivers (id, name, email, phone, license_number, license_expiry, vehicle_type, vehicle_plate, status, rating, trips_completed)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const driversData = [
    [uuidv4(), 'Mike Thompson', 'mike.t@logistics.com', '+1-555-1001', 'CDL-NY-12345', '2027-06-30', 'Semi Truck', 'NY-TRK-001', 'available', 4.8, 234],
    [uuidv4(), 'Sarah Wilson', 'sarah.w@logistics.com', '+1-555-1002', 'CDL-CA-67890', '2026-11-15', 'Box Truck', 'CA-BOX-002', 'on_route', 4.9, 187],
    [uuidv4(), 'Carlos Mendez', 'carlos.m@logistics.com', '+1-555-1003', 'CDL-TX-11111', '2027-03-20', 'Refrigerated Truck', 'TX-REF-003', 'available', 4.7, 312],
    [uuidv4(), 'Emily Chen', 'emily.c@logistics.com', '+1-555-1004', 'CDL-FL-22222', '2026-08-10', 'Flatbed Truck', 'FL-FLT-004', 'off_duty', 4.6, 156],
    [uuidv4(), 'James Brown', 'james.b@logistics.com', '+1-555-1005', 'CDL-IL-33333', '2027-01-25', 'Cargo Van', 'IL-VAN-005', 'available', 4.5, 98],
    [uuidv4(), 'Lisa Anderson', 'lisa.a@logistics.com', '+1-555-1006', 'CDL-NY-44444', '2026-12-31', 'Semi Truck', 'NY-TRK-006', 'on_route', 4.9, 421],
  ];
  driversData.forEach(d => insertDriver.run(...d));

  const allCustomers = db.prepare('SELECT id FROM customers').all();
  const insertOrder = db.prepare(`
    INSERT INTO orders (id, order_number, customer_id, status, priority, origin, destination, total_weight, estimated_value, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now', ? || ' days'))
  `);
  const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  const priorities = ['low', 'normal', 'high', 'urgent'];
  const origins = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Miami, FL'];
  const destinations = ['Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'Seattle, WA', 'Denver, CO'];
  const orderIds = [];
  for (let i = 0; i < 20; i++) {
    const id = uuidv4();
    orderIds.push(id);
    const orderNum = `ORD-${String(10000 + i).padStart(5, '0')}`;
    insertOrder.run(
      id, orderNum,
      allCustomers[i % allCustomers.length].id,
      statuses[i % statuses.length],
      priorities[i % priorities.length],
      origins[i % origins.length],
      destinations[i % destinations.length],
      Math.round(Math.random() * 1000 + 50),
      Math.round(Math.random() * 10000 + 500),
      String(-(i * 2))
    );
  }

  const allDrivers = db.prepare('SELECT id FROM drivers').all();
  const insertShipment = db.prepare(`
    INSERT INTO shipments (id, tracking_number, order_id, driver_id, warehouse_id, status, origin, destination, estimated_delivery, weight, distance, cost, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, date('now', ? || ' days'), ?, ?, ?, datetime('now', ? || ' days'))
  `);
  const shipmentStatuses = ['pending', 'in_transit', 'out_for_delivery', 'delivered', 'failed'];
  for (let i = 0; i < 15; i++) {
    const shipId = uuidv4();
    const trackNum = `TRK-${String(20000 + i).padStart(6, '0')}`;
    const estDelivery = i - 1;
    const weight = Math.round(Math.random() * 800 + 50);
    const distance = Math.round(Math.random() * 2000 + 100);
    const cost = Math.round(distance * 0.5 + weight * 0.1);
    insertShipment.run(
      shipId, trackNum,
      orderIds[i % orderIds.length],
      allDrivers[i % allDrivers.length].id,
      warehouses[i % warehouses.length].id,
      shipmentStatuses[i % shipmentStatuses.length],
      origins[i % origins.length],
      destinations[i % destinations.length],
      estDelivery,
      weight, distance, cost,
      String(-(i * 3))
    );

    const insertEvent = db.prepare(`
      INSERT INTO shipment_events (id, shipment_id, event_type, location, description, timestamp)
      VALUES (?, ?, ?, ?, ?, datetime('now', ? || ' days'))
    `);
    insertEvent.run(uuidv4(), shipId, 'created', origins[i % origins.length], 'Shipment created and ready for pickup', String(-(i * 3)));
    if (i % shipmentStatuses.length >= 1) {
      insertEvent.run(uuidv4(), shipId, 'picked_up', origins[i % origins.length], 'Package picked up by driver', String(-(i * 3) + 1));
    }
    if (i % shipmentStatuses.length >= 2) {
      insertEvent.run(uuidv4(), shipId, 'in_transit', 'En Route', 'Package in transit to destination', String(-(i * 3) + 2));
    }
  }
}

initializeSchema();
seedData();

module.exports = db;
