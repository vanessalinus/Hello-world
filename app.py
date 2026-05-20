import os
import uuid
from datetime import datetime, timedelta, timezone

from flask import Flask, jsonify, redirect, render_template, request, url_for, flash

from models import (
    InventoryItem,
    Order,
    Shipment,
    TrackingEvent,
    Vehicle,
    Warehouse,
    db,
)

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///logistics.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "logistics-mgmt-secret-key")

db.init_app(app)


def generate_tracking_number():
    return "SHP-" + uuid.uuid4().hex[:8].upper()


def generate_order_number():
    return "ORD-" + uuid.uuid4().hex[:8].upper()


# ──────────────────────────── Dashboard ────────────────────────────


@app.route("/")
def dashboard():
    total_shipments = Shipment.query.count()
    active_shipments = Shipment.query.filter(
        Shipment.status.in_(["in_transit", "picked_up", "processing"])
    ).count()
    total_orders = Order.query.count()
    pending_orders = Order.query.filter_by(status="pending").count()
    total_warehouses = Warehouse.query.filter_by(is_active=True).count()
    total_vehicles = Vehicle.query.filter_by(is_active=True).count()
    available_vehicles = Vehicle.query.filter_by(status="available", is_active=True).count()

    delivered_shipments = Shipment.query.filter_by(status="delivered").count()
    delivery_rate = (
        round((delivered_shipments / total_shipments) * 100, 1) if total_shipments else 0
    )

    total_revenue = db.session.query(db.func.sum(Order.actual_cost)).scalar() or 0

    recent_shipments = Shipment.query.order_by(Shipment.created_at.desc()).limit(5).all()
    recent_orders = Order.query.order_by(Order.created_at.desc()).limit(5).all()

    low_stock_items = InventoryItem.query.filter(
        InventoryItem.quantity <= InventoryItem.min_stock_level
    ).all()

    shipment_statuses = {}
    for status in ["pending", "processing", "picked_up", "in_transit", "delivered", "cancelled"]:
        shipment_statuses[status] = Shipment.query.filter_by(status=status).count()

    order_statuses = {}
    for status in ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]:
        order_statuses[status] = Order.query.filter_by(status=status).count()

    return render_template(
        "dashboard.html",
        total_shipments=total_shipments,
        active_shipments=active_shipments,
        total_orders=total_orders,
        pending_orders=pending_orders,
        total_warehouses=total_warehouses,
        total_vehicles=total_vehicles,
        available_vehicles=available_vehicles,
        delivery_rate=delivery_rate,
        total_revenue=total_revenue,
        recent_shipments=recent_shipments,
        recent_orders=recent_orders,
        low_stock_items=low_stock_items,
        shipment_statuses=shipment_statuses,
        order_statuses=order_statuses,
    )


# ──────────────────────────── Shipments ────────────────────────────


@app.route("/shipments")
def shipments_list():
    status_filter = request.args.get("status", "")
    search = request.args.get("search", "")

    query = Shipment.query
    if status_filter:
        query = query.filter_by(status=status_filter)
    if search:
        query = query.filter(
            db.or_(
                Shipment.tracking_number.ilike(f"%{search}%"),
                Shipment.origin_city.ilike(f"%{search}%"),
                Shipment.destination_city.ilike(f"%{search}%"),
            )
        )
    shipments = query.order_by(Shipment.created_at.desc()).all()
    vehicles = Vehicle.query.filter_by(is_active=True).all()
    warehouses = Warehouse.query.filter_by(is_active=True).all()
    return render_template(
        "shipments.html",
        shipments=shipments,
        vehicles=vehicles,
        warehouses=warehouses,
        status_filter=status_filter,
        search=search,
    )


@app.route("/shipments/create", methods=["POST"])
def shipment_create():
    shipment = Shipment(
        tracking_number=generate_tracking_number(),
        origin=request.form["origin"],
        origin_city=request.form["origin_city"],
        destination=request.form["destination"],
        destination_city=request.form["destination_city"],
        status="pending",
        total_weight_kg=float(request.form.get("total_weight_kg") or 0),
        total_volume_cbm=float(request.form.get("total_volume_cbm") or 0),
        vehicle_id=int(request.form["vehicle_id"]) if request.form.get("vehicle_id") else None,
        warehouse_id=int(request.form["warehouse_id"]) if request.form.get("warehouse_id") else None,
        estimated_departure=_parse_dt(request.form.get("estimated_departure")),
        estimated_arrival=_parse_dt(request.form.get("estimated_arrival")),
        cost=float(request.form.get("cost") or 0),
        notes=request.form.get("notes", ""),
    )
    db.session.add(shipment)

    event = TrackingEvent(
        shipment=shipment,
        status="pending",
        location=shipment.origin_city,
        description="Shipment created",
    )
    db.session.add(event)
    db.session.commit()
    flash("Shipment created successfully.", "success")
    return redirect(url_for("shipment_detail", shipment_id=shipment.id))


