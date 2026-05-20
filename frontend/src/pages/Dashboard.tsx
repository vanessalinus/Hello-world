import {
  Warehouse,
  Package,
  ClipboardList,
  Ship,
  Truck,
  Users,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { StatCard } from "../components/StatCard";
import type { DashboardStats } from "../types";

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.dashboard
      .stats()
      .then(setStats)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        Failed to load dashboard. Make sure the API is running on port 8000.
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Overview of your logistics operations</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Warehouses"
          value={stats.total_warehouses}
          icon={Warehouse}
          color="blue"
        />
        <StatCard
          title="Inventory Items"
          value={stats.total_inventory_items}
          subtitle={`${stats.low_stock_items} low stock`}
          icon={Package}
          color={stats.low_stock_items > 0 ? "amber" : "green"}
        />
        <StatCard
          title="Orders"
          value={stats.total_orders}
          subtitle={`${stats.pending_orders} pending`}
          icon={ClipboardList}
          color="purple"
        />
        <StatCard
          title="Shipments"
          value={stats.total_shipments}
          subtitle={`${stats.in_transit_shipments} in transit`}
          icon={Ship}
          color="blue"
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Fleet Vehicles"
          value={stats.total_vehicles}
          subtitle={`${stats.available_vehicles} available`}
          icon={Truck}
          color="green"
        />
        <StatCard
          title="Customers"
          value={stats.total_customers}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Inventory Value"
          value={`$${stats.inventory_value.toLocaleString()}`}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Delivered"
          value={stats.delivered_shipments}
          subtitle="completed shipments"
          icon={Ship}
          color="green"
        />
      </div>

      {stats.low_stock_items > 0 && (
        <div className="mt-6 flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <div className="flex-1">
            <p className="font-medium text-amber-900">
              {stats.low_stock_items} item(s) below reorder level
            </p>
            <p className="text-sm text-amber-700">Review inventory and restock soon.</p>
          </div>
          <Link to="/inventory?low_stock=true" className="btn-primary text-sm">
            View Items
          </Link>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h3 className="font-semibold text-slate-900">Quick Actions</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { to: "/orders", label: "New Order" },
              { to: "/shipments", label: "New Shipment" },
              { to: "/inventory", label: "Add Inventory" },
              { to: "/fleet", label: "Manage Fleet" },
            ].map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              >
                {a.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold text-slate-900">Operations Summary</h3>
          <dl className="mt-4 space-y-3">
            {[
              ["Active shipments", stats.in_transit_shipments],
              ["Pending orders", stats.pending_orders],
              ["Available vehicles", stats.available_vehicles],
              ["Total warehouses", stats.total_warehouses],
            ].map(([label, val]) => (
              <div key={String(label)} className="flex justify-between text-sm">
                <dt className="text-slate-500">{label}</dt>
                <dd className="font-semibold text-slate-900">{val}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
