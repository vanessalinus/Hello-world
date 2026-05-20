import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, String, Float, DateTime, Text, Integer, Enum as SAEnum
import enum

from app.models.base import Base


class ItemCategory(str, enum.Enum):
    ELECTRONICS = "electronics"
    CLOTHING = "clothing"
    FOOD = "food"
    FURNITURE = "furniture"
    AUTOMOTIVE = "automotive"
    MEDICAL = "medical"
    HAZARDOUS = "hazardous"
    FRAGILE = "fragile"
    OTHER = "other"


class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    sku = Column(String(100), unique=True, nullable=False, index=True)
    name = Column(String(300), nullable=False)
    description = Column(Text)
    category = Column(SAEnum(ItemCategory), default=ItemCategory.OTHER)

    quantity = Column(Integer, default=0)
    min_quantity = Column(Integer, default=10)
    max_quantity = Column(Integer, default=1000)
    unit_price = Column(Float, default=0.0)

    weight_kg = Column(Float, default=0.0)
    dimensions = Column(String(50))

    warehouse_id = Column(String, nullable=True)
    location_in_warehouse = Column(String(100))

    supplier_name = Column(String(200))
    supplier_contact = Column(String(200))

    is_active = Column(Integer, default=1)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
