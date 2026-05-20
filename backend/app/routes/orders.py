from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.models import Customer, InventoryItem, Order, OrderItem, OrderStatus
from app.schemas import OrderCreate, OrderItemResponse, OrderResponse, OrderUpdate

router = APIRouter(prefix="/orders", tags=["orders"])


def _generate_order_number(db: Session) -> str:
    count = db.query(Order).count()
    return f"ORD-2026-{count + 1:05d}"


def _to_response(order: Order) -> OrderResponse:
    items = [
        OrderItemResponse(
            id=oi.id,
            inventory_item_id=oi.inventory_item_id,
            quantity=oi.quantity,
            unit_price=oi.unit_price,
            item_name=oi.inventory_item.name if oi.inventory_item else None,
            sku=oi.inventory_item.sku if oi.inventory_item else None,
        )
        for oi in order.order_items
    ]
    return OrderResponse(
        id=order.id,
        order_number=order.order_number,
        customer_id=order.customer_id,
        customer_name=order.customer.name if order.customer else None,
        status=order.status,
        total_amount=order.total_amount,
        notes=order.notes,
        origin_warehouse_id=order.origin_warehouse_id,
        destination_address=order.destination_address,
        destination_city=order.destination_city,
        destination_country=order.destination_country,
        created_at=order.created_at,
        updated_at=order.updated_at,
        order_items=items,
    )


@router.get("", response_model=List[OrderResponse])
def list_orders(
    status: Optional[OrderStatus] = Query(None),
    customer_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Order).options(
        joinedload(Order.customer),
        joinedload(Order.order_items).joinedload(OrderItem.inventory_item),
    )
    if status:
        query = query.filter(Order.status == status)
    if customer_id:
        query = query.filter(Order.customer_id == customer_id)
    orders = query.order_by(Order.created_at.desc()).all()
    return [_to_response(o) for o in orders]


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = (
        db.query(Order)
        .options(
            joinedload(Order.customer),
            joinedload(Order.order_items).joinedload(OrderItem.inventory_item),
        )
        .filter(Order.id == order_id)
        .first()
    )
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return _to_response(order)


@router.post("", response_model=OrderResponse, status_code=201)
def create_order(data: OrderCreate, db: Session = Depends(get_db)):
    if not db.query(Customer).filter(Customer.id == data.customer_id).first():
        raise HTTPException(status_code=400, detail="Customer not found")

    total = 0.0
    order_items_data = []
    for item in data.items:
        inv = db.query(InventoryItem).filter(InventoryItem.id == item.inventory_item_id).first()
        if not inv:
            raise HTTPException(
                status_code=400,
                detail=f"Inventory item {item.inventory_item_id} not found",
            )
        if inv.quantity < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for {inv.sku}",
            )
        total += item.quantity * item.unit_price
        order_items_data.append((item, inv))

    order = Order(
        order_number=_generate_order_number(db),
        customer_id=data.customer_id,
        status=OrderStatus.DRAFT,
        total_amount=total,
        notes=data.notes,
        origin_warehouse_id=data.origin_warehouse_id,
        destination_address=data.destination_address,
        destination_city=data.destination_city,
        destination_country=data.destination_country,
    )
    db.add(order)
    db.flush()

    for item, inv in order_items_data:
        db.add(
            OrderItem(
                order_id=order.id,
                inventory_item_id=item.inventory_item_id,
                quantity=item.quantity,
                unit_price=item.unit_price,
            )
        )

    db.commit()
    order = (
        db.query(Order)
        .options(
            joinedload(Order.customer),
            joinedload(Order.order_items).joinedload(OrderItem.inventory_item),
        )
        .filter(Order.id == order.id)
        .first()
    )
    return _to_response(order)


@router.patch("/{order_id}", response_model=OrderResponse)
def update_order(order_id: int, data: OrderUpdate, db: Session = Depends(get_db)):
    order = (
        db.query(Order)
        .options(
            joinedload(Order.customer),
            joinedload(Order.order_items).joinedload(OrderItem.inventory_item),
        )
        .filter(Order.id == order_id)
        .first()
    )
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(order, key, value)
    db.commit()
    db.refresh(order)
    return _to_response(order)


@router.delete("/{order_id}", status_code=204)
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(order)
    db.commit()
