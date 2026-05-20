import Link from "next/link";
import { Menu, MessageCircle } from "lucide-react";
import { contact, navItems } from "@/lib/data";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-[#fffaf0]/90 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between gap-5 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Leviva Travel and Tours home">
          <span className="grid size-11 place-items-center rounded-2xl bg-[#146c43] text-lg font-black text-white shadow-lg">
            L
          </span>
          <span>
            <span className="block text-base font-black uppercase tracking-[0.18em] text-[#0b3b25]">
              Leviva
            </span>
            <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
              Travel and Tours
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-stone-700 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-[#146c43]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={contact.whatsappUrl}
            className="focus-ring hidden rounded-full bg-[#146c43] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-[#0b3b25] sm:inline-flex"
          >
            <MessageCircle className="mr-2 size-4" />
            WhatsApp
          </a>
          <a
            href="#booking"
            className="focus-ring rounded-full border border-[#146c43]/20 bg-white px-5 py-3 text-sm font-bold text-[#146c43] shadow-sm transition hover:border-[#146c43]"
          >
            Plan Trip
          </a>
          <details className="relative lg:hidden">
            <summary className="focus-ring grid cursor-pointer list-none place-items-center rounded-full border border-stone-200 bg-white p-3 text-stone-800 [&::-webkit-details-marker]:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Navigation menu</span>
            </summary>
            <div className="absolute right-0 mt-3 grid w-56 gap-2 rounded-3xl border border-stone-200 bg-white p-3 text-sm font-bold text-stone-700 shadow-xl">
              {navItems.map((item) => (
                <a key={item.href} className="rounded-2xl px-4 py-3 hover:bg-stone-50" href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
