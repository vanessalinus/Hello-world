const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.get('/', (req, res) => {
  const { search, status, priority, customer_id, page = 1, limit = 20 } = req.query;
  let query = `
    SELECT o.*, c.name as customer_name, c.email as customer_email
    FROM orders o
    LEFT JOIN customers c ON o.customer_id = c.id
    WHERE 1=1
  `;
  const params = [];
  if (search) {
    query += ' AND (o.order_number LIKE ? OR c.name LIKE ? OR o.destination LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  if (status) { query += ' AND o.status = ?'; params.push(status); }
  if (priority) { query += ' AND o.priority = ?'; params.push(priority); }
  if (customer_id) { query += ' AND o.customer_id = ?'; params.push(customer_id); }
  query += ' ORDER BY o.created_at DESC';
  const countQuery = query.replace(
    'SELECT o.*, c.name as customer_name, c.email as customer_email',
    'SELECT COUNT(*) as count'
  );
  const total = db.prepare(countQuery).get(...params).count;
  const offset = (parseInt(page) - 1) * parseInt(limit);
  query += ` LIMIT ${limit} OFFSET ${offset}`;
  const orders = db.prepare(query).all(...params);
  res.json({ data: orders, total, page: parseInt(page), limit: parseInt(limit) });
});

router.get('/:id', (req, res) => {
  const order = db.prepare(`
    SELECT o.*, c.name as customer_name, c.email as customer_email, c.phone as customer_phone
    FROM orders o LEFT JOIN customers c ON o.customer_id = c.id
    WHERE o.id = ?
  `).get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  const items = db.prepare('SELECT oi.*, i.sku, i.category FROM order_items oi LEFT JOIN inventory i ON oi.inventory_id = i.id WHERE oi.order_id = ?').all(req.params.id);
  const shipments = db.prepare('SELECT s.*, d.name as driver_name FROM shipments s LEFT JOIN drivers d ON s.driver_id = d.id WHERE s.order_id = ?').all(req.params.id);
  res.json({ ...order, items, shipments });
});

router.post('/', (req, res) => {
  const { customer_id, status = 'pending', priority = 'normal', origin, destination, total_weight, estimated_value, notes, items = [] } = req.body;
  if (!customer_id) return res.status(400).json({ error: 'customer_id is required' });
  const customer = db.prepare('SELECT id FROM customers WHERE id = ?').get(customer_id);
  if (!customer) return res.status(400).json({ error: 'Customer not found' });
  const id = uuidv4();
  const count = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
  const orderNumber = `ORD-${String(count + 10001).padStart(5, '0')}`;
  db.prepare(`INSERT INTO orders (id, order_number, customer_id, status, priority, origin, destination, total_weight, estimated_value, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(id, orderNumber, customer_id, status, priority, origin, destination, total_weight || 0, estimated_value || 0, notes);
  if (items.length > 0) {
    const insertItem = db.prepare('INSERT INTO order_items (id, order_id, inventory_id, item_name, quantity, unit_price, weight) VALUES (?, ?, ?, ?, ?, ?, ?)');
    items.forEach(item => insertItem.run(uuidv4(), id, item.inventory_id || null, item.item_name, item.quantity, item.unit_price || 0, item.weight || 0));
  }
  res.status(201).json(db.prepare('SELECT o.*, c.name as customer_name FROM orders o LEFT JOIN customers c ON o.customer_id = c.id WHERE o.id = ?').get(id));
});

router.put('/:id', (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  const { status, priority, origin, destination, total_weight, estimated_value, notes } = req.body;
  db.prepare(`UPDATE orders SET status=?, priority=?, origin=?, destination=?, total_weight=?, estimated_value=?, notes=?, updated_at=datetime('now') WHERE id=?`)
    .run(status || order.status, priority || order.priority, origin ?? order.origin, destination ?? order.destination, total_weight ?? order.total_weight, estimated_value ?? order.estimated_value, notes ?? order.notes, req.params.id);
  res.json(db.prepare('SELECT o.*, c.name as customer_name FROM orders o LEFT JOIN customers c ON o.customer_id = c.id WHERE o.id = ?').get(req.params.id));
});

router.delete('/:id', (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  db.prepare('DELETE FROM order_items WHERE order_id = ?').run(req.params.id);
  db.prepare('DELETE FROM orders WHERE id = ?').run(req.params.id);
  res.json({ message: 'Order deleted successfully' });
});

module.exports = router;
