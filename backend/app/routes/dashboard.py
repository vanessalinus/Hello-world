from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import (
    Customer,
    InventoryItem,
    Order,
    OrderStatus,
    Shipment,
    ShipmentStatus,
    Vehicle,
    VehicleStatus,
    Warehouse,
)
from app.schemas import DashboardStats

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/stats", response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    low_stock = (
        db.query(InventoryItem)
        .filter(InventoryItem.quantity <= InventoryItem.reorder_level)
        .count()
    )
    inventory_value = (
        db.query(func.sum(InventoryItem.quantity * InventoryItem.unit_price)).scalar()
        or 0.0
    )
    pending_orders = (
        db.query(Order)
        .filter(
            Order.status.in_(
                [OrderStatus.DRAFT, OrderStatus.CONFIRMED, OrderStatus.PROCESSING]
            )
        )
        .count()
    )
    in_transit = (
        db.query(Shipment).filter(Shipment.status == ShipmentStatus.IN_TRANSIT).count()
    )
    delivered = (
        db.query(Shipment).filter(Shipment.status == ShipmentStatus.DELIVERED).count()
    )
    available_vehicles = (
        db.query(Vehicle).filter(Vehicle.status == VehicleStatus.AVAILABLE).count()
    )

    return DashboardStats(
        total_warehouses=db.query(Warehouse).count(),
        total_inventory_items=db.query(InventoryItem).count(),
        low_stock_items=low_stock,
        total_orders=db.query(Order).count(),
        pending_orders=pending_orders,
        total_shipments=db.query(Shipment).count(),
        in_transit_shipments=in_transit,
        delivered_shipments=delivered,
        total_vehicles=db.query(Vehicle).count(),
        available_vehicles=available_vehicles,
        total_customers=db.query(Customer).count(),
        inventory_value=round(float(inventory_value), 2),
    )
