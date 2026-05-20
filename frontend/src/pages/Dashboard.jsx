import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { analytics } from '../api';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const STATUS_COLORS = {
  pending: '#94a3b8', processing: '#0891b2', shipped: '#7c3aed',
  in_transit: '#7c3aed', out_for_delivery: '#d97706', delivered: '#16a34a',
  cancelled: '#dc2626', failed: '#dc2626',
};

function KPICard({ icon, label, value, change, color, bgColor }) {
  return (
    <div className="kpi-card">
      <div className="kpi-card-header">
        <div className="kpi-icon" style={{ background: bgColor }}>
          <span style={{ color }}>{icon}</span>
        </div>
      </div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {change !== undefined && (
        <div className={`kpi-change ${change >= 0 ? 'positive' : 'negative'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% this month
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{status.replace(/_/g, ' ')}</span>;
}

function PriorityBadge({ priority }) {
  return <span className={`badge badge-${priority}`}>{priority}</span>;
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analytics.getDashboard().then(r => {
      setData(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading"><div className="spinner" /></div>;
  if (!data) return <div className="page"><p>Failed to load dashboard data.</p></div>;

  const { kpis, ordersByStatus, shipmentsByStatus, recentOrders, recentShipments, topCustomers, inventorySummary, monthlyShipments } = data;

  const pieData = (ordersByStatus || []).map(s => ({
    name: s.status.replace(/_/g, ' '),
    value: s.count,
    color: STATUS_COLORS[s.status] || '#94a3b8',
  }));

  const chartData = (monthlyShipments || []).map(m => ({
    month: m.month ? m.month.slice(5) : '',
    shipments: m.count,
    revenue: Math.round(m.revenue),
  }));

  return (
    <div className="page">
      <div className="kpi-grid">
        <KPICard icon={<OrderIcon />} label="Total Orders" value={kpis.totalOrders} bgColor="#dbeafe" color="#2563eb" />
        <KPICard icon={<PendingIcon />} label="Pending Orders" value={kpis.pendingOrders} bgColor="#fef3c7" color="#d97706" />
        <KPICard icon={<TruckIcon />} label="Active Shipments" value={kpis.activeShipments} bgColor="#ede9fe" color="#7c3aed" />
        <KPICard icon={<CheckIcon />} label="Delivered Today" value={kpis.deliveredToday} bgColor="#dcfce7" color="#16a34a" />
        <KPICard icon={<UsersIcon />} label="Customers" value={kpis.totalCustomers} bgColor="#dbeafe" color="#2563eb" />
        <KPICard icon={<DriverIcon />} label="Available Drivers" value={kpis.availableDrivers} bgColor="#dcfce7" color="#16a34a" />
        <KPICard icon={<WarningIcon />} label="Low Stock Items" value={kpis.lowStockItems} bgColor="#fee2e2" color="#dc2626" />
        <KPICard icon={<MoneyIcon />} label="Monthly Revenue" value={`$${(kpis.monthlyRevenue || 0).toLocaleString()}`} bgColor="#dcfce7" color="#16a34a" />
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Monthly Shipments & Revenue</span>
          </div>
          <div className="card-body" style={{ padding: '16px 8px' }}>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v, n) => [n === 'revenue' ? `$${v.toLocaleString()}` : v, n === 'revenue' ? 'Revenue' : 'Shipments']} />
                  <Area type="monotone" dataKey="revenue" stroke="#2563eb" fill="url(#colorRev)" strokeWidth={2} />
                  <Area type="monotone" dataKey="shipments" stroke="#7c3aed" fill="none" strokeWidth={2} strokeDasharray="4 2" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-state"><p>No data available</p></div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Orders by Status</span>
          </div>
          <div className="card-body" style={{ padding: '16px 8px' }}>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v, n) => [v, n]} />
                  <Legend formatter={v => v.replace(/_/g, ' ')} iconSize={10} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="empty-state"><p>No data available</p></div>
            )}
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Orders</span>
            <Link to="/orders" className="btn btn-secondary btn-sm">View All</Link>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th className="text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                {(recentOrders || []).map(o => (
                  <tr key={o.id}>
                    <td><Link to={`/orders`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{o.order_number}</Link></td>
                    <td>{o.customer_name}</td>
                    <td><PriorityBadge priority={o.priority} /></td>
                    <td><StatusBadge status={o.status} /></td>
                    <td className="text-right">${(o.estimated_value || 0).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Recent Shipments</span>
            <Link to="/shipments" className="btn btn-secondary btn-sm">View All</Link>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Tracking #</th>
                  <th>Driver</th>
                  <th>Destination</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {(recentShipments || []).map(s => (
                  <tr key={s.id}>
                    <td><Link to={`/shipments`} style={{ color: 'var(--primary)', fontWeight: 600, fontSize: 12 }}>{s.tracking_number}</Link></td>
                    <td>{s.driver_name || '—'}</td>
                    <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{s.destination}</td>
                    <td><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Top Customers</span>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th className="text-right">Orders</th>
                  <th className="text-right">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {(topCustomers || []).map(c => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="avatar" style={{ background: '#dbeafe', color: '#2563eb' }}>
                          {c.name.charAt(0)}
                        </div>
                        <span style={{ fontWeight: 500 }}>{c.name}</span>
                      </div>
                    </td>
                    <td className="text-right">{c.order_count}</td>
                    <td className="text-right">${(c.total_value || 0).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Inventory by Category</span>
            <Link to="/inventory" className="btn btn-secondary btn-sm">View All</Link>
          </div>
          <div className="card-body">
            {(inventorySummary || []).map((item, i) => {
              const colors = ['#2563eb', '#7c3aed', '#16a34a', '#d97706', '#0891b2', '#dc2626'];
              return (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                    <span style={{ fontWeight: 500 }}>{item.category || 'Unknown'}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{item.item_types} types · {item.total_units?.toLocaleString()} units</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.min(100, (item.total_units / 2000) * 100)}%`, background: colors[i % colors.length] }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{width:20,height:20}}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>; }
function PendingIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{width:20,height:20}}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }
function TruckIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{width:20,height:20}}><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>; }
function CheckIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{width:20,height:20}}><path strokeLinecap="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>; }
function UsersIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{width:20,height:20}}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>; }
function DriverIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{width:20,height:20}}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>; }
function WarningIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{width:20,height:20}}><path strokeLinecap="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>; }
function MoneyIcon() { return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{width:20,height:20}}><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>; }
