# LogiTrack - Logistics Management Software

A full-stack logistics management system for tracking shipments, managing inventory, monitoring warehouses, and overseeing fleet operations.

## Features

- **Dashboard** - Real-time overview with KPIs, charts, and recent activity
- **Shipment Management** - Create, track, update, and manage shipments with tracking numbers, status workflow, and priority levels
- **Inventory Management** - SKU-based inventory tracking with stock levels, categories, low-stock alerts, and supplier information
- **Warehouse Management** - Monitor warehouse locations, capacity utilization, managers, and operating hours
- **Fleet Management** - Track vehicles (trucks, vans, ships, planes, trains, drones) with driver info, maintenance schedules, and mileage
- **Analytics** - Visual reports with bar charts, pie charts, and area charts for operational insights

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Backend   | Python, FastAPI, SQLAlchemy, SQLite |
| Frontend  | React 19, Vite, React Router, Recharts, Lucide Icons |
| Deployment| Docker, Docker Compose, Nginx     |

## Quick Start

### Prerequisites

- Python 3.10+ and Node.js 18+
- Or Docker & Docker Compose

### Option 1: Docker Compose (Recommended)

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Option 2: Manual Setup

**Backend:**

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

## API Endpoints

### Shipments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/shipments` | List shipments (filters: status, priority, search) |
| GET | `/api/shipments/{id}` | Get shipment details |
| GET | `/api/shipments/track/{tracking_number}` | Track by tracking number |
| POST | `/api/shipments` | Create new shipment |
| PATCH | `/api/shipments/{id}` | Update shipment |
| DELETE | `/api/shipments/{id}` | Delete shipment |

### Inventory
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/inventory` | List items (filters: category, low_stock, search) |
| GET | `/api/inventory/{id}` | Get item details |
| POST | `/api/inventory` | Add new item |
| PATCH | `/api/inventory/{id}` | Update item |
| DELETE | `/api/inventory/{id}` | Soft-delete item |

### Warehouses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/warehouses` | List warehouses |
| GET | `/api/warehouses/{id}` | Get warehouse details |
| POST | `/api/warehouses` | Create warehouse |
| PATCH | `/api/warehouses/{id}` | Update warehouse |
| DELETE | `/api/warehouses/{id}` | Delete warehouse |

### Vehicles
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vehicles` | List vehicles (filters: type, status, search) |
| GET | `/api/vehicles/{id}` | Get vehicle details |
| POST | `/api/vehicles` | Add vehicle |
| PATCH | `/api/vehicles/{id}` | Update vehicle |
| DELETE | `/api/vehicles/{id}` | Delete vehicle |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/dashboard` | Dashboard statistics |
| GET | `/api/analytics/shipments-by-status` | Shipments grouped by status |
| GET | `/api/analytics/shipments-by-priority` | Shipments grouped by priority |
| GET | `/api/analytics/inventory-by-category` | Inventory grouped by category |

## Project Structure

```
├── backend/
│   ├── app/
│   │   ├── models/          # SQLAlchemy models
│   │   ├── routes/          # API route handlers
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   ├── database.py      # Database configuration
│   │   ├── main.py          # FastAPI application
│   │   └── seed.py          # Sample data seeder
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   └── utils/           # Utility functions
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
└── README.md
```

## Sample Data

The application auto-seeds with sample data on first run:
- 5 warehouses across the US, Europe, and Asia
- 8 vehicles of various types
- 25 shipments in different statuses
- 20 inventory items across categories

## License

MIT
