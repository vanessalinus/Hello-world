/* Logistics Management Software - SPA frontend */

const API = {
  async get(url)        { return req('GET', url); },
  async post(url, body) { return req('POST', url, body); },
  async put(url, body)  { return req('PUT', url, body); },
  async del(url)        { return req('DELETE', url); },
};

async function req(method, url, body) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) throw new Error((data && data.error) || `Request failed: ${res.status}`);
  return data;
}

/* ----------------------------- UI utilities ----------------------------- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const ICONS = {
  dashboard:  '<svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-7h6v7h3a1 1 0 001-1V10"/></svg>',
  shipments:  '<svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7h13v10H3zM16 10h3l2 3v4h-5M6 21a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z"/></svg>',
  customers:  '<svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-2a4 4 0 100-8 4 4 0 000 8zm6 0a3 3 0 100-6 3 3 0 000 6z"/></svg>',
  drivers:    '<svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 11a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0"/></svg>',
  vehicles:   '<svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13l2-5h11l3 5v5h-2a2 2 0 11-4 0H9a2 2 0 11-4 0H3v-5z"/></svg>',
  warehouses: '<svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 21V10l9-6 9 6v11M9 21v-7h6v7"/></svg>',
  tracking:   '<svg class="nav-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0zM12 13a3 3 0 100-6 3 3 0 000 6z"/></svg>',
};

const ROUTES = [
  { id: 'dashboard',  label: 'Dashboard',  icon: ICONS.dashboard,  subtitle: 'Overview of your logistics operations.' },
  { id: 'shipments',  label: 'Shipments',  icon: ICONS.shipments,  subtitle: 'Manage shipments and their status.' },
  { id: 'tracking',   label: 'Tracking',   icon: ICONS.tracking,   subtitle: 'Look up shipments by tracking number.' },
  { id: 'customers',  label: 'Customers',  icon: ICONS.customers,  subtitle: 'Customer accounts and contacts.' },
  { id: 'drivers',    label: 'Drivers',    icon: ICONS.drivers,    subtitle: 'Driver roster and availability.' },
  { id: 'vehicles',   label: 'Vehicles',   icon: ICONS.vehicles,   subtitle: 'Fleet and vehicle status.' },
  { id: 'warehouses', label: 'Warehouses', icon: ICONS.warehouses, subtitle: 'Warehouse locations and capacity.' },
];

const SHIPMENT_STATUSES = ['pending','picked_up','in_transit','out_for_delivery','delivered','cancelled','returned'];
const DRIVER_STATUSES = ['available','on_delivery','off_duty'];
const VEHICLE_STATUSES = ['available','in_use','maintenance'];
const VEHICLE_TYPES = ['truck','van','car','motorcycle','trailer'];

function toast(message, kind = '') {
  const root = $('#toast-root');
  const el = document.createElement('div');
  el.className = `toast ${kind ? 'toast-' + kind : ''}`;
  el.textContent = message;
  root.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

function formatDate(s) {
  if (!s) return '—';
  const d = new Date(s.includes('T') ? s : s.replace(' ', 'T') + 'Z');
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleString();
}

function statusLabel(s) { return (s || '').replace(/_/g, ' '); }

function badge(status) {
  return `<span class="badge badge-${status}">${statusLabel(status)}</span>`;
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, c => (
    { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]
  ));
}

function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstChild;
}

/* ----------------------------- Modals ----------------------------- */

function openModal(contentHtml, { large = false } = {}) {
  closeModal();
  const root = $('#modal-root');
  const backdrop = el(`
    <div class="modal-backdrop">
      <div class="modal ${large ? 'modal-large' : ''}"></div>
    </div>
  `);
  backdrop.querySelector('.modal').innerHTML = contentHtml;
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
  root.appendChild(backdrop);
  document.body.style.overflow = 'hidden';
  return backdrop.querySelector('.modal');
}

function closeModal() {
  $('#modal-root').innerHTML = '';
  document.body.style.overflow = '';
}

