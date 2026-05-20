import { prisma } from "@/lib/prisma";
import { WarehouseForm } from "@/components/WarehouseForm";
import { createWarehouse, deleteWarehouse } from "./actions";

export default async function WarehousesPage() {
  const warehouses = await prisma.warehouse.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { outboundShipments: true, stockLevels: true } },
    },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Warehouses</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Distribution nodes used as shipment origins and for stock.
        </p>
      </div>

      <WarehouseForm action={createWarehouse} />

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-[var(--card)] dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-[var(--muted)] dark:border-slate-800 dark:bg-slate-900/40">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Shipments</th>
              <th className="px-4 py-3 font-medium">SKUs</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {warehouses.map((w) => (
              <tr
                key={w.id}
                className="border-b border-slate-100 last:border-0 dark:border-slate-800"
              >
                <td className="px-4 py-3 font-medium">{w.name}</td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  {w.address}, {w.city}
                </td>
                <td className="px-4 py-3 tabular-nums">
                  {w._count.outboundShipments}
                </td>
                <td className="px-4 py-3 tabular-nums">{w._count.stockLevels}</td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteWarehouse}>
                    <input type="hidden" name="id" value={w.id} />
                    <button
                      type="submit"
                      disabled={w._count.outboundShipments > 0}
                      className="text-xs font-medium text-red-600 hover:underline disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline dark:text-red-400"
                      title={
                        w._count.outboundShipments > 0
                          ? "Remove or reassign shipments first"
                          : "Delete warehouse"
                      }
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
