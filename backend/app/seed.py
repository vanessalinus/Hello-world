"""Seed the database with sample data for demonstration."""
import uuid
from datetime import datetime, timedelta, timezone

from sqlalchemy.orm import Session

from app.models.shipment import Shipment, ShipmentStatus, ShipmentPriority
from app.models.inventory import InventoryItem, ItemCategory
from app.models.warehouse import Warehouse, WarehouseStatus
from app.models.vehicle import Vehicle, VehicleType, VehicleStatus


def seed_database(db: Session) -> None:
    if db.query(Warehouse).count() > 0:
        return

    now = datetime.now(timezone.utc)

    warehouses = [
        Warehouse(
            id=str(uuid.uuid4()), name="Central Distribution Hub", code="CDH-001",
            status=WarehouseStatus.ACTIVE, address="1200 Logistics Blvd",
            city="Chicago", state="Illinois", country="United States", postal_code="60601",
            latitude=41.8781, longitude=-87.6298,
            total_capacity=50000, used_capacity=32000,
            manager_name="Sarah Johnson", manager_phone="+1-312-555-0100",
            manager_email="s.johnson@logistics.com", operating_hours="24/7",
        ),
        Warehouse(
            id=str(uuid.uuid4()), name="West Coast Fulfillment", code="WCF-002",
            status=WarehouseStatus.ACTIVE, address="8800 Harbor Way",
            city="Los Angeles", state="California", country="United States", postal_code="90012",
            latitude=34.0522, longitude=-118.2437,
            total_capacity=40000, used_capacity=28500,
            manager_name="Mike Chen", manager_phone="+1-213-555-0200",
            manager_email="m.chen@logistics.com", operating_hours="Mon-Sat 6AM-10PM",
        ),
        Warehouse(
            id=str(uuid.uuid4()), name="East Coast Warehouse", code="ECW-003",
            status=WarehouseStatus.ACTIVE, address="500 Terminal Rd",
            city="Newark", state="New Jersey", country="United States", postal_code="07102",
            latitude=40.7357, longitude=-74.1724,
            total_capacity=35000, used_capacity=21000,
            manager_name="Lisa Park", manager_phone="+1-973-555-0300",
            manager_email="l.park@logistics.com", operating_hours="Mon-Fri 7AM-9PM",
        ),
        Warehouse(
            id=str(uuid.uuid4()), name="European Hub", code="EUR-004",
            status=WarehouseStatus.ACTIVE, address="Havenweg 42",
            city="Rotterdam", country="Netherlands", postal_code="3089 JH",
            latitude=51.9244, longitude=4.4777,
            total_capacity=45000, used_capacity=18000,
            manager_name="Hans Mueller", manager_phone="+31-10-555-0400",
            manager_email="h.mueller@logistics.com", operating_hours="Mon-Sat 6AM-8PM",
        ),
        Warehouse(
            id=str(uuid.uuid4()), name="Asia-Pacific Center", code="APC-005",
            status=WarehouseStatus.ACTIVE, address="88 Shipping Lane",
            city="Singapore", country="Singapore", postal_code="018989",
            latitude=1.3521, longitude=103.8198,
            total_capacity=60000, used_capacity=42000,
            manager_name="Wei Lin", manager_phone="+65-6555-0500",
            manager_email="w.lin@logistics.com", operating_hours="24/7",
        ),
    ]
    db.add_all(warehouses)
    db.flush()

    vehicles = [
        Vehicle(
            id=str(uuid.uuid4()), registration_number="TRK-4521", vehicle_type=VehicleType.TRUCK,
            status=VehicleStatus.AVAILABLE, make="Volvo", model="FH16", year=2023,
            capacity_kg=25000, capacity_volume_m3=80, fuel_type="Diesel", fuel_efficiency=3.2,
            current_location="Chicago, IL", home_warehouse_id=warehouses[0].id,
            driver_name="James Wilson", driver_phone="+1-312-555-1001", driver_license="CDL-A-12345",
            mileage_km=45200, last_maintenance=now - timedelta(days=30),
            next_maintenance=now + timedelta(days=60),
        ),
        Vehicle(
            id=str(uuid.uuid4()), registration_number="VAN-8834", vehicle_type=VehicleType.VAN,
            status=VehicleStatus.IN_TRANSIT, make="Mercedes-Benz", model="Sprinter", year=2024,
            capacity_kg=3500, capacity_volume_m3=14, fuel_type="Diesel", fuel_efficiency=8.5,
            current_location="Highway I-90, Indiana", home_warehouse_id=warehouses[0].id,
            driver_name="Robert Davis", driver_phone="+1-312-555-1002", driver_license="CDL-B-67890",
            mileage_km=12800,
        ),
        Vehicle(
            id=str(uuid.uuid4()), registration_number="TRK-6677", vehicle_type=VehicleType.TRUCK,
            status=VehicleStatus.AVAILABLE, make="Kenworth", model="T680", year=2022,
            capacity_kg=30000, capacity_volume_m3=95, fuel_type="Diesel", fuel_efficiency=2.9,
            current_location="Los Angeles, CA", home_warehouse_id=warehouses[1].id,
            driver_name="Carlos Rodriguez", driver_phone="+1-213-555-2001", driver_license="CDL-A-11111",
            mileage_km=89000,
        ),
        Vehicle(
            id=str(uuid.uuid4()), registration_number="SHP-0012", vehicle_type=VehicleType.SHIP,
            status=VehicleStatus.IN_TRANSIT, make="Maersk", model="Triple-E", year=2020,
            capacity_kg=200000000, capacity_volume_m3=18000, fuel_type="Heavy Fuel Oil",
            current_location="Pacific Ocean", home_warehouse_id=warehouses[1].id,
            driver_name="Captain Erik Larsen", driver_phone="+1-213-555-2002",
            mileage_km=320000,
        ),
        Vehicle(
            id=str(uuid.uuid4()), registration_number="AIR-3309", vehicle_type=VehicleType.AIRPLANE,
            status=VehicleStatus.AVAILABLE, make="Boeing", model="747-8F", year=2021,
            capacity_kg=137000, capacity_volume_m3=858, fuel_type="Jet A-1",
            current_location="Newark, NJ", home_warehouse_id=warehouses[2].id,
            driver_name="Captain Maria Santos", driver_phone="+1-973-555-3001",
            mileage_km=1200000,
        ),
        Vehicle(
            id=str(uuid.uuid4()), registration_number="VAN-1122", vehicle_type=VehicleType.VAN,
            status=VehicleStatus.MAINTENANCE, make="Ford", model="Transit", year=2023,
            capacity_kg=2800, capacity_volume_m3=12, fuel_type="Gasoline", fuel_efficiency=9.0,
            current_location="Newark Service Center", home_warehouse_id=warehouses[2].id,
            driver_name="Tom Baker", driver_phone="+1-973-555-3002", driver_license="CDL-B-22222",
            mileage_km=34000, notes="Brake pad replacement in progress",
        ),
        Vehicle(
            id=str(uuid.uuid4()), registration_number="TRN-7788", vehicle_type=VehicleType.TRAIN,
            status=VehicleStatus.AVAILABLE, make="Siemens", model="Vectron", year=2022,
            capacity_kg=2000000, capacity_volume_m3=5000, fuel_type="Electric",
            current_location="Rotterdam Terminal", home_warehouse_id=warehouses[3].id,
            driver_name="Jan de Vries", driver_phone="+31-10-555-4001",
            mileage_km=180000,
        ),
        Vehicle(
            id=str(uuid.uuid4()), registration_number="DRN-0044", vehicle_type=VehicleType.DRONE,
            status=VehicleStatus.AVAILABLE, make="DJI", model="FlyCart 30", year=2025,
            capacity_kg=30, capacity_volume_m3=0.3, fuel_type="Electric",
            current_location="Singapore Hub", home_warehouse_id=warehouses[4].id,
            driver_name="Autonomous", mileage_km=1200,
        ),
    ]
    db.add_all(vehicles)
    db.flush()

    cities = [
        ("New York", "United States"), ("London", "United Kingdom"), ("Tokyo", "Japan"),
        ("Sydney", "Australia"), ("Berlin", "Germany"), ("Toronto", "Canada"),
        ("Dubai", "UAE"), ("Mumbai", "India"), ("Sao Paulo", "Brazil"),
        ("Shanghai", "China"), ("Paris", "France"), ("Seoul", "South Korea"),
    ]

    statuses = list(ShipmentStatus)
    priorities = list(ShipmentPriority)

    shipments = []
    for i in range(25):
        origin = cities[i % len(cities)]
        dest = cities[(i + 3) % len(cities)]
        status = statuses[i % len(statuses)]
        priority = priorities[i % len(priorities)]
        created = now - timedelta(days=25 - i, hours=i * 2)

        s = Shipment(
            id=str(uuid.uuid4()),
            tracking_number=f"LOG-{uuid.uuid4().hex[:10].upper()}",
            status=status, priority=priority,
            origin_address=f"{100 + i * 10} Warehouse St",
            origin_city=origin[0], origin_country=origin[1],
            destination_address=f"{200 + i * 5} Delivery Ave",
            destination_city=dest[0], destination_country=dest[1],
            sender_name=f"Sender {i + 1}", sender_phone=f"+1-555-{1000 + i}",
            sender_email=f"sender{i + 1}@example.com",
            recipient_name=f"Recipient {i + 1}", recipient_phone=f"+1-555-{2000 + i}",
            recipient_email=f"recipient{i + 1}@example.com",
            weight_kg=round(5 + i * 2.5, 1), item_count=1 + (i % 5),
            description=f"Package #{i + 1}",
            vehicle_id=vehicles[i % len(vehicles)].id,
            warehouse_id=warehouses[i % len(warehouses)].id,
            estimated_delivery=created + timedelta(days=5),
            cost=round(50 + i * 35.5, 2),
            created_at=created,
        )
        if status == ShipmentStatus.DELIVERED:
            s.shipped_at = created + timedelta(days=1)
            s.actual_delivery = created + timedelta(days=4)
        elif status in (ShipmentStatus.IN_TRANSIT, ShipmentStatus.OUT_FOR_DELIVERY):
            s.shipped_at = created + timedelta(days=1)
        shipments.append(s)

    db.add_all(shipments)

    categories = list(ItemCategory)
    item_names = [
        "Wireless Headphones", "Cotton T-Shirt Pack", "Organic Coffee Beans",
        "Office Desk Chair", "Car Battery", "First Aid Kit",
        "Industrial Cleaner", "Crystal Vase Set", "Laptop Stand",
        "Bluetooth Speaker", "Winter Jacket", "Green Tea Set",
        "Bookshelf", "Brake Pads", "Blood Pressure Monitor",
        "Paint Thinner", "Porcelain Plates", "USB-C Hub",
        "Running Shoes", "Protein Bars",
    ]
    inventory_items = []
    for i, name in enumerate(item_names):
        cat = categories[i % len(categories)]
        qty = 5 + (i * 13) % 200
        min_q = 10
        item = InventoryItem(
            id=str(uuid.uuid4()),
            sku=f"SKU-{1000 + i:05d}",
            name=name, category=cat,
            quantity=qty, min_quantity=min_q, max_quantity=500,
            unit_price=round(9.99 + i * 15.5, 2),
            weight_kg=round(0.5 + i * 0.3, 1),
            warehouse_id=warehouses[i % len(warehouses)].id,
            location_in_warehouse=f"Aisle {(i % 10) + 1}, Rack {(i % 5) + 1}",
            supplier_name=f"Supplier {(i % 5) + 1}",
            supplier_contact=f"supplier{(i % 5) + 1}@supply.com",
        )
        inventory_items.append(item)

    db.add_all(inventory_items)
    db.commit()
