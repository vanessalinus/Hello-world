const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.get('/', (req, res) => {
  const { search, category, warehouse_id, low_stock, page = 1, limit = 20 } = req.query;
  let query = `
    SELECT i.*, w.name as warehouse_name, w.city as warehouse_city
    FROM inventory i
    LEFT JOIN warehouses w ON i.warehouse_id = w.id
    WHERE 1=1
  `;
  const params = [];
  if (search) {
    query += ' AND (i.name LIKE ? OR i.sku LIKE ? OR i.category LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  if (category) { query += ' AND i.category = ?'; params.push(category); }
  if (warehouse_id) { query += ' AND i.warehouse_id = ?'; params.push(warehouse_id); }
  if (low_stock === 'true') { query += ' AND i.quantity <= i.min_stock_level'; }
  query += ' ORDER BY i.name ASC';
  const countQuery = query.replace(`SELECT i.*, w.name as warehouse_name, w.city as warehouse_city`, 'SELECT COUNT(*) as count');
  const total = db.prepare(countQuery).get(...params).count;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  query += ` LIMIT ${limit} OFFSET ${offset}`;
  const items = db.prepare(query).all(...params);
  res.json({ data: items, total, page: parseInt(page), limit: parseInt(limit) });
});

router.get('/categories', (req, res) => {
  const categories = db.prepare('SELECT DISTINCT category FROM inventory WHERE category IS NOT NULL ORDER BY category').all();
  res.json(categories.map(c => c.category));
});

router.get('/:id', (req, res) => {
  const item = db.prepare(`
    SELECT i.*, w.name as warehouse_name, w.city as warehouse_city
    FROM inventory i LEFT JOIN warehouses w ON i.warehouse_id = w.id
    WHERE i.id = ?
  `).get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

router.post('/', (req, res) => {
  const { sku, name, category, description, quantity = 0, unit = 'units', unit_price = 0, warehouse_id, min_stock_level = 10 } = req.body;
  if (!sku || !name) return res.status(400).json({ error: 'SKU and name are required' });
  const id = uuidv4();
  db.prepare(`INSERT INTO inventory (id, sku, name, category, description, quantity, unit, unit_price, warehouse_id, min_stock_level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(id, sku, name, category, description, quantity, unit, unit_price, warehouse_id || null, min_stock_level);
  res.status(201).json(db.prepare('SELECT i.*, w.name as warehouse_name FROM inventory i LEFT JOIN warehouses w ON i.warehouse_id = w.id WHERE i.id = ?').get(id));
});

router.put('/:id', (req, res) => {
  const item = db.prepare('SELECT * FROM inventory WHERE id = ?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  const { name, category, description, quantity, unit, unit_price, warehouse_id, min_stock_level, status } = req.body;
  db.prepare(`UPDATE inventory SET name=?, category=?, description=?, quantity=?, unit=?, unit_price=?, warehouse_id=?, min_stock_level=?, status=? WHERE id=?`)
    .run(name || item.name, category ?? item.category, description ?? item.description, quantity ?? item.quantity, unit || item.unit, unit_price ?? item.unit_price, warehouse_id ?? item.warehouse_id, min_stock_level ?? item.min_stock_level, status || item.status, req.params.id);
  res.json(db.prepare('SELECT i.*, w.name as warehouse_name FROM inventory i LEFT JOIN warehouses w ON i.warehouse_id = w.id WHERE i.id = ?').get(req.params.id));
});

router.patch('/:id/adjust', (req, res) => {
  const item = db.prepare('SELECT * FROM inventory WHERE id = ?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  const { adjustment, reason } = req.body;
  if (adjustment === undefined) return res.status(400).json({ error: 'adjustment is required' });
  const newQty = Math.max(0, item.quantity + parseInt(adjustment));
  db.prepare('UPDATE inventory SET quantity=? WHERE id=?').run(newQty, req.params.id);
  res.json({ ...item, quantity: newQty, adjustment, reason });
});

router.delete('/:id', (req, res) => {
  const item = db.prepare('SELECT * FROM inventory WHERE id = ?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  db.prepare('DELETE FROM inventory WHERE id = ?').run(req.params.id);
  res.json({ message: 'Item deleted successfully' });
});

module.exports = router;
