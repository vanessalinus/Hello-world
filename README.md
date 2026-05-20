# Logistics Management Software (LMS)

A complete, self-contained logistics management web application. Manage
shipments, customers, drivers, vehicles and warehouses, with end-to-end
status tracking and a live dashboard - all from a single Node.js
process backed by SQLite.

## Features

- **Dashboard** – at-a-glance KPIs, status breakdown, revenue, and recent shipments.
- **Shipments** – create, edit, search, filter by status, and delete shipments.
  Each shipment auto-generates a unique `LMS-…` tracking number.
- **Tracking** – per-shipment timeline of status updates with location and notes.
  Customers can be given the tracking number and looked up from the Tracking page
  or the header search.
- **Customers, Drivers, Vehicles, Warehouses** – full CRUD with validation,
  availability statuses, and inline search.
- **Modern UI** – responsive single-page app (Tailwind CSS) with modals, toasts,
  status badges, and timelines. No build step required.
- **REST API** – clean JSON endpoints under `/api/*` for every entity.

## Tech stack

- **Backend:** Node.js + Express
- **Database:** SQLite (via `better-sqlite3`) - file stored under `data/logistics.db`
- **Frontend:** Vanilla JS SPA with hash-based routing + Tailwind CSS (CDN)

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run seed    # optional: load demo customers, drivers, vehicles & shipments
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The database file is created automatically the first time the server starts.

### Environment variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | HTTP port to listen on. |
| `DB_PATH` | `./data/logistics.db` | SQLite database path. |

## Project layout

```
.
├── server.js          # Express app + REST API
├── db.js              # SQLite connection + schema
├── seed.js            # Demo data loader (npm run seed)
├── public/
│   ├── index.html     # SPA shell
│   ├── app.js         # Frontend logic (router, views, forms)
│   └── styles.css     # Custom styles on top of Tailwind
└── data/              # SQLite database files (gitignored)
```

## REST API overview

All endpoints return JSON. Mutating endpoints expect `Content-Type: application/json`.

### Shipments

- `GET    /api/shipments?status=&q=` – list (with optional filter / search)
- `GET    /api/shipments/:id` – fetch a shipment + its tracking events
- `GET    /api/track/:trackingNo` – public-style lookup by tracking number
- `POST   /api/shipments` – create. `origin` and `destination` required;
  `tracking_no` is generated automatically.
- `PUT    /api/shipments/:id` – update fields. Changing `status` automatically
  appends a tracking event and sets `delivered_at` when status becomes
  `delivered`.
- `POST   /api/shipments/:id/events` – append a tracking event
  (`status`, `location`, `note`) and update the shipment status.
- `DELETE /api/shipments/:id` – delete (cascades to tracking events).

Valid shipment statuses: `pending`, `picked_up`, `in_transit`,
`out_for_delivery`, `delivered`, `cancelled`, `returned`.

### Customers, Drivers, Vehicles, Warehouses

Standard REST under:

- `/api/customers`
- `/api/drivers`   (statuses: `available`, `on_delivery`, `off_duty`)
- `/api/vehicles`  (statuses: `available`, `in_use`, `maintenance`)
- `/api/warehouses`

Each supports `GET` (list), `GET /:id`, `POST`, `PUT /:id`, `DELETE /:id`.

### Stats

- `GET /api/stats` – dashboard aggregates (counts by status, totals, recent shipments).

## Notes

- The frontend uses Tailwind via CDN for zero-config simplicity.
- The SQLite file is created lazily; delete `data/logistics.db` to start fresh.
- `npm run seed` is idempotent: it refuses to seed a non-empty DB unless you
  pass `--force` (`node seed.js --force`), in which case it appends.
