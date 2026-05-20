import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ShipmentStatusForm } from "@/components/ShipmentStatusForm";
import { updateShipmentStatus } from "../actions";

type Props = { params: Promise<{ id: string }> };

export default async function ShipmentDetailPage({ params }: Props) {
  const { id } = await params;
  const shipment = await prisma.shipment.findUnique({
    where: { id },
    include: {
      originWarehouse: true,
      lines: { include: { product: true } },
    },
  });
  if (!shipment) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link
        href="/shipments"
        className="text-sm font-medium text-[var(--accent)] hover:underline"
      >
        ← All shipments
      </Link>

      <div>
        <p className="font-mono text-xs text-[var(--muted)]">{shipment.reference}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">
          {shipment.destinationName}
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {shipment.destinationAddress}, {shipment.destinationCity}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-[var(--card)] p-4 dark:border-slate-800">
        <h3 className="text-sm font-semibold">Fulfillment status</h3>
        <div className="mt-3">
          <ShipmentStatusForm
            shipmentId={shipment.id}
            current={shipment.status}
            action={updateShipmentStatus}
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-[var(--card)] p-4 dark:border-slate-800">
        <h3 className="text-sm font-semibold">Routing</h3>
        <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-[var(--muted)]">Origin</dt>
            <dd className="font-medium">{shipment.originWarehouse.name}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">Carrier</dt>
            <dd>{shipment.carrier ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">Scheduled</dt>
            <dd>
              {shipment.scheduledDate
                ? shipment.scheduledDate.toLocaleString()
                : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">Delivered at</dt>
            <dd>
              {shipment.deliveredAt
                ? shipment.deliveredAt.toLocaleString()
                : "—"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="rounded-xl border border-slate-200 bg-[var(--card)] p-4 dark:border-slate-800">
        <h3 className="text-sm font-semibold">Lines</h3>
        <table className="mt-3 w-full text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase text-[var(--muted)] dark:border-slate-700">
            <tr>
              <th className="py-2 pr-4 font-medium">SKU</th>
              <th className="py-2 pr-4 font-medium">Product</th>
              <th className="py-2 font-medium">Qty</th>
            </tr>
          </thead>
          <tbody>
            {shipment.lines.map((line) => (
              <tr key={line.id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 pr-4 font-mono text-xs">{line.product.sku}</td>
                <td className="py-2 pr-4">{line.product.name}</td>
                <td className="py-2 tabular-nums">{line.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
