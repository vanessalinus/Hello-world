from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

from app.models.shipment import ShipmentStatus, ShipmentPriority


class ShipmentCreate(BaseModel):
    origin_address: str
    origin_city: str
    origin_country: str
    destination_address: str
    destination_city: str
    destination_country: str
    sender_name: str
    sender_phone: Optional[str] = None
    sender_email: Optional[str] = None
    recipient_name: str
    recipient_phone: Optional[str] = None
    recipient_email: Optional[str] = None
    weight_kg: float = 0.0
    dimensions: Optional[str] = None
    item_count: int = 1
    description: Optional[str] = None
    priority: ShipmentPriority = ShipmentPriority.MEDIUM
    vehicle_id: Optional[str] = None
    warehouse_id: Optional[str] = None
    estimated_delivery: Optional[datetime] = None
    cost: float = 0.0
    notes: Optional[str] = None


class ShipmentUpdate(BaseModel):
    status: Optional[ShipmentStatus] = None
    priority: Optional[ShipmentPriority] = None
    origin_address: Optional[str] = None
    origin_city: Optional[str] = None
    origin_country: Optional[str] = None
    destination_address: Optional[str] = None
    destination_city: Optional[str] = None
    destination_country: Optional[str] = None
    sender_name: Optional[str] = None
    recipient_name: Optional[str] = None
    weight_kg: Optional[float] = None
    vehicle_id: Optional[str] = None
    warehouse_id: Optional[str] = None
    estimated_delivery: Optional[datetime] = None
    actual_delivery: Optional[datetime] = None
    cost: Optional[float] = None
    notes: Optional[str] = None


class ShipmentResponse(BaseModel):
    id: str
    tracking_number: str
    status: ShipmentStatus
    priority: ShipmentPriority
    origin_address: str
    origin_city: str
    origin_country: str
    destination_address: str
    destination_city: str
    destination_country: str
    sender_name: str
    sender_phone: Optional[str]
    sender_email: Optional[str]
    recipient_name: str
    recipient_phone: Optional[str]
    recipient_email: Optional[str]
    weight_kg: float
    dimensions: Optional[str]
    item_count: int
    description: Optional[str]
    vehicle_id: Optional[str]
    warehouse_id: Optional[str]
    estimated_delivery: Optional[datetime]
    actual_delivery: Optional[datetime]
    shipped_at: Optional[datetime]
    cost: float
    notes: Optional[str]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    model_config = {"from_attributes": True}
