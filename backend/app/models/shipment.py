import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, String, Float, DateTime, Text, Integer, Enum as SAEnum
import enum

from app.models.base import Base


class ShipmentStatus(str, enum.Enum):
    PENDING = "pending"
    PICKED_UP = "picked_up"
    IN_TRANSIT = "in_transit"
    OUT_FOR_DELIVERY = "out_for_delivery"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"
    RETURNED = "returned"


class ShipmentPriority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    tracking_number = Column(String, unique=True, nullable=False, index=True)
    status = Column(SAEnum(ShipmentStatus), default=ShipmentStatus.PENDING, nullable=False)
    priority = Column(SAEnum(ShipmentPriority), default=ShipmentPriority.MEDIUM, nullable=False)

    origin_address = Column(Text, nullable=False)
    origin_city = Column(String(100), nullable=False)
    origin_country = Column(String(100), nullable=False)

    destination_address = Column(Text, nullable=False)
    destination_city = Column(String(100), nullable=False)
    destination_country = Column(String(100), nullable=False)

    sender_name = Column(String(200), nullable=False)
    sender_phone = Column(String(30))
    sender_email = Column(String(200))

    recipient_name = Column(String(200), nullable=False)
    recipient_phone = Column(String(30))
    recipient_email = Column(String(200))

    weight_kg = Column(Float, default=0.0)
    dimensions = Column(String(50))
    item_count = Column(Integer, default=1)
    description = Column(Text)

    vehicle_id = Column(String, nullable=True)
    warehouse_id = Column(String, nullable=True)

    estimated_delivery = Column(DateTime, nullable=True)
    actual_delivery = Column(DateTime, nullable=True)
    shipped_at = Column(DateTime, nullable=True)

    cost = Column(Float, default=0.0)
    notes = Column(Text)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
