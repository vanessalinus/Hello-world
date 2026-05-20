import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, String, Float, DateTime, Text, Integer, Enum as SAEnum
import enum

from app.models.base import Base


class VehicleType(str, enum.Enum):
    TRUCK = "truck"
    VAN = "van"
    MOTORCYCLE = "motorcycle"
    SHIP = "ship"
    AIRPLANE = "airplane"
    TRAIN = "train"
    DRONE = "drone"


class VehicleStatus(str, enum.Enum):
    AVAILABLE = "available"
    IN_TRANSIT = "in_transit"
    MAINTENANCE = "maintenance"
    OUT_OF_SERVICE = "out_of_service"


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    registration_number = Column(String(50), unique=True, nullable=False, index=True)
    vehicle_type = Column(SAEnum(VehicleType), default=VehicleType.TRUCK)
    status = Column(SAEnum(VehicleStatus), default=VehicleStatus.AVAILABLE)

    make = Column(String(100))
    model = Column(String(100))
    year = Column(Integer)

    capacity_kg = Column(Float, default=0.0)
    capacity_volume_m3 = Column(Float, default=0.0)
    fuel_type = Column(String(50))
    fuel_efficiency = Column(Float)

    current_location = Column(String(200))
    home_warehouse_id = Column(String, nullable=True)

    driver_name = Column(String(200))
    driver_phone = Column(String(30))
    driver_license = Column(String(50))

    last_maintenance = Column(DateTime, nullable=True)
    next_maintenance = Column(DateTime, nullable=True)
    mileage_km = Column(Float, default=0.0)

    insurance_expiry = Column(DateTime, nullable=True)
    notes = Column(Text)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
