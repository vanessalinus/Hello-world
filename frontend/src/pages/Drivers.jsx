import { useEffect, useState, useCallback } from 'react';
import { drivers as driversApi } from '../api';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{status.replace(/_/g, ' ')}</span>;
}

function RatingStars({ rating }) {
  return (
    <span style={{ color: '#f59e0b', fontSize: 13 }}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
      <span style={{ color: 'var(--text-secondary)', marginLeft: 4, fontSize: 12 }}>{rating.toFixed(1)}</span>
    </span>
  );
}

const DRIVER_STATUSES = ['available', 'on_route', 'off_duty'];
const VEHICLE_TYPES = ['Semi Truck', 'Box Truck', 'Refrigerated Truck', 'Flatbed Truck', 'Cargo Van', 'Pickup Truck'];

function DriverForm({ initial, onSubmit, onClose }) {
  const [form, setForm] = useState(initial || {
    name: '', email: '', phone: '', license_number: '', license_expiry: '',
    vehicle_type: '', vehicle_plate: '', status: 'available',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Driver name" />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" value={form.email || ''} onChange={e => set('email', e.target.value)} placeholder="driver@company.com" />
        </div>
        <div className="form-group">
          <label className="form-label">Phone *</label>
          <input className="form-input" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1-555-0000" />
        </div>
        <div className="form-group">
          <label className="form-label">License Number *</label>
          <input className="form-input" value={form.license_number} onChange={e => set('license_number', e.target.value)} placeholder="CDL-XX-00000" />
        </div>
        <div className="form-group">
          <label className="form-label">License Expiry</label>
          <input className="form-input" type="date" value={form.license_expiry || ''} onChange={e => set('license_expiry', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Vehicle Type</label>
          <select className="form-select" value={form.vehicle_type || ''} onChange={e => set('vehicle_type', e.target.value)}>
            <option value="">Select type</option>
            {VEHICLE_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Vehicle Plate</label>
          <input className="form-input" value={form.vehicle_plate || ''} onChange={e => set('vehicle_plate', e.target.value)} placeholder="XX-TRK-000" />
        </div>
        <div className="form-group">
          <label className="form-label">Status</label>
          <select className="form-select" value={form.status} onChange={e => set('status', e.target.value)}>
            {DRIVER_STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
          </select>
        </div>
      </div>
      <div className="modal-footer" style={{ padding: 0, border: 'none' }}>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSubmit(form)}>Save Driver</button>
      </div>
    </>
  );
}

function DriverCard({ driver, onEdit, onDelete }) {
  const initials = driver.name.split(' ').map(n => n[0]).join('').toUpperCase();
  const avatarColors = { available: ['#dcfce7', '#16a34a'], on_route: ['#cffafe', '#0891b2'], off_duty: ['#f1f5f9', '#64748b'] };
  const [bg, color] = avatarColors[driver.status] || avatarColors.available;

  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: '20px 20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
          <div className="avatar" style={{ width: 48, height: 48, fontSize: 16, background: bg, color }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{driver.name}</div>
            <StatusBadge status={driver.status} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button className="btn-icon" onClick={() => onEdit(driver)}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </button>
            <button className="btn-icon" onClick={() => onDelete(driver.id)}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12 }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>Vehicle</div>
            <div style={{ color: 'var(--text)', fontWeight: 500 }}>{driver.vehicle_type || '—'}</div>
            <div style={{ color: 'var(--text-secondary)' }}>{driver.vehicle_plate || '—'}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>Contact</div>
            <div style={{ color: 'var(--text)', fontWeight: 500 }}>{driver.phone}</div>
            <div style={{ color: 'var(--text-secondary)' }}>{driver.email || '—'}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>License</div>
            <div style={{ color: 'var(--text)', fontWeight: 500, fontFamily: 'monospace' }}>{driver.license_number}</div>
            <div style={{ color: 'var(--text-secondary)' }}>Exp: {driver.license_expiry || '—'}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 2 }}>Performance</div>
            <RatingStars rating={driver.rating || 5} />
            <div style={{ color: 'var(--text-secondary)', marginTop: 2 }}>{driver.trips_completed} trips</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Drivers() {
  const toast = useToast();
  const [data, setData] = useState({ data: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editDriver, setEditDriver] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    driversApi.list({ search, status: statusFilter, limit: 50 })
      .then(r => { setData(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [search, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (form) => {
    try { await driversApi.create(form); toast('Driver added', 'success'); setShowCreate(false); load(); }
    catch (e) { toast(e.response?.data?.error || 'Failed to create', 'error'); }
  };

  const handleEdit = async (form) => {
    try { await driversApi.update(editDriver.id, form); toast('Driver updated', 'success'); setEditDriver(null); load(); }
    catch { toast('Failed to update', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this driver?')) return;
    try { await driversApi.delete(id); toast('Deleted', 'success'); load(); }
    catch { toast('Failed to delete', 'error'); }
  };

  const available = data.data.filter(d => d.status === 'available').length;
  const onRoute = data.data.filter(d => d.status === 'on_route').length;
  const offDuty = data.data.filter(d => d.status === 'off_duty').length;

  return (
    <div className="page">
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <div className="kpi-card" style={{ flex: 1 }}>
          <div className="kpi-label">Total Drivers</div>
          <div className="kpi-value">{data.total}</div>
        </div>
        <div className="kpi-card" style={{ flex: 1 }}>
          <div className="kpi-label">Available</div>
          <div className="kpi-value" style={{ color: 'var(--success)' }}>{available}</div>
        </div>
        <div className="kpi-card" style={{ flex: 1 }}>
          <div className="kpi-label">On Route</div>
          <div className="kpi-value" style={{ color: 'var(--info)' }}>{onRoute}</div>
        </div>
        <div className="kpi-card" style={{ flex: 1 }}>
          <div className="kpi-label">Off Duty</div>
          <div className="kpi-value" style={{ color: 'var(--text-secondary)' }}>{offDuty}</div>
        </div>
      </div>

      <div className="toolbar">
        <div className="search-bar">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input className="form-input" placeholder="Search drivers..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="form-select" style={{ width: 150 }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          {DRIVER_STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
        </select>
        <button className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setShowCreate(true)}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M12 4v16m8-8H4"/></svg>
          Add Driver
        </button>
      </div>

      {loading ? (
        <div className="loading"><div className="spinner"/></div>
      ) : data.data.length === 0 ? (
        <div className="empty-state"><p>No drivers found</p></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {data.data.map(driver => (
            <DriverCard key={driver.id} driver={driver} onEdit={setEditDriver} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Add New Driver" wide>
        <DriverForm onSubmit={handleCreate} onClose={() => setShowCreate(false)} />
      </Modal>
      <Modal open={!!editDriver} onClose={() => setEditDriver(null)} title="Edit Driver" wide>
        {editDriver && <DriverForm initial={editDriver} onSubmit={handleEdit} onClose={() => setEditDriver(null)} />}
      </Modal>
    </div>
  );
}
