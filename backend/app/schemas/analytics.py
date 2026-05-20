from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_shipments: int
    active_shipments: int
    delivered_shipments: int
    pending_shipments: int
    total_inventory_items: int
    low_stock_items: int
    total_warehouses: int
    active_warehouses: int
    total_vehicles: int
    available_vehicles: int
    total_shipment_value: float
    total_inventory_value: float


class ShipmentsByStatus(BaseModel):
    status: str
    count: int


class ShipmentsByPriority(BaseModel):
    priority: str
    count: int


class InventoryByCategory(BaseModel):
    category: str
    count: int
    total_value: float
