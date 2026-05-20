import { Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import { Modal } from "../components/Modal";
import { StatusBadge } from "../components/StatusBadge";
import type { Shipment, ShipmentStatus, Vehicle } from "../types";

const STATUSES: ShipmentStatus[] = ["pending", "in_transit", "delivered", "cancelled"];

export function Shipments() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [trackInput, setTrackInput] = useState("");
  const [tracked, setTracked] = useState<Shipment | null>(null);
  const [trackError, setTrackError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    weight_kg: "",
    vehicle_id: "",
    notes: "",
  });
  const [error, setError] = useState("");

  const load = () => api.shipments.list().then(setShipments);
  useEffect(() => {
    load();
    api.vehicles.list().then(setVehicles);
  }, []);

  const handleTrack = async () => {
    setTrackError("");
    setTracked(null);
    if (!trackInput.trim()) return;
    try {
      const s = await api.shipments.track(trackInput.trim());
      setTracked(s);
    } catch {
      setTrackError("Shipment not found");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.shipments.create({
        origin: form.origin,
        destination: form.destination,
        weight_kg: parseFloat(form.weight_kg) || 0,
        vehicle_id: form.vehicle_id ? parseInt(form.vehicle_id) : undefined,
        notes: form.notes || undefined,
      });
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    }
  };

  const handleStatusChange = async (id: number, status: ShipmentStatus) => {
    await api.shipments.update(id, { status });
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this shipment?")) return;
    await api.shipments.delete(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Shipments</h1>
          <p className="page-subtitle">Track and manage deliveries</p>
        </div>
        <button className="btn-primary" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" /> New Shipment
        </button>
      </div>

      <div className="mt-4 card flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[200px]">
          <label className="mb-1 block text-sm font-medium text-slate-600">
            Track Shipment
          </label>
          <div className="flex gap-2">
            <input
              className="input-field"
              placeholder="Enter tracking number (e.g. SHP-2026-00001)"
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
            />
            <button type="button" className="btn-primary" onClick={handleTrack}>
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
        {trackError && <p className="text-sm text-red-600">{trackError}</p>}
        {tracked && (
          <div className="w-full rounded-lg border border-brand-200 bg-brand-50 p-4">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-mono font-bold">{tracked.tracking_number}</span>
              <StatusBadge status={tracked.status} />
              <span className="text-sm">
                {tracked.origin} → {tracked.destination}
              </span>
              {tracked.vehicle_plate && (
                <span className="text-sm text-slate-600">Vehicle: {tracked.vehicle_plate}</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-600">Tracking #</th>
              <th className="px-4 py-3 font-medium text-slate-600">Route</th>
              <th className="px-4 py-3 font-medium text-slate-600">Vehicle</th>
              <th className="px-4 py-3 font-medium text-slate-600">Weight</th>
              <th className="px-4 py-3 font-medium text-slate-600">Status</th>
              <th className="px-4 py-3 font-medium text-slate-600">ETA</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shipments.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3 font-mono text-xs font-medium">
                  {s.tracking_number}
                </td>
                <td className="px-4 py-3">
                  {s.origin} → {s.destination}
                </td>
                <td className="px-4 py-3 text-slate-600">{s.vehicle_plate || "—"}</td>
                <td className="px-4 py-3">{s.weight_kg} kg</td>
                <td className="px-4 py-3">
                  <select
                    value={s.status}
                    onChange={(e) =>
                      handleStatusChange(s.id, e.target.value as ShipmentStatus)
                    }
                    className="rounded border border-slate-200 px-2 py-1 text-xs"
                  >
                    {STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-slate-500">
                  {s.estimated_delivery
                    ? new Date(s.estimated_delivery).toLocaleDateString()
                    : "—"}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(s.id)}
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

      <Modal title="Create Shipment" open={modalOpen} onClose={() => setModalOpen(false)} wide>
        <form onSubmit={handleCreate} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Origin</label>
              <input
                className="input-field"
                required
                value={form.origin}
                onChange={(e) => setForm({ ...form, origin: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Destination</label>
              <input
                className="input-field"
                required
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Weight (kg)</label>
              <input
                className="input-field"
                type="number"
                value={form.weight_kg}
                onChange={(e) => setForm({ ...form, weight_kg: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Vehicle</label>
              <select
                className="input-field"
                value={form.vehicle_id}
                onChange={(e) => setForm({ ...form, vehicle_id: e.target.value })}
              >
                <option value="">Unassigned</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.plate_number} ({v.type})
                  </option>
                ))}
              </select>
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