@app.route("/shipments/<int:shipment_id>")
def shipment_detail(shipment_id):
    shipment = Shipment.query.get_or_404(shipment_id)
    vehicles = Vehicle.query.filter_by(is_active=True).all()
    warehouses = Warehouse.query.filter_by(is_active=True).all()
    unassigned_orders = Order.query.filter_by(shipment_id=None).filter(
        Order.status.in_(["pending", "confirmed", "processing"])
    ).all()
    return render_template(
        "shipment_detail.html",
        shipment=shipment,
        vehicles=vehicles,
        warehouses=warehouses,
        unassigned_orders=unassigned_orders,
    )


@app.route("/shipments/<int:shipment_id>/update", methods=["POST"])
def shipment_update(shipment_id):
    shipment = Shipment.query.get_or_404(shipment_id)
    old_status = shipment.status

    shipment.origin = request.form.get("origin", shipment.origin)
    shipment.origin_city = request.form.get("origin_city", shipment.origin_city)
    shipment.destination = request.form.get("destination", shipment.destination)
    shipment.destination_city = request.form.get("destination_city", shipment.destination_city)
    shipment.total_weight_kg = float(request.form.get("total_weight_kg") or shipment.total_weight_kg)
    shipment.total_volume_cbm = float(request.form.get("total_volume_cbm") or shipment.total_volume_cbm)
    shipment.cost = float(request.form.get("cost") or shipment.cost)
    shipment.notes = request.form.get("notes", shipment.notes)

    if request.form.get("vehicle_id"):
        shipment.vehicle_id = int(request.form["vehicle_id"])
    if request.form.get("warehouse_id"):
        shipment.warehouse_id = int(request.form["warehouse_id"])

    shipment.estimated_departure = _parse_dt(request.form.get("estimated_departure")) or shipment.estimated_departure
    shipment.estimated_arrival = _parse_dt(request.form.get("estimated_arrival")) or shipment.estimated_arrival

    new_status = request.form.get("status", shipment.status)
    if new_status != old_status:
        shipment.status = new_status
        if new_status == "in_transit" and not shipment.actual_departure:
            shipment.actual_departure = datetime.now(timezone.utc)
        if new_status == "delivered" and not shipment.actual_arrival:
            shipment.actual_arrival = datetime.now(timezone.utc)

        event = TrackingEvent(
            shipment_id=shipment.id,
            status=new_status,
            location=request.form.get("event_location", ""),
            description=request.form.get("event_description", f"Status changed to {new_status}"),
        )
        db.session.add(event)

    db.session.commit()
    flash("Shipment updated successfully.", "success")
    return redirect(url_for("shipment_detail", shipment_id=shipment.id))


@app.route("/shipments/<int:shipment_id>/delete", methods=["POST"])
def shipment_delete(shipment_id):
    shipment = Shipment.query.get_or_404(shipment_id)
    for order in shipment.orders:
        order.shipment_id = None
    TrackingEvent.query.filter_by(shipment_id=shipment.id).delete()
    db.session.delete(shipment)
    db.session.commit()
    flash("Shipment deleted.", "success")
    return redirect(url_for("shipments_list"))


@app.route("/shipments/<int:shipment_id>/assign-order", methods=["POST"])
def shipment_assign_order(shipment_id):
    shipment = Shipment.query.get_or_404(shipment_id)
    order_id = int(request.form["order_id"])
    order = Order.query.get_or_404(order_id)
    order.shipment_id = shipment.id
    db.session.commit()
    flash(f"Order {order.order_number} assigned to shipment.", "success")
    return redirect(url_for("shipment_detail", shipment_id=shipment.id))


# ──────────────────────────── Orders ────────────────────────────