function confirmDialog(message) {
  return new Promise((resolve) => {
    const modal = openModal(`
      <div class="p-6">
        <h3 class="text-lg font-semibold mb-2">Confirm</h3>
        <p class="text-sm text-slate-600 mb-5">${escapeHtml(message)}</p>
        <div class="flex justify-end gap-2">
          <button class="btn btn-secondary" data-act="no">Cancel</button>
          <button class="btn btn-danger" data-act="yes">Delete</button>
        </div>
      </div>
    `);
    modal.addEventListener('click', (e) => {
      const act = e.target.closest('[data-act]')?.dataset.act;
      if (!act) return;
      closeModal();
      resolve(act === 'yes');
    });
  });
}

/* ----------------------------- Router ----------------------------- */

function currentRoute() {
  const hash = location.hash.replace(/^#\/?/, '') || 'dashboard';
  const [id, ...rest] = hash.split('/');
  return { id, params: rest };
}

function navigate(routeId) {
  location.hash = `#/${routeId}`;
}

function renderSidebar() {
  const nav = $('#sidebar-nav');
  const { id } = currentRoute();
  nav.innerHTML = ROUTES.map(r => `
    <a href="#/${r.id}" class="nav-link ${r.id === id ? 'active' : ''}">
      ${r.icon}
      <span>${r.label}</span>
    </a>
  `).join('');
}

async function render() {
  renderSidebar();
  const route = currentRoute();
  const meta = ROUTES.find(r => r.id === route.id) || ROUTES[0];
  $('#page-title').textContent = meta.label;
  $('#page-subtitle').textContent = meta.subtitle;
  const page = $('#page');
  page.innerHTML = `<div class="text-slate-500 p-8 text-sm">Loading…</div>`;
  try {
    switch (route.id) {
      case 'dashboard':  return await renderDashboard(page);
      case 'shipments':  return await renderShipments(page, route.params);
      case 'tracking':   return await renderTracking(page, route.params);
      case 'customers':  return await renderCustomers(page);
      case 'drivers':    return await renderDrivers(page);
      case 'vehicles':   return await renderVehicles(page);
      case 'warehouses': return await renderWarehouses(page);
      default:           return navigate('dashboard');
    }
  } catch (err) {
    page.innerHTML = `<div class="card p-6 text-red-600">${escapeHtml(err.message)}</div>`;
  }
}

window.addEventListener('hashchange', render);

/* ----------------------------- Dashboard ----------------------------- */

async function renderDashboard(page) {
  const stats = await API.get('/api/stats');
  const s = stats.byStatus;

  page.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      ${statCard('Total Shipments', stats.totalShipments, 'bg-sky-100 text-sky-700', ICONS.shipments)}
      ${statCard('In Transit', s.in_transit + s.out_for_delivery + s.picked_up, 'bg-indigo-100 text-indigo-700', ICONS.tracking)}
      ${statCard('Delivered', s.delivered, 'bg-emerald-100 text-emerald-700',
        '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>')}
      ${statCard('Pending', s.pending, 'bg-amber-100 text-amber-700',
        '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>')}
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      ${miniStat('Customers',  stats.counts.customers,  'text-sky-700')}
      ${miniStat('Drivers',    stats.counts.drivers,    'text-indigo-700')}
      ${miniStat('Vehicles',   stats.counts.vehicles,   'text-emerald-700')}
      ${miniStat('Warehouses', stats.counts.warehouses, 'text-amber-700')}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="card p-5 lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">Recent shipments</h3>
          <a href="#/shipments" class="text-sm text-sky-600 hover:underline">View all →</a>
        </div>
        ${
          stats.recentShipments.length === 0
            ? `<div class="empty-state">No shipments yet. Create your first one to get started.</div>`
            : `<div class="overflow-x-auto"><table class="table">
                <thead><tr>
                  <th>Tracking #</th><th>Customer</th><th>Route</th><th>Status</th><th>Created</th>
                </tr></thead>
                <tbody>${stats.recentShipments.map(shipmentRowDashboard).join('')}</tbody>
              </table></div>`
        }
      </div>
      <div class="card p-5">
        <h3 class="font-semibold mb-4">Status breakdown</h3>
        <div class="space-y-2">
          ${SHIPMENT_STATUSES.map(st => {
            const count = s[st] || 0;
            const pct = stats.totalShipments ? Math.round((count / stats.totalShipments) * 100) : 0;
            return `
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="capitalize">${statusLabel(st)}</span>
                  <span class="text-slate-500">${count} (${pct}%)</span>
                </div>
                <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div class="h-full bg-sky-500" style="width:${pct}%"></div>
                </div>
              </div>`;
          }).join('')}
        </div>
        <div class="mt-5 pt-4 border-t border-slate-100 text-sm space-y-1">
          <div class="flex justify-between"><span class="text-slate-500">Revenue (delivered)</span><span class="font-semibold">$${stats.revenue.toFixed(2)}</span></div>
          <div class="flex justify-between"><span class="text-slate-500">Pending revenue</span><span class="font-semibold">$${stats.pendingRevenue.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  `;
}

function statCard(label, value, color, icon) {
  return `
    <div class="stat-card">
      <div class="stat-icon ${color}">${icon}</div>
      <div>
        <div class="text-xs text-slate-500 uppercase tracking-wide">${label}</div>
        <div class="text-2xl font-semibold">${value}</div>
      </div>
    </div>
  `;
}
function miniStat(label, value, color) {
  return `
    <div class="card p-4">
      <div class="text-xs uppercase text-slate-500 tracking-wide">${label}</div>
      <div class="text-2xl font-semibold ${color}">${value}</div>
    </div>
  `;
}

function shipmentRowDashboard(s) {
  return `
    <tr class="cursor-pointer" onclick="location.hash='#/shipments/${s.id}'">
      <td class="font-mono text-xs">${escapeHtml(s.tracking_no)}</td>
      <td>${escapeHtml(s.customer_name || '—')}</td>
      <td class="text-sm text-slate-600">${escapeHtml(s.origin)} → ${escapeHtml(s.destination)}</td>
      <td>${badge(s.status)}</td>
      <td class="text-sm text-slate-500">${formatDate(s.created_at)}</td>
    </tr>
  `;
}

/* ----------------------------- Shipments ----------------------------- */

async function renderShipments(page, params) {
  if (params && params[0]) {
    return renderShipmentDetail(page, params[0]);
  }

  const [list, customers, drivers, vehicles, warehouses] = await Promise.all([
    API.get('/api/shipments'),
    API.get('/api/customers'),
    API.get('/api/drivers'),
    API.get('/api/vehicles'),
    API.get('/api/warehouses'),
  ]);

  page.innerHTML = `
    <div class="card p-5">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div class="flex items-center gap-2">
          <input id="ship-search" type="text" placeholder="Search by tracking #, origin, destination, customer..." class="form-input w-72"/>
          <select id="ship-status-filter" class="form-select w-44">
            <option value="">All statuses</option>
            ${SHIPMENT_STATUSES.map(s => `<option value="${s}">${statusLabel(s)}</option>`).join('')}
          </select>
        </div>
        <button id="new-shipment" class="btn btn-primary">+ New Shipment</button>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead><tr>
            <th>Tracking #</th><th>Customer</th><th>Route</th>
            <th>Weight</th><th>Status</th><th>Driver / Vehicle</th>
            <th>Created</th><th class="text-right">Actions</th>
          </tr></thead>
          <tbody id="ship-rows"></tbody>
        </table>
      </div>
    </div>
  `;

  function paint(rows) {
    const tbody = $('#ship-rows');
    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="8" class="empty-state">No shipments match.</td></tr>`;
      return;
    }
    tbody.innerHTML = rows.map(s => `
      <tr>
        <td>
          <a class="font-mono text-xs text-sky-700 hover:underline" href="#/shipments/${s.id}">${escapeHtml(s.tracking_no)}</a>
        </td>
        <td>${escapeHtml(s.customer_name || '—')}</td>
        <td class="text-sm">${escapeHtml(s.origin)} → ${escapeHtml(s.destination)}</td>
        <td class="text-sm">${s.weight_kg ? `${s.weight_kg} kg` : '—'}</td>
        <td>${badge(s.status)}</td>
        <td class="text-sm">
          ${s.driver_name ? escapeHtml(s.driver_name) : '<span class="text-slate-400">No driver</span>'}
          ${s.vehicle_plate ? `<div class="text-xs text-slate-500">${escapeHtml(s.vehicle_plate)}</div>` : ''}
        </td>
        <td class="text-sm text-slate-500">${formatDate(s.created_at)}</td>
        <td class="text-right">
          <button class="btn btn-ghost" data-edit="${s.id}">Edit</button>
          <button class="btn btn-ghost text-red-600" data-del="${s.id}">Delete</button>
        </td>
      </tr>
    `).join('');
  }

  paint(list);

  $('#new-shipment').addEventListener('click', () =>
    openShipmentForm({ customers, drivers, vehicles, warehouses }, null));

  $('#ship-rows').addEventListener('click', async (e) => {
    const editId = e.target.closest('[data-edit]')?.dataset.edit;
    const delId  = e.target.closest('[data-del]')?.dataset.del;
    if (editId) {
      const ship = await API.get(`/api/shipments/${editId}`);
      openShipmentForm({ customers, drivers, vehicles, warehouses }, ship);
    } else if (delId) {
      if (await confirmDialog('Delete this shipment? This action cannot be undone.')) {
        try { await API.del(`/api/shipments/${delId}`); toast('Shipment deleted', 'success'); render(); }
        catch (err) { toast(err.message, 'error'); }
      }
    }
  });

  function filterAndPaint() {
    const q = $('#ship-search').value.trim().toLowerCase();
    const st = $('#ship-status-filter').value;
    let rows = list;
    if (st) rows = rows.filter(s => s.status === st);
    if (q) rows = rows.filter(s =>
      (s.tracking_no || '').toLowerCase().includes(q) ||
      (s.origin || '').toLowerCase().includes(q) ||
      (s.destination || '').toLowerCase().includes(q) ||
      (s.customer_name || '').toLowerCase().includes(q));
    paint(rows);
  }

  $('#ship-search').addEventListener('input', filterAndPaint);
  $('#ship-status-filter').addEventListener('change', filterAndPaint);
}

