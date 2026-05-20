import { useEffect, useState, useCallback } from 'react';
import { customers as customersApi } from '../api';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{status}</span>;
}

function CustomerForm({ initial, onSubmit, onClose }) {
  const [form, setForm] = useState(initial || { name: '', email: '', phone: '', address: '', city: '', country: '', status: 'active' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <>
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label">Name *</label>
          <input className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Company or person name" />
        </div>
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input className="form-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="contact@company.com" />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input className="form-input" value={form.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="+1-555-0000" />
        </div>
        <div className="form-group">
          <label className="form-label">City</label>
          <input className="form-input" value={form.city || ''} onChange={e => set('city', e.target.value)} placeholder="City" />
        </div>
        <div className="form-group">
          <label className="form-label">Country</label>
          <input className="form-input" value={form.country || ''} onChange={e => set('country', e.target.value)} placeholder="Country" />
        </div>
        <div className="form-group">
          <label className="form-label">Status</label>
          <select className="form-select" value={form.status} onChange={e => set('status', e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Address</label>
        <input className="form-input" value={form.address || ''} onChange={e => set('address', e.target.value)} placeholder="Street address" />
      </div>
      <div className="modal-footer" style={{ padding: 0, border: 'none' }}>
        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={() => onSubmit(form)}>Save Customer</button>
      </div>
    </>
  );
}

function CustomerDetail({ customer, onClose }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <div className="avatar" style={{ width: 56, height: 56, fontSize: 20, background: '#dbeafe', color: 'var(--primary)' }}>
          {customer.name.charAt(0)}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 17 }}>{customer.name}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{customer.email}</div>
          <StatusBadge status={customer.status} />
        </div>
      </div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-body">
          <div className="detail-row"><span className="detail-label">Phone</span><span className="detail-value">{customer.phone || '—'}</span></div>
          <div className="detail-row"><span className="detail-label">Address</span><span className="detail-value">{customer.address || '—'}</span></div>
          <div className="detail-row"><span className="detail-label">City</span><span className="detail-value">{customer.city || '—'}</span></div>
          <div className="detail-row"><span className="detail-label">Country</span><span className="detail-value">{customer.country || '—'}</span></div>
          <div className="detail-row"><span className="detail-label">Member Since</span><span className="detail-value">{new Date(customer.created_at).toLocaleDateString()}</span></div>
        </div>
      </div>
      {customer.recent_orders && customer.recent_orders.length > 0 && (
        <div>
          <div className="section-title" style={{ fontSize: 13, marginBottom: 8 }}>Recent Orders</div>
          <div className="table-wrapper" style={{ border: '1px solid var(--border)', borderRadius: 8 }}>
            <table>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Status</th>
                  <th className="text-right">Value</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {customer.recent_orders.map(o => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 600, color: 'var(--primary)', fontSize: 12 }}>{o.order_number}</td>
                    <td><span className={`badge badge-${o.status}`}>{o.status}</span></td>
                    <td className="text-right">${(o.estimated_value || 0).toLocaleString()}</td>
                    <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{new Date(o.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Customers() {
  const toast = useToast();
  const [data, setData] = useState({ data: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [viewCustomer, setViewCustomer] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    customersApi.list({ search, status: statusFilter, page, limit: 15 })
      .then(r => { setData(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [search, statusFilter, page]);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async (form) => {
    try { await customersApi.create(form); toast('Customer added', 'success'); setShowCreate(false); load(); }
    catch (e) { toast(e.response?.data?.error || 'Failed to create', 'error'); }
  };

  const handleEdit = async (form) => {
    try { await customersApi.update(editCustomer.id, form); toast('Customer updated', 'success'); setEditCustomer(null); load(); }
    catch { toast('Failed to update', 'error'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this customer?')) return;
    try { await customersApi.delete(id); toast('Deleted', 'success'); load(); }
    catch { toast('Failed to delete', 'error'); }
  };

  const openDetail = async (id) => {
    try { const r = await customersApi.get(id); setViewCustomer(r.data); }
    catch { toast('Failed to load', 'error'); }
  };

  return (
    <div className="page">
      <div className="toolbar">
        <div className="search-bar">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input className="form-input" placeholder="Search customers..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <select className="form-select" style={{ width: 130 }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setShowCreate(true)}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" d="M12 4v16m8-8H4"/></svg>
          Add Customer
        </button>
      </div>

      <div className="card">
        {loading ? <div className="loading"><div className="spinner"/></div> : (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Member Since</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.length === 0 ? (
                    <tr><td colSpan={6}><div className="empty-state"><p>No customers found</p></div></td></tr>
                  ) : data.data.map(c => (
                    <tr key={c.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div className="avatar" style={{ background: '#dbeafe', color: 'var(--primary)' }}>{c.name.charAt(0)}</div>
                          <div>
                            <button onClick={() => openDetail(c.id)} style={{ background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', color: 'var(--text)', fontSize: 13, textAlign: 'left' }}>
                              {c.name}
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: 13 }}>{c.email}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{c.phone || '—'}</div>
                      </td>
                      <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                        {[c.city, c.country].filter(Boolean).join(', ') || '—'}
                      </td>
                      <td><StatusBadge status={c.status} /></td>
                      <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{new Date(c.created_at).toLocaleDateString()}</td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn-icon" onClick={() => setEditCustomer(c)}>
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button className="btn-icon" onClick={() => handleDelete(c.id)}>
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

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Add Customer" wide>
        <CustomerForm onSubmit={handleCreate} onClose={() => setShowCreate(false)} />
      </Modal>
      <Modal open={!!editCustomer} onClose={() => setEditCustomer(null)} title="Edit Customer" wide>
        {editCustomer && <CustomerForm initial={editCustomer} onSubmit={handleEdit} onClose={() => setEditCustomer(null)} />}
      </Modal>
      <Modal open={!!viewCustomer} onClose={() => setViewCustomer(null)} title="Customer Details">
        {viewCustomer && <CustomerDetail customer={viewCustomer} onClose={() => setViewCustomer(null)} />}
      </Modal>
    </div>
  );
}
