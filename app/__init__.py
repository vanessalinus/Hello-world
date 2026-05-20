from datetime import UTC, datetime, timedelta

from flask import Flask

from .models import Driver, Shipment, Vehicle, db


def create_app(test_config=None):
    app = Flask(__name__)
    app.config.update(
        SECRET_KEY="development-secret-key",
        SQLALCHEMY_DATABASE_URI="sqlite:///logistics.db",
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )

    if test_config:
        app.config.update(test_config)

    db.init_app(app)

    with app.app_context():
        db.create_all()
        if not app.config.get("TESTING"):
            _seed_default_data()

    from .routes import logistics_bp

    app.register_blueprint(logistics_bp)
    return app


def _seed_default_data():
    if Driver.query.first():
        return

    drivers = [
        Driver(name="Ava Ortiz", license_number="DL-55412", phone="+1-555-0101"),
        Driver(name="Noah Campbell", license_number="DL-99813", phone="+1-555-0102"),
    ]
    vehicles = [
        Vehicle(
            plate_number="TRK-2041",
            vehicle_type="Box Truck",
            capacity_kg=6500,
            status="available",
        ),
        Vehicle(
            plate_number="VAN-8842",
            vehicle_type="Delivery Van",
            capacity_kg=1800,
            status="in_use",
        ),
    ]
    db.session.add_all(drivers + vehicles)
    db.session.flush()

    sample_shipment = Shipment(
        tracking_number="TRK-20260520-0001",
        customer_name="Northline Retail",
        origin="Dallas, TX",
        destination="Austin, TX",
        weight_kg=1200,
        priority="high",
        status="in_transit",
        eta=datetime.now(UTC).replace(tzinfo=None) + timedelta(hours=6),
        notes="Fragile electronics. Handle with care.",
        driver_id=drivers[0].id,
        vehicle_id=vehicles[0].id,
    )
    db.session.add(sample_shipment)
    db.session.commit()
