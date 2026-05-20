const express = require('express');
const cors = require('cors');
const path = require('path');

const customersRouter = require('./routes/customers');
const ordersRouter = require('./routes/orders');
const shipmentsRouter = require('./routes/shipments');
const inventoryRouter = require('./routes/inventory');
const driversRouter = require('./routes/drivers');
const warehousesRouter = require('./routes/warehouses');
const analyticsRouter = require('./routes/analytics');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use('/api/customers', customersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/shipments', shipmentsRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/drivers', driversRouter);
app.use('/api/warehouses', warehousesRouter);
app.use('/api/analytics', analyticsRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

app.listen(PORT, () => {
  console.log(`Logistics Management Server running on http://localhost:${PORT}`);
});

module.exports = app;
