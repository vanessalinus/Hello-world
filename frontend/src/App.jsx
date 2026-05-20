import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { ToastProvider } from './components/Toast';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Shipments from './pages/Shipments';
import Tracking from './pages/Tracking';
import Inventory from './pages/Inventory';
import Drivers from './pages/Drivers';
import Customers from './pages/Customers';
import Warehouses from './pages/Warehouses';
import { analytics } from './api';

const PAGE_TITLES = {
  '/': { title: 'Dashboard', subtitle: 'Overview of your logistics operations' },
  '/orders': { title: 'Orders', subtitle: 'Manage and track customer orders' },
  '/shipments': { title: 'Shipments', subtitle: 'Monitor all active and past shipments' },
  '/tracking': { title: 'Track Shipment', subtitle: 'Real-time shipment tracking' },
  '/inventory': { title: 'Inventory', subtitle: 'Manage warehouse stock and products' },
  '/warehouses': { title: 'Warehouses', subtitle: 'Facility management and capacity' },
  '/drivers': { title: 'Fleet & Drivers', subtitle: 'Manage your driver fleet' },
  '/customers': { title: 'Customers', subtitle: 'Customer relationship management' },
};

function AppContent() {
  const location = useLocation();
  const pageInfo = PAGE_TITLES[location.pathname] || { title: 'LogiTrack', subtitle: '' };
  const [stats, setStats] = useState({ lowStockCount: 0, pendingOrdersCount: 0 });

  useEffect(() => {
    analytics.getDashboard().then(r => {
      setStats({
        lowStockCount: r.data.kpis.lowStockItems,
        pendingOrdersCount: r.data.kpis.pendingOrders,
      });
    }).catch(() => {});
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <Sidebar lowStockCount={stats.lowStockCount} pendingOrdersCount={stats.pendingOrdersCount} />
      <div className="main-content">
        <header className="header">
          <div>
            <div className="header-title">{pageInfo.title}</div>
            {pageInfo.subtitle && <div className="header-subtitle">{pageInfo.subtitle}</div>}
          </div>
          <div className="header-actions">
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', textAlign: 'right' }}>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>Admin User</div>
              <div>Logistics Manager</div>
            </div>
            <div className="avatar" style={{ background: '#dbeafe', color: 'var(--primary)', width: 36, height: 36 }}>A</div>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/shipments" element={<Shipments />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </BrowserRouter>
  );
}
