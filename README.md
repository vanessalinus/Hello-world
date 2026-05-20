# FlowFreight Logistics Management

FlowFreight is a browser-based logistics management application built as a
single-page dashboard. It provides a lightweight operations console for:

- monitoring active and delayed shipments
- assigning vehicles to new loads
- tracking fleet readiness and maintenance pressure
- watching warehouse utilization and critical stock indicators
- reviewing recent operational activity in a timeline view

## Project structure

- `index.html` - dashboard layout and UI structure
- `styles.css` - responsive styling for the control center
- `app.js` - state management, rendering logic, seeded data, and interactions

## Running the software

Because the app is fully static, you can run it in either of these ways:

1. Open `index.html` directly in a browser.
2. Or serve the directory with a static web server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Included functionality

- KPI cards for active shipments, on-time rate, delayed loads, and fleet usage
- shipment planning form with vehicle assignment and ETA capture
- searchable shipment board with inline status updates
- fleet readiness cards for availability, driver, location, and maintenance
- warehouse utilization cards and capacity bars
- exception alert stream for delays, warehouse pressure, and maintenance windows
- localStorage persistence so user changes remain after refresh

## Notes

- The dashboard ships with sample data to demonstrate the workflows.
- Use the **Reset sample data** button to restore the initial seed state.
