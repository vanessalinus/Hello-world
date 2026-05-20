from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.shipment import Shipment, ShipmentStatus
from app.models.inventory import InventoryItem
from app.models.warehouse import Warehouse, WarehouseStatus
from app.models.vehicle import Vehicle, VehicleStatus
from app.schemas.analytics import (
    DashboardStats,
    ShipmentsByStatus,
    ShipmentsByPriority,
    InventoryByCategory,
)

router = APIRouter(prefix="/api/analytics", tags=["analytics"])


@router.get("/dashboard", response_model=DashboardStats)
def dashboard_stats(db: Session = Depends(get_db)):
    total_shipments = db.query(func.count(Shipment.id)).scalar() or 0
    active_shipments = (
        db.query(func.count(Shipment.id))
        .filter(Shipment.status.in_([ShipmentStatus.IN_TRANSIT, ShipmentStatus.OUT_FOR_DELIVERY, ShipmentStatus.PICKED_UP]))
        .scalar() or 0
    )
    delivered_shipments = (
        db.query(func.count(Shipment.id)).filter(Shipment.status == ShipmentStatus.DELIVERED).scalar() or 0
    )
    pending_shipments = (
        db.query(func.count(Shipment.id)).filter(Shipment.status == ShipmentStatus.PENDING).scalar() or 0
    )

    total_inventory_items = db.query(func.count(InventoryItem.id)).filter(InventoryItem.is_active == 1).scalar() or 0
    low_stock_items = (
        db.query(func.count(InventoryItem.id))
        .filter(InventoryItem.is_active == 1, InventoryItem.quantity <= InventoryItem.min_quantity)
        .scalar() or 0
    )

    total_warehouses = db.query(func.count(Warehouse.id)).scalar() or 0
    active_warehouses = (
        db.query(func.count(Warehouse.id)).filter(Warehouse.status == WarehouseStatus.ACTIVE).scalar() or 0
    )

    total_vehicles = db.query(func.count(Vehicle.id)).scalar() or 0
    available_vehicles = (
        db.query(func.count(Vehicle.id)).filter(Vehicle.status == VehicleStatus.AVAILABLE).scalar() or 0
    )

    total_shipment_value = db.query(func.coalesce(func.sum(Shipment.cost), 0.0)).scalar()
    total_inventory_value = (
        db.query(func.coalesce(func.sum(InventoryItem.unit_price * InventoryItem.quantity), 0.0))
        .filter(InventoryItem.is_active == 1)
        .scalar()
    )

    return DashboardStats(
        total_shipments=total_shipments,
        active_shipments=active_shipments,
        delivered_shipments=delivered_shipments,
        pending_shipments=pending_shipments,
        total_inventory_items=total_inventory_items,
        low_stock_items=low_stock_items,
        total_warehouses=total_warehouses,
        active_warehouses=active_warehouses,
        total_vehicles=total_vehicles,
        available_vehicles=available_vehicles,
        total_shipment_value=float(total_shipment_value),
        total_inventory_value=float(total_inventory_value),
    )


@router.get("/shipments-by-status", response_model=list[ShipmentsByStatus])
def shipments_by_status(db: Session = Depends(get_db)):
    results = (
        db.query(Shipment.status, func.count(Shipment.id))
        .group_by(Shipment.status)
        .all()
    )
    return [ShipmentsByStatus(status=r[0].value if hasattr(r[0], "value") else r[0], count=r[1]) for r in results]


@router.get("/shipments-by-priority", response_model=list[ShipmentsByPriority])
def shipments_by_priority(db: Session = Depends(get_db)):
    results = (
        db.query(Shipment.priority, func.count(Shipment.id))
        .group_by(Shipment.priority)
        .all()
    )
    return [ShipmentsByPriority(priority=r[0].value if hasattr(r[0], "value") else r[0], count=r[1]) for r in results]


@router.get("/inventory-by-category", response_model=list[InventoryByCategory])
def inventory_by_category(db: Session = Depends(get_db)):
    results = (
        db.query(
            InventoryItem.category,
            func.count(InventoryItem.id),
            func.coalesce(func.sum(InventoryItem.unit_price * InventoryItem.quantity), 0.0),
        )
        .filter(InventoryItem.is_active == 1)
        .group_by(InventoryItem.category)
        .all()
    )
    return [
        InventoryByCategory(
            category=r[0].value if hasattr(r[0], "value") else r[0],
            count=r[1],
            total_value=float(r[2]),
        )
        for r in results
    ]
