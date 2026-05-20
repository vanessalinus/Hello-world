const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/dashboard', (req, res) => {
  const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
  const pendingOrders = db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'").get().count;
  const activeShipments = db.prepare("SELECT COUNT(*) as count FROM shipments WHERE status IN ('in_transit', 'out_for_delivery')").get().count;
  const deliveredToday = db.prepare("SELECT COUNT(*) as count FROM shipments WHERE status = 'delivered' AND date(actual_delivery) = date('now')").get().count;
  const totalCustomers = db.prepare('SELECT COUNT(*) as count FROM customers').get().count;
  const availableDrivers = db.prepare("SELECT COUNT(*) as count FROM drivers WHERE status = 'available'").get().count;
  const lowStockItems = db.prepare('SELECT COUNT(*) as count FROM inventory WHERE quantity <= min_stock_level').get().count;
  const totalRevenue = db.prepare("SELECT COALESCE(SUM(cost), 0) as total FROM shipments WHERE status = 'delivered'").get().total;
  const monthlyRevenue = db.prepare(`
    SELECT COALESCE(SUM(cost), 0) as total FROM shipments
    WHERE status = 'delivered' AND strftime('%Y-%m', created_at) = strftime('%Y-%m', 'now')
  `).get().total;

  const ordersByStatus = db.prepare(`
    SELECT status, COUNT(*) as count FROM orders GROUP BY status ORDER BY count DESC
  `).all();

  const shipmentsByStatus = db.prepare(`
    SELECT status, COUNT(*) as count FROM shipments GROUP BY status ORDER BY count DESC
  `).all();

  const recentOrders = db.prepare(`
    SELECT o.id, o.order_number, o.status, o.priority, o.created_at,
           c.name as customer_name, o.estimated_value
    FROM orders o LEFT JOIN customers c ON o.customer_id = c.id
    ORDER BY o.created_at DESC LIMIT 8
  `).all();

  const recentShipments = db.prepare(`
    SELECT s.id, s.tracking_number, s.status, s.origin, s.destination,
           s.estimated_delivery, d.name as driver_name
    FROM shipments s LEFT JOIN drivers d ON s.driver_id = d.id
    ORDER BY s.created_at DESC LIMIT 8
  `).all();

  const topCustomers = db.prepare(`
    SELECT c.id, c.name, COUNT(o.id) as order_count,
           COALESCE(SUM(o.estimated_value), 0) as total_value
    FROM customers c LEFT JOIN orders o ON c.id = o.customer_id
    GROUP BY c.id ORDER BY order_count DESC LIMIT 5
  `).all();

  const inventorySummary = db.prepare(`
    SELECT category, COUNT(*) as item_types,
           SUM(quantity) as total_units,
           COALESCE(SUM(quantity * unit_price), 0) as total_value
    FROM inventory GROUP BY category ORDER BY total_value DESC
  `).all();

  const monthlyShipments = db.prepare(`
    SELECT strftime('%Y-%m', created_at) as month, COUNT(*) as count,
           COALESCE(SUM(cost), 0) as revenue
    FROM shipments
    WHERE created_at >= date('now', '-6 months')
    GROUP BY month ORDER BY month ASC
  `).all();

  res.json({
    kpis: {
      totalOrders, pendingOrders, activeShipments, deliveredToday,
      totalCustomers, availableDrivers, lowStockItems, totalRevenue, monthlyRevenue,
    },
    ordersByStatus,
    shipmentsByStatus,
    recentOrders,
    recentShipments,
    topCustomers,
    inventorySummary,
    monthlyShipments,
  });
});

module.exports = router;
