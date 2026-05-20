from datetime import UTC, datetime

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

SHIPMENT_STATUSES = ["pending", "in_transit", "delivered", "delayed", "cancelled"]
VEHICLE_STATUSES = ["available", "in_use", "maintenance"]
PRIORITY_LEVELS = ["low", "medium", "high", "critical"]


def utcnow():
    return datetime.now(UTC).replace(tzinfo=None)


class Driver(db.Model):
    __tablename__ = "drivers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    license_number = db.Column(db.String(80), unique=True, nullable=False)
    phone = db.Column(db.String(32), nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=utcnow, nullable=False)

    shipments = db.relationship("Shipment", back_populates="driver")


class Vehicle(db.Model):
    __tablename__ = "vehicles"

    id = db.Column(db.Integer, primary_key=True)
    plate_number = db.Column(db.String(30), unique=True, nullable=False)
    vehicle_type = db.Column(db.String(80), nullable=False)
    capacity_kg = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(30), default="available", nullable=False)
    created_at = db.Column(db.DateTime, default=utcnow, nullable=False)

    shipments = db.relationship("Shipment", back_populates="vehicle")


class Shipment(db.Model):
    __tablename__ = "shipments"

    id = db.Column(db.Integer, primary_key=True)
    tracking_number = db.Column(db.String(40), unique=True, nullable=False)
    customer_name = db.Column(db.String(120), nullable=False)
    origin = db.Column(db.String(120), nullable=False)
    destination = db.Column(db.String(120), nullable=False)
    weight_kg = db.Column(db.Float, nullable=False)
    priority = db.Column(db.String(30), default="medium", nullable=False)
    status = db.Column(db.String(30), default="pending", nullable=False)
    eta = db.Column(db.DateTime, nullable=False)
    notes = db.Column(db.Text, default="", nullable=False)
    created_at = db.Column(db.DateTime, default=utcnow, nullable=False)
    updated_at = db.Column(
        db.DateTime, default=utcnow, onupdate=utcnow, nullable=False
    )

    driver_id = db.Column(db.Integer, db.ForeignKey("drivers.id"), nullable=True)
    vehicle_id = db.Column(db.Integer, db.ForeignKey("vehicles.id"), nullable=True)

    driver = db.relationship("Driver", back_populates="shipments")
    vehicle = db.relationship("Vehicle", back_populates="shipments")

    def to_dict(self):
        return {
            "id": self.id,
            "tracking_number": self.tracking_number,
            "customer_name": self.customer_name,
            "origin": self.origin,
            "destination": self.destination,
            "weight_kg": self.weight_kg,
            "priority": self.priority,
            "status": self.status,
            "eta": self.eta.isoformat(),
            "notes": self.notes,
            "driver": self.driver.name if self.driver else None,
            "vehicle": self.vehicle.plate_number if self.vehicle else None,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
