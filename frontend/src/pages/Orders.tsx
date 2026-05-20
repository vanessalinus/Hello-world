import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import { Modal } from "../components/Modal";
import { StatusBadge } from "../components/StatusBadge";
import type { Customer, Order, OrderStatus, Warehouse } from "../types";

const STATUSES: OrderStatus[] = [
  "draft",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    customer_id: "",
    origin_warehouse_id: "",
    destination_address: "",
    destination_city: "",
    destination_country: "",
    notes: "",
  });
  const [error, setError] = useState("");

  const load = () => api.orders.list().then(setOrders);
  useEffect(() => {
    load();
    api.customers.list().then(setCustomers);
    api.warehouses.list().then(setWarehouses);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.orders.create({
        customer_id: parseInt(form.customer_id),
        origin_warehouse_id: form.origin_warehouse_id
          ? parseInt(form.origin_warehouse_id)
          : undefined,
        destination_address: form.destination_address || undefined,
        destination_city: form.destination_city || undefined,
        destination_country: form.destination_country || undefined,
        notes: form.notes || undefined,
        items: [],
      });
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    }
  };

  const handleStatusChange = async (id: number, status: OrderStatus) => {
    await api.orders.update(id, { status });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this order?")) return;
    await api.orders.delete(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Orders</h1>
          <p className="page-subtitle">Manage customer orders and fulfillment</p>
        </div>
        <button className="btn-primary" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> New Order
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-600">Order #</th>
              <th className="px-4 py-3 font-medium text-slate-600">Customer</th>
              <th className="px-4 py-3 font-medium text-slate-600">Destination</th>
              <th className="px-4 py-3 font-medium text-slate-600">Amount</th>
              <th className="px-4 py-3 font-medium text-slate-600">Status</th>
              <th className="px-4 py-3 font-medium text-slate-600">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3 font-mono text-xs font-medium">{o.order_number}</td>
                <td className="px-4 py-3">{o.customer_name}</td>
                <td className="px-4 py-3 text-slate-600">
                  {o.destination_city
                    ? `${o.destination_city}, ${o.destination_country}`
                    : "—"}
                </td>
                <td className="px-4 py-3 font-medium">${o.total_amount.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) =>
                      handleStatusChange(o.id, e.target.value as OrderStatus)
                    }
                    className="rounded border-0 bg-transparent text-sm focus:ring-0"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <StatusBadge status={o.status} />
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {new Date(o.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(o.id)}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal title="Create Order" open={modalOpen} onClose={() => setModalOpen(false)} wide>
        <form onSubmit={handleCreate} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Customer</label>
              <select
                className="input-field"
                required
                value={form.customer_id}
                onChange={(e) => setForm({ ...form, customer_id: e.target.value })}
              >
                <option value="">Select customer</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Origin Warehouse</label>
              <select
                className="input-field"
                value={form.origin_warehouse_id}
                onChange={(e) =>
                  setForm({ ...form, origin_warehouse_id: e.target.value })
                }
              >
                <option value="">Select warehouse</option>
                {warehouses.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Destination City</label>
              <input
                className="input-field"
                value={form.destination_city}
                onChange={(e) => setForm({ ...form, destination_city: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Destination Address</label>
              <input
                className="input-field"
                value={form.destination_address}
                onChange={(e) =>
                  setForm({ ...form, destination_address: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Order
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
