# RouteFlow Logistics Suite

RouteFlow is a lightweight logistics management web application that runs
directly in the browser with no build step or backend required.

## What it includes

- Dashboard with live operational KPIs
- Order intake with customer, route, priority, and cargo value tracking
- Shipment board with filtering, search, ETA visibility, and status actions
- Fleet management for available, assigned, and maintenance vehicles
- Warehouse utilization monitoring with capacity alerts
- Activity feed that logs every operational event
- Local browser storage so data persists between refreshes

## Project structure

- `index.html` - application layout and forms
- `styles.css` - visual design, responsive layout, and status styling
- `app.js` - logistics state management, rendering, and interactions

## Running locally

Because the app is fully static, you can open `index.html` directly in a
browser or serve the repository with a simple local server.

### Option 1: open directly

Open `index.html` in your browser.

### Option 2: serve with Python

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Recommended workflow

1. Create orders in the Orders section.
2. Dispatch shipments linked to those orders.
3. Assign and update fleet assets.
4. Monitor warehouse utilization and delayed shipments from the dashboard.
5. Use the reset button in the sidebar to restore demo data.

## Notes

- Demo data is preloaded to make the dashboard useful immediately.
- All data is stored in browser `localStorage`, so it stays on the machine
  where the app is used.
