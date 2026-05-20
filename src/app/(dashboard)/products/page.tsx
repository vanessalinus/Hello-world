import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/ProductForm";
import { createProduct } from "./actions";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { sku: "asc" },
    include: { _count: { select: { stockLevels: true, shipmentLines: true } } },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Catalog SKUs referenced on shipments and stock records.
        </p>
      </div>

      <ProductForm action={createProduct} />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-[var(--card)] dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-[var(--muted)] dark:border-slate-800 dark:bg-slate-900/40">
            <tr>
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Unit</th>
              <th className="px-4 py-3 font-medium">Locations</th>
              <th className="px-4 py-3 font-medium">Shipment lines</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border-b border-slate-100 last:border-0 dark:border-slate-800"
              >
                <td className="px-4 py-3 font-mono text-xs">{p.sku}</td>
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{p.unit}</td>
                <td className="px-4 py-3 tabular-nums">{p._count.stockLevels}</td>
                <td className="px-4 py-3 tabular-nums">{p._count.shipmentLines}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
