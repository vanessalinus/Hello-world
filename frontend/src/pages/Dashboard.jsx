import { useApi } from "../hooks/useApi";
import { formatCurrency } from "../utils/format";
import { StatusBadge, PriorityBadge } from "../components/StatusBadge";
import Loading from "../components/Loading";
import {
  Package, Boxes, Warehouse, Truck, DollarSign,
  AlertTriangle, TrendingUp, Clock,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316"];

export default function Dashboard() {
  const { data: stats, loading } = useApi("/api/analytics/dashboard");
  const { data: byStatus } = useApi("/api/analytics/shipments-by-status");
  const { data: byPriority } = useApi("/api/analytics/shipments-by-priority");
  const { data: byCat } = useApi("/api/analytics/inventory-by-category");
  const { data: recentShipments } = useApi("/api/shipments?limit=5");

  if (loading || !stats) return <Loading />;

  const statCards = [
    { label: "Total Shipments", value: stats.total_shipments, sub: `${stats.active_shipments} active`, icon: Package, color: "#3b82f6" },
    { label: "Delivered", value: stats.delivered_shipments, sub: `${stats.pending_shipments} pending`, icon: TrendingUp, color: "#10b981" },
    { label: "Inventory Items", value: stats.total_inventory_items, sub: `${stats.low_stock_items} low stock`, icon: Boxes, color: "#8b5cf6" },
    { label: "Warehouses", value: `${stats.active_warehouses}/${stats.total_warehouses}`, sub: "Active", icon: Warehouse, color: "#f59e0b" },
    { label: "Fleet Vehicles", value: `${stats.available_vehicles}/${stats.total_vehicles}`, sub: "Available", icon: Truck, color: "#06b6d4" },
    { label: "Shipment Value", value: formatCurrency(stats.total_shipment_value), sub: "Total", icon: DollarSign, color: "#10b981" },
    { label: "Inventory Value", value: formatCurrency(stats.total_inventory_value), sub: "Total", icon: DollarSign, color: "#8b5cf6" },
    { label: "Low Stock Alerts", value: stats.low_stock_items, sub: "Items need restock", icon: AlertTriangle, color: "#ef4444" },
  ];

  return (
    <>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Overview of your logistics operations</p>
      </div>
      <div className="page-body">
        <div className="stats-grid">
          {statCards.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon" style={{ background: `${s.color}20`, color: s.color }}>
                <s.icon size={24} />
              </div>
              <div className="stat-info">
                <h4>{s.label}</h4>
                <div className="stat-value">{s.value}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="charts-grid">
          {byStatus && byStatus.length > 0 && (
            <div className="card">
              <div className="card-header"><h3>Shipments by Status</h3></div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={byStatus}>
                    <XAxis dataKey="status" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#f1f5f9" }} />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {byStatus.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {byCat && byCat.length > 0 && (
            <div className="card">
              <div className="card-header"><h3>Inventory by Category</h3></div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={byCat} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={100} label>
                      {byCat.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#f1f5f9" }} />
                    <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {recentShipments && recentShipments.length > 0 && (
          <div className="card" style={{ marginTop: 24 }}>
            <div className="card-header"><h3>Recent Shipments</h3></div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Tracking #</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Recipient</th>
                  </tr>
                </thead>
                <tbody>
                  {recentShipments.map((s) => (
                    <tr key={s.id}>
                      <td className="font-mono">{s.tracking_number}</td>
                      <td><StatusBadge status={s.status} /></td>
                      <td><PriorityBadge priority={s.priority} /></td>
                      <td>{s.origin_city}</td>
                      <td>{s.destination_city}</td>
                      <td>{s.recipient_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
