import { useEffect, useState, useCallback } from 'react';
import { warehouses as warehousesApi } from '../api';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

function WarehouseForm({ initial, onSubmit, onClose }) {
  const [form, setForm] = useState(initial || { name: '', address: '', city: '', country: '', capacity: 1000, manager: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Name *</label>
          <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Warehouse name" />
        </div>
        <div className="form-group">
          <label className="form-label">Manager</label>
          <input className="form-input" value={form.manager || ''} onChange={e => set('manager', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">City</label>
          <input className="form-input" value={form.city || ''} onChange={e => set('city', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Country</label>
          <input className="form-input" value={form.country || ''} onChange={e => set('country', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Capacity (units)</label>
          <input className="form-input" type="number" value={form.capacity} onChange={e => set('capacity', Number(e.target.value))} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Address</label>
        <input className="form-input" value={form.address || ''} onChange={e => set('address', e.target.value)} />
      </div>
      <div className="modal-footer" style={{ padding: 0, border: 'none' }}>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSubmit(form)}>Save Warehouse</button>
      </div>
    </>
  );
}

function WarehouseCard({ warehouse, onEdit }) {
  const usagePercent = warehouse.capacity > 0 ? Math.round((warehouse.current_stock / warehouse.capacity) * 100) : 0;
  const fillClass = usagePercent > 90 ? 'danger' : usagePercent > 70 ? 'warning' : '';

  return (
    <div className="card">
      <div style={{ padding: '20px 20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{warehouse.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {[warehouse.address, warehouse.city, warehouse.country].filter(Boolean).join(', ')}
            </div>
          </div>
          <button className="btn-icon" onClick={() => onEdit(warehouse)}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
        </div>

        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Capacity Usage</span>
            <span style={{ fontWeight: 600, color: usagePercent > 90 ? 'var(--danger)' : 'var(--text)' }}>{usagePercent}%</span>
          </div>
          <div className="progress-bar">
            <div className={`progress-fill ${fillClass}`} style={{ width: `${Math.min(100, usagePercent)}%` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
            <span>{warehouse.current_stock.toLocaleString()} used</span>
            <span>{warehouse.capacity.toLocaleString()} total</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <div style={{ textAlign: 'center', background: 'var(--bg)', borderRadius: 6, padding: '8px 4px' }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>{warehouse.item_count || 0}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>SKUs</div>
          </div>
          <div style={{ textAlign: 'center', background: 'var(--bg)', borderRadius: 6, padding: '8px 4px' }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>${((warehouse.total_value || 0) / 1000).toFixed(0)}K</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Value</div>
          </div>
          <div style={{ textAlign: 'center', background: 'var(--bg)', borderRadius: 6, padding: '8px 4px' }}>
            <span className={`badge badge-${warehouse.status}`} style={{ fontSize: 10 }}>{warehouse.status}</span>
          </div>
        </div>

        {warehouse.manager && (
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="avatar" style={{ width: 28, height: 28, fontSize: 11, background: '#dbeafe', color: 'var(--primary)' }}>
              {warehouse.manager.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{warehouse.manager}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Warehouse Manager</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Warehouses() {
  const toast = useToast();
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editWarehouse, setEditWarehouse] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    warehousesApi.list().then(r => { setWarehouses(r.data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (form) => {
    try { await warehousesApi.create(form); toast('Warehouse created', 'success'); setShowCreate(false); load(); }
    catch (e) { toast(e.response?.data?.error || 'Failed to create', 'error'); }
  };

  const handleEdit = async (form) => {
    try { await warehousesApi.update(editWarehouse.id, form); toast('Updated', 'success'); setEditWarehouse(null); load(); }
    catch { toast('Failed to update', 'error'); }
  };

  const totalCapacity = warehouses.reduce((s, w) => s + w.capacity, 0);
  const totalUsed = warehouses.reduce((s, w) => s + w.current_stock, 0);
  const totalValue = warehouses.reduce((s, w) => s + (w.total_value || 0), 0);

  return (
    <div className="page">
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <div className="kpi-card" style={{ flex: 1 }}>
          <div className="kpi-label">Total Warehouses</div>
          <div className="kpi-value">{warehouses.length}</div>
        </div>
        <div className="kpi-card" style={{ flex: 1 }}>
          <div className="kpi-label">Total Capacity</div>
          <div className="kpi-value">{totalCapacity.toLocaleString()}</div>
        </div>
        <div className="kpi-card" style={{ flex: 1 }}>
          <div className="kpi-label">Space Used</div>
          <div className="kpi-value">{totalCapacity > 0 ? Math.round((totalUsed / totalCapacity) * 100) : 0}%</div>
        </div>
        <div className="kpi-card" style={{ flex: 1 }}>
          <div className="kpi-label">Total Inventory Value</div>
          <div className="kpi-value">${(totalValue / 1000).toFixed(0)}K</div>
        </div>
      </div>

      <div className="toolbar">
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M12 4v16m8-8H4"/></svg>
          Add Warehouse
        </button>
      </div>

      {loading ? (
        <div className="loading"><div className="spinner"/></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {warehouses.map(w => <WarehouseCard key={w.id} warehouse={w} onEdit={setEditWarehouse} />)}
        </div>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Add Warehouse" wide>
        <WarehouseForm onSubmit={handleCreate} onClose={() => setShowCreate(false)} />
      </Modal>
      <Modal open={!!editWarehouse} onClose={() => setEditWarehouse(null)} title="Edit Warehouse" wide>
        {editWarehouse && <WarehouseForm initial={editWarehouse} onSubmit={handleEdit} onClose={() => setEditWarehouse(null)} />}
      </Modal>
    </div>
  );
}
