from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import (
    customers,
    dashboard,
    inventory,
    orders,
    shipments,
    vehicles,
    warehouses,
)
from app.seed import seed_database

app = FastAPI(
    title="LogiFlow - Logistics Management System",
    description="Full-featured logistics management API for warehouses, inventory, orders, shipments, and fleet",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router, prefix="/api")
app.include_router(warehouses.router, prefix="/api")
app.include_router(inventory.router, prefix="/api")
app.include_router(vehicles.router, prefix="/api")
app.include_router(customers.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
app.include_router(shipments.router, prefix="/api")


@app.on_event("startup")
def startup():
    seed_database()


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "LogiFlow API"}
