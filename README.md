# LogiTrack Logistics Management Software

LogiTrack is a dependency-free logistics operations web app for coordinating shipments, fleet capacity, route costs, and warehouse inventory from a single dashboard.

## Features

- Operations KPIs for active shipments, delayed deliveries, fleet utilization, stock health, route distance, and projected cost.
- Shipment creation form with customer, route, cargo, weight, due date, vehicle assignment, and status fields.
- Capacity validation that prevents overloading vehicles already carrying active shipments.
- Searchable and filterable shipment board with status transitions and removal actions.
- Fleet view with driver, location, assignment status, and capacity meters.
- Warehouse inventory watchlist with reorder alerts.
- Local browser persistence using `localStorage`.
- JSON export and sample-data reset actions.

## Run locally

This project is a static web app and does not require a package install.

Open `index.html` directly in a browser, or serve the directory with any static file server:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Project structure

```text
.
├── app.js       # Application state, rendering, forms, filters, and actions
├── index.html   # Dashboard and management UI
├── styles.css   # Responsive visual design
└── README.md
```

## Data model

The app stores shipments, vehicles, and inventory items in the browser. Use **Export data** to download the current state as JSON, or **Reset sample data** to restore the default demo records.
