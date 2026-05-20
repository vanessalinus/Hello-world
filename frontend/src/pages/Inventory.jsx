import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { api } from "../utils/api";
import { formatCurrency, capitalize } from "../utils/format";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import { Plus, Search, Trash2, Edit, AlertTriangle } from "lucide-react";

const CATEGORIES = ["", "electronics", "clothing", "food", "furniture", "automotive", "medical", "hazardous", "fragile", "other"];

export default function Inventory() {
  const [catFilter, setCatFilter] = useState("");
  const [lowStock, setLowStock] = useState(false);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const params = new URLSearchParams();
  if (catFilter) params.set("category", catFilter);
  if (lowStock) params.set("low_stock", "true");
  if (search) params.set("search", search);

  const { data, loading, refetch } = useApi(`/api/inventory?${params}`, [catFilter, lowStock, search]);

  async function handleCreate(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = Object.fromEntries(fd);
    body.quantity = parseInt(body.quantity) || 0;
    body.min_quantity = parseInt(body.min_quantity) || 10;
    body.unit_price = parseFloat(body.unit_price) || 0;
    body.weight_kg = parseFloat(body.weight_kg) || 0;
    await api.post("/api/inventory", body);
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
    if (body.quantity) body.quantity = parseInt(body.quantity);
    if (body.min_quantity) body.min_quantity = parseInt(body.min_quantity);
    if (body.unit_price) body.unit_price = parseFloat(body.unit_price);
    await api.patch(`/api/inventory/${editItem.id}`, body);
    setEditItem(null);
    refetch();
  }

  async function handleDelete(id) {
    if (!confirm("Remove this inventory item?")) return;
    await api.delete(`/api/inventory/${id}`);
    refetch();
  }

  return (
    <>
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h2>Inventory</h2>
            <p>Manage warehouse inventory items</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
            <Plus size={16} /> Add Item
          </button>
        </div>
      </div>
      <div className="page-body">
        <div className="filters-bar">
          <div className="search-bar" style={{ flex: "1 1 260px" }}>
            <Search />
            <input placeholder="Search SKU, name, supplier..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
            <option value="">All Categories</option>
            {CATEGORIES.filter(Boolean).map((c) => <option key={c} value={c}>{capitalize(c)}</option>)}
          </select>
          <label style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-secondary)", fontSize: "0.88rem" }}>
            <input type="checkbox" checked={lowStock} onChange={(e) => setLowStock(e.target.checked)} />
            Low Stock Only
          </label>
        </div>

        {loading ? <Loading /> : (
          <div className="card">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Min Qty</th>
                    <th>Unit Price</th>
                    <th>Total Value</th>
                    <th>Location</th>
                    <th>Supplier</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? data.map((item) => (
                    <tr key={item.id}>
                      <td className="font-mono">{item.sku}</td>
                      <td>{item.name}</td>
                      <td>{capitalize(item.category)}</td>
                      <td>
                        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          {item.quantity}
                          {item.quantity <= item.min_quantity && (
                            <AlertTriangle size={14} style={{ color: "var(--danger)" }} />
                          )}
                        </span>
                      </td>
                      <td className="text-muted">{item.min_quantity}</td>
                      <td>{formatCurrency(item.unit_price)}</td>
                      <td>{formatCurrency(item.unit_price * item.quantity)}</td>
                      <td className="text-muted">{item.location_in_warehouse || "—"}</td>
                      <td>{item.supplier_name || "—"}</td>
                      <td>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => setEditItem(item)}><Edit size={14} /></button>
                          <button className="btn btn-ghost btn-sm text-danger" onClick={() => handleDelete(item.id)}><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={10} className="empty-state"><p>No inventory items found</p></td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {showCreate && (
        <Modal title="Add Inventory Item" onClose={() => setShowCreate(false)}>
          <form onSubmit={handleCreate}>
            <div className="form-grid">
              <div className="form-group"><label>SKU</label><input name="sku" required /></div>
              <div className="form-group"><label>Name</label><input name="name" required /></div>
              <div className="form-group">
                <label>Category</label>
                <select name="category">
                  {CATEGORIES.filter(Boolean).map((c) => <option key={c} value={c}>{capitalize(c)}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Quantity</label><input name="quantity" type="number" defaultValue="0" /></div>
              <div className="form-group"><label>Min Quantity</label><input name="min_quantity" type="number" defaultValue="10" /></div>
              <div className="form-group"><label>Unit Price ($)</label><input name="unit_price" type="number" step="0.01" /></div>
              <div className="form-group"><label>Weight (kg)</label><input name="weight_kg" type="number" step="0.1" /></div>
              <div className="form-group"><label>Location in Warehouse</label><input name="location_in_warehouse" /></div>
              <div className="form-group"><label>Supplier Name</label><input name="supplier_name" /></div>
              <div className="form-group"><label>Supplier Contact</label><input name="supplier_contact" /></div>
            </div>
            <div className="form-group" style={{ marginTop: 16 }}>
              <label>Description</label><textarea name="description" />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Item</button>
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
                <label>Category</label>
                <select name="category" defaultValue={editItem.category}>
                  {CATEGORIES.filter(Boolean).map((c) => <option key={c} value={c}>{capitalize(c)}</option>)}
                </select>
              </div>
              <div className="form-group"><label>Quantity</label><input name="quantity" type="number" defaultValue={editItem.quantity} /></div>
              <div className="form-group"><label>Min Quantity</label><input name="min_quantity" type="number" defaultValue={editItem.min_quantity} /></div>
              <div className="form-group"><label>Unit Price ($)</label><input name="unit_price" type="number" step="0.01" defaultValue={editItem.unit_price} /></div>
              <div className="form-group"><label>Location</label><input name="location_in_warehouse" defaultValue={editItem.location_in_warehouse || ""} /></div>
              <div className="form-group"><label>Supplier Name</label><input name="supplier_name" defaultValue={editItem.supplier_name || ""} /></div>
              <div className="form-group"><label>Supplier Contact</label><input name="supplier_contact" defaultValue={editItem.supplier_contact || ""} /></div>
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
