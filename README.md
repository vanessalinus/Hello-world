# LogiTrack — Logistics Management Software

A comprehensive logistics management system built with Python Flask, featuring shipment tracking, order management, warehouse inventory control, fleet management, and analytics.

## Features

- **Dashboard** — Real-time KPIs, status charts, alerts, and recent activity
- **Shipment Management** — Create, track, and manage shipments with full tracking timeline
- **Order Management** — Customer order CRUD with priority levels and status workflow
- **Warehouse & Inventory** — Multi-warehouse support with inventory tracking, stock levels, and occupancy monitoring
- **Fleet Management** — Vehicle and driver tracking with maintenance scheduling
- **Reports & Analytics** — Shipment pipeline, order distribution, top destinations, warehouse performance
- **Tracking API** — JSON API for shipment tracking integration

## Tech Stack

- **Backend:** Python 3 + Flask + Flask-SQLAlchemy
- **Database:** SQLite
- **Frontend:** Tailwind CSS (CDN) + Chart.js + Font Awesome
- **Templates:** Jinja2

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Seed demo data (optional, creates sample warehouses, vehicles, shipments, orders, and inventory)
python seed.py

# Run the application
python app.py
```

The application will be available at **http://localhost:5000**.

## Project Structure

```
├── app.py                  # Flask application with all routes
├── models.py               # SQLAlchemy database models
├── seed.py                 # Demo data seeder
├── requirements.txt        # Python dependencies
├── templates/
│   ├── base.html           # Base layout with sidebar navigation
│   ├── dashboard.html      # Dashboard with KPIs and charts
│   ├── shipments.html      # Shipment list with filters
│   ├── shipment_detail.html# Shipment detail with tracking timeline
│   ├── orders.html         # Order list with search and filters
│   ├── order_detail.html   # Order detail and edit form
│   ├── warehouses.html     # Warehouse cards with occupancy
│   ├── warehouse_detail.html# Warehouse detail with inventory table
│   ├── vehicles.html       # Fleet vehicle cards
│   ├── vehicle_detail.html # Vehicle detail and driver info
│   └── reports.html        # Analytics and performance reports
└── instance/
    └── logistics.db        # SQLite database (auto-created)
```

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/shipments/<tracking_number>` | GET | Track a shipment by tracking number |
| `/api/dashboard/stats` | GET | Dashboard statistics (JSON) |

## Data Model

- **Warehouse** — Location, capacity, occupancy, manager contact
- **Vehicle** — Type, capacity, driver, maintenance schedule
- **Shipment** — Tracking number, origin/destination, status, assigned vehicle
- **Order** — Customer info, items, priority, cost, linked shipment
- **TrackingEvent** — Shipment status history with timestamps
- **InventoryItem** — SKU, quantity, stock levels, warehouse assignment
