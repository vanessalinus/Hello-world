import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Boxes,
  Warehouse,
  Truck,
  BarChart3,
  Settings,
  Container,
} from "lucide-react";

const navItems = [
  { label: "Overview", section: true },
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { label: "Operations", section: true },
  { to: "/shipments", icon: Package, label: "Shipments" },
  { to: "/inventory", icon: Boxes, label: "Inventory" },
  { to: "/warehouses", icon: Warehouse, label: "Warehouses" },
  { to: "/vehicles", icon: Truck, label: "Fleet" },
  { label: "Insights", section: true },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Container size={20} />
        </div>
        <h1>LogiTrack</h1>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((item, i) =>
          item.section ? (
            <div key={i} className="sidebar-section-label">{item.label}</div>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <item.icon />
              <span>{item.label}</span>
            </NavLink>
          )
        )}
      </nav>
    </aside>
  );
}
