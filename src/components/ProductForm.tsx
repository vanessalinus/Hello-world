"use client";

import { useActionState } from "react";
import type { ProductFormState } from "@/app/(dashboard)/products/actions";

type Props = {
  action: (prev: ProductFormState, data: FormData) => Promise<ProductFormState>;
};

export function ProductForm({ action }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form
      action={formAction}
      className="space-y-3 rounded-xl border border-slate-200 bg-[var(--card)] p-4 dark:border-slate-800"
    >
      <h3 className="text-sm font-semibold">Add product</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block text-xs font-medium text-[var(--muted)]">
          SKU
          <input
            name="sku"
            required
            className="mt-1 w-full rounded-md border border-slate-300 bg-transparent px-2 py-1.5 text-sm uppercase dark:border-slate-600"
          />
        </label>
        <label className="block text-xs font-medium text-[var(--muted)] lg:col-span-2">
          Name
          <input
            name="name"
            required
            className="mt-1 w-full rounded-md border border-slate-300 bg-transparent px-2 py-1.5 text-sm dark:border-slate-600"
          />
        </label>
        <label className="block text-xs font-medium text-[var(--muted)]">
          Unit
          <input
            name="unit"
            placeholder="ea"
            className="mt-1 w-full rounded-md border border-slate-300 bg-transparent px-2 py-1.5 text-sm dark:border-slate-600"
          />
        </label>
        <label className="block text-xs font-medium text-[var(--muted)] sm:col-span-2 lg:col-span-4">
          Description (optional)
          <input
            name="description"
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
        {pending ? "Saving…" : "Create product"}
      </button>
    </form>
  );
}
