const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'logistics.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS customers (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL,
  email         TEXT,
  phone         TEXT,
  address       TEXT,
  city          TEXT,
  country       TEXT,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS warehouses (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL,
  code          TEXT    UNIQUE,
  address       TEXT,
  city          TEXT,
  country       TEXT,
  capacity_m3   REAL    DEFAULT 0,
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS drivers (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT    NOT NULL,
  license_no    TEXT,
  phone         TEXT,
  email         TEXT,
  status        TEXT    NOT NULL DEFAULT 'available',
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS vehicles (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  plate_no      TEXT    NOT NULL UNIQUE,
  type          TEXT    NOT NULL DEFAULT 'truck',
  capacity_kg   REAL    DEFAULT 0,
  status        TEXT    NOT NULL DEFAULT 'available',
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS shipments (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  tracking_no     TEXT    NOT NULL UNIQUE,
  customer_id     INTEGER REFERENCES customers(id) ON DELETE SET NULL,
  origin          TEXT    NOT NULL,
  destination     TEXT    NOT NULL,
  weight_kg       REAL    DEFAULT 0,
  volume_m3       REAL    DEFAULT 0,
  status          TEXT    NOT NULL DEFAULT 'pending',
  driver_id       INTEGER REFERENCES drivers(id) ON DELETE SET NULL,
  vehicle_id      INTEGER REFERENCES vehicles(id) ON DELETE SET NULL,
  warehouse_id    INTEGER REFERENCES warehouses(id) ON DELETE SET NULL,
  cost            REAL    DEFAULT 0,
  notes           TEXT,
  scheduled_at    TEXT,
  delivered_at    TEXT,
  created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS tracking_events (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  shipment_id     INTEGER NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status          TEXT    NOT NULL,
  location        TEXT,
  note            TEXT,
  occurred_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_shipments_customer ON shipments(customer_id);
CREATE INDEX IF NOT EXISTS idx_tracking_shipment ON tracking_events(shipment_id);
`);

module.exports = db;
