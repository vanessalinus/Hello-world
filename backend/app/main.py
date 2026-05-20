from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, SessionLocal
from app.models import Base
from app.routes import shipments, inventory, warehouses, vehicles, analytics
from app.seed import seed_database

app = FastAPI(
    title="LogiTrack - Logistics Management System",
    description="Complete logistics management API for shipments, inventory, warehouses, and fleet operations.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(shipments.router)
app.include_router(inventory.router)
app.include_router(warehouses.router)
app.include_router(vehicles.router)
app.include_router(analytics.router)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()


@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "LogiTrack API"}
