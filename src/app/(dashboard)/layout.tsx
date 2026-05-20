import Link from "next/link";

export const dynamic = "force-dynamic";

const nav = [
  { href: "/", label: "Dashboard" },
  { href: "/warehouses", label: "Warehouses" },
  { href: "/products", label: "Products" },
  { href: "/inventory", label: "Inventory" },
  { href: "/shipments", label: "Shipments" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="border-b border-slate-200 bg-[var(--card)] px-6 py-4 md:w-56 md:border-b-0 md:border-r md:border-slate-200 dark:border-slate-800">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
            Operations
          </p>
          <h1 className="text-lg font-semibold text-[var(--foreground)]">
            Logistics
          </h1>
        </div>
        <nav className="flex flex-wrap gap-2 md:flex-col md:gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-[var(--accent-muted)] hover:text-[var(--accent)] dark:text-slate-200 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
