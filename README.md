# Logistics Management Software

A complete logistics management web application for tracking shipments, coordinating drivers and vehicles, and monitoring delivery operations from a unified dashboard.

## Features

- Operations dashboard with logistics KPIs
- Shipment management:
  - Create shipments with origin, destination, ETA, weight, notes
  - Assign drivers and vehicles
  - Filter/search by status or text fields
  - Update shipment statuses (pending, in transit, delivered, delayed, cancelled)
- Driver registry
- Vehicle fleet registry
- JSON API endpoint for shipment data (`/api/shipments`)
- Auto-seeded sample data on first non-test run

## Tech Stack

- Python
- Flask
- Flask-SQLAlchemy
- SQLite
- Pytest

## Quick Start

1. Create a virtual environment and install dependencies:

   ```bash
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

2. Run the application:

   ```bash
   python run.py
   ```

3. Open in your browser:

   ```text
   http://127.0.0.1:5000
   ```

## Run Tests

```bash
pytest
```
