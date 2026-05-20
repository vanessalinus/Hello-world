from datetime import datetime
from typing import Optional
from pydantic import BaseModel

from app.models.inventory import ItemCategory


class InventoryItemCreate(BaseModel):
    sku: str
    name: str
    description: Optional[str] = None
    category: ItemCategory = ItemCategory.OTHER
    quantity: int = 0
    min_quantity: int = 10
    max_quantity: int = 1000
    unit_price: float = 0.0
    weight_kg: float = 0.0
    dimensions: Optional[str] = None
    warehouse_id: Optional[str] = None
    location_in_warehouse: Optional[str] = None
    supplier_name: Optional[str] = None
    supplier_contact: Optional[str] = None


class InventoryItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[ItemCategory] = None
    quantity: Optional[int] = None
    min_quantity: Optional[int] = None
    max_quantity: Optional[int] = None
    unit_price: Optional[float] = None
    weight_kg: Optional[float] = None
    warehouse_id: Optional[str] = None
    location_in_warehouse: Optional[str] = None
    supplier_name: Optional[str] = None
    supplier_contact: Optional[str] = None
    is_active: Optional[int] = None


class InventoryItemResponse(BaseModel):
    id: str
    sku: str
    name: str
    description: Optional[str]
    category: ItemCategory
    quantity: int
    min_quantity: int
    max_quantity: int
    unit_price: float
    weight_kg: float
    dimensions: Optional[str]
    warehouse_id: Optional[str]
    location_in_warehouse: Optional[str]
    supplier_name: Optional[str]
    supplier_contact: Optional[str]
    is_active: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    model_config = {"from_attributes": True}
