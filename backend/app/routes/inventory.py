import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.inventory import InventoryItem, ItemCategory
from app.schemas.inventory import InventoryItemCreate, InventoryItemUpdate, InventoryItemResponse

router = APIRouter(prefix="/api/inventory", tags=["inventory"])


@router.get("", response_model=list[InventoryItemResponse])
def list_inventory(
    category: Optional[ItemCategory] = None,
    warehouse_id: Optional[str] = None,
    low_stock: Optional[bool] = None,
    search: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
):
    query = db.query(InventoryItem).filter(InventoryItem.is_active == 1)
    if category:
        query = query.filter(InventoryItem.category == category)
    if warehouse_id:
        query = query.filter(InventoryItem.warehouse_id == warehouse_id)
    if low_stock:
        query = query.filter(InventoryItem.quantity <= InventoryItem.min_quantity)
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (InventoryItem.sku.ilike(search_term))
            | (InventoryItem.name.ilike(search_term))
            | (InventoryItem.supplier_name.ilike(search_term))
        )
    return query.order_by(InventoryItem.name).offset(skip).limit(limit).all()


@router.get("/{item_id}", response_model=InventoryItemResponse)
def get_item(item_id: str, db: Session = Depends(get_db)):
    item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    return item


@router.post("", response_model=InventoryItemResponse, status_code=201)
def create_item(data: InventoryItemCreate, db: Session = Depends(get_db)):
    existing = db.query(InventoryItem).filter(InventoryItem.sku == data.sku).first()
    if existing:
        raise HTTPException(status_code=409, detail="SKU already exists")
    item = InventoryItem(id=str(uuid.uuid4()), **data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/{item_id}", response_model=InventoryItemResponse)
def update_item(item_id: str, data: InventoryItemUpdate, db: Session = Depends(get_db)):
    item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    item.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}", status_code=204)
def delete_item(item_id: str, db: Session = Depends(get_db)):
    item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    item.is_active = 0
    db.commit()
