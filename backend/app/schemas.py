from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field

from app.models import OrderStatus, ShipmentStatus, VehicleStatus


class WarehouseBase(BaseModel):
    name: str
    code: str
    address: str
    city: str
    country: str
    capacity_sqm: float
    manager_name: Optional[str] = None
    phone: Optional[str] = None


class WarehouseCreate(WarehouseBase):
    pass


class WarehouseResponse(WarehouseBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class InventoryItemBase(BaseModel):
    sku: str
    name: str
    description: Optional[str] = None
    quantity: int = 0
    unit: str = "pcs"
    reorder_level: int = 10
    unit_price: float = 0.0
    warehouse_id: int


class InventoryItemCreate(InventoryItemBase):
    pass


class InventoryItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    quantity: Optional[int] = None
    reorder_level: Optional[int] = None
    unit_price: Optional[float] = None


class InventoryItemResponse(InventoryItemBase):
    id: int
    created_at: datetime
    updated_at: datetime
    warehouse_name: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)


class VehicleBase(BaseModel):
    plate_number: str
    type: str
    capacity_kg: float
    status: VehicleStatus = VehicleStatus.AVAILABLE
    driver_name: Optional[str] = None
    driver_phone: Optional[str] = None


class VehicleCreate(VehicleBase):
    pass


class VehicleUpdate(BaseModel):
    type: Optional[str] = None
    capacity_kg: Optional[float] = None
    status: Optional[VehicleStatus] = None
    driver_name: Optional[str] = None
    driver_phone: Optional[str] = None


class VehicleResponse(VehicleBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class CustomerBase(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None


class CustomerCreate(CustomerBase):
    pass


class CustomerResponse(CustomerBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class OrderItemCreate(BaseModel):
    inventory_item_id: int
    quantity: int = Field(gt=0)
    unit_price: float = Field(ge=0)


class OrderItemResponse(BaseModel):
    id: int
    inventory_item_id: int
    quantity: int
    unit_price: float
    item_name: Optional[str] = None
    sku: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)


class OrderCreate(BaseModel):
    customer_id: int
    notes: Optional[str] = None
    origin_warehouse_id: Optional[int] = None
    destination_address: Optional[str] = None
    destination_city: Optional[str] = None
    destination_country: Optional[str] = None
    items: List[OrderItemCreate] = []


class OrderUpdate(BaseModel):
    status: Optional[OrderStatus] = None
    notes: Optional[str] = None
    destination_address: Optional[str] = None
    destination_city: Optional[str] = None
    destination_country: Optional[str] = None


class OrderResponse(BaseModel):
    id: int
    order_number: str
    customer_id: int
    customer_name: Optional[str] = None
    status: OrderStatus
    total_amount: float
    notes: Optional[str] = None
    origin_warehouse_id: Optional[int] = None
    destination_address: Optional[str] = None
    destination_city: Optional[str] = None
    destination_country: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    order_items: List[OrderItemResponse] = []
    model_config = ConfigDict(from_attributes=True)


class ShipmentBase(BaseModel):
    order_id: Optional[int] = None
    vehicle_id: Optional[int] = None
    origin: str
    destination: str
    weight_kg: float = 0.0
    estimated_delivery: Optional[datetime] = None
    notes: Optional[str] = None


class ShipmentCreate(ShipmentBase):
    pass


class ShipmentUpdate(BaseModel):
    vehicle_id: Optional[int] = None
    status: Optional[ShipmentStatus] = None
    weight_kg: Optional[float] = None
    estimated_delivery: Optional[datetime] = None
    actual_delivery: Optional[datetime] = None
    notes: Optional[str] = None


class ShipmentResponse(ShipmentBase):
    id: int
    tracking_number: str
    status: ShipmentStatus
    actual_delivery: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    vehicle_plate: Optional[str] = None
    order_number: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)


class DashboardStats(BaseModel):
    total_warehouses: int
    total_inventory_items: int
    low_stock_items: int
    total_orders: int
    pending_orders: int
    total_shipments: int
    in_transit_shipments: int
    delivered_shipments: int
    total_vehicles: int
    available_vehicles: int
    total_customers: int
    inventory_value: float
