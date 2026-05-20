const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.get('/', (req, res) => {
  const { search, status, driver_id, page = 1, limit = 20 } = req.query;
  let query = `
    SELECT s.*, d.name as driver_name, d.vehicle_plate, o.order_number,
           c.name as customer_name
    FROM shipments s
    LEFT JOIN drivers d ON s.driver_id = d.id
    LEFT JOIN orders o ON s.order_id = o.id
    LEFT JOIN customers c ON o.customer_id = c.id
    WHERE 1=1
  `;
  const params = [];
  if (search) {
    query += ' AND (s.tracking_number LIKE ? OR s.origin LIKE ? OR s.destination LIKE ? OR d.name LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }
  if (status) { query += ' AND s.status = ?'; params.push(status); }
  if (driver_id) { query += ' AND s.driver_id = ?'; params.push(driver_id); }
  query += ' ORDER BY s.created_at DESC';
  const countQuery = query.replace(
    `SELECT s.*, d.name as driver_name, d.vehicle_plate, o.order_number,\n           c.name as customer_name`,
    'SELECT COUNT(*) as count'
  );
  const total = db.prepare(countQuery).get(...params).count;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  query += ` LIMIT ${limit} OFFSET ${offset}`;
  const shipments = db.prepare(query).all(...params);
  res.json({ data: shipments, total, page: parseInt(page), limit: parseInt(limit) });
});

router.get('/track/:trackingNumber', (req, res) => {
  const shipment = db.prepare(`
    SELECT s.*, d.name as driver_name, d.phone as driver_phone, d.vehicle_plate,
           o.order_number, c.name as customer_name
    FROM shipments s
    LEFT JOIN drivers d ON s.driver_id = d.id
    LEFT JOIN orders o ON s.order_id = o.id
    LEFT JOIN customers c ON o.customer_id = c.id
    WHERE s.tracking_number = ?
  `).get(req.params.trackingNumber);
  if (!shipment) return res.status(404).json({ error: 'Shipment not found' });
  const events = db.prepare('SELECT * FROM shipment_events WHERE shipment_id = ? ORDER BY timestamp DESC').all(shipment.id);
  res.json({ ...shipment, events });
});

router.get('/:id', (req, res) => {
  const shipment = db.prepare(`
    SELECT s.*, d.name as driver_name, d.phone as driver_phone, d.vehicle_plate, d.vehicle_type,
           o.order_number, c.name as customer_name, w.name as warehouse_name
    FROM shipments s
    LEFT JOIN drivers d ON s.driver_id = d.id
    LEFT JOIN orders o ON s.order_id = o.id
    LEFT JOIN customers c ON o.customer_id = c.id
    LEFT JOIN warehouses w ON s.warehouse_id = w.id
    WHERE s.id = ?
  `).get(req.params.id);
  if (!shipment) return res.status(404).json({ error: 'Shipment not found' });
  const events = db.prepare('SELECT * FROM shipment_events WHERE shipment_id = ? ORDER BY timestamp DESC').all(req.params.id);
  res.json({ ...shipment, events });
});

router.post('/', (req, res) => {
  const { order_id, driver_id, warehouse_id, origin, destination, estimated_delivery, weight, distance, cost, notes } = req.body;
  if (!origin || !destination) return res.status(400).json({ error: 'Origin and destination are required' });
  const id = uuidv4();
  const count = db.prepare('SELECT COUNT(*) as count FROM shipments').get().count;
  const trackingNumber = `TRK-${String(count + 20001).padStart(6, '0')}`;
  db.prepare(`INSERT INTO shipments (id, tracking_number, order_id, driver_id, warehouse_id, status, origin, destination, estimated_delivery, weight, distance, cost, notes) VALUES (?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?)`)
    .run(id, trackingNumber, order_id || null, driver_id || null, warehouse_id || null, origin, destination, estimated_delivery || null, weight || 0, distance || 0, cost || 0, notes || null);
  db.prepare('INSERT INTO shipment_events (id, shipment_id, event_type, location, description) VALUES (?, ?, ?, ?, ?)')
    .run(uuidv4(), id, 'created', origin, 'Shipment created and ready for pickup');
  res.status(201).json(db.prepare('SELECT * FROM shipments WHERE id = ?').get(id));
});

router.put('/:id', (req, res) => {
  const shipment = db.prepare('SELECT * FROM shipments WHERE id = ?').get(req.params.id);
  if (!shipment) return res.status(404).json({ error: 'Shipment not found' });
  const { status, driver_id, estimated_delivery, actual_delivery, notes, event_location, event_description } = req.body;
  const newStatus = status || shipment.status;
  db.prepare(`UPDATE shipments SET status=?, driver_id=?, estimated_delivery=?, actual_delivery=?, notes=?, updated_at=datetime('now') WHERE id=?`)
    .run(newStatus, driver_id ?? shipment.driver_id, estimated_delivery ?? shipment.estimated_delivery, actual_delivery ?? shipment.actual_delivery, notes ?? shipment.notes, req.params.id);
  if (status && status !== shipment.status) {
    const eventDescriptions = {
      in_transit: 'Package is in transit',
      out_for_delivery: 'Package is out for delivery',
      delivered: 'Package has been delivered',
      failed: 'Delivery attempt failed',
    };
    db.prepare('INSERT INTO shipment_events (id, shipment_id, event_type, location, description) VALUES (?, ?, ?, ?, ?)')
      .run(uuidv4(), req.params.id, status, event_location || 'Unknown', event_description || eventDescriptions[status] || `Status updated to ${status}`);
  }
  res.json(db.prepare('SELECT * FROM shipments WHERE id = ?').get(req.params.id));
});

router.delete('/:id', (req, res) => {
  const shipment = db.prepare('SELECT * FROM shipments WHERE id = ?').get(req.params.id);
  if (!shipment) return res.status(404).json({ error: 'Shipment not found' });
  db.prepare('DELETE FROM shipment_events WHERE shipment_id = ?').run(req.params.id);
  db.prepare('DELETE FROM shipments WHERE id = ?').run(req.params.id);
  res.json({ message: 'Shipment deleted successfully' });
});

module.exports = router;
