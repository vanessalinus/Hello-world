const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.get('/', (req, res) => {
  const { search, status, page = 1, limit = 20 } = req.query;
  let query = 'SELECT * FROM drivers WHERE 1=1';
  const params = [];
  if (search) {
    query += ' AND (name LIKE ? OR phone LIKE ? OR license_number LIKE ? OR vehicle_plate LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
  }
  if (status) { query += ' AND status = ?'; params.push(status); }
  query += ' ORDER BY name ASC';
  const total = db.prepare(query.replace('SELECT *', 'SELECT COUNT(*) as count')).get(...params).count;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  query += ` LIMIT ${limit} OFFSET ${offset}`;
  const drivers = db.prepare(query).all(...params);
  res.json({ data: drivers, total, page: parseInt(page), limit: parseInt(limit) });
});

router.get('/:id', (req, res) => {
  const driver = db.prepare('SELECT * FROM drivers WHERE id = ?').get(req.params.id);
  if (!driver) return res.status(404).json({ error: 'Driver not found' });
  const recentShipments = db.prepare(`
    SELECT s.tracking_number, s.status, s.origin, s.destination, s.created_at
    FROM shipments s WHERE s.driver_id = ? ORDER BY s.created_at DESC LIMIT 5
  `).all(req.params.id);
  res.json({ ...driver, recent_shipments: recentShipments });
});

router.post('/', (req, res) => {
  const { name, email, phone, license_number, license_expiry, vehicle_type, vehicle_plate, status = 'available' } = req.body;
  if (!name || !phone || !license_number) return res.status(400).json({ error: 'Name, phone, and license_number are required' });
  const id = uuidv4();
  db.prepare(`INSERT INTO drivers (id, name, email, phone, license_number, license_expiry, vehicle_type, vehicle_plate, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(id, name, email, phone, license_number, license_expiry, vehicle_type, vehicle_plate, status);
  res.status(201).json(db.prepare('SELECT * FROM drivers WHERE id = ?').get(id));
});

router.put('/:id', (req, res) => {
  const driver = db.prepare('SELECT * FROM drivers WHERE id = ?').get(req.params.id);
  if (!driver) return res.status(404).json({ error: 'Driver not found' });
  const { name, email, phone, license_number, license_expiry, vehicle_type, vehicle_plate, status } = req.body;
  db.prepare(`UPDATE drivers SET name=?, email=?, phone=?, license_number=?, license_expiry=?, vehicle_type=?, vehicle_plate=?, status=? WHERE id=?`)
    .run(name || driver.name, email ?? driver.email, phone || driver.phone, license_number || driver.license_number, license_expiry ?? driver.license_expiry, vehicle_type ?? driver.vehicle_type, vehicle_plate ?? driver.vehicle_plate, status || driver.status, req.params.id);
  res.json(db.prepare('SELECT * FROM drivers WHERE id = ?').get(req.params.id));
});

router.delete('/:id', (req, res) => {
  const driver = db.prepare('SELECT * FROM drivers WHERE id = ?').get(req.params.id);
  if (!driver) return res.status(404).json({ error: 'Driver not found' });
  db.prepare('DELETE FROM drivers WHERE id = ?').run(req.params.id);
  res.json({ message: 'Driver deleted successfully' });
});

module.exports = router;
