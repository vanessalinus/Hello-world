import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { api } from "../utils/api";
import { capitalize } from "../utils/format";
import { StatusBadge } from "../components/StatusBadge";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import { Plus, Search, Trash2, Edit, MapPin } from "lucide-react";

export default function Warehouses() {
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const params = new URLSearchParams();
  if (search) params.set("search", search);

  const { data, loading, refetch } = useApi(`/api/warehouses?${params}`, [search]);

  async function handleCreate(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd);
    body.total_capacity = parseInt(body.total_capacity) || 10000;
    if (body.latitude) body.latitude = parseFloat(body.latitude);
    if (body.longitude) body.longitude = parseFloat(body.longitude);
    await api.post("/api/warehouses", body);
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
    if (body.total_capacity) body.total_capacity = parseInt(body.total_capacity);
    if (body.used_capacity) body.used_capacity = parseInt(body.used_capacity);
    await api.patch(`/api/warehouses/${editItem.id}`, body);
    setEditItem(null);
    refetch();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this warehouse?")) return;
    await api.delete(`/api/warehouses/${id}`);
    refetch();
  }

  function capacityPercent(wh) {
    if (!wh.total_capacity) return 0;
    return Math.round((wh.used_capacity / wh.total_capacity) * 100);
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h2>Warehouses</h2>
            <p>Manage warehouse locations and capacity</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            <Plus size={16} /> Add Warehouse
          </button>
        </div>
      </div>
      <div className="page-body">
        <div className="filters-bar">
          <div className="search-bar" style={{ flex: "1 1 300px" }}>
            <Search />
            <input placeholder="Search name, code, city..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {loading ? <Loading /> : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
            {data && data.length > 0 ? data.map((wh) => {
              const pct = capacityPercent(wh);
              const barColor = pct > 90 ? "var(--danger)" : pct > 70 ? "var(--warning)" : "var(--success)";
              return (
                <div key={wh.id} className="card">
                  <div className="card-header">
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="font-mono" style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{wh.code}</span>
                      <h3>{wh.name}</h3>
                    </div>
                    <StatusBadge status={wh.status} />
                  </div>
                  <div className="card-body">
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-secondary)", marginBottom: 12 }}>
                      <MapPin size={14} />
                      <span>{wh.city}{wh.state ? `, ${wh.state}` : ""}, {wh.country}</span>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                        <span>Capacity</span>
                        <span>{wh.used_capacity.toLocaleString()} / {wh.total_capacity.toLocaleString()} ({pct}%)</span>
                      </div>
                      <div style={{ height: 6, background: "var(--bg-primary)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: barColor, borderRadius: 3, transition: "width 0.3s" }} />
                      </div>
                    </div>

                    {wh.manager_name && (
                      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: 8 }}>
                        Manager: {wh.manager_name}
                      </div>
                    )}
                    {wh.operating_hours && (
                      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        Hours: {wh.operating_hours}
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => setEditItem(wh)}><Edit size={14} /> Edit</button>
                      <button className="btn btn-ghost btn-sm text-danger" onClick={() => handleDelete(wh.id)}><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="empty-state"><p>No warehouses found</p></div>
            )}
          </div>
        )}
      </div>

      {showCreate && (
        <Modal title="Add Warehouse" onClose={() => setShowCreate(false)}>
          <form onSubmit={handleCreate}>
            <div className="form-grid">
              <div className="form-group"><label>Name</label><input name="name" required /></div>
              <div className="form-group"><label>Code</label><input name="code" required maxLength={20} /></div>
              <div className="form-group"><label>Address</label><input name="address" required /></div>
              <div className="form-group"><label>City</label><input name="city" required /></div>
              <div className="form-group"><label>State</label><input name="state" /></div>
              <div className="form-group"><label>Country</label><input name="country" required /></div>
              <div className="form-group"><label>Postal Code</label><input name="postal_code" /></div>
              <div className="form-group"><label>Total Capacity</label><input name="total_capacity" type="number" defaultValue="10000" /></div>
              <div className="form-group"><label>Manager Name</label><input name="manager_name" /></div>
              <div className="form-group"><label>Manager Phone</label><input name="manager_phone" /></div>
              <div className="form-group"><label>Manager Email</label><input name="manager_email" type="email" /></div>
              <div className="form-group"><label>Operating Hours</label><input name="operating_hours" /></div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Warehouse</button>
            </div>
          </form>
        </Modal>
      )}

      {editItem && (
        <Modal title={`Edit ${editItem.name}`} onClose={() => setEditItem(null)}>
          <form onSubmit={handleUpdate}>
            <div className="form-grid">
              <div className="form-group"><label>Name</label><input name="name" defaultValue={editItem.name} /></div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" defaultValue={editItem.status}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="full">Full</option>
                </select>
              </div>
              <div className="form-group"><label>Total Capacity</label><input name="total_capacity" type="number" defaultValue={editItem.total_capacity} /></div>
              <div className="form-group"><label>Used Capacity</label><input name="used_capacity" type="number" defaultValue={editItem.used_capacity} /></div>
              <div className="form-group"><label>Manager Name</label><input name="manager_name" defaultValue={editItem.manager_name || ""} /></div>
              <div className="form-group"><label>Manager Phone</label><input name="manager_phone" defaultValue={editItem.manager_phone || ""} /></div>
              <div className="form-group"><label>Operating Hours</label><input name="operating_hours" defaultValue={editItem.operating_hours || ""} /></div>
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