function openShipmentForm({ customers, drivers, vehicles, warehouses }, existing) {
  const isEdit = !!existing;
  const s = existing || {
    customer_id: '', origin: '', destination: '', weight_kg: 0, volume_m3: 0,
    status: 'pending', driver_id: '', vehicle_id: '', warehouse_id: '',
    cost: 0, notes: '', scheduled_at: '',
  };

  const modal = openModal(`
    <form id="ship-form" class="p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">${isEdit ? 'Edit Shipment' : 'New Shipment'}</h3>
        <button type="button" class="btn btn-ghost" data-close>✕</button>
      </div>
      ${isEdit ? `<div class="mb-3 text-xs font-mono text-slate-500">${escapeHtml(s.tracking_no)}</div>` : ''}
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="form-label">Customer</label>
          <select name="customer_id" class="form-select">
            <option value="">— None —</option>
            ${customers.map(c => `<option value="${c.id}" ${String(s.customer_id)===String(c.id)?'selected':''}>${escapeHtml(c.name)}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="form-label">Status</label>
          <select name="status" class="form-select">
            ${SHIPMENT_STATUSES.map(st => `<option value="${st}" ${s.status===st?'selected':''}>${statusLabel(st)}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="form-label">Origin *</label>
          <input name="origin" class="form-input" required value="${escapeHtml(s.origin)}"/>
        </div>
        <div>
          <label class="form-label">Destination *</label>
          <input name="destination" class="form-input" required value="${escapeHtml(s.destination)}"/>
        </div>
        <div>
          <label class="form-label">Weight (kg)</label>
          <input name="weight_kg" type="number" step="0.01" min="0" class="form-input" value="${s.weight_kg ?? 0}"/>
        </div>
        <div>
          <label class="form-label">Volume (m³)</label>
          <input name="volume_m3" type="number" step="0.01" min="0" class="form-input" value="${s.volume_m3 ?? 0}"/>
        </div>
        <div>
          <label class="form-label">Driver</label>
          <select name="driver_id" class="form-select">
            <option value="">— Unassigned —</option>
            ${drivers.map(d => `<option value="${d.id}" ${String(s.driver_id)===String(d.id)?'selected':''}>${escapeHtml(d.name)}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="form-label">Vehicle</label>
          <select name="vehicle_id" class="form-select">
            <option value="">— Unassigned —</option>
            ${vehicles.map(v => `<option value="${v.id}" ${String(s.vehicle_id)===String(v.id)?'selected':''}>${escapeHtml(v.plate_no)} (${escapeHtml(v.type)})</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="form-label">Warehouse</label>
          <select name="warehouse_id" class="form-select">
            <option value="">— None —</option>
            ${warehouses.map(w => `<option value="${w.id}" ${String(s.warehouse_id)===String(w.id)?'selected':''}>${escapeHtml(w.name)}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="form-label">Cost (USD)</label>
          <input name="cost" type="number" step="0.01" min="0" class="form-input" value="${s.cost ?? 0}"/>
        </div>
        <div class="sm:col-span-2">
          <label class="form-label">Scheduled at</label>
          <input name="scheduled_at" type="datetime-local" class="form-input" value="${toLocalDt(s.scheduled_at)}"/>
        </div>
        <div class="sm:col-span-2">
          <label class="form-label">Notes</label>
          <textarea name="notes" rows="3" class="form-textarea">${escapeHtml(s.notes || '')}</textarea>
        </div>
      </div>
      <div class="flex justify-end gap-2 mt-6">
        <button type="button" class="btn btn-secondary" data-close>Cancel</button>
        <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Create Shipment'}</button>
      </div>
    </form>
  `);

  modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeModal));
  modal.querySelector('#ship-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = {
      customer_id: fd.get('customer_id') ? Number(fd.get('customer_id')) : null,
      origin: fd.get('origin'),
      destination: fd.get('destination'),
      weight_kg: Number(fd.get('weight_kg') || 0),
      volume_m3: Number(fd.get('volume_m3') || 0),
      status: fd.get('status'),
      driver_id: fd.get('driver_id') ? Number(fd.get('driver_id')) : null,
      vehicle_id: fd.get('vehicle_id') ? Number(fd.get('vehicle_id')) : null,
      warehouse_id: fd.get('warehouse_id') ? Number(fd.get('warehouse_id')) : null,
      cost: Number(fd.get('cost') || 0),
      notes: fd.get('notes') || null,
      scheduled_at: fd.get('scheduled_at') ? new Date(fd.get('scheduled_at')).toISOString() : null,
    };
    try {
      if (isEdit) {
        await API.put(`/api/shipments/${existing.id}`, body);
        toast('Shipment updated', 'success');
      } else {
        await API.post('/api/shipments', body);
        toast('Shipment created', 'success');
      }
      closeModal();
      render();
    } catch (err) { toast(err.message, 'error'); }
  });
}

function toLocalDt(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

async function renderShipmentDetail(page, id) {
  const s = await API.get(`/api/shipments/${id}`);
  page.innerHTML = `
    <a href="#/shipments" class="text-sm text-sky-600 hover:underline mb-3 inline-block">← Back to shipments</a>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="card p-5 lg:col-span-2">
        <div class="flex items-start justify-between mb-3">
          <div>
            <div class="text-xs text-slate-500 font-mono">${escapeHtml(s.tracking_no)}</div>
            <h3 class="text-xl font-semibold">${escapeHtml(s.origin)} → ${escapeHtml(s.destination)}</h3>
          </div>
          ${badge(s.status)}
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mt-4">
          <div><div class="text-slate-500 text-xs uppercase">Customer</div><div>${escapeHtml(s.customer_name || '—')}</div></div>
          <div><div class="text-slate-500 text-xs uppercase">Driver</div><div>${escapeHtml(s.driver_name || '—')}</div></div>
          <div><div class="text-slate-500 text-xs uppercase">Vehicle</div><div>${escapeHtml(s.vehicle_plate || '—')}</div></div>
          <div><div class="text-slate-500 text-xs uppercase">Warehouse</div><div>${escapeHtml(s.warehouse_name || '—')}</div></div>
          <div><div class="text-slate-500 text-xs uppercase">Weight</div><div>${s.weight_kg || 0} kg</div></div>
          <div><div class="text-slate-500 text-xs uppercase">Volume</div><div>${s.volume_m3 || 0} m³</div></div>
          <div><div class="text-slate-500 text-xs uppercase">Cost</div><div>$${(s.cost || 0).toFixed(2)}</div></div>
          <div><div class="text-slate-500 text-xs uppercase">Scheduled</div><div>${formatDate(s.scheduled_at)}</div></div>
          <div><div class="text-slate-500 text-xs uppercase">Delivered</div><div>${formatDate(s.delivered_at)}</div></div>
        </div>
        ${s.notes ? `<div class="mt-4 text-sm bg-slate-50 p-3 rounded-lg border border-slate-200"><div class="text-xs text-slate-500 mb-1 uppercase">Notes</div>${escapeHtml(s.notes)}</div>` : ''}
      </div>

      <div class="card p-5">
        <h3 class="font-semibold mb-3">Update status</h3>
        <form id="event-form" class="space-y-3">
          <div>
            <label class="form-label">Status</label>
            <select name="status" class="form-select">
              ${SHIPMENT_STATUSES.map(st => `<option value="${st}" ${s.status===st?'selected':''}>${statusLabel(st)}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="form-label">Location</label>
            <input name="location" class="form-input" placeholder="e.g. Warehouse A"/>
          </div>
          <div>
            <label class="form-label">Note</label>
            <textarea name="note" rows="2" class="form-textarea" placeholder="What happened?"></textarea>
          </div>
          <button type="submit" class="btn btn-primary w-full">Add tracking event</button>
        </form>
      </div>
    </div>

    <div class="card p-5 mt-4">
      <h3 class="font-semibold mb-4">Tracking history</h3>
      ${s.events && s.events.length ? `
        <div class="timeline">
          ${s.events.map(ev => `
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="flex flex-wrap items-baseline gap-2">
                ${badge(ev.status)}
                <span class="text-sm">${escapeHtml(ev.location || '')}</span>
                <span class="text-xs text-slate-500">${formatDate(ev.occurred_at)}</span>
              </div>
              ${ev.note ? `<div class="text-sm text-slate-600 mt-1">${escapeHtml(ev.note)}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : `<div class="empty-state">No tracking events yet.</div>`}
    </div>
  `;

  $('#event-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    try {
      await API.post(`/api/shipments/${id}/events`, {
        status: fd.get('status'),
        location: fd.get('location') || null,
        note: fd.get('note') || null,
      });
      toast('Tracking event added', 'success');
      render();
    } catch (err) { toast(err.message, 'error'); }
  });
}

/* ----------------------------- Tracking ----------------------------- */

async function renderTracking(page, params) {
  const initial = params && params[0] ? decodeURIComponent(params[0]) : '';
  page.innerHTML = `
    <div class="card p-6">
      <h3 class="font-semibold mb-1">Track a shipment</h3>
      <p class="text-sm text-slate-500 mb-4">Enter a tracking number such as <span class="font-mono">LMS-…</span> to view its full status timeline.</p>
      <form id="track-form" class="flex gap-2">
        <input id="track-num" class="form-input flex-1" placeholder="LMS-XXXX-XXXX" value="${escapeHtml(initial)}"/>
        <button class="btn btn-primary" type="submit">Track</button>
      </form>
      <div id="track-result" class="mt-6"></div>
    </div>
  `;
  $('#track-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const t = $('#track-num').value.trim();
    if (!t) return;
    location.hash = `#/tracking/${encodeURIComponent(t)}`;
  });
  if (initial) await loadTrack(initial);
}

async function loadTrack(trackingNo) {
  const out = $('#track-result');
  out.innerHTML = `<div class="text-sm text-slate-500">Loading…</div>`;
  try {
    const s = await API.get(`/api/track/${encodeURIComponent(trackingNo)}`);
    out.innerHTML = `
      <div class="border-t border-slate-100 pt-5">
        <div class="flex items-start justify-between mb-3">
          <div>
            <div class="text-xs font-mono text-slate-500">${escapeHtml(s.tracking_no)}</div>
            <div class="text-lg font-semibold">${escapeHtml(s.origin)} → ${escapeHtml(s.destination)}</div>
            <div class="text-sm text-slate-500">Customer: ${escapeHtml(s.customer_name || '—')}</div>
          </div>
          ${badge(s.status)}
        </div>
        <div class="timeline">
          ${(s.events || []).map(ev => `
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="flex flex-wrap items-baseline gap-2">
                ${badge(ev.status)}
                <span class="text-sm">${escapeHtml(ev.location || '')}</span>
                <span class="text-xs text-slate-500">${formatDate(ev.occurred_at)}</span>
              </div>
              ${ev.note ? `<div class="text-sm text-slate-600 mt-1">${escapeHtml(ev.note)}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } catch (err) {
    out.innerHTML = `<div class="text-red-600 text-sm">${escapeHtml(err.message)}</div>`;
  }
}

/* --------------------- Generic CRUD entity page --------------------- */

function genericEntityPage(config) {
  return async (page) => {
    const rows = await API.get(config.endpoint);

    page.innerHTML = `
      <div class="card p-5">
        <div class="flex items-center justify-between mb-4">
          <input id="entity-search" type="text" placeholder="Search ${config.label.toLowerCase()}..." class="form-input w-72"/>
          <button id="entity-new" class="btn btn-primary">+ New ${config.singular}</button>
        </div>
        <div class="overflow-x-auto">
          <table class="table">
            <thead><tr>
              ${config.columns.map(c => `<th>${c.label}</th>`).join('')}
              <th class="text-right">Actions</th>
            </tr></thead>
            <tbody id="entity-rows"></tbody>
          </table>
        </div>
      </div>
    `;

    const paint = (list) => {
      const tbody = $('#entity-rows');
      if (!list.length) {
        tbody.innerHTML = `<tr><td colspan="${config.columns.length + 1}" class="empty-state">No ${config.label.toLowerCase()} yet.</td></tr>`;
        return;
      }
      tbody.innerHTML = list.map(item => `
        <tr>
          ${config.columns.map(c => `<td>${c.render ? c.render(item) : escapeHtml(item[c.field] ?? '—')}</td>`).join('')}
          <td class="text-right">
            <button class="btn btn-ghost" data-edit="${item.id}">Edit</button>
            <button class="btn btn-ghost text-red-600" data-del="${item.id}">Delete</button>
          </td>
        </tr>
      `).join('');
    };
    paint(rows);

    $('#entity-search').addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = rows.filter(r =>
        config.columns.some(c => String(r[c.field] ?? '').toLowerCase().includes(q))
      );
      paint(filtered);
    });

    $('#entity-new').addEventListener('click', () => openEntityForm(config, null));
    $('#entity-rows').addEventListener('click', async (e) => {
      const editId = e.target.closest('[data-edit]')?.dataset.edit;
      const delId  = e.target.closest('[data-del]')?.dataset.del;
      if (editId) {
        const item = rows.find(r => String(r.id) === editId);
        openEntityForm(config, item);
      } else if (delId) {
        if (await confirmDialog(`Delete this ${config.singular.toLowerCase()}?`)) {
          try { await API.del(`${config.endpoint}/${delId}`); toast(`${config.singular} deleted`, 'success'); render(); }
          catch (err) { toast(err.message, 'error'); }
        }
      }
    });
  };
}

function openEntityForm(config, existing) {
  const isEdit = !!existing;
  const data = existing || {};
  const modal = openModal(`
    <form id="entity-form" class="p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">${isEdit ? 'Edit' : 'New'} ${config.singular}</h3>
        <button type="button" class="btn btn-ghost" data-close>✕</button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${config.fields.map(f => fieldHtml(f, data[f.name])).join('')}
      </div>
      <div class="flex justify-end gap-2 mt-6">
        <button type="button" class="btn btn-secondary" data-close>Cancel</button>
        <button type="submit" class="btn btn-primary">${isEdit ? 'Save' : 'Create'}</button>
      </div>
    </form>
  `);
  modal.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', closeModal));
  modal.querySelector('#entity-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = {};
    for (const f of config.fields) {
      let v = fd.get(f.name);
      if (f.type === 'number') v = v === '' ? null : Number(v);
      else if (v === '') v = null;
      body[f.name] = v;
    }
    try {
      if (isEdit) await API.put(`${config.endpoint}/${existing.id}`, body);
      else        await API.post(config.endpoint, body);
      toast(`${config.singular} saved`, 'success');
      closeModal();
      render();
    } catch (err) { toast(err.message, 'error'); }
  });
}

function fieldHtml(f, value) {
  const v = value ?? '';
  const wide = f.wide ? 'sm:col-span-2' : '';
  if (f.type === 'select') {
    return `<div class="${wide}">
      <label class="form-label">${f.label}${f.required ? ' *' : ''}</label>
      <select name="${f.name}" class="form-select" ${f.required ? 'required' : ''}>
        ${f.options.map(o => `<option value="${o}" ${String(v)===o?'selected':''}>${statusLabel(o)}</option>`).join('')}
      </select>
    </div>`;
  }
  if (f.type === 'textarea') {
    return `<div class="${wide}">
      <label class="form-label">${f.label}${f.required ? ' *' : ''}</label>
      <textarea name="${f.name}" rows="3" class="form-textarea" ${f.required ? 'required' : ''}>${escapeHtml(v)}</textarea>
    </div>`;
  }
  return `<div class="${wide}">
    <label class="form-label">${f.label}${f.required ? ' *' : ''}</label>
    <input name="${f.name}" type="${f.type || 'text'}" ${f.type==='number' ? 'step="0.01" min="0"' : ''} class="form-input" value="${escapeHtml(v)}" ${f.required ? 'required' : ''}/>
  </div>`;
}

/* ----------------------------- Entities ----------------------------- */

const renderCustomers = genericEntityPage({
  label: 'Customers',
  singular: 'Customer',
  endpoint: '/api/customers',
  columns: [
    { label: 'Name', field: 'name', render: r => `<strong>${escapeHtml(r.name)}</strong>` },
    { label: 'Email', field: 'email' },
    { label: 'Phone', field: 'phone' },
    { label: 'City', field: 'city' },
    { label: 'Country', field: 'country' },
  ],
  fields: [
    { name: 'name', label: 'Name', required: true },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone' },
    { name: 'city', label: 'City' },
    { name: 'country', label: 'Country' },
    { name: 'address', label: 'Address', type: 'textarea', wide: true },
  ],
});

const renderDrivers = genericEntityPage({
  label: 'Drivers',
  singular: 'Driver',
  endpoint: '/api/drivers',
  columns: [
    { label: 'Name', field: 'name', render: r => `<strong>${escapeHtml(r.name)}</strong>` },
    { label: 'License', field: 'license_no' },
    { label: 'Phone', field: 'phone' },
    { label: 'Email', field: 'email' },
    { label: 'Status', field: 'status', render: r => badge(r.status) },
  ],
  fields: [
    { name: 'name', label: 'Name', required: true },
    { name: 'license_no', label: 'License Number' },
    { name: 'phone', label: 'Phone' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'status', label: 'Status', type: 'select', options: DRIVER_STATUSES },
  ],
});

const renderVehicles = genericEntityPage({
  label: 'Vehicles',
  singular: 'Vehicle',
  endpoint: '/api/vehicles',
  columns: [
    { label: 'Plate', field: 'plate_no', render: r => `<strong class="font-mono">${escapeHtml(r.plate_no)}</strong>` },
    { label: 'Type', field: 'type' },
    { label: 'Capacity', field: 'capacity_kg', render: r => `${r.capacity_kg || 0} kg` },
    { label: 'Status', field: 'status', render: r => badge(r.status) },
  ],
  fields: [
    { name: 'plate_no', label: 'Plate Number', required: true },
    { name: 'type', label: 'Type', type: 'select', options: VEHICLE_TYPES },
    { name: 'capacity_kg', label: 'Capacity (kg)', type: 'number' },
    { name: 'status', label: 'Status', type: 'select', options: VEHICLE_STATUSES },
  ],
});

const renderWarehouses = genericEntityPage({
  label: 'Warehouses',
  singular: 'Warehouse',
  endpoint: '/api/warehouses',
  columns: [
    { label: 'Name', field: 'name', render: r => `<strong>${escapeHtml(r.name)}</strong>` },
    { label: 'Code', field: 'code' },
    { label: 'City', field: 'city' },
    { label: 'Country', field: 'country' },
    { label: 'Capacity', field: 'capacity_m3', render: r => `${r.capacity_m3 || 0} m³` },
  ],
  fields: [
    { name: 'name', label: 'Name', required: true },
    { name: 'code', label: 'Code' },
    { name: 'city', label: 'City' },
    { name: 'country', label: 'Country' },
    { name: 'capacity_m3', label: 'Capacity (m³)', type: 'number' },
    { name: 'address', label: 'Address', type: 'textarea', wide: true },
  ],
});

/* ----------------------------- Header tracker ----------------------------- */

$('#track-btn').addEventListener('click', () => {
  const v = $('#track-input').value.trim();
  if (!v) return navigate('tracking');
  location.hash = `#/tracking/${encodeURIComponent(v)}`;
});
$('#track-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') $('#track-btn').click();
});

/* ----------------------------- Bootstrap ----------------------------- */

if (!location.hash) location.hash = '#/dashboard';
render();
