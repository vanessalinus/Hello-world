const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

/* ----------------------------- helpers ----------------------------- */

const VALID_SHIPMENT_STATUSES = [
  'pending',
  'picked_up',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'cancelled',
  'returned',
];

const VALID_DRIVER_STATUSES = ['available', 'on_delivery', 'off_duty'];
const VALID_VEHICLE_STATUSES = ['available', 'in_use', 'maintenance'];

function generateTrackingNo() {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LMS-${ts}-${rand}`;
}

function wrap(fn) {
  return (req, res, next) => {
    try {
      return fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

function pick(obj, keys) {
  const out = {};
  for (const k of keys) {
    if (obj[k] !== undefined) out[k] = obj[k];
  }
  return out;
}

function buildUpdate(table, id, fields, allowed) {
  const data = pick(fields, allowed);
  const keys = Object.keys(data);
  if (keys.length === 0) return { changes: 0 };
  const setSql = keys.map(k => `${k} = @${k}`).join(', ');
  const stmt = db.prepare(
    `UPDATE ${table} SET ${setSql}${
      allowed.includes('updated_at') ? '' : ''
    } WHERE id = @id`
  );
  return stmt.run({ ...data, id });
}

/* ----------------------------- customers ---------------------------- */

const customerFields = ['name', 'email', 'phone', 'address', 'city', 'country'];

app.get('/api/customers', wrap((req, res) => {
  const rows = db.prepare(`SELECT * FROM customers ORDER BY id DESC`).all();
  res.json(rows);
}));

app.get('/api/customers/:id', wrap((req, res) => {
  const row = db.prepare(`SELECT * FROM customers WHERE id = ?`).get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Customer not found' });
  res.json(row);
}));

app.post('/api/customers', wrap((req, res) => {
  const data = pick(req.body, customerFields);
  if (!data.name) return res.status(400).json({ error: 'name is required' });
  const info = db.prepare(`
    INSERT INTO customers (name, email, phone, address, city, country)
    VALUES (@name, @email, @phone, @address, @city, @country)
  `).run({
    name: data.name,
    email: data.email || null,
    phone: data.phone || null,
    address: data.address || null,
    city: data.city || null,
    country: data.country || null,
  });
  res.status(201).json(db.prepare(`SELECT * FROM customers WHERE id = ?`).get(info.lastInsertRowid));
}));

app.put('/api/customers/:id', wrap((req, res) => {
  const exists = db.prepare(`SELECT id FROM customers WHERE id = ?`).get(req.params.id);
  if (!exists) return res.status(404).json({ error: 'Customer not found' });
  buildUpdate('customers', req.params.id, req.body, customerFields);
  res.json(db.prepare(`SELECT * FROM customers WHERE id = ?`).get(req.params.id));
}));

app.delete('/api/customers/:id', wrap((req, res) => {
  const info = db.prepare(`DELETE FROM customers WHERE id = ?`).run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Customer not found' });
  res.json({ ok: true });
}));

/* ----------------------------- warehouses --------------------------- */

const warehouseFields = ['name', 'code', 'address', 'city', 'country', 'capacity_m3'];

app.get('/api/warehouses', wrap((req, res) => {
  res.json(db.prepare(`SELECT * FROM warehouses ORDER BY id DESC`).all());
}));

app.get('/api/warehouses/:id', wrap((req, res) => {
  const row = db.prepare(`SELECT * FROM warehouses WHERE id = ?`).get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Warehouse not found' });
  res.json(row);
}));

app.post('/api/warehouses', wrap((req, res) => {
  const d = pick(req.body, warehouseFields);
  if (!d.name) return res.status(400).json({ error: 'name is required' });
  const info = db.prepare(`
    INSERT INTO warehouses (name, code, address, city, country, capacity_m3)
    VALUES (@name, @code, @address, @city, @country, @capacity_m3)
  `).run({
    name: d.name,
    code: d.code || null,
    address: d.address || null,
    city: d.city || null,
    country: d.country || null,
    capacity_m3: d.capacity_m3 ?? 0,
  });
  res.status(201).json(db.prepare(`SELECT * FROM warehouses WHERE id = ?`).get(info.lastInsertRowid));
}));

app.put('/api/warehouses/:id', wrap((req, res) => {
  const exists = db.prepare(`SELECT id FROM warehouses WHERE id = ?`).get(req.params.id);
  if (!exists) return res.status(404).json({ error: 'Warehouse not found' });
  buildUpdate('warehouses', req.params.id, req.body, warehouseFields);
  res.json(db.prepare(`SELECT * FROM warehouses WHERE id = ?`).get(req.params.id));
}));

app.delete('/api/warehouses/:id', wrap((req, res) => {
  const info = db.prepare(`DELETE FROM warehouses WHERE id = ?`).run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Warehouse not found' });
  res.json({ ok: true });
}));

/* ------------------------------ drivers ----------------------------- */

const driverFields = ['name', 'license_no', 'phone', 'email', 'status'];

app.get('/api/drivers', wrap((req, res) => {
  res.json(db.prepare(`SELECT * FROM drivers ORDER BY id DESC`).all());
}));

app.get('/api/drivers/:id', wrap((req, res) => {
  const row = db.prepare(`SELECT * FROM drivers WHERE id = ?`).get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Driver not found' });
  res.json(row);
}));

app.post('/api/drivers', wrap((req, res) => {
  const d = pick(req.body, driverFields);
  if (!d.name) return res.status(400).json({ error: 'name is required' });
  if (d.status && !VALID_DRIVER_STATUSES.includes(d.status))
    return res.status(400).json({ error: `status must be one of ${VALID_DRIVER_STATUSES.join(', ')}` });
  const info = db.prepare(`
    INSERT INTO drivers (name, license_no, phone, email, status)
    VALUES (@name, @license_no, @phone, @email, @status)
  `).run({
    name: d.name,
    license_no: d.license_no || null,
    phone: d.phone || null,
    email: d.email || null,
    status: d.status || 'available',
  });
  res.status(201).json(db.prepare(`SELECT * FROM drivers WHERE id = ?`).get(info.lastInsertRowid));
}));

app.put('/api/drivers/:id', wrap((req, res) => {
  const exists = db.prepare(`SELECT id FROM drivers WHERE id = ?`).get(req.params.id);
  if (!exists) return res.status(404).json({ error: 'Driver not found' });
  if (req.body.status && !VALID_DRIVER_STATUSES.includes(req.body.status))
    return res.status(400).json({ error: `status must be one of ${VALID_DRIVER_STATUSES.join(', ')}` });
  buildUpdate('drivers', req.params.id, req.body, driverFields);
  res.json(db.prepare(`SELECT * FROM drivers WHERE id = ?`).get(req.params.id));
}));

app.delete('/api/drivers/:id', wrap((req, res) => {
  const info = db.prepare(`DELETE FROM drivers WHERE id = ?`).run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Driver not found' });
  res.json({ ok: true });
}));

/* ------------------------------ vehicles ---------------------------- */

const vehicleFields = ['plate_no', 'type', 'capacity_kg', 'status'];

app.get('/api/vehicles', wrap((req, res) => {
  res.json(db.prepare(`SELECT * FROM vehicles ORDER BY id DESC`).all());
}));

app.get('/api/vehicles/:id', wrap((req, res) => {
  const row = db.prepare(`SELECT * FROM vehicles WHERE id = ?`).get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Vehicle not found' });
  res.json(row);
}));

app.post('/api/vehicles', wrap((req, res) => {
  const d = pick(req.body, vehicleFields);
  if (!d.plate_no) return res.status(400).json({ error: 'plate_no is required' });
  if (d.status && !VALID_VEHICLE_STATUSES.includes(d.status))
    return res.status(400).json({ error: `status must be one of ${VALID_VEHICLE_STATUSES.join(', ')}` });
  const info = db.prepare(`
    INSERT INTO vehicles (plate_no, type, capacity_kg, status)
    VALUES (@plate_no, @type, @capacity_kg, @status)
  `).run({
    plate_no: d.plate_no,
    type: d.type || 'truck',
    capacity_kg: d.capacity_kg ?? 0,
    status: d.status || 'available',
  });
  res.status(201).json(db.prepare(`SELECT * FROM vehicles WHERE id = ?`).get(info.lastInsertRowid));
}));

app.put('/api/vehicles/:id', wrap((req, res) => {
  const exists = db.prepare(`SELECT id FROM vehicles WHERE id = ?`).get(req.params.id);
  if (!exists) return res.status(404).json({ error: 'Vehicle not found' });
  if (req.body.status && !VALID_VEHICLE_STATUSES.includes(req.body.status))
    return res.status(400).json({ error: `status must be one of ${VALID_VEHICLE_STATUSES.join(', ')}` });
  buildUpdate('vehicles', req.params.id, req.body, vehicleFields);
  res.json(db.prepare(`SELECT * FROM vehicles WHERE id = ?`).get(req.params.id));
}));

app.delete('/api/vehicles/:id', wrap((req, res) => {
  const info = db.prepare(`DELETE FROM vehicles WHERE id = ?`).run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Vehicle not found' });
  res.json({ ok: true });
}));

/* ----------------------------- shipments ---------------------------- */

const shipmentFields = [
  'customer_id', 'origin', 'destination', 'weight_kg', 'volume_m3',
  'status', 'driver_id', 'vehicle_id', 'warehouse_id', 'cost', 'notes',
  'scheduled_at', 'delivered_at',
];

const shipmentJoinSql = `
  SELECT s.*,
         c.name AS customer_name,
         d.name AS driver_name,
         v.plate_no AS vehicle_plate,
         w.name AS warehouse_name
  FROM shipments s
  LEFT JOIN customers c ON c.id = s.customer_id
  LEFT JOIN drivers d ON d.id = s.driver_id
  LEFT JOIN vehicles v ON v.id = s.vehicle_id
  LEFT JOIN warehouses w ON w.id = s.warehouse_id
`;

app.get('/api/shipments', wrap((req, res) => {
  const { status, q } = req.query;
  const where = [];
  const params = {};
  if (status) { where.push('s.status = @status'); params.status = status; }
  if (q) {
    where.push(`(s.tracking_no LIKE @q OR s.origin LIKE @q OR s.destination LIKE @q OR c.name LIKE @q)`);
    params.q = `%${q}%`;
  }
  const sql =
    shipmentJoinSql +
    (where.length ? ` WHERE ${where.join(' AND ')}` : '') +
    ' ORDER BY s.id DESC';
  res.json(db.prepare(sql).all(params));
}));

app.get('/api/shipments/:id', wrap((req, res) => {
  const row = db.prepare(shipmentJoinSql + ' WHERE s.id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Shipment not found' });
  const events = db.prepare(
    `SELECT * FROM tracking_events WHERE shipment_id = ? ORDER BY occurred_at DESC, id DESC`
  ).all(req.params.id);
  res.json({ ...row, events });
}));

app.get('/api/track/:trackingNo', wrap((req, res) => {
  const row = db.prepare(shipmentJoinSql + ' WHERE s.tracking_no = ?').get(req.params.trackingNo);
  if (!row) return res.status(404).json({ error: 'Tracking number not found' });
  const events = db.prepare(
    `SELECT * FROM tracking_events WHERE shipment_id = ? ORDER BY occurred_at DESC, id DESC`
  ).all(row.id);
  res.json({ ...row, events });
}));

app.post('/api/shipments', wrap((req, res) => {
  const d = pick(req.body, shipmentFields);
  if (!d.origin || !d.destination)
    return res.status(400).json({ error: 'origin and destination are required' });
  if (d.status && !VALID_SHIPMENT_STATUSES.includes(d.status))
    return res.status(400).json({ error: `status must be one of ${VALID_SHIPMENT_STATUSES.join(', ')}` });

  const tracking_no = generateTrackingNo();

  const tx = db.transaction(() => {
    const info = db.prepare(`
      INSERT INTO shipments (
        tracking_no, customer_id, origin, destination, weight_kg, volume_m3,
        status, driver_id, vehicle_id, warehouse_id, cost, notes,
        scheduled_at, delivered_at
      ) VALUES (
        @tracking_no, @customer_id, @origin, @destination, @weight_kg, @volume_m3,
        @status, @driver_id, @vehicle_id, @warehouse_id, @cost, @notes,
        @scheduled_at, @delivered_at
      )
    `).run({
      tracking_no,
      customer_id: d.customer_id || null,
      origin: d.origin,
      destination: d.destination,
      weight_kg: d.weight_kg ?? 0,
      volume_m3: d.volume_m3 ?? 0,
      status: d.status || 'pending',
      driver_id: d.driver_id || null,
      vehicle_id: d.vehicle_id || null,
      warehouse_id: d.warehouse_id || null,
      cost: d.cost ?? 0,
      notes: d.notes || null,
      scheduled_at: d.scheduled_at || null,
      delivered_at: d.delivered_at || null,
    });
    db.prepare(`
      INSERT INTO tracking_events (shipment_id, status, location, note)
      VALUES (?, ?, ?, ?)
    `).run(info.lastInsertRowid, d.status || 'pending', d.origin, 'Shipment created');
    return info.lastInsertRowid;
  });

  const id = tx();
  res.status(201).json(db.prepare(shipmentJoinSql + ' WHERE s.id = ?').get(id));
}));

app.put('/api/shipments/:id', wrap((req, res) => {
  const current = db.prepare(`SELECT * FROM shipments WHERE id = ?`).get(req.params.id);
  if (!current) return res.status(404).json({ error: 'Shipment not found' });
  if (req.body.status && !VALID_SHIPMENT_STATUSES.includes(req.body.status))
    return res.status(400).json({ error: `status must be one of ${VALID_SHIPMENT_STATUSES.join(', ')}` });

  const newStatus = req.body.status;
  const statusChanged = newStatus && newStatus !== current.status;

  const tx = db.transaction(() => {
    const allowed = [...shipmentFields];
    const data = pick(req.body, allowed);
    if (statusChanged && newStatus === 'delivered' && !data.delivered_at) {
      data.delivered_at = new Date().toISOString();
    }
    const keys = Object.keys(data);
    if (keys.length > 0) {
      const setSql = keys.map(k => `${k} = @${k}`).join(', ');
      db.prepare(
        `UPDATE shipments SET ${setSql}, updated_at = datetime('now') WHERE id = @id`
      ).run({ ...data, id: req.params.id });
    }
    if (statusChanged) {
      db.prepare(`
        INSERT INTO tracking_events (shipment_id, status, location, note)
        VALUES (?, ?, ?, ?)
      `).run(req.params.id, newStatus, req.body.location || null, req.body.event_note || `Status changed to ${newStatus}`);
    }
  });
  tx();

  res.json(db.prepare(shipmentJoinSql + ' WHERE s.id = ?').get(req.params.id));
}));

app.delete('/api/shipments/:id', wrap((req, res) => {
  const info = db.prepare(`DELETE FROM shipments WHERE id = ?`).run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Shipment not found' });
  res.json({ ok: true });
}));

app.post('/api/shipments/:id/events', wrap((req, res) => {
  const shipment = db.prepare(`SELECT * FROM shipments WHERE id = ?`).get(req.params.id);
  if (!shipment) return res.status(404).json({ error: 'Shipment not found' });
  const { status, location, note } = req.body;
  if (!status) return res.status(400).json({ error: 'status is required' });
  if (!VALID_SHIPMENT_STATUSES.includes(status))
    return res.status(400).json({ error: `status must be one of ${VALID_SHIPMENT_STATUSES.join(', ')}` });
  const tx = db.transaction(() => {
    db.prepare(`
      INSERT INTO tracking_events (shipment_id, status, location, note)
      VALUES (?, ?, ?, ?)
    `).run(req.params.id, status, location || null, note || null);
    const update = { status, updated_at: new Date().toISOString() };
    if (status === 'delivered') update.delivered_at = new Date().toISOString();
    const keys = Object.keys(update);
    const setSql = keys.map(k => `${k} = @${k}`).join(', ');
    db.prepare(`UPDATE shipments SET ${setSql} WHERE id = @id`).run({ ...update, id: req.params.id });
  });
  tx();
  const events = db.prepare(
    `SELECT * FROM tracking_events WHERE shipment_id = ? ORDER BY occurred_at DESC, id DESC`
  ).all(req.params.id);
  res.status(201).json({ events });
}));

/* ------------------------------ stats ------------------------------ */

app.get('/api/stats', wrap((req, res) => {
  const totalShipments = db.prepare(`SELECT COUNT(*) AS c FROM shipments`).get().c;
  const byStatus = db.prepare(
    `SELECT status, COUNT(*) AS c FROM shipments GROUP BY status`
  ).all();
  const statusMap = Object.fromEntries(VALID_SHIPMENT_STATUSES.map(s => [s, 0]));
  for (const r of byStatus) statusMap[r.status] = r.c;
  const revenue = db.prepare(
    `SELECT COALESCE(SUM(cost), 0) AS total FROM shipments WHERE status = 'delivered'`
  ).get().total;
  const pendingRevenue = db.prepare(
    `SELECT COALESCE(SUM(cost), 0) AS total FROM shipments WHERE status != 'delivered' AND status != 'cancelled'`
  ).get().total;
  const counts = {
    customers: db.prepare(`SELECT COUNT(*) AS c FROM customers`).get().c,
    drivers: db.prepare(`SELECT COUNT(*) AS c FROM drivers`).get().c,
    vehicles: db.prepare(`SELECT COUNT(*) AS c FROM vehicles`).get().c,
    warehouses: db.prepare(`SELECT COUNT(*) AS c FROM warehouses`).get().c,
  };
  const recent = db.prepare(shipmentJoinSql + ' ORDER BY s.id DESC LIMIT 5').all();
  res.json({
    totalShipments,
    byStatus: statusMap,
    revenue,
    pendingRevenue,
    counts,
    recentShipments: recent,
  });
}));

/* --------------------------- error handler -------------------------- */

app.use((err, req, res, next) => {
  console.error(err);
  const msg = err && err.message ? err.message : 'Internal server error';
  const status = /UNIQUE constraint/i.test(msg) ? 409 : 500;
  res.status(status).json({ error: msg });
});

/* ----------------------------- SPA fallback ------------------------- */

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Logistics Management Software running at http://localhost:${PORT}`);
  });
}

module.exports = app;
