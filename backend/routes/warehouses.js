const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.get('/', (req, res) => {
  const warehouses = db.prepare(`
    SELECT w.*, COUNT(i.id) as item_count,
           COALESCE(SUM(i.quantity * i.unit_price), 0) as total_value
    FROM warehouses w
    LEFT JOIN inventory i ON w.id = i.warehouse_id
    GROUP BY w.id
    ORDER BY w.name ASC
  `).all();
  res.json({ data: warehouses });
});

router.get('/:id', (req, res) => {
  const warehouse = db.prepare('SELECT * FROM warehouses WHERE id = ?').get(req.params.id);
  if (!warehouse) return res.status(404).json({ error: 'Warehouse not found' });
  const inventory = db.prepare('SELECT * FROM inventory WHERE warehouse_id = ? ORDER BY name ASC').all(req.params.id);
  res.json({ ...warehouse, inventory });
});

router.post('/', (req, res) => {
  const { name, address, city, country, capacity = 1000, manager } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const id = uuidv4();
  db.prepare('INSERT INTO warehouses (id, name, address, city, country, capacity, manager) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(id, name, address, city, country, capacity, manager);
  res.status(201).json(db.prepare('SELECT * FROM warehouses WHERE id = ?').get(id));
});

router.put('/:id', (req, res) => {
  const warehouse = db.prepare('SELECT * FROM warehouses WHERE id = ?').get(req.params.id);
  if (!warehouse) return res.status(404).json({ error: 'Warehouse not found' });
  const { name, address, city, country, capacity, manager, status } = req.body;
  db.prepare('UPDATE warehouses SET name=?, address=?, city=?, country=?, capacity=?, manager=?, status=? WHERE id=?')
    .run(name || warehouse.name, address ?? warehouse.address, city ?? warehouse.city, country ?? warehouse.country, capacity ?? warehouse.capacity, manager ?? warehouse.manager, status || warehouse.status, req.params.id);
  res.json(db.prepare('SELECT * FROM warehouses WHERE id = ?').get(req.params.id));
});

module.exports = router;
