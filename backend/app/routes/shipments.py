import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.shipment import Shipment, ShipmentStatus, ShipmentPriority
from app.schemas.shipment import ShipmentCreate, ShipmentUpdate, ShipmentResponse

router = APIRouter(prefix="/api/shipments", tags=["shipments"])


def generate_tracking_number() -> str:
    short_id = uuid.uuid4().hex[:10].upper()
    return f"LOG-{short_id}"


@router.get("", response_model=list[ShipmentResponse])
def list_shipments(
    status: Optional[ShipmentStatus] = None,
    priority: Optional[ShipmentPriority] = None,
    search: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
):
    query = db.query(Shipment)
    if status:
        query = query.filter(Shipment.status == status)
    if priority:
        query = query.filter(Shipment.priority == priority)
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (Shipment.tracking_number.ilike(search_term))
            | (Shipment.sender_name.ilike(search_term))
            | (Shipment.recipient_name.ilike(search_term))
            | (Shipment.origin_city.ilike(search_term))
            | (Shipment.destination_city.ilike(search_term))
        )
    return query.order_by(Shipment.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/count")
def count_shipments(
    status: Optional[ShipmentStatus] = None,
    db: Session = Depends(get_db),
):
    query = db.query(func.count(Shipment.id))
    if status:
        query = query.filter(Shipment.status == status)
    return {"count": query.scalar()}


@router.get("/{shipment_id}", response_model=ShipmentResponse)
def get_shipment(shipment_id: str, db: Session = Depends(get_db)):
    shipment = db.query(Shipment).filter(Shipment.id == shipment_id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return shipment


@router.get("/track/{tracking_number}", response_model=ShipmentResponse)
def track_shipment(tracking_number: str, db: Session = Depends(get_db)):
    shipment = db.query(Shipment).filter(Shipment.tracking_number == tracking_number).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return shipment


@router.post("", response_model=ShipmentResponse, status_code=201)
def create_shipment(data: ShipmentCreate, db: Session = Depends(get_db)):
    shipment = Shipment(
        id=str(uuid.uuid4()),
        tracking_number=generate_tracking_number(),
        **data.model_dump(),
    )
    db.add(shipment)
    db.commit()
    db.refresh(shipment)
    return shipment


@router.patch("/{shipment_id}", response_model=ShipmentResponse)
def update_shipment(shipment_id: str, data: ShipmentUpdate, db: Session = Depends(get_db)):
    shipment = db.query(Shipment).filter(Shipment.id == shipment_id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")

    update_data = data.model_dump(exclude_unset=True)
    if "status" in update_data:
        new_status = update_data["status"]
        if new_status == ShipmentStatus.IN_TRANSIT and not shipment.shipped_at:
            shipment.shipped_at = datetime.now(timezone.utc)
        elif new_status == ShipmentStatus.DELIVERED and not shipment.actual_delivery:
            shipment.actual_delivery = datetime.now(timezone.utc)

    for key, value in update_data.items():
        setattr(shipment, key, value)

    shipment.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(shipment)
    return shipment


@router.delete("/{shipment_id}", status_code=204)
def delete_shipment(shipment_id: str, db: Session = Depends(get_db)):
    shipment = db.query(Shipment).filter(Shipment.id == shipment_id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    db.delete(shipment)
    db.commit()
