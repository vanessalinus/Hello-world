from datetime import datetime, timezone
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Warehouse(db.Model):
    __tablename__ = "warehouses"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    code = db.Column(db.String(20), unique=True, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(80), nullable=False)
    state = db.Column(db.String(80), nullable=False)
    country = db.Column(db.String(80), nullable=False, default="USA")
    zip_code = db.Column(db.String(20))
    capacity = db.Column(db.Integer, nullable=False, default=10000)
    current_occupancy = db.Column(db.Integer, nullable=False, default=0)
    manager_name = db.Column(db.String(120))
    manager_email = db.Column(db.String(120))
    phone = db.Column(db.String(30))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    inventory_items = db.relationship("InventoryItem", backref="warehouse", lazy=True)

    @property
    def occupancy_pct(self):
        if self.capacity == 0:
            return 0
        return round((self.current_occupancy / self.capacity) * 100, 1)


class Vehicle(db.Model):
    __tablename__ = "vehicles"

    id = db.Column(db.Integer, primary_key=True)
    plate_number = db.Column(db.String(20), unique=True, nullable=False)
    vehicle_type = db.Column(db.String(50), nullable=False)
    make = db.Column(db.String(50))
    model = db.Column(db.String(50))
    year = db.Column(db.Integer)
    capacity_kg = db.Column(db.Float, nullable=False, default=5000)
    capacity_cbm = db.Column(db.Float, nullable=False, default=30)
    driver_name = db.Column(db.String(120))
    driver_phone = db.Column(db.String(30))
    driver_license = db.Column(db.String(50))
    status = db.Column(db.String(30), nullable=False, default="available")
    fuel_type = db.Column(db.String(30), default="diesel")
    mileage = db.Column(db.Float, default=0)
    last_maintenance = db.Column(db.DateTime)
    next_maintenance = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    shipments = db.relationship("Shipment", backref="vehicle", lazy=True)


class Order(db.Model):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.String(30), unique=True, nullable=False)
    customer_name = db.Column(db.String(120), nullable=False)
    customer_email = db.Column(db.String(120))
    customer_phone = db.Column(db.String(30))
    origin_address = db.Column(db.String(255), nullable=False)
    origin_city = db.Column(db.String(80), nullable=False)
    destination_address = db.Column(db.String(255), nullable=False)
    destination_city = db.Column(db.String(80), nullable=False)
    weight_kg = db.Column(db.Float, nullable=False, default=0)
    volume_cbm = db.Column(db.Float, default=0)
    item_count = db.Column(db.Integer, default=1)
    item_description = db.Column(db.Text)
    priority = db.Column(db.String(20), nullable=False, default="normal")
    status = db.Column(db.String(30), nullable=False, default="pending")
    estimated_cost = db.Column(db.Float, default=0)
    actual_cost = db.Column(db.Float, default=0)
    notes = db.Column(db.Text)
    order_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    estimated_delivery = db.Column(db.DateTime)
    actual_delivery = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    shipment_id = db.Column(db.Integer, db.ForeignKey("shipments.id"), nullable=True)
    warehouse_id = db.Column(db.Integer, db.ForeignKey("warehouses.id"), nullable=True)


class Shipment(db.Model):
    __tablename__ = "shipments"

    id = db.Column(db.Integer, primary_key=True)
    tracking_number = db.Column(db.String(30), unique=True, nullable=False)
    origin = db.Column(db.String(255), nullable=False)
    origin_city = db.Column(db.String(80), nullable=False)
    destination = db.Column(db.String(255), nullable=False)
    destination_city = db.Column(db.String(80), nullable=False)
    status = db.Column(db.String(30), nullable=False, default="pending")
    total_weight_kg = db.Column(db.Float, default=0)
    total_volume_cbm = db.Column(db.Float, default=0)
    vehicle_id = db.Column(db.Integer, db.ForeignKey("vehicles.id"), nullable=True)
    warehouse_id = db.Column(db.Integer, db.ForeignKey("warehouses.id"), nullable=True)
    estimated_departure = db.Column(db.DateTime)
    actual_departure = db.Column(db.DateTime)
    estimated_arrival = db.Column(db.DateTime)
    actual_arrival = db.Column(db.DateTime)
    cost = db.Column(db.Float, default=0)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    orders = db.relationship("Order", backref="shipment", lazy=True)
    tracking_events = db.relationship("TrackingEvent", backref="shipment", lazy=True, order_by="TrackingEvent.timestamp.desc()")


class TrackingEvent(db.Model):
    __tablename__ = "tracking_events"

    id = db.Column(db.Integer, primary_key=True)
    shipment_id = db.Column(db.Integer, db.ForeignKey("shipments.id"), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(255))
    description = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))


class InventoryItem(db.Model):
    __tablename__ = "inventory_items"

    id = db.Column(db.Integer, primary_key=True)
    sku = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(80))
    quantity = db.Column(db.Integer, nullable=False, default=0)
    unit = db.Column(db.String(20), default="units")
    weight_per_unit = db.Column(db.Float, default=0)
    warehouse_id = db.Column(db.Integer, db.ForeignKey("warehouses.id"), nullable=False)
    min_stock_level = db.Column(db.Integer, default=10)
    max_stock_level = db.Column(db.Integer, default=1000)
    reorder_point = db.Column(db.Integer, default=50)
    last_restocked = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    @property
    def stock_status(self):
        if self.quantity <= 0:
            return "out_of_stock"
        if self.quantity <= self.min_stock_level:
            return "low_stock"
        if self.quantity >= self.max_stock_level:
            return "overstocked"
        return "in_stock"
