const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.get('/', (req, res) => {
  const { search, status, page = 1, limit = 20 } = req.query;
  let query = 'SELECT * FROM customers WHERE 1=1';
  const params = [];
  if (search) {
    query += ' AND (name LIKE ? OR email LIKE ? OR city LIKE ?)';
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  query += ' ORDER BY created_at DESC';
  const offset = (parseInt(page) - 1) * parseInt(limit);
  const total = db.prepare(query.replace('SELECT *', 'SELECT COUNT(*) as count')).get(...params).count;
  query += ` LIMIT ${limit} OFFSET ${offset}`;
  const customers = db.prepare(query).all(...params);
  res.json({ data: customers, total, page: parseInt(page), limit: parseInt(limit) });
});

router.get('/:id', (req, res) => {
  const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });
  const orders = db.prepare('SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC LIMIT 5').all(req.params.id);
  res.json({ ...customer, recent_orders: orders });
});

router.post('/', (req, res) => {
  const { name, email, phone, address, city, country, status = 'active' } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
  const id = uuidv4();
  db.prepare(`INSERT INTO customers (id, name, email, phone, address, city, country, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(id, name, email, phone, address, city, country, status);
  res.status(201).json(db.prepare('SELECT * FROM customers WHERE id = ?').get(id));
});

router.put('/:id', (req, res) => {
  const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });
  const { name, email, phone, address, city, country, status } = req.body;
  db.prepare(`UPDATE customers SET name=?, email=?, phone=?, address=?, city=?, country=?, status=? WHERE id=?`)
    .run(name || customer.name, email || customer.email, phone ?? customer.phone, address ?? customer.address, city ?? customer.city, country ?? customer.country, status || customer.status, req.params.id);
  res.json(db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id));
});

router.delete('/:id', (req, res) => {
  const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });
  db.prepare('DELETE FROM customers WHERE id = ?').run(req.params.id);
  res.json({ message: 'Customer deleted successfully' });
});

module.exports = router;
