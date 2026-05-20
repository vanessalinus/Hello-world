from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import InventoryItem, Warehouse
from app.schemas import InventoryItemCreate, InventoryItemResponse, InventoryItemUpdate

router = APIRouter(prefix="/inventory", tags=["inventory"])


def _to_response(item: InventoryItem) -> InventoryItemResponse:
    return InventoryItemResponse(
        id=item.id,
        sku=item.sku,
        name=item.name,
        description=item.description,
        quantity=item.quantity,
        unit=item.unit,
        reorder_level=item.reorder_level,
        unit_price=item.unit_price,
        warehouse_id=item.warehouse_id,
        created_at=item.created_at,
        updated_at=item.updated_at,
        warehouse_name=item.warehouse.name if item.warehouse else None,
    )


@router.get("", response_model=List[InventoryItemResponse])
def list_inventory(
    warehouse_id: Optional[int] = Query(None),
    low_stock: Optional[bool] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(InventoryItem)
    if warehouse_id:
        query = query.filter(InventoryItem.warehouse_id == warehouse_id)
    if low_stock:
        query = query.filter(InventoryItem.quantity <= InventoryItem.reorder_level)
    if search:
        term = f"%{search}%"
        query = query.filter(
            (InventoryItem.name.ilike(term)) | (InventoryItem.sku.ilike(term))
        )
    items = query.order_by(InventoryItem.name).all()
    return [_to_response(i) for i in items]


@router.get("/{item_id}", response_model=InventoryItemResponse)
def get_inventory_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    return _to_response(item)


@router.post("", response_model=InventoryItemResponse, status_code=201)
def create_inventory_item(data: InventoryItemCreate, db: Session = Depends(get_db)):
    if not db.query(Warehouse).filter(Warehouse.id == data.warehouse_id).first():
        raise HTTPException(status_code=400, detail="Warehouse not found")
    if db.query(InventoryItem).filter(InventoryItem.sku == data.sku).first():
        raise HTTPException(status_code=400, detail="SKU already exists")
    item = InventoryItem(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return _to_response(item)


@router.patch("/{item_id}", response_model=InventoryItemResponse)
def update_inventory_item(
    item_id: int, data: InventoryItemUpdate, db: Session = Depends(get_db)
):
    item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return _to_response(item)


@router.delete("/{item_id}", status_code=204)
def delete_inventory_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    db.delete(item)
    db.commit()
