import { useApi } from "../hooks/useApi";
import { formatCurrency, capitalize } from "../utils/format";
import Loading from "../components/Loading";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line, CartesianGrid, Area, AreaChart,
} from "recharts";
import { Package, TrendingUp, DollarSign, AlertTriangle } from "lucide-react";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316"];

const tooltipStyle = {
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: 8,
  color: "#f1f5f9",
};

export default function Analytics() {
  const { data: stats, loading } = useApi("/api/analytics/dashboard");
  const { data: byStatus } = useApi("/api/analytics/shipments-by-status");
  const { data: byPriority } = useApi("/api/analytics/shipments-by-priority");
  const { data: byCat } = useApi("/api/analytics/inventory-by-category");

  if (loading || !stats) return <Loading />;

  const deliveryRate = stats.total_shipments > 0
    ? ((stats.delivered_shipments / stats.total_shipments) * 100).toFixed(1)
    : "0.0";

  const summaryCards = [
    { label: "Total Shipments", value: stats.total_shipments, icon: Package, color: "#3b82f6" },
    { label: "Delivery Rate", value: `${deliveryRate}%`, icon: TrendingUp, color: "#10b981" },
    { label: "Total Revenue", value: formatCurrency(stats.total_shipment_value), icon: DollarSign, color: "#8b5cf6" },
    { label: "Low Stock Alerts", value: stats.low_stock_items, icon: AlertTriangle, color: "#ef4444" },
  ];

  return (
    <>
      <div className="page-header">
        <h2>Analytics</h2>
        <p>Operational insights and performance metrics</p>
      </div>
      <div className="page-body">
        <div className="stats-grid">
          {summaryCards.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-icon" style={{ background: `${s.color}20`, color: s.color }}>
                <s.icon size={24} />
              </div>
              <div className="stat-info">
                <h4>{s.label}</h4>
                <div className="stat-value">{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="charts-grid">
          {byStatus && byStatus.length > 0 && (
            <div className="card">
              <div className="card-header"><h3>Shipments by Status</h3></div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={byStatus.map((d) => ({ ...d, status: capitalize(d.status) }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="status" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="count" name="Shipments" radius={[6, 6, 0, 0]}>
                      {byStatus.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {byPriority && byPriority.length > 0 && (
            <div className="card">
              <div className="card-header"><h3>Shipments by Priority</h3></div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={byPriority.map((d) => ({ ...d, priority: capitalize(d.priority) }))}
                      dataKey="count"
                      nameKey="priority"
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      innerRadius={60}
                      paddingAngle={3}
                      label={({ priority, count }) => `${priority}: ${count}`}
                    >
                      {byPriority.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {byCat && byCat.length > 0 && (
            <div className="card">
              <div className="card-header"><h3>Inventory by Category</h3></div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={byCat.map((d) => ({ ...d, category: capitalize(d.category) }))} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                    <YAxis dataKey="category" type="category" width={90} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="count" name="Items" fill="#8b5cf6" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {byCat && byCat.length > 0 && (
            <div className="card">
              <div className="card-header"><h3>Inventory Value by Category</h3></div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={byCat.map((d) => ({ ...d, category: capitalize(d.category) }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="category" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => formatCurrency(v)} />
                    <Area type="monotone" dataKey="total_value" name="Value" stroke="#06b6d4" fill="#06b6d420" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
