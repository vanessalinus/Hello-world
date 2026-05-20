import { AlertTriangle, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api/client";
import { Modal } from "../components/Modal";
import type { InventoryItem, Warehouse } from "../types";

export function Inventory() {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [search, setSearch] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(
    searchParams.get("low_stock") === "true"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    sku: "",
    name: "",
    description: "",
    quantity: "0",
    unit: "pcs",
    reorder_level: "10",
    unit_price: "0",
    warehouse_id: "",
  });
  const [error, setError] = useState("");

  const load = () => {
    api.inventory
      .list({
        search: search || undefined,
        low_stock: lowStockOnly || undefined,
      })
      .then(setItems);
  };

  useEffect(() => {
    api.warehouses.list().then(setWarehouses);
  }, []);

  useEffect(() => {
    load();
  }, [search, lowStockOnly]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.inventory.create({
        ...form,
        quantity: parseInt(form.quantity),
        reorder_level: parseInt(form.reorder_level),
        unit_price: parseFloat(form.unit_price),
        warehouse_id: parseInt(form.warehouse_id),
        description: form.description || undefined,
      });
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    await api.inventory.delete(id);
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Inventory</h1>
          <p className="page-subtitle">Track stock levels across warehouses</p>
        </div>
        <button className="btn-primary" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="input-field pl-10"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={lowStockOnly}
            onChange={(e) => setLowStockOnly(e.target.checked)}
            className="rounded border-slate-300"
          />
          Low stock only
        </label>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-600">SKU</th>
              <th className="px-4 py-3 font-medium text-slate-600">Name</th>
              <th className="px-4 py-3 font-medium text-slate-600">Warehouse</th>
              <th className="px-4 py-3 font-medium text-slate-600">Qty</th>
              <th className="px-4 py-3 font-medium text-slate-600">Unit Price</th>
              <th className="px-4 py-3 font-medium text-slate-600">Value</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => {
              const isLow = item.quantity <= item.reorder_level;
              return (
                <tr key={item.id} className={isLow ? "bg-amber-50/50" : ""}>
                  <td className="px-4 py-3 font-mono text-xs">{item.sku}</td>
                  <td className="px-4 py-3 font-medium">
                    <span className="flex items-center gap-2">
                      {item.name}
                      {isLow && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{item.warehouse_name}</td>
                  <td className="px-4 py-3">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="px-4 py-3">${item.unit_price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    ${(item.quantity * item.unit_price).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal title="Add Inventory Item" open={modalOpen} onClose={() => setModalOpen(false)} wide>
        <form onSubmit={handleCreate} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">SKU</label>
              <input
                className="input-field"
                required
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Name</label>
              <input
                className="input-field"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Warehouse</label>
              <select
                className="input-field"
                required
                value={form.warehouse_id}
                onChange={(e) => setForm({ ...form, warehouse_id: e.target.value })}
              >
                <option value="">Select warehouse</option>
                {warehouses.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({w.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Quantity</label>
              <input
                className="input-field"
                type="number"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Unit Price</label>
              <input
                className="input-field"
                type="number"
                step="0.01"
                value={form.unit_price}
                onChange={(e) => setForm({ ...form, unit_price: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
