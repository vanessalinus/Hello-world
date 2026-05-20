import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { api } from "../utils/api";
import { formatCurrency, formatDate } from "../utils/format";
import { StatusBadge, PriorityBadge } from "../components/StatusBadge";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import { Plus, Search, Trash2, Edit, Eye } from "lucide-react";

const STATUSES = ["", "pending", "picked_up", "in_transit", "out_for_delivery", "delivered", "cancelled", "returned"];
const PRIORITIES = ["", "low", "medium", "high", "urgent"];

export default function Shipments() {
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [viewItem, setViewItem] = useState(null);

  const params = new URLSearchParams();
  if (statusFilter) params.set("status", statusFilter);
  if (priorityFilter) params.set("priority", priorityFilter);
  if (search) params.set("search", search);

  const { data, loading, refetch } = useApi(`/api/shipments?${params}`, [statusFilter, priorityFilter, search]);

  async function handleCreate(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd);
    body.weight_kg = parseFloat(body.weight_kg) || 0;
    body.item_count = parseInt(body.item_count) || 1;
    body.cost = parseFloat(body.cost) || 0;
    await api.post("/api/shipments", body);
    setShowCreate(false);
    refetch();
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = {};
    for (const [k, v] of fd) {
      if (v !== "" && v !== editItem[k]) body[k] = v;
    }
    if (body.cost) body.cost = parseFloat(body.cost);
    await api.patch(`/api/shipments/${editItem.id}`, body);
    setEditItem(null);
    refetch();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this shipment?")) return;
    await api.delete(`/api/shipments/${id}`);
    refetch();
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h2>Shipments</h2>
            <p>Track and manage all shipments</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            <Plus size={16} /> New Shipment
          </button>
        </div>
      </div>
      <div className="page-body">
        <div className="filters-bar">
          <div className="search-bar" style={{ flex: "1 1 260px" }}>
            <Search />
            <input placeholder="Search tracking #, name, city..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Statuses</option>
            {STATUSES.filter(Boolean).map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
          </select>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="">All Priorities</option>
            {PRIORITIES.filter(Boolean).map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {loading ? <Loading /> : (
          <div className="card">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Tracking #</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Sender</th>
                    <th>Recipient</th>
                    <th>Weight</th>
                    <th>Cost</th>
                    <th>Est. Delivery</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? data.map((s) => (
                    <tr key={s.id}>
                      <td className="font-mono">{s.tracking_number}</td>
                      <td><StatusBadge status={s.status} /></td>
                      <td><PriorityBadge priority={s.priority} /></td>
                      <td>{s.origin_city}</td>
                      <td>{s.destination_city}</td>
                      <td>{s.sender_name}</td>
                      <td>{s.recipient_name}</td>
                      <td>{s.weight_kg} kg</td>
                      <td>{formatCurrency(s.cost)}</td>
                      <td>{formatDate(s.estimated_delivery)}</td>
                      <td>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => setViewItem(s)}><Eye size={14} /></button>
                          <button className="btn btn-ghost btn-sm" onClick={() => setEditItem(s)}><Edit size={14} /></button>
                          <button className="btn btn-ghost btn-sm text-danger" onClick={() => handleDelete(s.id)}><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={11} className="empty-state"><p>No shipments found</p></td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showCreate && (
        <Modal title="Create New Shipment" onClose={() => setShowCreate(false)}>
          <form onSubmit={handleCreate}>
            <div className="form-grid">
              <div className="form-group"><label>Sender Name</label><input name="sender_name" required /></div>
              <div className="form-group"><label>Sender Phone</label><input name="sender_phone" /></div>
              <div className="form-group"><label>Origin Address</label><input name="origin_address" required /></div>
              <div className="form-group"><label>Origin City</label><input name="origin_city" required /></div>
              <div className="form-group"><label>Origin Country</label><input name="origin_country" required /></div>
              <div className="form-group"><label>Recipient Name</label><input name="recipient_name" required /></div>
              <div className="form-group"><label>Recipient Phone</label><input name="recipient_phone" /></div>
              <div className="form-group"><label>Destination Address</label><input name="destination_address" required /></div>
              <div className="form-group"><label>Destination City</label><input name="destination_city" required /></div>
              <div className="form-group"><label>Destination Country</label><input name="destination_country" required /></div>
              <div className="form-group"><label>Weight (kg)</label><input name="weight_kg" type="number" step="0.1" /></div>
              <div className="form-group"><label>Item Count</label><input name="item_count" type="number" defaultValue="1" /></div>
              <div className="form-group">
                <label>Priority</label>
                <select name="priority">
                  {PRIORITIES.filter(Boolean).map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Cost ($)</label><input name="cost" type="number" step="0.01" /></div>
            </div>
            <div className="form-group" style={{ marginTop: 16 }}>
              <label>Description</label>
              <textarea name="description" />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Create Shipment</button>
            </div>
          </form>
        </Modal>
      )}

      {editItem && (
        <Modal title="Update Shipment" onClose={() => setEditItem(null)}>
          <form onSubmit={handleUpdate}>
            <div className="form-grid">
              <div className="form-group">
                <label>Status</label>
                <select name="status" defaultValue={editItem.status}>
                  {STATUSES.filter(Boolean).map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select name="priority" defaultValue={editItem.priority}>
                  {PRIORITIES.filter(Boolean).map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Cost ($)</label><input name="cost" type="number" step="0.01" defaultValue={editItem.cost} /></div>
            </div>
            <div className="form-group" style={{ marginTop: 16 }}>
              <label>Notes</label>
              <textarea name="notes" defaultValue={editItem.notes || ""} />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setEditItem(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </form>
        </Modal>
      )}

      {viewItem && (
        <Modal title={`Shipment ${viewItem.tracking_number}`} onClose={() => setViewItem(null)}>
          <div className="form-grid">
            <div className="form-group"><label>Status</label><StatusBadge status={viewItem.status} /></div>
            <div className="form-group"><label>Priority</label><PriorityBadge priority={viewItem.priority} /></div>
            <div className="form-group"><label>Origin</label><span>{viewItem.origin_address}, {viewItem.origin_city}, {viewItem.origin_country}</span></div>
            <div className="form-group"><label>Destination</label><span>{viewItem.destination_address}, {viewItem.destination_city}, {viewItem.destination_country}</span></div>
            <div className="form-group"><label>Sender</label><span>{viewItem.sender_name} ({viewItem.sender_phone || "N/A"})</span></div>
            <div className="form-group"><label>Recipient</label><span>{viewItem.recipient_name} ({viewItem.recipient_phone || "N/A"})</span></div>
            <div className="form-group"><label>Weight</label><span>{viewItem.weight_kg} kg</span></div>
            <div className="form-group"><label>Items</label><span>{viewItem.item_count}</span></div>
            <div className="form-group"><label>Cost</label><span>{formatCurrency(viewItem.cost)}</span></div>
            <div className="form-group"><label>Estimated Delivery</label><span>{formatDate(viewItem.estimated_delivery)}</span></div>
            <div className="form-group"><label>Actual Delivery</label><span>{formatDate(viewItem.actual_delivery)}</span></div>
            <div className="form-group"><label>Created</label><span>{formatDate(viewItem.created_at)}</span></div>
          </div>
          {viewItem.notes && (
            <div className="form-group" style={{ marginTop: 16 }}>
              <label>Notes</label><p>{viewItem.notes}</p>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}
