"use client";

import { useActionState } from "react";
import type { ShipmentFormState } from "@/app/(dashboard)/shipments/actions";

type Warehouse = { id: string; name: string };
type Product = { id: string; sku: string; name: string };

type Props = {
  action: (prev: ShipmentFormState, data: FormData) => Promise<ShipmentFormState>;
  warehouses: Warehouse[];
  products: Product[];
};

export function ShipmentCreateForm({ action, warehouses, products }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form
      action={formAction}
      className="space-y-3 rounded-xl border border-slate-200 bg-[var(--card)] p-4 dark:border-slate-800"
    >
      <h3 className="text-sm font-semibold">New shipment</h3>
      <p className="text-xs text-[var(--muted)]">
        Creates a draft outbound load with one line. Reference is assigned automatically.
      </p>
      <div className="grid gap-3 lg:grid-cols-2">
        <label className="block text-xs font-medium text-[var(--muted)]">
          Origin warehouse
          <select
            name="originWarehouseId"
            required
            className="mt-1 w-full rounded-md border border-slate-300 bg-transparent px-2 py-1.5 text-sm dark:border-slate-600"
          >
            <option value="">Select…</option>
            {warehouses.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs font-medium text-[var(--muted)]">
          Carrier (optional)
          <input
            name="carrier"
            className="mt-1 w-full rounded-md border border-slate-300 bg-transparent px-2 py-1.5 text-sm dark:border-slate-600"
          />
        </label>
        <label className="block text-xs font-medium text-[var(--muted)]">
          Consignee name
          <input
            name="destinationName"
            required
            className="mt-1 w-full rounded-md border border-slate-300 bg-transparent px-2 py-1.5 text-sm dark:border-slate-600"
          />
        </label>
        <label className="block text-xs font-medium text-[var(--muted)]">
          Scheduled pickup / ship (optional)
          <input
            name="scheduledDate"
            type="datetime-local"
            className="mt-1 w-full rounded-md border border-slate-300 bg-transparent px-2 py-1.5 text-sm dark:border-slate-600"
          />
        </label>
        <label className="block text-xs font-medium text-[var(--muted)] lg:col-span-2">
          Destination street
          <input
            name="destinationAddress"
            required
            className="mt-1 w-full rounded-md border border-slate-300 bg-transparent px-2 py-1.5 text-sm dark:border-slate-600"
          />
        </label>
        <label className="block text-xs font-medium text-[var(--muted)] lg:col-span-2">
          City / region
          <input
            name="destinationCity"
            required
            className="mt-1 w-full rounded-md border border-slate-300 bg-transparent px-2 py-1.5 text-sm dark:border-slate-600"
          />
        </label>
        <label className="block text-xs font-medium text-[var(--muted)]">
          Product
          <select
            name="productId"
            required
            className="mt-1 w-full rounded-md border border-slate-300 bg-transparent px-2 py-1.5 text-sm dark:border-slate-600"
          >
            <option value="">Select…</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.sku} — {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-xs font-medium text-[var(--muted)]">
          Quantity
          <input
            name="quantity"
            type="number"
            min={1}
            required
            className="mt-1 w-full rounded-md border border-slate-300 bg-transparent px-2 py-1.5 text-sm dark:border-slate-600"
          />
        </label>
      </div>
      {state.error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {pending ? "Creating…" : "Create draft shipment"}
      </button>
    </form>
  );
}