@app.route("/orders")
def orders_list():
    status_filter = request.args.get("status", "")
    priority_filter = request.args.get("priority", "")
    search = request.args.get("search", "")

    query = Order.query
    if status_filter:
        query = query.filter_by(status=status_filter)
    if priority_filter:
        query = query.filter_by(priority=priority_filter)
    if search:
        query = query.filter(
            db.or_(
                Order.order_number.ilike(f"%{search}%"),
                Order.customer_name.ilike(f"%{search}%"),
                Order.destination_city.ilike(f"%{search}%"),
            )
        )
    orders = query.order_by(Order.created_at.desc()).all()
    warehouses = Warehouse.query.filter_by(is_active=True).all()
    return render_template(
        "orders.html",
        orders=orders,
        warehouses=warehouses,
        status_filter=status_filter,
        priority_filter=priority_filter,
        search=search,
    )


@app.route("/orders/create", methods=["POST"])
def order_create():
    order = Order(
        order_number=generate_order_number(),
        customer_name=request.form["customer_name"],
        customer_email=request.form.get("customer_email", ""),
        customer_phone=request.form.get("customer_phone", ""),
        origin_address=request.form["origin_address"],
        origin_city=request.form["origin_city"],
        destination_address=request.form["destination_address"],
        destination_city=request.form["destination_city"],
        weight_kg=float(request.form.get("weight_kg") or 0),
        volume_cbm=float(request.form.get("volume_cbm") or 0),
        item_count=int(request.form.get("item_count") or 1),
        item_description=request.form.get("item_description", ""),
        priority=request.form.get("priority", "normal"),
        status="pending",
        estimated_cost=float(request.form.get("estimated_cost") or 0),
        warehouse_id=int(request.form["warehouse_id"]) if request.form.get("warehouse_id") else None,
        estimated_delivery=_parse_dt(request.form.get("estimated_delivery")),
        notes=request.form.get("notes", ""),
    )
    db.session.add(order)
    db.session.commit()
    flash("Order created successfully.", "success")
    return redirect(url_for("order_detail", order_id=order.id))


@app.route("/orders/<int:order_id>")
def order_detail(order_id):
    order = Order.query.get_or_404(order_id)
    warehouses = Warehouse.query.filter_by(is_active=True).all()
    return render_template("order_detail.html", order=order, warehouses=warehouses)


@app.route("/orders/<int:order_id>/update", methods=["POST"])
def order_update(order_id):
    order = Order.query.get_or_404(order_id)

    order.customer_name = request.form.get("customer_name", order.customer_name)
    order.customer_email = request.form.get("customer_email", order.customer_email)
    order.customer_phone = request.form.get("customer_phone", order.customer_phone)
    order.origin_address = request.form.get("origin_address", order.origin_address)
    order.origin_city = request.form.get("origin_city", order.origin_city)
    order.destination_address = request.form.get("destination_address", order.destination_address)
    order.destination_city = request.form.get("destination_city", order.destination_city)
    order.weight_kg = float(request.form.get("weight_kg") or order.weight_kg)
    order.volume_cbm = float(request.form.get("volume_cbm") or order.volume_cbm)
    order.item_count = int(request.form.get("item_count") or order.item_count)
    order.item_description = request.form.get("item_description", order.item_description)
    order.priority = request.form.get("priority", order.priority)
    order.status = request.form.get("status", order.status)
    order.estimated_cost = float(request.form.get("estimated_cost") or order.estimated_cost)
    order.actual_cost = float(request.form.get("actual_cost") or order.actual_cost)
    order.notes = request.form.get("notes", order.notes)

    if request.form.get("warehouse_id"):
        order.warehouse_id = int(request.form["warehouse_id"])

    order.estimated_delivery = _parse_dt(request.form.get("estimated_delivery")) or order.estimated_delivery

    if order.status == "delivered" and not order.actual_delivery:
        order.actual_delivery = datetime.now(timezone.utc)

    db.session.commit()
    flash("Order updated successfully.", "success")
    return redirect(url_for("order_detail", order_id=order.id))


@app.route("/orders/<int:order_id>/delete", methods=["POST"])
def order_delete(order_id):
    order = Order.query.get_or_404(order_id)
    db.session.delete(order)
    db.session.commit()
    flash("Order deleted.", "success")
    return redirect(url_for("orders_list"))


# ──────────────────────────── Warehouses ────────────────────────────


@app.route("/warehouses")
def warehouses_list():
    warehouses = Warehouse.query.order_by(Warehouse.name).all()
    return render_template("warehouses.html", warehouses=warehouses)


