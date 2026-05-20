"use client";

import { useActionState } from "react";
import type { StockFormState } from "@/app/(dashboard)/inventory/actions";

type Warehouse = { id: string; name: string };
type Product = { id: string; sku: string; name: string };

type Props = {
  action: (prev: StockFormState, data: FormData) => Promise<StockFormState>;
  warehouses: Warehouse[];
  products: Product[];
};

export function StockAdjustForm({ action, warehouses, products }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form
      action={formAction}
      className="space-y-3 rounded-xl border border-slate-200 bg-[var(--card)] p-4 dark:border-slate-800"
    >
      <h3 className="text-sm font-semibold">Adjust on-hand quantity</h3>
      <p className="text-xs text-[var(--muted)]">
        Positive numbers receive stock; negative numbers remove it (receipts, cycle counts,
        shrink).
      </p>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block text-xs font-medium text-[var(--muted)]">
          Warehouse
          <select
            name="warehouseId"
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
          Delta (units)
          <input
            name="delta"
            type="number"
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
        {pending ? "Applying…" : "Apply adjustment"}
      </button>
    </form>
  );
}
