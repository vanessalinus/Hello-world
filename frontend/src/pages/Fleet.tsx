import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import { Modal } from "../components/Modal";
import { StatusBadge } from "../components/StatusBadge";
import type { Vehicle, VehicleStatus } from "../types";

const STATUSES: VehicleStatus[] = ["available", "in_use", "maintenance"];

export function Fleet() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    plate_number: "",
    type: "",
    capacity_kg: "",
    driver_name: "",
    driver_phone: "",
  });
  const [error, setError] = useState("");

  const load = () => api.vehicles.list().then(setVehicles);
  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.vehicles.create({
        ...form,
        capacity_kg: parseFloat(form.capacity_kg),
        driver_name: form.driver_name || undefined,
        driver_phone: form.driver_phone || undefined,
      });
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    }
  };

  const handleStatusChange = async (id: number, status: VehicleStatus) => {
    await api.vehicles.update(id, { status });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this vehicle?")) return;
    await api.vehicles.delete(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Fleet Management</h1>
          <p className="page-subtitle">Manage vehicles and drivers</p>
        </div>
        <button className="btn-primary" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> Add Vehicle
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {vehicles.map((v) => (
          <div key={v.id} className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-lg font-bold text-slate-900">{v.plate_number}</p>
                <p className="text-sm text-slate-500">{v.type}</p>
              </div>
              <StatusBadge status={v.status} />
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Capacity</span>
                <span className="font-medium">{v.capacity_kg.toLocaleString()} kg</span>
              </div>
              {v.driver_name && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Driver</span>
                  <span className="font-medium">{v.driver_name}</span>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <select
                value={v.status}
                onChange={(e) =>
                  handleStatusChange(v.id, e.target.value as VehicleStatus)
                }
                className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleDelete(v.id)}
                className="text-slate-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal title="Add Vehicle" open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleCreate} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <label className="mb-1 block text-sm font-medium">Plate Number</label>
            <input
              className="input-field"
              required
              value={form.plate_number}
              onChange={(e) => setForm({ ...form, plate_number: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Type</label>
            <input
              className="input-field"
              required
              placeholder="e.g. Delivery Van, Semi-Trailer"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Capacity (kg)</label>
            <input
              className="input-field"
              type="number"
              required
              value={form.capacity_kg}
              onChange={(e) => setForm({ ...form, capacity_kg: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Driver Name</label>
            <input
              className="input-field"
              value={form.driver_name}
              onChange={(e) => setForm({ ...form, driver_name: e.target.value })}
            />
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
