from datetime import datetime

from flask import (
    Blueprint,
    flash,
    jsonify,
    redirect,
    render_template,
    request,
    url_for,
)

from .models import (
    PRIORITY_LEVELS,
    SHIPMENT_STATUSES,
    VEHICLE_STATUSES,
    Driver,
    Shipment,
    Vehicle,
    db,
)

logistics_bp = Blueprint("logistics", __name__)


def _generate_tracking_number():
    sequence = Shipment.query.count() + 1
    date_token = datetime.utcnow().strftime("%Y%m%d")
    return f"TRK-{date_token}-{sequence:04d}"


@logistics_bp.route("/")
@logistics_bp.route("/dashboard")
def dashboard():
    shipments = Shipment.query.order_by(Shipment.created_at.desc()).all()
    status_counts = {status: 0 for status in SHIPMENT_STATUSES}
    for shipment in shipments:
        status_counts[shipment.status] = status_counts.get(shipment.status, 0) + 1

    stats = {
        "shipments_total": len(shipments),
        "shipments_in_transit": status_counts["in_transit"],
        "shipments_delivered": status_counts["delivered"],
        "active_drivers": Driver.query.filter_by(is_active=True).count(),
        "available_vehicles": Vehicle.query.filter_by(status="available").count(),
    }
    return render_template(
        "dashboard.html",
        stats=stats,
        recent_shipments=shipments[:6],
    )


@logistics_bp.route("/shipments")
def list_shipments():
    status_filter = request.args.get("status", "").strip()
    q = request.args.get("q", "").strip()

    shipments_query = Shipment.query
    if status_filter and status_filter in SHIPMENT_STATUSES:
        shipments_query = shipments_query.filter_by(status=status_filter)
    if q:
        like_term = f"%{q}%"
        shipments_query = shipments_query.filter(
            db.or_(
                Shipment.tracking_number.ilike(like_term),
                Shipment.customer_name.ilike(like_term),
                Shipment.origin.ilike(like_term),
                Shipment.destination.ilike(like_term),
            )
        )

    shipments = shipments_query.order_by(Shipment.created_at.desc()).all()
    return render_template(
        "shipments.html",
        shipments=shipments,
        statuses=SHIPMENT_STATUSES,
        selected_status=status_filter,
        query=q,
    )


@logistics_bp.route("/shipments/new", methods=["GET", "POST"])
def create_shipment():
    drivers = Driver.query.filter_by(is_active=True).order_by(Driver.name).all()
    vehicles = Vehicle.query.order_by(Vehicle.plate_number).all()

    if request.method == "POST":
        try:
            customer_name = request.form["customer_name"].strip()
            origin = request.form["origin"].strip()
            destination = request.form["destination"].strip()
            weight_kg = float(request.form["weight_kg"])
            priority = request.form["priority"]
            status = request.form["status"]
            eta_raw = request.form["eta"]
            notes = request.form.get("notes", "").strip()
            driver_id = request.form.get("driver_id") or None
            vehicle_id = request.form.get("vehicle_id") or None

            if not customer_name or not origin or not destination:
                raise ValueError("Customer, origin, and destination are required.")
            if priority not in PRIORITY_LEVELS:
                raise ValueError("Invalid priority selected.")
            if status not in SHIPMENT_STATUSES:
                raise ValueError("Invalid shipment status selected.")

            eta_value = datetime.strptime(eta_raw, "%Y-%m-%dT%H:%M")

            shipment = Shipment(
                tracking_number=_generate_tracking_number(),
                customer_name=customer_name,
                origin=origin,
                destination=destination,
                weight_kg=weight_kg,
                priority=priority,
                status=status,
                eta=eta_value,
                notes=notes,
                driver_id=int(driver_id) if driver_id else None,
                vehicle_id=int(vehicle_id) if vehicle_id else None,
            )
            db.session.add(shipment)
            db.session.commit()
            flash(f"Shipment {shipment.tracking_number} created.", "success")
            return redirect(url_for("logistics.list_shipments"))
        except ValueError as err:
            flash(str(err), "error")

    return render_template(
        "shipment_form.html",
        drivers=drivers,
        vehicles=vehicles,
        statuses=SHIPMENT_STATUSES,
        priorities=PRIORITY_LEVELS,
    )


@logistics_bp.route("/shipments/<int:shipment_id>/status", methods=["POST"])
def update_shipment_status(shipment_id):
    shipment = Shipment.query.get_or_404(shipment_id)
    next_status = request.form.get("status", "")

    if next_status not in SHIPMENT_STATUSES:
        flash("Invalid status.", "error")
        return redirect(url_for("logistics.list_shipments"))

    shipment.status = next_status
    db.session.commit()
    flash(f"{shipment.tracking_number} updated to {next_status}.", "success")
    return redirect(url_for("logistics.list_shipments"))


@logistics_bp.route("/drivers", methods=["GET", "POST"])
def drivers():
    if request.method == "POST":
        try:
            driver = Driver(
                name=request.form["name"].strip(),
                license_number=request.form["license_number"].strip(),
                phone=request.form["phone"].strip(),
            )
            if not driver.name or not driver.license_number or not driver.phone:
                raise ValueError("All driver fields are required.")
            db.session.add(driver)
            db.session.commit()
            flash("Driver added successfully.", "success")
            return redirect(url_for("logistics.drivers"))
        except ValueError as err:
            flash(str(err), "error")

    all_drivers = Driver.query.order_by(Driver.created_at.desc()).all()
    return render_template("drivers.html", drivers=all_drivers)


@logistics_bp.route("/vehicles", methods=["GET", "POST"])
def vehicles():
    if request.method == "POST":
        try:
            status = request.form["status"]
            if status not in VEHICLE_STATUSES:
                raise ValueError("Invalid vehicle status.")
            vehicle = Vehicle(
                plate_number=request.form["plate_number"].strip(),
                vehicle_type=request.form["vehicle_type"].strip(),
                capacity_kg=float(request.form["capacity_kg"]),
                status=status,
            )
            if not vehicle.plate_number or not vehicle.vehicle_type:
                raise ValueError("Vehicle fields are required.")
            db.session.add(vehicle)
            db.session.commit()
            flash("Vehicle added successfully.", "success")
            return redirect(url_for("logistics.vehicles"))
        except ValueError as err:
            flash(str(err), "error")

    all_vehicles = Vehicle.query.order_by(Vehicle.created_at.desc()).all()
    return render_template("vehicles.html", vehicles=all_vehicles, statuses=VEHICLE_STATUSES)


@logistics_bp.route("/api/shipments")
def shipments_api():
    shipments = Shipment.query.order_by(Shipment.updated_at.desc()).all()
    return jsonify([shipment.to_dict() for shipment in shipments])
