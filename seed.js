const db = require('./db');

function isEmpty() {
  return db.prepare(`SELECT COUNT(*) AS c FROM customers`).get().c === 0
    && db.prepare(`SELECT COUNT(*) AS c FROM shipments`).get().c === 0;
}

if (!isEmpty() && process.argv[2] !== '--force') {
  console.log('Database already has data. Pass --force to reseed (will append).');
  process.exit(0);
}

const insertCustomer = db.prepare(`
  INSERT INTO customers (name, email, phone, address, city, country)
  VALUES (?, ?, ?, ?, ?, ?)`);
const insertWarehouse = db.prepare(`
  INSERT INTO warehouses (name, code, address, city, country, capacity_m3)
  VALUES (?, ?, ?, ?, ?, ?)`);
const insertDriver = db.prepare(`
  INSERT INTO drivers (name, license_no, phone, email, status)
  VALUES (?, ?, ?, ?, ?)`);
const insertVehicle = db.prepare(`
  INSERT INTO vehicles (plate_no, type, capacity_kg, status)
  VALUES (?, ?, ?, ?)`);
const insertShipment = db.prepare(`
  INSERT INTO shipments (tracking_no, customer_id, origin, destination, weight_kg, volume_m3,
    status, driver_id, vehicle_id, warehouse_id, cost, notes, scheduled_at, delivered_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
const insertEvent = db.prepare(`
  INSERT INTO tracking_events (shipment_id, status, location, note, occurred_at)
  VALUES (?, ?, ?, ?, ?)`);

const tx = db.transaction(() => {
  const customers = [
    ['Acme Corp',          'orders@acme.com',     '+1-202-555-0142', '101 Main St',       'New York',     'USA'],
    ['Globex Industries',  'logistics@globex.io', '+44-20-7946-1122','25 Baker Street',   'London',       'UK'],
    ['Initech LLC',        'shipping@initech.co', '+1-415-555-0188', '500 Market St',     'San Francisco','USA'],
    ['Umbrella SA',        'hello@umbrella.es',   '+34-91-555-7733', 'Calle Mayor 12',    'Madrid',       'Spain'],
    ['Stark Logistics',    'tony@stark.com',      '+1-310-555-0177', '10880 Malibu Pt',   'Malibu',       'USA'],
  ].map(c => insertCustomer.run(...c).lastInsertRowid);

  const warehouses = [
    ['NYC Hub',     'WH-NYC', '12 Industrial Blvd', 'New York',     'USA',    5000],
    ['LDN Depot',   'WH-LDN', '8 Dockside Rd',      'London',       'UK',    3500],
    ['SF Centre',   'WH-SFO', '900 Bayshore',       'San Francisco','USA',   4200],
  ].map(w => insertWarehouse.run(...w).lastInsertRowid);

  const drivers = [
    ['Alex Johnson',   'DL-9921', '+1-202-555-0001', 'alex.j@lms.io',     'available'],
    ['Maria Garcia',   'DL-1182', '+34-91-555-0002', 'maria.g@lms.io',    'on_delivery'],
    ['David Chen',     'DL-7710', '+1-415-555-0003', 'david.c@lms.io',    'available'],
    ['Olivia Brown',   'DL-3322', '+44-20-7946-0004','olivia.b@lms.io',   'off_duty'],
  ].map(d => insertDriver.run(...d).lastInsertRowid);

  const vehicles = [
    ['TRK-1001', 'truck',      8000, 'in_use'],
    ['VAN-2087', 'van',        1500, 'available'],
    ['TRK-3344', 'truck',     10000, 'available'],
    ['MTR-9911', 'motorcycle',  150, 'maintenance'],
  ].map(v => insertVehicle.run(...v).lastInsertRowid);

  const now = () => new Date().toISOString();
  const minusDays = (d) => new Date(Date.now() - d * 86400000).toISOString();

  const trackingPrefix = 'LMS-DEMO-';
  let counter = 1000;
  const nextTrack = () => `${trackingPrefix}${(counter++).toString(36).toUpperCase()}`;

  const shipments = [
    {
      tracking: nextTrack(),
      customer: customers[0], origin: 'New York, USA', destination: 'Boston, USA',
      weight: 250.5, volume: 1.8, status: 'delivered',
      driver: drivers[0], vehicle: vehicles[0], warehouse: warehouses[0],
      cost: 480.00, notes: 'Two pallets, fragile.',
      scheduled: minusDays(3), delivered: minusDays(2),
      events: [
        ['pending',          'New York, USA', 'Shipment created',     minusDays(4)],
        ['picked_up',        'New York, USA', 'Picked up at warehouse', minusDays(3)],
        ['in_transit',       'New Haven, CT', 'En route',              minusDays(3)],
        ['out_for_delivery', 'Boston, USA',   'Out for delivery',      minusDays(2)],
        ['delivered',        'Boston, USA',   'Signed by recipient',   minusDays(2)],
      ],
    },
    {
      tracking: nextTrack(),
      customer: customers[1], origin: 'London, UK', destination: 'Paris, France',
      weight: 80.0, volume: 0.5, status: 'in_transit',
      driver: drivers[1], vehicle: vehicles[1], warehouse: warehouses[1],
      cost: 320.00, notes: 'Cross-channel express.',
      scheduled: minusDays(1), delivered: null,
      events: [
        ['pending',    'London, UK',  'Shipment created',  minusDays(2)],
        ['picked_up',  'London, UK',  'Collected',         minusDays(1)],
        ['in_transit', 'Folkestone',  'Eurotunnel transit', minusDays(1)],
      ],
    },
    {
      tracking: nextTrack(),
      customer: customers[2], origin: 'San Francisco, USA', destination: 'Seattle, USA',
      weight: 540.0, volume: 3.2, status: 'out_for_delivery',
      driver: drivers[2], vehicle: vehicles[2], warehouse: warehouses[2],
      cost: 620.00, notes: 'Server racks - handle with care.',
      scheduled: minusDays(2), delivered: null,
      events: [
        ['pending',          'San Francisco, USA', 'Created',          minusDays(3)],
        ['picked_up',        'San Francisco, USA', 'Loaded onto TRK-3344', minusDays(2)],
        ['in_transit',       'Portland, OR',       'Midway checkpoint', minusDays(1)],
        ['out_for_delivery', 'Seattle, USA',       'Final mile',        now()],
      ],
    },
    {
      tracking: nextTrack(),
      customer: customers[3], origin: 'Madrid, Spain', destination: 'Barcelona, Spain',
      weight: 120.0, volume: 0.9, status: 'pending',
      driver: null, vehicle: null, warehouse: null,
      cost: 180.00, notes: 'Awaiting carrier assignment.',
      scheduled: null, delivered: null,
      events: [['pending', 'Madrid, Spain', 'Shipment created', now()]],
    },
    {
      tracking: nextTrack(),
      customer: customers[4], origin: 'Malibu, USA', destination: 'Las Vegas, USA',
      weight: 30.0, volume: 0.2, status: 'cancelled',
      driver: null, vehicle: null, warehouse: warehouses[2],
      cost: 0, notes: 'Customer cancelled order.',
      scheduled: null, delivered: null,
      events: [
        ['pending',   'Malibu, USA', 'Created',                minusDays(5)],
        ['cancelled', 'Malibu, USA', 'Cancelled by customer',  minusDays(4)],
      ],
    },
  ];

  for (const s of shipments) {
    const sid = insertShipment.run(
      s.tracking, s.customer, s.origin, s.destination, s.weight, s.volume,
      s.status, s.driver, s.vehicle, s.warehouse, s.cost, s.notes,
      s.scheduled, s.delivered
    ).lastInsertRowid;
    for (const [st, loc, note, when] of s.events) {
      insertEvent.run(sid, st, loc, note, when);
    }
  }
});

tx();
console.log('Seed data inserted successfully.');
