from datetime import datetime, timedelta

from app.database import SessionLocal, engine, Base
from app.models import (
    Customer,
    InventoryItem,
    Order,
    OrderItem,
    OrderStatus,
    Shipment,
    ShipmentStatus,
    Vehicle,
    VehicleStatus,
    Warehouse,
)


def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    if db.query(Warehouse).first():
        db.close()
        return

    warehouses = [
        Warehouse(
            name="Central Distribution Hub",
            code="WH-NYC-01",
            address="450 Logistics Parkway",
            city="New York",
            country="USA",
            capacity_sqm=15000,
            manager_name="Sarah Mitchell",
            phone="+1-212-555-0101",
        ),
        Warehouse(
            name="West Coast Fulfillment",
            code="WH-LAX-01",
            address="890 Harbor Industrial Blvd",
            city="Los Angeles",
            country="USA",
            capacity_sqm=12000,
            manager_name="James Chen",
            phone="+1-310-555-0202",
        ),
        Warehouse(
            name="European Logistics Center",
            code="WH-AMS-01",
            address="12 Schiphol Logistics Park",
            city="Amsterdam",
            country="Netherlands",
            capacity_sqm=10000,
            manager_name="Elena van Berg",
            phone="+31-20-555-0303",
        ),
    ]
    db.add_all(warehouses)
    db.flush()

    inventory = [
        InventoryItem(
            sku="ELEC-001",
            name="Wireless Bluetooth Headphones",
            description="Premium noise-cancelling headphones",
            quantity=450,
            unit="pcs",
            reorder_level=50,
            unit_price=79.99,
            warehouse_id=warehouses[0].id,
        ),
        InventoryItem(
            sku="ELEC-002",
            name="USB-C Charging Cable 2m",
            description="Fast charging braided cable",
            quantity=1200,
            unit="pcs",
            reorder_level=200,
            unit_price=12.99,
            warehouse_id=warehouses[0].id,
        ),
        InventoryItem(
            sku="HOME-001",
            name="Stainless Steel Water Bottle",
            description="Insulated 750ml bottle",
            quantity=8,
            unit="pcs",
            reorder_level=25,
            unit_price=24.99,
            warehouse_id=warehouses[0].id,
        ),
        InventoryItem(
            sku="FURN-001",
            name="Ergonomic Office Chair",
            description="Adjustable lumbar support chair",
            quantity=85,
            unit="pcs",
            reorder_level=15,
            unit_price=299.99,
            warehouse_id=warehouses[1].id,
        ),
        InventoryItem(
            sku="PACK-001",
            name="Corrugated Shipping Box (Large)",
            description="60x40x40cm double-wall box",
            quantity=5000,
            unit="pcs",
            reorder_level=500,
            unit_price=2.49,
            warehouse_id=warehouses[1].id,
        ),
        InventoryItem(
            sku="CHEM-001",
            name="Industrial Cleaning Solution",
            description="5L concentrated cleaner",
            quantity=120,
            unit="liters",
            reorder_level=30,
            unit_price=45.00,
            warehouse_id=warehouses[2].id,
        ),
    ]
    db.add_all(inventory)
    db.flush()

    vehicles = [
        Vehicle(
            plate_number="TRK-NY-4521",
            type="Semi-Trailer Truck",
            capacity_kg=25000,
            status=VehicleStatus.IN_USE,
            driver_name="Michael Rodriguez",
            driver_phone="+1-917-555-1001",
        ),
        Vehicle(
            plate_number="VAN-LA-8834",
            type="Delivery Van",
            capacity_kg=3500,
            status=VehicleStatus.AVAILABLE,
            driver_name="Lisa Park",
            driver_phone="+1-424-555-1002",
        ),
        Vehicle(
            plate_number="TRK-AMS-2290",
            type="Box Truck",
            capacity_kg=12000,
            status=VehicleStatus.AVAILABLE,
            driver_name="Hans Mueller",
            driver_phone="+31-6-555-1003",
        ),
        Vehicle(
            plate_number="VAN-NY-6612",
            type="Delivery Van",
            capacity_kg=2500,
            status=VehicleStatus.MAINTENANCE,
            driver_name="David Kim",
            driver_phone="+1-646-555-1004",
        ),
    ]
    db.add_all(vehicles)
    db.flush()

    customers = [
        Customer(
            name="TechMart Retail Inc.",
            email="orders@techmart.com",
            phone="+1-800-555-2001",
            address="100 Commerce Street",
            city="Chicago",
            country="USA",
        ),
        Customer(
            name="GreenHome Supplies",
            email="procurement@greenhome.com",
            phone="+1-415-555-2002",
            address="55 Eco Boulevard",
            city="San Francisco",
            country="USA",
        ),
        Customer(
            name="EuroOffice GmbH",
            email="logistics@eurooffice.de",
            phone="+49-30-555-2003",
            address="Hauptstrasse 42",
            city="Berlin",
            country="Germany",
        ),
    ]
    db.add_all(customers)
    db.flush()

    orders = [
        Order(
            order_number="ORD-2026-00001",
            customer_id=customers[0].id,
            status=OrderStatus.SHIPPED,
            total_amount=1599.80,
            origin_warehouse_id=warehouses[0].id,
            destination_address="100 Commerce Street",
            destination_city="Chicago",
            destination_country="USA",
            notes="Priority delivery requested",
        ),
        Order(
            order_number="ORD-2026-00002",
            customer_id=customers[1].id,
            status=OrderStatus.PROCESSING,
            total_amount=749.97,
            origin_warehouse_id=warehouses[1].id,
            destination_address="55 Eco Boulevard",
            destination_city="San Francisco",
            destination_country="USA",
        ),
        Order(
            order_number="ORD-2026-00003",
            customer_id=customers[2].id,
            status=OrderStatus.CONFIRMED,
            total_amount=5400.00,
            origin_warehouse_id=warehouses[2].id,
            destination_address="Hauptstrasse 42",
            destination_city="Berlin",
            destination_country="Germany",
        ),
        Order(
            order_number="ORD-2026-00004",
            customer_id=customers[0].id,
            status=OrderStatus.DRAFT,
            total_amount=259.96,
            origin_warehouse_id=warehouses[0].id,
            destination_address="100 Commerce Street",
            destination_city="Chicago",
            destination_country="USA",
        ),
    ]
    db.add_all(orders)
    db.flush()

    order_items = [
        OrderItem(
            order_id=orders[0].id,
            inventory_item_id=inventory[0].id,
            quantity=20,
            unit_price=79.99,
        ),
        OrderItem(
            order_id=orders[1].id,
            inventory_item_id=inventory[3].id,
            quantity=2,
            unit_price=299.99,
        ),
        OrderItem(
            order_id=orders[1].id,
            inventory_item_id=inventory[4].id,
            quantity=50,
            unit_price=2.49,
        ),
        OrderItem(
            order_id=orders[2].id,
            inventory_item_id=inventory[5].id,
            quantity=120,
            unit_price=45.00,
        ),
    ]
    db.add_all(order_items)

    shipments = [
        Shipment(
            tracking_number="SHP-2026-00001",
            order_id=orders[0].id,
            vehicle_id=vehicles[0].id,
            status=ShipmentStatus.IN_TRANSIT,
            origin="New York, USA",
            destination="Chicago, USA",
            weight_kg=450.0,
            estimated_delivery=datetime.utcnow() + timedelta(days=2),
            notes="En route via I-80",
        ),
        Shipment(
            tracking_number="SHP-2026-00002",
            order_id=None,
            vehicle_id=vehicles[2].id,
            status=ShipmentStatus.PENDING,
            origin="Amsterdam, Netherlands",
            destination="Berlin, Germany",
            weight_kg=1200.0,
            estimated_delivery=datetime.utcnow() + timedelta(days=4),
        ),
        Shipment(
            tracking_number="SHP-2026-00003",
            order_id=None,
            vehicle_id=None,
            status=ShipmentStatus.DELIVERED,
            origin="Los Angeles, USA",
            destination="Phoenix, USA",
            weight_kg=800.0,
            estimated_delivery=datetime.utcnow() - timedelta(days=1),
            actual_delivery=datetime.utcnow() - timedelta(hours=6),
        ),
    ]
    db.add_all(shipments)
    db.commit()
    db.close()
