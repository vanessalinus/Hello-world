import { useEffect, useState, useCallback } from 'react';
import { inventory as inventoryApi, warehouses as warehousesApi } from '../api';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

function StockBadge({ qty, min }) {
  if (qty === 0) return <span className="badge badge-cancelled">Out of Stock</span>;
  if (qty <= min) return <span className="badge badge-high">Low Stock</span>;
  return <span className="badge badge-available">In Stock</span>;
}

function InventoryForm({ initial, onSubmit, onClose }) {
  const [form, setForm] = useState(initial || { sku: '', name: '', category: '', description: '', quantity: 0, unit: 'units', unit_price: 0, warehouse_id: '', min_stock_level: 10 });
  const [warehouses, setWarehouses] = useState([]);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => { warehousesApi.list().then(r => setWarehouses(r.data.data)); }, []);

  return (
    <>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">SKU *</label>
          <input className="form-input" value={form.sku} onChange={e => set('sku', e.target.value)} placeholder="e.g. ELEC-001" />
        </div>
        <div className="form-group">
          <label className="form-label">Item Name *</label>
          <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Product name" />
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <input className="form-input" value={form.category || ''} onChange={e => set('category', e.target.value)} placeholder="e.g. Electronics" />
        </div>
        <div className="form-group">
          <label className="form-label">Unit</label>
          <input className="form-input" value={form.unit} onChange={e => set('unit', e.target.value)} placeholder="units, boxes, kg..." />
        </div>
        <div className="form-group">
          <label className="form-label">Quantity</label>
          <input className="form-input" type="number" value={form.quantity} onChange={e => set('quantity', Number(e.target.value))} />
        </div>
        <div className="form-group">
          <label className="form-label">Unit Price ($)</label>
          <input className="form-input" type="number" step="0.01" value={form.unit_price} onChange={e => set('unit_price', Number(e.target.value))} />
        </div>
        <div className="form-group">
          <label className="form-label">Min Stock Level</label>
          <input className="form-input" type="number" value={form.min_stock_level} onChange={e => set('min_stock_level', Number(e.target.value))} />
        </div>
        <div className="form-group">
          <label className="form-label">Warehouse</label>
          <select className="form-select" value={form.warehouse_id || ''} onChange={e => set('warehouse_id', e.target.value)}>
            <option value="">Select warehouse</option>
            {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea className="form-textarea" value={form.description || ''} onChange={e => set('description', e.target.value)} />
      </div>
      <div className="modal-footer" style={{ padding: 0, border: 'none' }}>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSubmit(form)}>Save Item</button>
      </div>
    </>
  );
}

function AdjustModal({ item, onSubmit, onClose }) {
  const [adjustment, setAdjustment] = useState('');
  const [reason, setReason] = useState('');
  const newQty = item.quantity + (parseInt(adjustment) || 0);

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{item.name}</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>SKU: {item.sku} · Current stock: <strong>{item.quantity} {item.unit}</strong></div>
      </div>
      <div className="form-group">
        <label className="form-label">Adjustment (+ to add, - to remove)</label>
        <input className="form-input" type="number" value={adjustment} onChange={e => setAdjustment(e.target.value)} placeholder="+50 or -20" />
      </div>
      {adjustment && (
        <div style={{ padding: '8px 12px', background: newQty < 0 ? 'var(--danger-light)' : 'var(--success-light)', borderRadius: 6, fontSize: 13 }}>
          New quantity: <strong>{Math.max(0, newQty)} {item.unit}</strong>
        </div>
      )}
      <div className="form-group">
        <label className="form-label">Reason</label>
        <input className="form-input" value={reason} onChange={e => setReason(e.target.value)} placeholder="Received shipment, damaged goods, audit..." />
      </div>
      <div className="modal-footer" style={{ padding: 0, border: 'none' }}>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSubmit({ adjustment: parseInt(adjustment), reason })}>Apply Adjustment</button>
      </div>
    </>
  );
}

