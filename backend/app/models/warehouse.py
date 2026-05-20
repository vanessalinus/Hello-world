import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, String, Float, DateTime, Text, Integer, Enum as SAEnum
import enum

from app.models.base import Base


class WarehouseStatus(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    MAINTENANCE = "maintenance"
    FULL = "full"


class Warehouse(Base):
    __tablename__ = "warehouses"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(200), nullable=False)
    code = Column(String(20), unique=True, nullable=False, index=True)
    status = Column(SAEnum(WarehouseStatus), default=WarehouseStatus.ACTIVE)

    address = Column(Text, nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(100))
    country = Column(String(100), nullable=False)
    postal_code = Column(String(20))

    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    total_capacity = Column(Integer, default=10000)
    used_capacity = Column(Integer, default=0)

    manager_name = Column(String(200))
    manager_phone = Column(String(30))
    manager_email = Column(String(200))

    operating_hours = Column(String(100))
    notes = Column(Text)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
