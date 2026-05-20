import { prisma } from "@/lib/prisma";
import { StockAdjustForm } from "@/components/StockAdjustForm";
import { adjustStock } from "./actions";

export default async function InventoryPage() {
  const [rows, warehouses, products] = await Promise.all([
    prisma.stockLevel.findMany({
      orderBy: [{ warehouse: { name: "asc" } }, { product: { sku: "asc" } }],
      include: { warehouse: true, product: true },
    }),
    prisma.warehouse.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({ orderBy: { sku: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Inventory</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          On-hand balances by warehouse and SKU.
        </p>
      </div>

      <StockAdjustForm
        action={adjustStock}
        warehouses={warehouses}
        products={products}
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-[var(--card)] dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-[var(--muted)] dark:border-slate-800 dark:bg-slate-900/40">
            <tr>
              <th className="px-4 py-3 font-medium">Warehouse</th>
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-b border-slate-100 last:border-0 dark:border-slate-800"
              >
                <td className="px-4 py-3 font-medium">{r.warehouse.name}</td>
                <td className="px-4 py-3 font-mono text-xs">{r.product.sku}</td>
                <td className="px-4 py-3">{r.product.name}</td>
                <td className="px-4 py-3 tabular-nums font-medium">{r.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <p className="px-4 py-6 text-center text-sm text-[var(--muted)]">
            No stock rows yet. Add products and post a positive delta to seed balances.
          </p>
        ) : null}
      </div>
    </div>
  );
}
