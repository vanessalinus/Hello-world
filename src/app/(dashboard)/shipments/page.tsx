import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ShipmentCreateForm } from "@/components/ShipmentCreateForm";
import { createShipment } from "./actions";

export default async function ShipmentsPage() {
  const [shipments, warehouses, products] = await Promise.all([
    prisma.shipment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        originWarehouse: true,
        lines: { include: { product: true } },
      },
    }),
    prisma.warehouse.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({ orderBy: { sku: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Shipments</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Outbound freight from your warehouses. Marking delivered consumes origin stock for
          each line.
        </p>
      </div>

      <ShipmentCreateForm
        action={createShipment}
        warehouses={warehouses}
        products={products}
      />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-[var(--card)] dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-[var(--muted)] dark:border-slate-800 dark:bg-slate-900/40">
            <tr>
              <th className="px-4 py-3 font-medium">Reference</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Origin</th>
              <th className="px-4 py-3 font-medium">Destination</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {shipments.map((s) => (
              <tr
                key={s.id}
                className="border-b border-slate-100 last:border-0 dark:border-slate-800"
              >
                <td className="px-4 py-3 font-mono text-xs font-medium">{s.reference}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium dark:bg-slate-800">
                    {s.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-4 py-3">{s.originWarehouse.name}</td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  {s.destinationName}, {s.destinationCity}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/shipments/${s.id}`}
                    className="text-xs font-medium text-[var(--accent)] hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