@app.route("/warehouses/create", methods=["POST"])
def warehouse_create():
    warehouse = Warehouse(
        name=request.form["name"],
        code=request.form["code"],
        address=request.form["address"],
        city=request.form["city"],
        state=request.form["state"],
        country=request.form.get("country", "USA"),
        zip_code=request.form.get("zip_code", ""),
        capacity=int(request.form.get("capacity") or 10000),
        manager_name=request.form.get("manager_name", ""),
        manager_email=request.form.get("manager_email", ""),
        phone=request.form.get("phone", ""),
    )
    db.session.add(warehouse)
    db.session.commit()
    flash("Warehouse created successfully.", "success")
    return redirect(url_for("warehouse_detail", warehouse_id=warehouse.id))


@app.route("/warehouses/<int:warehouse_id>")
def warehouse_detail(warehouse_id):
    warehouse = Warehouse.query.get_or_404(warehouse_id)
    inventory = InventoryItem.query.filter_by(warehouse_id=warehouse.id).all()
    return render_template("warehouse_detail.html", warehouse=warehouse, inventory=inventory)


@app.route("/warehouses/<int:warehouse_id>/update", methods=["POST"])
def warehouse_update(warehouse_id):
    warehouse = Warehouse.query.get_or_404(warehouse_id)

    warehouse.name = request.form.get("name", warehouse.name)
    warehouse.address = request.form.get("address", warehouse.address)
    warehouse.city = request.form.get("city", warehouse.city)
    warehouse.state = request.form.get("state", warehouse.state)
    warehouse.country = request.form.get("country", warehouse.country)
    warehouse.zip_code = request.form.get("zip_code", warehouse.zip_code)
    warehouse.capacity = int(request.form.get("capacity") or warehouse.capacity)
    warehouse.manager_name = request.form.get("manager_name", warehouse.manager_name)
    warehouse.manager_email = request.form.get("manager_email", warehouse.manager_email)
    warehouse.phone = request.form.get("phone", warehouse.phone)
    warehouse.is_active = "is_active" in request.form

    db.session.commit()
    flash("Warehouse updated successfully.", "success")
    return redirect(url_for("warehouse_detail", warehouse_id=warehouse.id))


@app.route("/warehouses/<int:warehouse_id>/delete", methods=["POST"])
def warehouse_delete(warehouse_id):
    warehouse = Warehouse.query.get_or_404(warehouse_id)
    InventoryItem.query.filter_by(warehouse_id=warehouse.id).delete()
    db.session.delete(warehouse)
    db.session.commit()
    flash("Warehouse deleted.", "success")
    return redirect(url_for("warehouses_list"))


@app.route("/warehouses/<int:warehouse_id>/inventory/add", methods=["POST"])
def inventory_add(warehouse_id):
    warehouse = Warehouse.query.get_or_404(warehouse_id)
    item = InventoryItem(
        sku=request.form["sku"],
        name=request.form["name"],
        category=request.form.get("category", ""),
        quantity=int(request.form.get("quantity") or 0),
        unit=request.form.get("unit", "units"),
        weight_per_unit=float(request.form.get("weight_per_unit") or 0),
        warehouse_id=warehouse.id,
        min_stock_level=int(request.form.get("min_stock_level") or 10),
        max_stock_level=int(request.form.get("max_stock_level") or 1000),
        reorder_point=int(request.form.get("reorder_point") or 50),
    )
    db.session.add(item)
    warehouse.current_occupancy += item.quantity
    db.session.commit()
    flash("Inventory item added.", "success")
    return redirect(url_for("warehouse_detail", warehouse_id=warehouse.id))


@app.route("/inventory/<int:item_id>/update", methods=["POST"])
def inventory_update(item_id):
    item = InventoryItem.query.get_or_404(item_id)
    old_qty = item.quantity

    item.name = request.form.get("name", item.name)
    item.category = request.form.get("category", item.category)
    item.quantity = int(request.form.get("quantity") or item.quantity)
    item.unit = request.form.get("unit", item.unit)
    item.weight_per_unit = float(request.form.get("weight_per_unit") or item.weight_per_unit)
    item.min_stock_level = int(request.form.get("min_stock_level") or item.min_stock_level)
    item.max_stock_level = int(request.form.get("max_stock_level") or item.max_stock_level)
    item.reorder_point = int(request.form.get("reorder_point") or item.reorder_point)

    diff = item.quantity - old_qty
    item.warehouse.current_occupancy += diff
    if item.quantity > old_qty:
        item.last_restocked = datetime.now(timezone.utc)

    db.session.commit()
    flash("Inventory updated.", "success")
    return redirect(url_for("warehouse_detail", warehouse_id=item.warehouse_id))


