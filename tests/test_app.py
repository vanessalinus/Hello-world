from app import create_app
from app.models import Driver, Shipment, Vehicle, db


def _new_app():
    app = create_app(
        {
            "TESTING": True,
            "SQLALCHEMY_DATABASE_URI": "sqlite://",
            "WTF_CSRF_ENABLED": False,
        }
    )
    with app.app_context():
        db.drop_all()
        db.create_all()
    return app


def test_dashboard_loads():
    app = _new_app()
    client = app.test_client()

    response = client.get("/")

    assert response.status_code == 200
    assert b"Logistics Dashboard" in response.data


def test_create_entities_and_shipment_flow():
    app = _new_app()
    client = app.test_client()

    client.post(
        "/drivers",
        data={
            "name": "Mia Rivera",
            "license_number": "DL-7000",
            "phone": "+1-555-7777",
        },
        follow_redirects=True,
    )
    client.post(
        "/vehicles",
        data={
            "plate_number": "FLEET-11",
            "vehicle_type": "Refrigerated Truck",
            "capacity_kg": "2200",
            "status": "available",
        },
        follow_redirects=True,
    )

    with app.app_context():
        driver_id = Driver.query.first().id
        vehicle_id = Vehicle.query.first().id

    create_response = client.post(
        "/shipments/new",
        data={
            "customer_name": "Meridian Foods",
            "origin": "Denver, CO",
            "destination": "Phoenix, AZ",
            "weight_kg": "640",
            "priority": "high",
            "status": "pending",
            "eta": "2026-06-01T09:30",
            "notes": "Keep temperature controlled.",
            "driver_id": str(driver_id),
            "vehicle_id": str(vehicle_id),
        },
        follow_redirects=True,
    )

    assert create_response.status_code == 200
    assert b"created" in create_response.data

    with app.app_context():
        shipment = Shipment.query.first()
        assert shipment is not None
        shipment_id = shipment.id

    update_response = client.post(
        f"/shipments/{shipment_id}/status",
        data={"status": "in_transit"},
        follow_redirects=True,
    )

    assert update_response.status_code == 200
    assert b"in_transit" in update_response.data

    api_response = client.get("/api/shipments")
    assert api_response.status_code == 200
    assert api_response.json[0]["status"] == "in_transit"
