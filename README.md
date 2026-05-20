# Logistics Management Software

A lightweight browser-based logistics control tower for planning shipments,
assigning fleet capacity, monitoring warehouses, and flagging inventory reorder
risk.

## Features

- Dispatch board with searchable shipments and status transitions.
- Shipment planner that estimates ETA, transportation cost, and best-fit vehicle.
- Fleet utilization cards showing assigned vehicles and maintenance state.
- Warehouse capacity summaries with inventory reorder alerts.
- Local browser persistence with a reset option for demo data.
- Dependency-free Node test suite for the logistics domain logic.

## Run locally

```bash
npm start
```

Then open <http://localhost:4173>.

## Test

```bash
npm test
```

## Project structure

```text
index.html             # Single-page application shell
scripts/server.js      # Minimal static file server
src/app.js             # Browser UI rendering and event handling
src/data.js            # Starter warehouses, fleet, and shipments
src/logistics.js       # Core logistics planning and reporting logic
src/styles.css         # Responsive dashboard styling
tests/logistics.test.js # Node test coverage for logistics rules
```