@app.route("/inventory/<int:item_id>/delete", methods=["POST"])
def inventory_delete(item_id):
    item = InventoryItem.query.get_or_404(item_id)
    wid = item.warehouse_id
    item.warehouse.current_occupancy -= item.quantity
    db.session.delete(item)
    db.session.commit()
    flash("Inventory item deleted.", "success")
    return redirect(url_for("warehouse_detail", warehouse_id=wid))


# ──────────────────────────── Vehicles ────────────────────────────


@app.route("/vehicles")
def vehicles_list():
    status_filter = request.args.get("status", "")
    query = Vehicle.query
    if status_filter:
        query = query.filter_by(status=status_filter)
    vehicles = query.order_by(Vehicle.created_at.desc()).all()
    return render_template("vehicles.html", vehicles=vehicles, status_filter=status_filter)


@app.route("/vehicles/create", methods=["POST"])
def vehicle_create():
    vehicle = Vehicle(
        plate_number=request.form["plate_number"],
        vehicle_type=request.form["vehicle_type"],
        make=request.form.get("make", ""),
        model=request.form.get("model", ""),
        year=int(request.form.get("year") or 0) or None,
        capacity_kg=float(request.form.get("capacity_kg") or 5000),
        capacity_cbm=float(request.form.get("capacity_cbm") or 30),
        driver_name=request.form.get("driver_name", ""),
        driver_phone=request.form.get("driver_phone", ""),
        driver_license=request.form.get("driver_license", ""),
        fuel_type=request.form.get("fuel_type", "diesel"),
        mileage=float(request.form.get("mileage") or 0),
    )
    db.session.add(vehicle)
    db.session.commit()
    flash("Vehicle added successfully.", "success")
    return redirect(url_for("vehicle_detail", vehicle_id=vehicle.id))


@app.route("/vehicles/<int:vehicle_id>")
def vehicle_detail(vehicle_id):
    vehicle = Vehicle.query.get_or_404(vehicle_id)
    return render_template("vehicle_detail.html", vehicle=vehicle)


@app.route("/vehicles/<int:vehicle_id>/update", methods=["POST"])
def vehicle_update(vehicle_id):
    vehicle = Vehicle.query.get_or_404(vehicle_id)

    vehicle.vehicle_type = request.form.get("vehicle_type", vehicle.vehicle_type)
    vehicle.make = request.form.get("make", vehicle.make)
    vehicle.model = request.form.get("model", vehicle.model)
    vehicle.year = int(request.form.get("year") or 0) or vehicle.year
    vehicle.capacity_kg = float(request.form.get("capacity_kg") or vehicle.capacity_kg)
    vehicle.capacity_cbm = float(request.form.get("capacity_cbm") or vehicle.capacity_cbm)
    vehicle.driver_name = request.form.get("driver_name", vehicle.driver_name)
    vehicle.driver_phone = request.form.get("driver_phone", vehicle.driver_phone)
    vehicle.driver_license = request.form.get("driver_license", vehicle.driver_license)
    vehicle.status = request.form.get("status", vehicle.status)
    vehicle.fuel_type = request.form.get("fuel_type", vehicle.fuel_type)
    vehicle.mileage = float(request.form.get("mileage") or vehicle.mileage)
    vehicle.is_active = "is_active" in request.form

    if request.form.get("last_maintenance"):
        vehicle.last_maintenance = _parse_dt(request.form["last_maintenance"])
    if request.form.get("next_maintenance"):
        vehicle.next_maintenance = _parse_dt(request.form["next_maintenance"])

    db.session.commit()
    flash("Vehicle updated successfully.", "success")
    return redirect(url_for("vehicle_detail", vehicle_id=vehicle.id))


@app.route("/vehicles/<int:vehicle_id>/delete", methods=["POST"])
def vehicle_delete(vehicle_id):
    vehicle = Vehicle.query.get_or_404(vehicle_id)
    db.session.delete(vehicle)
    db.session.commit()
    flash("Vehicle deleted.", "success")
    return redirect(url_for("vehicles_list"))


