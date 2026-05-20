"use client";

import { useActionState } from "react";
import type { FormState } from "@/app/(dashboard)/warehouses/actions";

type Props = {
  action: (prev: FormState, data: FormData) => Promise<FormState>;
};

export function WarehouseForm({ action }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form
      action={formAction}
      className="space-y-3 rounded-xl border border-slate-200 bg-[var(--card)] p-4 dark:border-slate-800"
    >
      <h3 className="text-sm font-semibold">Add warehouse</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block text-xs font-medium text-[var(--muted)]">
          Name
          <input
            name="name"
            required
            className="mt-1 w-full rounded-md border border-slate-300 bg-transparent px-2 py-1.5 text-sm dark:border-slate-600"
          />
        </label>
        <label className="block text-xs font-medium text-[var(--muted)] sm:col-span-2">
          Street address
          <input
            name="address"
            required
            className="mt-1 w-full rounded-md border border-slate-300 bg-transparent px-2 py-1.5 text-sm dark:border-slate-600"
          />
        </label>
        <label className="block text-xs font-medium text-[var(--muted)]">
          City / region
          <input
            name="city"
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
        {pending ? "Saving…" : "Create warehouse"}
      </button>
    </form>
  );
}
