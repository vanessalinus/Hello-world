import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.warehouse import Warehouse, WarehouseStatus
from app.schemas.warehouse import WarehouseCreate, WarehouseUpdate, WarehouseResponse

router = APIRouter(prefix="/api/warehouses", tags=["warehouses"])


@router.get("", response_model=list[WarehouseResponse])
def list_warehouses(
    status: Optional[WarehouseStatus] = None,
    search: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
):
    query = db.query(Warehouse)
    if status:
        query = query.filter(Warehouse.status == status)
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (Warehouse.name.ilike(search_term))
            | (Warehouse.code.ilike(search_term))
            | (Warehouse.city.ilike(search_term))
        )
    return query.order_by(Warehouse.name).offset(skip).limit(limit).all()


@router.get("/{warehouse_id}", response_model=WarehouseResponse)
def get_warehouse(warehouse_id: str, db: Session = Depends(get_db)):
    wh = db.query(Warehouse).filter(Warehouse.id == warehouse_id).first()
    if not wh:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    return wh


@router.post("", response_model=WarehouseResponse, status_code=201)
def create_warehouse(data: WarehouseCreate, db: Session = Depends(get_db)):
    existing = db.query(Warehouse).filter(Warehouse.code == data.code).first()
    if existing:
        raise HTTPException(status_code=409, detail="Warehouse code already exists")
    wh = Warehouse(id=str(uuid.uuid4()), **data.model_dump())
    db.add(wh)
    db.commit()
    db.refresh(wh)
    return wh


@router.patch("/{warehouse_id}", response_model=WarehouseResponse)
def update_warehouse(warehouse_id: str, data: WarehouseUpdate, db: Session = Depends(get_db)):
    wh = db.query(Warehouse).filter(Warehouse.id == warehouse_id).first()
    if not wh:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(wh, key, value)
    wh.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(wh)
    return wh


@router.delete("/{warehouse_id}", status_code=204)
def delete_warehouse(warehouse_id: str, db: Session = Depends(get_db)):
    wh = db.query(Warehouse).filter(Warehouse.id == warehouse_id).first()
    if not wh:
        raise HTTPException(status_code=404, detail="Warehouse not found")
    db.delete(wh)
    db.commit()
