"use client";

import { useActionState } from "react";
import type { ShipmentFormState } from "@/app/(dashboard)/shipments/actions";

const statuses = [
  "DRAFT",
  "SCHEDULED",
  "IN_TRANSIT",
  "DELIVERED",
  "CANCELLED",
] as const;

type Props = {
  shipmentId: string;
  current: (typeof statuses)[number];
  action: (prev: ShipmentFormState, data: FormData) => Promise<ShipmentFormState>;
};

export function ShipmentStatusForm({ shipmentId, current, action }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form action={formAction} className="flex flex-wrap items-end gap-3">
      <input type="hidden" name="id" value={shipmentId} />
      <label className="block text-xs font-medium text-[var(--muted)]">
        Status
        <select
          name="status"
          defaultValue={current}
          disabled={current === "DELIVERED"}
          className="mt-1 block min-w-[11rem] rounded-md border border-slate-300 bg-transparent px-2 py-1.5 text-sm dark:border-slate-600"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        disabled={pending || current === "DELIVERED"}
        className="rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm font-medium hover:bg-slate-100 disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
      >
        {pending ? "Updating…" : "Update status"}
      </button>
      {current === "DELIVERED" ? (
        <p className="text-xs text-[var(--muted)]">Delivered loads are locked.</p>
      ) : null}
      {state.error ? (
        <p className="w-full text-sm text-red-600 dark:text-red-400">{state.error}</p>
      ) : null}
    </form>
  );
}
