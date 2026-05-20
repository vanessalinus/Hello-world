import { prisma } from "@/lib/prisma";

function StatCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-[var(--card)] p-6 shadow-sm dark:border-slate-800">
      <p className="text-sm font-medium text-[var(--muted)]">{title}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums">{value}</p>
      {hint ? (
        <p className="mt-2 text-xs text-[var(--muted)]">{hint}</p>
      ) : null}
    </div>
  );
}

export default async function DashboardPage() {
  const [warehouses, products, shipments, stockRows] = await Promise.all([
    prisma.warehouse.count(),
    prisma.product.count(),
    prisma.shipment.count(),
    prisma.stockLevel.findMany({
      include: { product: true },
    }),
  ]);

  const unitsOnHand = stockRows.reduce((sum, row) => sum + row.quantity, 0);

  const inTransit = await prisma.shipment.count({
    where: { status: "IN_TRANSIT" },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="mt-1 text-[var(--muted)]">
          Snapshot of warehouses, catalog, stock, and outbound freight.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Warehouses" value={warehouses} />
        <StatCard title="Products" value={products} />
        <StatCard title="Open shipments" value={shipments} hint="All statuses" />
        <StatCard
          title="Units on hand"
          value={unitsOnHand}
          hint="Summed across locations"
        />
      </div>
      <div className="rounded-xl border border-slate-200 bg-[var(--card)] p-6 dark:border-slate-800">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">
          Pipeline
        </h3>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Shipments currently marked in transit:{" "}
          <span className="font-medium text-[var(--foreground)]">{inTransit}</span>
        </p>
      </div>
    </div>
  );
}