export default function Inventory() {
  const toast = useToast();
  const [data, setData] = useState({ data: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('');
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [adjustItem, setAdjustItem] = useState(null);

  useEffect(() => {
    inventoryApi.getCategories().then(r => setCategories(r.data));
    warehousesApi.list().then(r => setWarehouses(r.data.data));
  }, []);

  const load = useCallback(() => {
    setLoading(true);
    inventoryApi.list({ search, category: categoryFilter, warehouse_id: warehouseFilter, low_stock: lowStockOnly, page, limit: 15 })
      .then(r => { setData(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [search, categoryFilter, warehouseFilter, lowStockOnly, page]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (form) => {
    try {
      await inventoryApi.create(form);
      toast('Item added', 'success');
      setShowCreate(false);
      load();
    } catch (e) { toast(e.response?.data?.error || 'Failed to create', 'error'); }
  };

  const handleEdit = async (form) => {
    try {
      await inventoryApi.update(editItem.id, form);
      toast('Item updated', 'success');
      setEditItem(null);
      load();
    } catch { toast('Failed to update', 'error'); }
  };

  const handleAdjust = async (form) => {
    try {
      await inventoryApi.adjust(adjustItem.id, form);
      toast('Stock adjusted', 'success');
      setAdjustItem(null);
      load();
    } catch { toast('Failed to adjust', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    try { await inventoryApi.delete(id); toast('Deleted', 'success'); load(); }
    catch { toast('Failed to delete', 'error'); }
  };

  const totalValue = data.data.reduce((sum, i) => sum + (i.quantity * i.unit_price), 0);

  return (
    <div className="page">
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div className="kpi-card" style={{ minWidth: 160, flex: 1 }}>
          <div className="kpi-label">Total SKUs</div>
          <div className="kpi-value">{data.total}</div>
        </div>
        <div className="kpi-card" style={{ minWidth: 160, flex: 1 }}>
          <div className="kpi-label">Inventory Value</div>
          <div className="kpi-value">${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        </div>
        <div className="kpi-card" style={{ minWidth: 160, flex: 1 }}>
          <div className="kpi-label">Low Stock Items</div>
          <div className="kpi-value" style={{ color: 'var(--danger)' }}>{data.data.filter(i => i.quantity <= i.min_stock_level && i.quantity > 0).length}</div>
        </div>
        <div className="kpi-card" style={{ minWidth: 160, flex: 1 }}>
          <div className="kpi-label">Out of Stock</div>
          <div className="kpi-value" style={{ color: 'var(--danger)' }}>{data.data.filter(i => i.quantity === 0).length}</div>
        </div>
      </div>

      <div className="toolbar">
        <div className="search-bar">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input className="form-input" placeholder="Search inventory..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <select className="form-select" style={{ width: 150 }} value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setPage(1); }}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="form-select" style={{ width: 170 }} value={warehouseFilter} onChange={e => { setWarehouseFilter(e.target.value); setPage(1); }}>
          <option value="">All Warehouses</option>
          {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
          <input type="checkbox" checked={lowStockOnly} onChange={e => { setLowStockOnly(e.target.checked); setPage(1); }} />
          Low stock only
        </label>
        <button className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setShowCreate(true)}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M12 4v16m8-8H4"/></svg>
          Add Item
        </button>
      </div>

      <div className="card">
        {loading ? <div className="loading"><div className="spinner"/></div> : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Warehouse</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right">Unit Price</th>
                    <th className="text-right">Total Value</th>
                    <th>Stock Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.length === 0 ? (
                    <tr><td colSpan={9}><div className="empty-state"><p>No inventory items found</p></div></td></tr>
                  ) : data.data.map(item => (
                    <tr key={item.id} style={item.quantity <= item.min_stock_level ? { background: '#fff5f5' } : {}}>
                      <td style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 600 }}>{item.sku}</td>
                      <td>
                        <div style={{ fontWeight: 500 }}>{item.name}</div>
                        {item.description && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{item.description.substring(0, 50)}</div>}
                      </td>
                      <td><span className="tag" style={{ background: '#f1f5f9', color: 'var(--text-secondary)' }}>{item.category || '—'}</span></td>
                      <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{item.warehouse_name || '—'}</td>
                      <td className="text-right" style={{ fontWeight: 600 }}>{item.quantity} <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>{item.unit}</span></td>
                      <td className="text-right">${(item.unit_price || 0).toLocaleString()}</td>
                      <td className="text-right" style={{ fontWeight: 600 }}>${(item.quantity * item.unit_price).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                      <td><StockBadge qty={item.quantity} min={item.min_stock_level} /></td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn-icon" title="Adjust Stock" onClick={() => setAdjustItem(item)}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                          </button>
                          <button className="btn-icon" title="Edit" onClick={() => setEditItem(item)}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button className="btn-icon" title="Delete" onClick={() => handleDelete(item.id)}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <span>Showing {Math.min((page-1)*15+1, data.total)}–{Math.min(page*15, data.total)} of {data.total}</span>
              <div className="flex gap-2">
                <button className="btn btn-secondary btn-sm" disabled={page<=1} onClick={() => setPage(p=>p-1)}>Previous</button>
                <button className="btn btn-secondary btn-sm" disabled={page*15>=data.total} onClick={() => setPage(p=>p+1)}>Next</button>
              </div>
            </div>
          </>
        )}
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Add Inventory Item" wide>
        <InventoryForm onSubmit={handleCreate} onClose={() => setShowCreate(false)} />
      </Modal>
      <Modal open={!!editItem} onClose={() => setEditItem(null)} title="Edit Inventory Item" wide>
        {editItem && <InventoryForm initial={editItem} onSubmit={handleEdit} onClose={() => setEditItem(null)} />}
      </Modal>
      <Modal open={!!adjustItem} onClose={() => setAdjustItem(null)} title="Adjust Stock">
        {adjustItem && <AdjustModal item={adjustItem} onSubmit={handleAdjust} onClose={() => setAdjustItem(null)} />}
      </Modal>
    </div>
  );
}
