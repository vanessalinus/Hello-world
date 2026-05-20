import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import { Modal } from "../components/Modal";
import type { Warehouse } from "../types";

export function Warehouses() {
  const [items, setItems] = useState<Warehouse[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    code: "",
    address: "",
    city: "",
    country: "",
    capacity_sqm: "",
    manager_name: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const load = () => api.warehouses.list().then(setItems);
  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.warehouses.create({
        ...form,
        capacity_sqm: parseFloat(form.capacity_sqm),
        manager_name: form.manager_name || undefined,
        phone: form.phone || undefined,
      });
      setModalOpen(false);
      setForm({
        name: "",
        code: "",
        address: "",
        city: "",
        country: "",
        capacity_sqm: "",
        manager_name: "",
        phone: "",
      });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this warehouse?")) return;
    await api.warehouses.delete(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Warehouses</h1>
          <p className="page-subtitle">Manage distribution centers and storage facilities</p>
        </div>
        <button className="btn-primary" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add Warehouse
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((w) => (
          <div key={w.id} className="card">
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded bg-brand-100 px-2 py-0.5 text-xs font-mono font-medium text-brand-700">
                  {w.code}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{w.name}</h3>
              </div>
              <button
                onClick={() => handleDelete(w.id)}
                className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-600">{w.address}</p>
            <p className="text-sm text-slate-500">
              {w.city}, {w.country}
            </p>
            <div className="mt-4 flex gap-4 border-t border-slate-100 pt-4 text-sm">
              <div>
                <p className="text-slate-400">Capacity</p>
                <p className="font-medium">{w.capacity_sqm.toLocaleString()} m²</p>
              </div>
              {w.manager_name && (
                <div>
                  <p className="text-slate-400">Manager</p>
                  <p className="font-medium">{w.manager_name}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal title="Add Warehouse" open={modalOpen} onClose={() => setModalOpen(false)} wide>
        <form onSubmit={handleCreate} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Name</label>
              <input
                className="input-field"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Code</label>
              <input
                className="input-field"
                required
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Address</label>
              <input
                className="input-field"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">City</label>
              <input
                className="input-field"
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Country</label>
              <input
                className="input-field"
                required
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Capacity (m²)</label>
              <input
                className="input-field"
                type="number"
                required
                value={form.capacity_sqm}
                onChange={(e) => setForm({ ...form, capacity_sqm: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Manager</label>
              <input
                className="input-field"
                value={form.manager_name}
                onChange={(e) => setForm({ ...form, manager_name: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
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
