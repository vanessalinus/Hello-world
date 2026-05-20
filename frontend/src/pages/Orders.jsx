import { useEffect, useState, useCallback } from 'react';
import { orders as ordersApi, customers as customersApi } from '../api';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{status.replace(/_/g, ' ')}</span>;
}
function PriorityBadge({ priority }) {
  return <span className={`badge badge-${priority}`}>{priority}</span>;
}

const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const PRIORITIES = ['low', 'normal', 'high', 'urgent'];

function OrderForm({ initial, onSubmit, onClose }) {
  const [form, setForm] = useState(initial || { customer_id: '', status: 'pending', priority: 'normal', origin: '', destination: '', total_weight: '', estimated_value: '', notes: '' });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    customersApi.list({ limit: 100 }).then(r => setCustomers(r.data.data));
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Customer *</label>
          <select className="form-select" value={form.customer_id} onChange={e => set('customer_id', e.target.value)}>
            <option value="">Select customer</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Priority</label>
          <select className="form-select" value={form.priority} onChange={e => set('priority', e.target.value)}>
            {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Status</label>
          <select className="form-select" value={form.status} onChange={e => set('status', e.target.value)}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Est. Value ($)</label>
          <input className="form-input" type="number" value={form.estimated_value} onChange={e => set('estimated_value', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Origin</label>
          <input className="form-input" value={form.origin} onChange={e => set('origin', e.target.value)} placeholder="City, State" />
        </div>
        <div className="form-group">
          <label className="form-label">Destination</label>
          <input className="form-input" value={form.destination} onChange={e => set('destination', e.target.value)} placeholder="City, State" />
        </div>
        <div className="form-group">
          <label className="form-label">Total Weight (kg)</label>
          <input className="form-input" type="number" value={form.total_weight} onChange={e => set('total_weight', e.target.value)} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Notes</label>
        <textarea className="form-textarea" value={form.notes || ''} onChange={e => set('notes', e.target.value)} placeholder="Optional notes..." />
      </div>
      <div className="modal-footer" style={{ padding: 0, border: 'none', marginTop: 8 }}>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSubmit(form)}>Save Order</button>
      </div>
    </>
  );
}

function OrderDetail({ order, onClose, onUpdate }) {
  const toast = useToast();
  const [statusUpdate, setStatusUpdate] = useState(order.status);

  const handleStatusChange = async () => {
    try {
      await ordersApi.update(order.id, { status: statusUpdate });
      toast('Order status updated', 'success');
      onUpdate();
      onClose();
    } catch (e) { toast('Update failed', 'error'); }
  };

  return (
    <div>
      <div className="stat-row">
        <div className="stat-item">
          <div className="stat-item-label">ORDER NUMBER</div>
          <div className="stat-item-value" style={{ fontSize: 15, color: 'var(--primary)' }}>{order.order_number}</div>
        </div>
        <div className="stat-item">
          <div className="stat-item-label">CUSTOMER</div>
          <div className="stat-item-value" style={{ fontSize: 14 }}>{order.customer_name}</div>
        </div>
      </div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-body">
          <div className="detail-row"><span className="detail-label">Status</span><StatusBadge status={order.status} /></div>
          <div className="detail-row"><span className="detail-label">Priority</span><PriorityBadge priority={order.priority} /></div>
          <div className="detail-row"><span className="detail-label">Origin</span><span className="detail-value">{order.origin || '—'}</span></div>
          <div className="detail-row"><span className="detail-label">Destination</span><span className="detail-value">{order.destination || '—'}</span></div>
          <div className="detail-row"><span className="detail-label">Total Weight</span><span className="detail-value">{order.total_weight} kg</span></div>
          <div className="detail-row"><span className="detail-label">Est. Value</span><span className="detail-value">${(order.estimated_value || 0).toLocaleString()}</span></div>
          <div className="detail-row"><span className="detail-label">Created</span><span className="detail-value">{new Date(order.created_at).toLocaleString()}</span></div>
          {order.notes && <div className="detail-row"><span className="detail-label">Notes</span><span className="detail-value">{order.notes}</span></div>}
        </div>
      </div>
      {order.shipments && order.shipments.length > 0 && (
        <div>
          <div className="section-title" style={{ fontSize: 13, marginBottom: 8 }}>Linked Shipments</div>
          {order.shipments.map(s => (
            <div key={s.id} className="card" style={{ marginBottom: 8 }}>
              <div className="card-body" style={{ padding: '10px 16px' }}>
                <div className="flex gap-2">
                  <span style={{ fontWeight: 600, color: 'var(--primary)', fontSize: 12 }}>{s.tracking_number}</span>
                  <StatusBadge status={s.status} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: 12, marginLeft: 'auto' }}>{s.driver_name || 'No driver'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2" style={{ marginTop: 16 }}>
        <select className="form-select" value={statusUpdate} onChange={e => setStatusUpdate(e.target.value)} style={{ flex: 1 }}>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="btn btn-primary" onClick={handleStatusChange}>Update Status</button>
      </div>
    </div>
  );
}

export default function Orders() {
  const toast = useToast();
  const [data, setData] = useState({ data: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    ordersApi.list({ search, status: statusFilter, priority: priorityFilter, page, limit: 15 })
      .then(r => { setData(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [search, statusFilter, priorityFilter, page]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (form) => {
    try {
      await ordersApi.create(form);
      toast('Order created successfully', 'success');
      setShowCreate(false);
      load();
    } catch (e) { toast(e.response?.data?.error || 'Failed to create order', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this order?')) return;
    try {
      await ordersApi.delete(id);
      toast('Order deleted', 'success');
      load();
    } catch { toast('Failed to delete order', 'error'); }
  };

  const openDetail = async (id) => {
    try {
      const r = await ordersApi.get(id);
      setSelectedDetail(r.data);
    } catch { toast('Failed to load order details', 'error'); }
  };

  return (
    <div className="page">
      <div className="toolbar">
        <div className="search-bar">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input className="form-input" placeholder="Search orders..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <select className="form-select" style={{ width: 140 }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="form-select" style={{ width: 140 }} value={priorityFilter} onChange={e => { setPriorityFilter(e.target.value); setPage(1); }}>
          <option value="">All Priorities</option>
          {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <button className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setShowCreate(true)}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M12 4v16m8-8H4"/></svg>
          New Order
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div className="loading"><div className="spinner" /></div>
        ) : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Origin → Destination</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th className="text-right">Value</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.length === 0 ? (
                    <tr><td colSpan={8}><div className="empty-state"><p>No orders found</p></div></td></tr>
                  ) : data.data.map(o => (
                    <tr key={o.id}>
                      <td>
                        <button onClick={() => openDetail(o.id)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                          {o.order_number}
                        </button>
                      </td>
                      <td>{o.customer_name}</td>
                      <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                        {o.origin && o.destination ? `${o.origin} → ${o.destination}` : '—'}
                      </td>
                      <td><PriorityBadge priority={o.priority} /></td>
                      <td><StatusBadge status={o.status} /></td>
                      <td className="text-right">${(o.estimated_value || 0).toLocaleString()}</td>
                      <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{new Date(o.created_at).toLocaleDateString()}</td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn-icon" title="Delete" onClick={() => handleDelete(o.id)}>
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
                <button className="btn btn-secondary btn-sm" disabled={page <= 1} onClick={() => setPage(p => p-1)}>Previous</button>
                <button className="btn btn-secondary btn-sm" disabled={page * 15 >= data.total} onClick={() => setPage(p => p+1)}>Next</button>
              </div>
            </div>
          </>
        )}
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create New Order" wide>
        <OrderForm onSubmit={handleCreate} onClose={() => setShowCreate(false)} />
      </Modal>

      <Modal open={!!selectedDetail} onClose={() => setSelectedDetail(null)} title="Order Details" wide>
        {selectedDetail && <OrderDetail order={selectedDetail} onClose={() => setSelectedDetail(null)} onUpdate={load} />}
      </Modal>
    </div>
  );
}
