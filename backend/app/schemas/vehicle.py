from datetime import datetime
from typing import Optional
from pydantic import BaseModel

from app.models.vehicle import VehicleType, VehicleStatus


class VehicleCreate(BaseModel):
    registration_number: str
    vehicle_type: VehicleType = VehicleType.TRUCK
    make: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    capacity_kg: float = 0.0
    capacity_volume_m3: float = 0.0
    fuel_type: Optional[str] = None
    fuel_efficiency: Optional[float] = None
    current_location: Optional[str] = None
    home_warehouse_id: Optional[str] = None
    driver_name: Optional[str] = None
    driver_phone: Optional[str] = None
    driver_license: Optional[str] = None
    last_maintenance: Optional[datetime] = None
    next_maintenance: Optional[datetime] = None
    mileage_km: float = 0.0
    insurance_expiry: Optional[datetime] = None
    notes: Optional[str] = None


class VehicleUpdate(BaseModel):
    status: Optional[VehicleStatus] = None
    vehicle_type: Optional[VehicleType] = None
    make: Optional[str] = None
    model: Optional[str] = None
    year: Optional[int] = None
    capacity_kg: Optional[float] = None
    capacity_volume_m3: Optional[float] = None
    fuel_type: Optional[str] = None
    fuel_efficiency: Optional[float] = None
    current_location: Optional[str] = None
    home_warehouse_id: Optional[str] = None
    driver_name: Optional[str] = None
    driver_phone: Optional[str] = None
    driver_license: Optional[str] = None
    last_maintenance: Optional[datetime] = None
    next_maintenance: Optional[datetime] = None
    mileage_km: Optional[float] = None
    insurance_expiry: Optional[datetime] = None
    notes: Optional[str] = None


class VehicleResponse(BaseModel):
    id: str
    registration_number: str
    vehicle_type: VehicleType
    status: VehicleStatus
    make: Optional[str]
    model: Optional[str]
    year: Optional[int]
    capacity_kg: float
    capacity_volume_m3: float
    fuel_type: Optional[str]
    fuel_efficiency: Optional[float]
    current_location: Optional[str]
    home_warehouse_id: Optional[str]
    driver_name: Optional[str]
    driver_phone: Optional[str]
    driver_license: Optional[str]
    last_maintenance: Optional[datetime]
    next_maintenance: Optional[datetime]
    mileage_km: float
    insurance_expiry: Optional[datetime]
    notes: Optional[str]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    model_config = {"from_attributes": True}
