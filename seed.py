"""Populate the database with realistic demo data."""

import random
from datetime import datetime, timedelta, timezone

from app import app, db
from models import (
    InventoryItem,
    Order,
    Shipment,
    TrackingEvent,
    Vehicle,
    Warehouse,
)


def seed():
    with app.app_context():
        db.drop_all()
        db.create_all()

        warehouses = [
            Warehouse(
                name="East Coast Distribution Center",
                code="WH-EC01",
                address="1200 Logistics Parkway",
                city="Newark",
                state="New Jersey",
                country="USA",
                zip_code="07102",
                capacity=15000,
                current_occupancy=8420,
                manager_name="Sarah Mitchell",
                manager_email="s.mitchell@logitrack.com",
                phone="+1 (201) 555-0142",
            ),
            Warehouse(
                name="West Coast Hub",
                code="WH-WC01",
                address="8800 Harbor Boulevard",
                city="Long Beach",
                state="California",
                country="USA",
                zip_code="90802",
                capacity=20000,
                current_occupancy=14200,
                manager_name="David Chen",
                manager_email="d.chen@logitrack.com",
                phone="+1 (562) 555-0198",
            ),
            Warehouse(
                name="Midwest Fulfillment Center",
                code="WH-MW01",
                address="3500 Commerce Drive",
                city="Chicago",
                state="Illinois",
                country="USA",
                zip_code="60601",
                capacity=12000,
                current_occupancy=5600,
                manager_name="James Rodriguez",
                manager_email="j.rodriguez@logitrack.com",
                phone="+1 (312) 555-0167",
            ),
            Warehouse(
                name="Southern Regional Depot",
                code="WH-SR01",
                address="4100 Interstate Loop",
                city="Atlanta",
                state="Georgia",
                country="USA",
                zip_code="30301",
                capacity=10000,
                current_occupancy=7800,
                manager_name="Angela Foster",
                manager_email="a.foster@logitrack.com",
                phone="+1 (404) 555-0234",
            ),
            Warehouse(
                name="Pacific Northwest Center",
                code="WH-PNW1",
                address="2200 Industrial Way",
                city="Seattle",
                state="Washington",
                country="USA",
                zip_code="98101",
                capacity=8000,
                current_occupancy=3200,
                manager_name="Kevin Park",
                manager_email="k.park@logitrack.com",
                phone="+1 (206) 555-0311",
            ),
        ]
        db.session.add_all(warehouses)
        db.session.flush()

        vehicles = [
            Vehicle(plate_number="TRK-4821", vehicle_type="truck", make="Volvo", model="FH16", year=2023, capacity_kg=18000, capacity_cbm=80, driver_name="Mike Johnson", driver_phone="+1 (555) 101-0001", driver_license="CDL-A-29481", status="on_trip", fuel_type="diesel", mileage=45200),
            Vehicle(plate_number="TRK-7734", vehicle_type="truck", make="Freightliner", model="Cascadia", year=2024, capacity_kg=20000, capacity_cbm=90, driver_name="Carlos Ramirez", driver_phone="+1 (555) 101-0002", driver_license="CDL-A-31052", status="available", fuel_type="diesel", mileage=12800),
            Vehicle(plate_number="VAN-1156", vehicle_type="van", make="Mercedes-Benz", model="Sprinter", year=2024, capacity_kg=3500, capacity_cbm=14, driver_name="Lisa Wang", driver_phone="+1 (555) 101-0003", driver_license="DL-882104", status="available", fuel_type="diesel", mileage=8400),
            Vehicle(plate_number="TRK-9902", vehicle_type="truck", make="Kenworth", model="T680", year=2022, capacity_kg=22000, capacity_cbm=95, driver_name="Robert Davis", driver_phone="+1 (555) 101-0004", driver_license="CDL-A-27635", status="on_trip", fuel_type="diesel", mileage=78300),
            Vehicle(plate_number="VAN-3341", vehicle_type="van", make="Ford", model="Transit", year=2025, capacity_kg=2800, capacity_cbm=12, driver_name="Emma Thompson", driver_phone="+1 (555) 101-0005", driver_license="DL-994210", status="available", fuel_type="gasoline", mileage=3100),
            Vehicle(plate_number="TRK-5567", vehicle_type="truck", make="Peterbilt", model="579", year=2023, capacity_kg=19000, capacity_cbm=85, driver_name="Ahmed Hassan", driver_phone="+1 (555) 101-0006", driver_license="CDL-A-30198", status="maintenance", fuel_type="diesel", mileage=62100, last_maintenance=datetime(2026, 5, 15, tzinfo=timezone.utc)),
            Vehicle(plate_number="TRL-2289", vehicle_type="trailer", make="Wabash", model="DuraPlate", year=2021, capacity_kg=25000, capacity_cbm=110, driver_name="Tom Wilson", driver_phone="+1 (555) 101-0007", driver_license="CDL-A-25403", status="available", fuel_type="diesel", mileage=92400),
            Vehicle(plate_number="VAN-6678", vehicle_type="van", make="RAM", model="ProMaster", year=2024, capacity_kg=3000, capacity_cbm=13, driver_name="Jessica Lee", driver_phone="+1 (555) 101-0008", driver_license="DL-775301", status="on_trip", fuel_type="gasoline", mileage=15700),
            Vehicle(plate_number="TRK-1134", vehicle_type="truck", make="Mack", model="Anthem", year=2023, capacity_kg=21000, capacity_cbm=88, driver_name="Patrick O'Brien", driver_phone="+1 (555) 101-0009", driver_license="CDL-A-28947", status="available", fuel_type="diesel", mileage=38500),
            Vehicle(plate_number="PKP-8845", vehicle_type="pickup", make="Ford", model="F-350", year=2025, capacity_kg=1500, capacity_cbm=5, driver_name="Nina Patel", driver_phone="+1 (555) 101-0010", driver_license="DL-660488", status="available", fuel_type="gasoline", mileage=1200),
        ]
        db.session.add_all(vehicles)
        db.session.flush()

        now = datetime.now(timezone.utc)
        cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Miami", "Dallas", "Denver", "Seattle", "Boston", "Atlanta", "San Francisco", "Philadelphia", "Portland"]
        customers = [
            ("Acme Corp", "orders@acmecorp.com", "+1 (555) 200-0001"),
            ("Global Trade Inc", "logistics@globaltrade.com", "+1 (555) 200-0002"),
            ("TechFlow Solutions", "shipping@techflow.io", "+1 (555) 200-0003"),
            ("Summit Manufacturing", "ops@summitmfg.com", "+1 (555) 200-0004"),
            ("Riverside Electronics", "supply@riverside-elec.com", "+1 (555) 200-0005"),
            ("Pacific Imports LLC", "imports@pacificllc.com", "+1 (555) 200-0006"),
            ("Atlas Distribution", "orders@atlasdist.com", "+1 (555) 200-0007"),
            ("Horizon Retail Group", "fulfillment@horizonretail.com", "+1 (555) 200-0008"),
            ("Vertex Pharmaceuticals", "logistics@vertexpharma.com", "+1 (555) 200-0009"),
            ("Maple Leaf Foods", "distribution@mapleleaf.ca", "+1 (555) 200-0010"),
        ]

        statuses_shipment = ["pending", "processing", "picked_up", "in_transit", "delivered", "delivered", "delivered", "in_transit", "cancelled"]
        shipments_data = []
        for i in range(25):
            origin_city = random.choice(cities)
            dest_city = random.choice([c for c in cities if c != origin_city])
            status = random.choice(statuses_shipment)
            created = now - timedelta(days=random.randint(1, 45), hours=random.randint(0, 23))
            weight = round(random.uniform(200, 15000), 1)
            volume = round(random.uniform(2, 60), 1)

            s = Shipment(
                tracking_number=f"SHP-{random.randint(10000000, 99999999):08X}"[:12],
                origin=f"{random.randint(100,9999)} Shipping Rd",
                origin_city=origin_city,
                destination=f"{random.randint(100,9999)} Delivery Ave",
                destination_city=dest_city,
                status=status,
                total_weight_kg=weight,
                total_volume_cbm=volume,
                vehicle_id=random.choice(vehicles).id,
                warehouse_id=random.choice(warehouses).id,
                estimated_departure=created + timedelta(days=1),
                actual_departure=created + timedelta(days=1, hours=random.randint(1, 8)) if status not in ["pending"] else None,
                estimated_arrival=created + timedelta(days=random.randint(3, 10)),
                actual_arrival=created + timedelta(days=random.randint(3, 8)) if status == "delivered" else None,
                cost=round(random.uniform(500, 8000), 2),
                created_at=created,
            )
            db.session.add(s)
            db.session.flush()
            shipments_data.append(s)

            event = TrackingEvent(shipment_id=s.id, status="pending", location=origin_city, description="Shipment created", timestamp=created)
            db.session.add(event)

            if status in ["processing", "picked_up", "in_transit", "delivered"]:
                db.session.add(TrackingEvent(shipment_id=s.id, status="processing", location=origin_city, description="Shipment is being processed", timestamp=created + timedelta(hours=random.randint(2, 12))))
            if status in ["picked_up", "in_transit", "delivered"]:
                db.session.add(TrackingEvent(shipment_id=s.id, status="picked_up", location=origin_city, description="Package picked up by carrier", timestamp=created + timedelta(days=1, hours=random.randint(1, 6))))
            if status in ["in_transit", "delivered"]:
                db.session.add(TrackingEvent(shipment_id=s.id, status="in_transit", location=random.choice(cities), description="In transit to destination", timestamp=created + timedelta(days=2, hours=random.randint(1, 12))))
            if status == "delivered":
                db.session.add(TrackingEvent(shipment_id=s.id, status="delivered", location=dest_city, description="Package delivered successfully", timestamp=created + timedelta(days=random.randint(3, 7))))

        order_statuses = ["pending", "confirmed", "processing", "shipped", "delivered", "delivered", "delivered", "shipped", "pending", "cancelled"]
        priorities = ["low", "normal", "normal", "normal", "high", "urgent"]
        for i in range(40):
            cust = random.choice(customers)
            origin_city = random.choice(cities)
            dest_city = random.choice([c for c in cities if c != origin_city])
            status = random.choice(order_statuses)
            priority = random.choice(priorities)
            created = now - timedelta(days=random.randint(0, 50), hours=random.randint(0, 23))
            weight = round(random.uniform(5, 2000), 1)
            est_cost = round(random.uniform(50, 5000), 2)

            o = Order(
                order_number=f"ORD-{random.randint(10000000, 99999999):08X}"[:12],
                customer_name=cust[0],
                customer_email=cust[1],
                customer_phone=cust[2],
                origin_address=f"{random.randint(100,9999)} Commerce Blvd",
                origin_city=origin_city,
                destination_address=f"{random.randint(100,9999)} Market Street",
                destination_city=dest_city,
                weight_kg=weight,
                volume_cbm=round(weight / 250, 1),
                item_count=random.randint(1, 50),
                item_description=random.choice(["Electronics", "Furniture", "Medical supplies", "Auto parts", "Food & Beverage", "Clothing", "Industrial equipment", "Office supplies", "Construction materials", "Consumer goods"]),
                priority=priority,
                status=status,
                estimated_cost=est_cost,
                actual_cost=round(est_cost * random.uniform(0.85, 1.15), 2) if status in ["delivered", "shipped"] else 0,
                order_date=created,
                estimated_delivery=created + timedelta(days=random.randint(3, 14)),
                actual_delivery=created + timedelta(days=random.randint(3, 10)) if status == "delivered" else None,
                shipment_id=random.choice(shipments_data).id if status in ["shipped", "delivered"] and random.random() > 0.3 else None,
                warehouse_id=random.choice(warehouses).id,
                created_at=created,
                notes=random.choice(["", "", "", "Fragile items - handle with care", "Temperature controlled", "Oversized load", "Express delivery requested"]),
            )
            db.session.add(o)

        inventory_categories = {
            "Electronics": [("LCD Monitors 27\"", "MON-27LCD", 2.5), ("Laptop Computers", "LAP-STD01", 1.8), ("Wireless Keyboards", "KBD-WL100", 0.4), ("USB-C Cables 2m", "CBL-UC200", 0.05)],
            "Automotive": [("Brake Pads Set", "AUT-BRK01", 1.2), ("Oil Filters", "AUT-OIL01", 0.3), ("Spark Plugs (4-pack)", "AUT-SPK04", 0.2), ("Wiper Blades", "AUT-WPR01", 0.15)],
            "Office": [("Copy Paper A4 (ream)", "OFF-PAP01", 2.5), ("Toner Cartridges", "OFF-TNR01", 0.8), ("Desk Organizers", "OFF-ORG01", 0.6), ("Sticky Notes Bulk", "OFF-STK01", 0.3)],
            "Industrial": [("Safety Helmets", "IND-HLM01", 0.4), ("Work Gloves (dozen)", "IND-GLV12", 0.6), ("LED Flashlights", "IND-LED01", 0.2), ("Cable Ties 1000pk", "IND-CTI01", 1.0)],
        }

        for wh in warehouses:
            for cat, items in inventory_categories.items():
                for name, sku, weight in items:
                    unique_sku = f"{sku}-{wh.code[-4:]}"
                    qty = random.randint(0, 500)
                    min_stock = random.choice([10, 20, 25, 50])
                    item = InventoryItem(
                        sku=unique_sku,
                        name=name,
                        category=cat,
                        quantity=qty,
                        unit="units",
                        weight_per_unit=weight,
                        warehouse_id=wh.id,
                        min_stock_level=min_stock,
                        max_stock_level=random.choice([500, 800, 1000]),
                        reorder_point=min_stock * 2,
                        last_restocked=now - timedelta(days=random.randint(1, 30)) if qty > 0 else None,
                    )
                    db.session.add(item)

        db.session.commit()
        print("Database seeded successfully!")
        print(f"  Warehouses:  {Warehouse.query.count()}")
        print(f"  Vehicles:    {Vehicle.query.count()}")
        print(f"  Shipments:   {Shipment.query.count()}")
        print(f"  Orders:      {Order.query.count()}")
        print(f"  Inventory:   {InventoryItem.query.count()}")


if __name__ == "__main__":
    seed()
