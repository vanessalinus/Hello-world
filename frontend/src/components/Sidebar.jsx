import { NavLink } from 'react-router-dom';

const icons = {
  dashboard: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  orders: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
    </svg>
  ),
  shipments: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
    </svg>
  ),
  inventory: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
    </svg>
  ),
  drivers: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
  customers: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
  ),
  warehouses: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
    </svg>
  ),
  tracking: (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
};

export default function Sidebar({ lowStockCount, pendingOrdersCount }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>LogiTrack</h1>
        <span>LOGISTICS MANAGEMENT</span>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Main</div>
        <nav className="sidebar-nav">
          <NavLink to="/" end>
            {icons.dashboard} Dashboard
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Operations</div>
        <nav className="sidebar-nav">
          <NavLink to="/orders">
            {icons.orders} Orders
            {pendingOrdersCount > 0 && <span className="sidebar-badge">{pendingOrdersCount}</span>}
          </NavLink>
          <NavLink to="/shipments">
            {icons.shipments} Shipments
          </NavLink>
          <NavLink to="/tracking">
            {icons.tracking} Track Shipment
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-label">Resources</div>
        <nav className="sidebar-nav">
          <NavLink to="/inventory">
            {icons.inventory} Inventory
            {lowStockCount > 0 && <span className="sidebar-badge">{lowStockCount}</span>}
          </NavLink>
          <NavLink to="/warehouses">
            {icons.warehouses} Warehouses
          </NavLink>
          <NavLink to="/drivers">
            {icons.drivers} Fleet & Drivers
          </NavLink>
          <NavLink to="/customers">
            {icons.customers} Customers
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
