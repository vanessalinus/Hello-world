import { useEffect, useState, useCallback } from 'react';
import { shipments as shipmentsApi, drivers as driversApi, orders as ordersApi, warehouses as warehousesApi } from '../api';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{status.replace(/_/g, ' ')}</span>;
}

const STATUSES = ['pending', 'in_transit', 'out_for_delivery', 'delivered', 'failed'];

function ShipmentForm({ initial, onSubmit, onClose }) {
  const [form, setForm] = useState(initial || { origin: '', destination: '', driver_id: '', order_id: '', warehouse_id: '', estimated_delivery: '', weight: '', distance: '', cost: '', notes: '' });
  const [drivers, setDrivers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    driversApi.list({ limit: 100 }).then(r => setDrivers(r.data.data));
    ordersApi.list({ limit: 100, status: 'processing' }).then(r => setAllOrders(r.data.data));
    warehousesApi.list().then(r => setWarehouses(r.data.data));
  }, []);

  return (
    <>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Origin *</label>
          <input className="form-input" value={form.origin} onChange={e => set('origin', e.target.value)} placeholder="City, State" />
        </div>
        <div className="form-group">
          <label className="form-label">Destination *</label>
          <input className="form-input" value={form.destination} onChange={e => set('destination', e.target.value)} placeholder="City, State" />
        </div>
        <div className="form-group">
          <label className="form-label">Assign Driver</label>
          <select className="form-select" value={form.driver_id} onChange={e => set('driver_id', e.target.value)}>
            <option value="">Select driver</option>
            {drivers.filter(d => d.status === 'available').map(d => (
              <option key={d.id} value={d.id}>{d.name} ({d.vehicle_type})</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Link Order</label>
          <select className="form-select" value={form.order_id} onChange={e => set('order_id', e.target.value)}>
            <option value="">Select order</option>
            {allOrders.map(o => <option key={o.id} value={o.id}>{o.order_number} – {o.customer_name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Warehouse</label>
          <select className="form-select" value={form.warehouse_id} onChange={e => set('warehouse_id', e.target.value)}>
            <option value="">Select warehouse</option>
            {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Est. Delivery Date</label>
          <input className="form-input" type="date" value={form.estimated_delivery} onChange={e => set('estimated_delivery', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Weight (kg)</label>
          <input className="form-input" type="number" value={form.weight} onChange={e => set('weight', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Distance (km)</label>
          <input className="form-input" type="number" value={form.distance} onChange={e => set('distance', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Shipping Cost ($)</label>
          <input className="form-input" type="number" value={form.cost} onChange={e => set('cost', e.target.value)} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Notes</label>
        <textarea className="form-textarea" value={form.notes || ''} onChange={e => set('notes', e.target.value)} />
      </div>
      <div className="modal-footer" style={{ padding: 0, border: 'none' }}>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSubmit(form)}>Create Shipment</button>
      </div>
    </>
  );
}

function ShipmentDetail({ shipment, onClose, onUpdate }) {
  const toast = useToast();
  const [statusUpdate, setStatusUpdate] = useState(shipment.status);
  const [eventLocation, setEventLocation] = useState('');

  const handleStatusChange = async () => {
    try {
      await shipmentsApi.update(shipment.id, {
        status: statusUpdate,
        event_location: eventLocation || shipment.destination,
        actual_delivery: statusUpdate === 'delivered' ? new Date().toISOString().split('T')[0] : undefined,
      });
      toast('Shipment updated', 'success');
      onUpdate();
      onClose();
    } catch { toast('Update failed', 'error'); }
  };

  return (
    <div>
      <div className="stat-row">
        <div className="stat-item">
          <div className="stat-item-label">TRACKING NUMBER</div>
          <div className="stat-item-value" style={{ fontSize: 13, color: 'var(--primary)' }}>{shipment.tracking_number}</div>
        </div>
        <div className="stat-item">
          <div className="stat-item-label">STATUS</div>
          <div><StatusBadge status={shipment.status} /></div>
        </div>
      </div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-body">
          <div className="detail-row"><span className="detail-label">Origin</span><span className="detail-value">{shipment.origin}</span></div>
          <div className="detail-row"><span className="detail-label">Destination</span><span className="detail-value">{shipment.destination}</span></div>
          <div className="detail-row"><span className="detail-label">Driver</span><span className="detail-value">{shipment.driver_name || '—'}</span></div>
          <div className="detail-row"><span className="detail-label">Vehicle</span><span className="detail-value">{shipment.vehicle_plate || '—'} ({shipment.vehicle_type || '—'})</span></div>
          <div className="detail-row"><span className="detail-label">Order</span><span className="detail-value">{shipment.order_number || '—'}</span></div>
          <div className="detail-row"><span className="detail-label">Warehouse</span><span className="detail-value">{shipment.warehouse_name || '—'}</span></div>
          <div className="detail-row"><span className="detail-label">Weight</span><span className="detail-value">{shipment.weight} kg</span></div>
          <div className="detail-row"><span className="detail-label">Distance</span><span className="detail-value">{shipment.distance} km</span></div>
          <div className="detail-row"><span className="detail-label">Cost</span><span className="detail-value">${(shipment.cost || 0).toLocaleString()}</span></div>
          <div className="detail-row"><span className="detail-label">Est. Delivery</span><span className="detail-value">{shipment.estimated_delivery || '—'}</span></div>
          {shipment.actual_delivery && <div className="detail-row"><span className="detail-label">Actual Delivery</span><span className="detail-value">{shipment.actual_delivery}</span></div>}
        </div>
      </div>
      {shipment.events && shipment.events.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div className="section-title" style={{ fontSize: 13, marginBottom: 12 }}>Tracking Timeline</div>
          <div className="tracking-timeline">
            {[...shipment.events].reverse().map((ev, i) => (
              <div key={ev.id} className="tracking-event">
                <div className="tracking-line">
                  <div className={`tracking-dot${i > 0 ? ' inactive' : ''}`} />
                  {i < shipment.events.length - 1 && <div className="tracking-connector" />}
                </div>
                <div className="tracking-content">
                  <div className="tracking-title">{ev.event_type.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}</div>
                  <div className="tracking-meta">{ev.location} · {new Date(ev.timestamp).toLocaleString()}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{ev.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <input className="form-input" placeholder="Current location" value={eventLocation} onChange={e => setEventLocation(e.target.value)} style={{ flex: 1 }} />
        <select className="form-select" value={statusUpdate} onChange={e => setStatusUpdate(e.target.value)} style={{ flex: 1 }}>
          {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
        </select>
        <button className="btn btn-primary" onClick={handleStatusChange}>Update</button>
      </div>
    </div>
  );
}

export default function Shipments() {
  const toast = useToast();
  const [data, setData] = useState({ data: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    shipmentsApi.list({ search, status: statusFilter, page, limit: 15 })
      .then(r => { setData(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [search, statusFilter, page]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (form) => {
    try {
      await shipmentsApi.create(form);
      toast('Shipment created', 'success');
      setShowCreate(false);
      load();
    } catch (e) { toast(e.response?.data?.error || 'Failed to create', 'error'); }
  };

  const openDetail = async (id) => {
    try {
      const r = await shipmentsApi.get(id);
      setSelectedDetail(r.data);
    } catch { toast('Failed to load shipment', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this shipment?')) return;
    try { await shipmentsApi.delete(id); toast('Deleted', 'success'); load(); }
    catch { toast('Failed to delete', 'error'); }
  };

  return (
    <div className="page">
      <div className="toolbar">
        <div className="search-bar">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input className="form-input" placeholder="Search shipments..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <select className="form-select" style={{ width: 160 }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
        </select>
        <button className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setShowCreate(true)}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M12 4v16m8-8H4"/></svg>
          New Shipment
        </button>
      </div>

      <div className="card">
        {loading ? <div className="loading"><div className="spinner"/></div> : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Tracking #</th>
                    <th>Route</th>
                    <th>Driver</th>
                    <th>Order</th>
                    <th>Status</th>
                    <th className="text-right">Cost</th>
                    <th>Est. Delivery</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.length === 0 ? (
                    <tr><td colSpan={8}><div className="empty-state"><p>No shipments found</p></div></td></tr>
                  ) : data.data.map(s => (
                    <tr key={s.id}>
                      <td>
                        <button onClick={() => openDetail(s.id)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontSize: 12 }}>
                          {s.tracking_number}
                        </button>
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--text-secondary)', maxWidth: 200 }}>
                        <span title={`${s.origin} → ${s.destination}`}>{s.origin?.split(',')[0]} → {s.destination?.split(',')[0]}</span>
                      </td>
                      <td>{s.driver_name || <span style={{ color: 'var(--text-muted)' }}>Unassigned</span>}</td>
                      <td style={{ fontSize: 12 }}>{s.order_number || '—'}</td>
                      <td><StatusBadge status={s.status} /></td>
                      <td className="text-right">${(s.cost || 0).toLocaleString()}</td>
                      <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{s.estimated_delivery || '—'}</td>
                      <td>
                        <button className="btn-icon" onClick={() => handleDelete(s.id)}>
                          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
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

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create New Shipment" wide>
        <ShipmentForm onSubmit={handleCreate} onClose={() => setShowCreate(false)} />
      </Modal>
      <Modal open={!!selectedDetail} onClose={() => setSelectedDetail(null)} title="Shipment Details" wide>
        {selectedDetail && <ShipmentDetail shipment={selectedDetail} onClose={() => setSelectedDetail(null)} onUpdate={load} />}
      </Modal>
    </div>
  );
}
