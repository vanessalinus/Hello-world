# LogiTrack — Logistics Management Software

A full-stack logistics management system for tracking orders, shipments, inventory, drivers, customers, and warehouses.

## Features

| Module | Description |
|---|---|
| **Dashboard** | KPI metrics, charts for shipments/revenue, order & shipment summaries |
| **Orders** | Create/manage customer orders with status and priority tracking |
| **Shipments** | Full shipment lifecycle management with event tracking |
| **Tracking** | Public tracking page — enter a tracking number for live updates |
| **Inventory** | SKU-level stock management with warehouse assignment and adjustments |
| **Warehouses** | Facility management with capacity usage visualization |
| **Fleet & Drivers** | Driver profiles with ratings, vehicle info, and status |
| **Customers** | CRM module with order history |

## Tech Stack

- **Backend**: Node.js + Express + SQLite (via `better-sqlite3`)
- **Frontend**: React 19 + Vite + Recharts + React Router
- **Database**: SQLite (file-based, zero config)

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### 1. Install dependencies

```bash
npm run setup
```

### 2. Start the server

```bash
npm start
```

The app will be available at [http://localhost:3001](http://localhost:3001).

The backend serves the built frontend statically, so a single `npm start` runs everything.

### Development Mode

Run backend and frontend separately with hot reload:

```bash
# Terminal 1 – Backend (port 3001)
npm run dev:backend

# Terminal 2 – Frontend dev server (port 5173, proxies API to 3001)
npm run dev:frontend
```

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/analytics/dashboard` | Dashboard KPIs and charts |
| GET/POST | `/api/orders` | List / create orders |
| GET/PUT/DELETE | `/api/orders/:id` | Get / update / delete order |
| GET/POST | `/api/shipments` | List / create shipments |
| GET | `/api/shipments/track/:trackingNumber` | Track by number |
| GET/PUT/DELETE | `/api/shipments/:id` | Get / update / delete shipment |
| GET/POST | `/api/inventory` | List / add inventory items |
| PATCH | `/api/inventory/:id/adjust` | Adjust stock quantity |
| GET/POST | `/api/drivers` | List / add drivers |
| GET/PUT/DELETE | `/api/drivers/:id` | Get / update / delete driver |
| GET/POST | `/api/customers` | List / add customers |
| GET/PUT/DELETE | `/api/customers/:id` | Get / update / delete customer |
| GET/POST | `/api/warehouses` | List / create warehouses |

## Sample Data

The application seeds realistic sample data on first run:
- 6 customers across US, Germany, and Singapore
- 4 warehouses (NYC, LA, Chicago, Miami)
- 10 inventory items across 6 categories
- 6 drivers with different vehicle types
- 20 orders with varying statuses and priorities
- 15 shipments with full tracking event history