# ──────────────────────────── Reports ────────────────────────────


@app.route("/reports")
def reports():
    total_shipments = Shipment.query.count()
    delivered = Shipment.query.filter_by(status="delivered").count()
    in_transit = Shipment.query.filter_by(status="in_transit").count()
    cancelled = Shipment.query.filter_by(status="cancelled").count()

    total_orders = Order.query.count()
    total_revenue = db.session.query(db.func.sum(Order.actual_cost)).scalar() or 0
    total_estimated = db.session.query(db.func.sum(Order.estimated_cost)).scalar() or 0
    avg_order_value = (total_revenue / total_orders) if total_orders else 0

    total_weight = db.session.query(db.func.sum(Shipment.total_weight_kg)).scalar() or 0
    total_cost = db.session.query(db.func.sum(Shipment.cost)).scalar() or 0

    warehouses = Warehouse.query.filter_by(is_active=True).all()
    warehouse_data = []
    for w in warehouses:
        item_count = InventoryItem.query.filter_by(warehouse_id=w.id).count()
        total_qty = db.session.query(db.func.sum(InventoryItem.quantity)).filter_by(warehouse_id=w.id).scalar() or 0
        low_stock = InventoryItem.query.filter(
            InventoryItem.warehouse_id == w.id,
            InventoryItem.quantity <= InventoryItem.min_stock_level,
        ).count()
        warehouse_data.append({
            "warehouse": w,
            "item_count": item_count,
            "total_quantity": total_qty,
            "low_stock": low_stock,
        })

    vehicles = Vehicle.query.filter_by(is_active=True).all()
    vehicle_statuses = {}
    for v in vehicles:
        vehicle_statuses[v.status] = vehicle_statuses.get(v.status, 0) + 1

    top_destinations = (
        db.session.query(
            Shipment.destination_city, db.func.count(Shipment.id).label("cnt")
        )
        .group_by(Shipment.destination_city)
        .order_by(db.text("cnt DESC"))
        .limit(5)
        .all()
    )

    priority_breakdown = {}
    for p in ["low", "normal", "high", "urgent"]:
        priority_breakdown[p] = Order.query.filter_by(priority=p).count()

    return render_template(
        "reports.html",
        total_shipments=total_shipments,
        delivered=delivered,
        in_transit=in_transit,
        cancelled=cancelled,
        total_orders=total_orders,
        total_revenue=total_revenue,
        total_estimated=total_estimated,
        avg_order_value=avg_order_value,
        total_weight=total_weight,
        total_cost=total_cost,
        warehouse_data=warehouse_data,
        vehicle_statuses=vehicle_statuses,
        top_destinations=top_destinations,
        priority_breakdown=priority_breakdown,
    )


# ──────────────────────────── API (JSON) ────────────────────────────


@app.route("/api/shipments/<tracking_number>")
def api_track_shipment(tracking_number):
    shipment = Shipment.query.filter_by(tracking_number=tracking_number).first()
    if not shipment:
        return jsonify({"error": "Shipment not found"}), 404
    events = [
        {
            "status": e.status,
            "location": e.location,
            "description": e.description,
            "timestamp": e.timestamp.isoformat() if e.timestamp else None,
        }
        for e in shipment.tracking_events
    ]
    return jsonify(
        {
            "tracking_number": shipment.tracking_number,
            "status": shipment.status,
            "origin": shipment.origin_city,
            "destination": shipment.destination_city,
            "events": events,
        }
    )


@app.route("/api/dashboard/stats")
def api_dashboard_stats():
    shipment_statuses = {}
    for status in ["pending", "processing", "picked_up", "in_transit", "delivered", "cancelled"]:
        shipment_statuses[status] = Shipment.query.filter_by(status=status).count()

    order_statuses = {}
    for status in ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]:
        order_statuses[status] = Order.query.filter_by(status=status).count()

    return jsonify({"shipment_statuses": shipment_statuses, "order_statuses": order_statuses})


# ──────────────────────────── Helpers ────────────────────────────


def _parse_dt(value):
    if not value:
        return None
    for fmt in ("%Y-%m-%dT%H:%M", "%Y-%m-%d %H:%M", "%Y-%m-%d"):
        try:
            return datetime.strptime(value, fmt).replace(tzinfo=timezone.utc)
        except ValueError:
            continue
    return None


# ──────────────────────────── Main ────────────────────────────

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
