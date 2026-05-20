# LogiFlow — Logistics Management Software

**LogiFlow** is a full-stack logistics management system for warehouses, inventory, orders, shipments, fleet, and customers.

![LogiFlow](https://img.shields.io/badge/version-1.0.0-blue)

## Features

| Module | Capabilities |
|--------|-------------|
| **Dashboard** | Real-time KPIs: inventory value, low-stock alerts, pending orders, fleet availability |
| **Warehouses** | Multi-location distribution centers with capacity tracking |
| **Inventory** | SKU management, stock levels, reorder alerts, warehouse assignment |
| **Orders** | Customer orders with status workflow (draft → delivered) |
| **Shipments** | Tracking numbers, route management, vehicle assignment, live tracking lookup |
| **Fleet** | Vehicle registry, driver info, status (available / in use / maintenance) |
| **Customers** | Business client directory |

## Tech Stack

- **Backend:** Python 3.12, FastAPI, SQLAlchemy, SQLite
- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router
- **API docs:** Swagger UI at `http://localhost:8000/docs`

## Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+

### 1. Start the API

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python3 -m uvicorn app.main:app --reload --port 8000
```

The API seeds sample data on first startup (warehouses, inventory, orders, shipments, fleet).

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

### Docker (optional)

```bash
docker compose up --build
```

- Frontend: http://localhost:5173  
- API: http://localhost:8000  
- API docs: http://localhost:8000/docs  

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Dashboard KPIs |
| GET/POST | `/api/warehouses` | Warehouse CRUD |
| GET/POST/PATCH | `/api/inventory` | Inventory management |
| GET/POST/PATCH | `/api/orders` | Order management |
| GET/POST/PATCH | `/api/shipments` | Shipment management |
| GET | `/api/shipments/track/{tracking_number}` | Track shipment |
| GET/POST/PATCH | `/api/vehicles` | Fleet management |
| GET/POST | `/api/customers` | Customer management |

## Project Structure

```
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI application
│   │   ├── models.py        # SQLAlchemy models
│   │   ├── schemas.py       # Pydantic schemas
│   │   ├── seed.py          # Sample data seeder
│   │   └── routes/          # API route modules
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/           # Dashboard, Warehouses, Inventory, etc.
│   │   ├── components/      # Shared UI components
│   │   └── api/             # API client
│   └── package.json
└── docker-compose.yml
```

## License

MIT
