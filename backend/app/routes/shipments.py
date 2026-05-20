from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.models import Order, Shipment, ShipmentStatus, Vehicle
from app.schemas import ShipmentCreate, ShipmentResponse, ShipmentUpdate

router = APIRouter(prefix="/shipments", tags=["shipments"])


def _generate_tracking_number(db: Session) -> str:
    count = db.query(Shipment).count()
    return f"SHP-2026-{count + 1:05d}"


def _to_response(shipment: Shipment) -> ShipmentResponse:
    return ShipmentResponse(
        id=shipment.id,
        tracking_number=shipment.tracking_number,
        order_id=shipment.order_id,
        vehicle_id=shipment.vehicle_id,
        status=shipment.status,
        origin=shipment.origin,
        destination=shipment.destination,
        weight_kg=shipment.weight_kg,
        estimated_delivery=shipment.estimated_delivery,
        actual_delivery=shipment.actual_delivery,
        notes=shipment.notes,
        created_at=shipment.created_at,
        updated_at=shipment.updated_at,
        vehicle_plate=shipment.vehicle.plate_number if shipment.vehicle else None,
        order_number=shipment.order.order_number if shipment.order else None,
    )


@router.get("", response_model=List[ShipmentResponse])
def list_shipments(
    status: Optional[ShipmentStatus] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Shipment).options(
        joinedload(Shipment.vehicle),
        joinedload(Shipment.order),
    )
    if status:
        query = query.filter(Shipment.status == status)
    shipments = query.order_by(Shipment.created_at.desc()).all()
    return [_to_response(s) for s in shipments]


@router.get("/track/{tracking_number}", response_model=ShipmentResponse)
def track_shipment(tracking_number: str, db: Session = Depends(get_db)):
    shipment = (
        db.query(Shipment)
        .options(joinedload(Shipment.vehicle), joinedload(Shipment.order))
        .filter(Shipment.tracking_number == tracking_number)
        .first()
    )
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return _to_response(shipment)


@router.get("/{shipment_id}", response_model=ShipmentResponse)
def get_shipment(shipment_id: int, db: Session = Depends(get_db)):
    shipment = (
        db.query(Shipment)
        .options(joinedload(Shipment.vehicle), joinedload(Shipment.order))
        .filter(Shipment.id == shipment_id)
        .first()
    )
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return _to_response(shipment)


@router.post("", response_model=ShipmentResponse, status_code=201)
def create_shipment(data: ShipmentCreate, db: Session = Depends(get_db)):
    if data.order_id and not db.query(Order).filter(Order.id == data.order_id).first():
        raise HTTPException(status_code=400, detail="Order not found")
    if data.vehicle_id and not db.query(Vehicle).filter(Vehicle.id == data.vehicle_id).first():
        raise HTTPException(status_code=400, detail="Vehicle not found")

    shipment = Shipment(
        tracking_number=_generate_tracking_number(db),
        **data.model_dump(),
    )
    db.add(shipment)
    db.commit()
    shipment = (
        db.query(Shipment)
        .options(joinedload(Shipment.vehicle), joinedload(Shipment.order))
        .filter(Shipment.id == shipment.id)
        .first()
    )
    return _to_response(shipment)


@router.patch("/{shipment_id}", response_model=ShipmentResponse)
def update_shipment(
    shipment_id: int, data: ShipmentUpdate, db: Session = Depends(get_db)
):
    shipment = (
        db.query(Shipment)
        .options(joinedload(Shipment.vehicle), joinedload(Shipment.order))
        .filter(Shipment.id == shipment_id)
        .first()
    )
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(shipment, key, value)
    db.commit()
    db.refresh(shipment)
    return _to_response(shipment)


@router.delete("/{shipment_id}", status_code=204)
def delete_shipment(shipment_id: int, db: Session = Depends(get_db)):
    shipment = db.query(Shipment).filter(Shipment.id == shipment_id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    db.delete(shipment)
    db.commit()
