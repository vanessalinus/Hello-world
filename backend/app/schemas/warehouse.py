from datetime import datetime
from typing import Optional
from pydantic import BaseModel

from app.models.warehouse import WarehouseStatus


class WarehouseCreate(BaseModel):
    name: str
    code: str
    address: str
    city: str
    state: Optional[str] = None
    country: str
    postal_code: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    total_capacity: int = 10000
    manager_name: Optional[str] = None
    manager_phone: Optional[str] = None
    manager_email: Optional[str] = None
    operating_hours: Optional[str] = None
    notes: Optional[str] = None


class WarehouseUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[WarehouseStatus] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    postal_code: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    total_capacity: Optional[int] = None
    used_capacity: Optional[int] = None
    manager_name: Optional[str] = None
    manager_phone: Optional[str] = None
    manager_email: Optional[str] = None
    operating_hours: Optional[str] = None
    notes: Optional[str] = None


class WarehouseResponse(BaseModel):
    id: str
    name: str
    code: str
    status: WarehouseStatus
    address: str
    city: str
    state: Optional[str]
    country: str
    postal_code: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    total_capacity: int
    used_capacity: int
    manager_name: Optional[str]
    manager_phone: Optional[str]
    manager_email: Optional[str]
    operating_hours: Optional[str]
    notes: Optional[str]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    model_config = {"from_attributes": True}
