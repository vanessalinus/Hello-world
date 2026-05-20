import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { api } from "../utils/api";
import { capitalize, formatDate } from "../utils/format";
import { StatusBadge } from "../components/StatusBadge";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import { Plus, Search, Trash2, Edit, Truck, Ship, Plane, Train, Bike, Zap } from "lucide-react";

const TYPES = ["", "truck", "van", "motorcycle", "ship", "airplane", "train", "drone"];
const STATUSES = ["", "available", "in_transit", "maintenance", "out_of_service"];

function VehicleIcon({ type, size = 18 }) {
  const map = { truck: Truck, van: Truck, ship: Ship, airplane: Plane, train: Train, motorcycle: Bike, drone: Zap };
  const Icon = map[type] || Truck;
  return <Icon size={size} />;
}

export default function Vehicles() {
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const params = new URLSearchParams();
  if (typeFilter) params.set("vehicle_type", typeFilter);
  if (statusFilter) params.set("status", statusFilter);
  if (search) params.set("search", search);

  const { data, loading, refetch } = useApi(`/api/vehicles?${params}`, [typeFilter, statusFilter, search]);

  async function handleCreate(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd);
    body.capacity_kg = parseFloat(body.capacity_kg) || 0;
    body.capacity_volume_m3 = parseFloat(body.capacity_volume_m3) || 0;
    body.mileage_km = parseFloat(body.mileage_km) || 0;
    if (body.year) body.year = parseInt(body.year);
    await api.post("/api/vehicles", body);
    setShowCreate(false);
    refetch();
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = {};
    for (const [k, v] of fd) {
      if (v !== "") body[k] = v;
    }
    if (body.capacity_kg) body.capacity_kg = parseFloat(body.capacity_kg);
    if (body.mileage_km) body.mileage_km = parseFloat(body.mileage_km);
    await api.patch(`/api/vehicles/${editItem.id}`, body);
    setEditItem(null);
    refetch();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this vehicle?")) return;
    await api.delete(`/api/vehicles/${id}`);
    refetch();
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h2>Fleet Management</h2>
            <p>Track and manage your vehicle fleet</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            <Plus size={16} /> Add Vehicle
          </button>
        </div>
      </div>
      <div className="page-body">
        <div className="filters-bar">
          <div className="search-bar" style={{ flex: "1 1 260px" }}>
            <Search />
            <input placeholder="Search registration, driver, make..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All Types</option>
            {TYPES.filter(Boolean).map((t) => <option key={t} value={t}>{capitalize(t)}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            {STATUSES.filter(Boolean).map((s) => <option key={s} value={s}>{capitalize(s)}</option>)}
          </select>
        </div>

        {loading ? <Loading /> : (
          <div className="card">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Reg #</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Make / Model</th>
                    <th>Capacity (kg)</th>
                    <th>Driver</th>
                    <th>Location</th>
                    <th>Mileage</th>
                    <th>Next Maintenance</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? data.map((v) => (
                    <tr key={v.id}>
                      <td>
                        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <VehicleIcon type={v.vehicle_type} />
                          <span className="font-mono">{v.registration_number}</span>
                        </span>
                      </td>
                      <td>{capitalize(v.vehicle_type)}</td>
                      <td><StatusBadge status={v.status} /></td>
                      <td>{v.make} {v.model}</td>
                      <td>{v.capacity_kg.toLocaleString()}</td>
                      <td>{v.driver_name || "—"}</td>
                      <td className="truncate">{v.current_location || "—"}</td>
                      <td>{v.mileage_km.toLocaleString()} km</td>
                      <td>{formatDate(v.next_maintenance)}</td>
                      <td>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => setEditItem(v)}><Edit size={14} /></button>
                          <button className="btn btn-ghost btn-sm text-danger" onClick={() => handleDelete(v.id)}><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={10} className="empty-state"><p>No vehicles found</p></td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showCreate && (
        <Modal title="Add Vehicle" onClose={() => setShowCreate(false)}>
          <form onSubmit={handleCreate}>
            <div className="form-grid">
              <div className="form-group"><label>Registration Number</label><input name="registration_number" required /></div>
              <div className="form-group">
                <label>Type</label>
                <select name="vehicle_type">
                  {TYPES.filter(Boolean).map((t) => <option key={t} value={t}>{capitalize(t)}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Make</label><input name="make" /></div>
              <div className="form-group"><label>Model</label><input name="model" /></div>
              <div className="form-group"><label>Year</label><input name="year" type="number" /></div>
              <div className="form-group"><label>Capacity (kg)</label><input name="capacity_kg" type="number" step="0.1" /></div>
              <div className="form-group"><label>Volume (m3)</label><input name="capacity_volume_m3" type="number" step="0.1" /></div>
              <div className="form-group"><label>Fuel Type</label><input name="fuel_type" /></div>
              <div className="form-group"><label>Driver Name</label><input name="driver_name" /></div>
              <div className="form-group"><label>Driver Phone</label><input name="driver_phone" /></div>
              <div className="form-group"><label>Driver License</label><input name="driver_license" /></div>
              <div className="form-group"><label>Current Location</label><input name="current_location" /></div>
              <div className="form-group"><label>Mileage (km)</label><input name="mileage_km" type="number" step="0.1" defaultValue="0" /></div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Vehicle</button>
            </div>
          </form>
        </Modal>
      )}

      {editItem && (
        <Modal title={`Edit ${editItem.registration_number}`} onClose={() => setEditItem(null)}>
          <form onSubmit={handleUpdate}>
            <div className="form-grid">
              <div className="form-group">
                <label>Status</label>
                <select name="status" defaultValue={editItem.status}>
                  {STATUSES.filter(Boolean).map((s) => <option key={s} value={s}>{capitalize(s)}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Current Location</label><input name="current_location" defaultValue={editItem.current_location || ""} /></div>
              <div className="form-group"><label>Driver Name</label><input name="driver_name" defaultValue={editItem.driver_name || ""} /></div>
              <div className="form-group"><label>Driver Phone</label><input name="driver_phone" defaultValue={editItem.driver_phone || ""} /></div>
              <div className="form-group"><label>Mileage (km)</label><input name="mileage_km" type="number" step="0.1" defaultValue={editItem.mileage_km} /></div>
              <div className="form-group"><label>Capacity (kg)</label><input name="capacity_kg" type="number" step="0.1" defaultValue={editItem.capacity_kg} /></div>
            </div>
            <div className="form-group" style={{ marginTop: 16 }}>
              <label>Notes</label><textarea name="notes" defaultValue={editItem.notes || ""} />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setEditItem(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
