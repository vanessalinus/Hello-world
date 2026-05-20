const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  in_transit: "bg-blue-100 text-blue-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
  draft: "bg-slate-100 text-slate-700",
  confirmed: "bg-indigo-100 text-indigo-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-blue-100 text-blue-800",
  available: "bg-emerald-100 text-emerald-800",
  in_use: "bg-blue-100 text-blue-800",
  maintenance: "bg-orange-100 text-orange-800",
};

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] || "bg-slate-100 text-slate-700";
  const label = status.replace(/_/g, " ");
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${style}`}
    >
      {label}
    </span>
  );
}
