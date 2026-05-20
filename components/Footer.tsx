import { Mail, MapPin, Phone } from "lucide-react";
import { contact, navItems } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-[#0b3b25] text-white">
      <div className="section-shell grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#e8a317]">
            Leviva Travel and Tours
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-black text-balance">
            Tanzania, Zanzibar, Botswana, and East Africa trips built for confident booking.
          </h2>
          <p className="mt-4 max-w-xl text-white/70">
            A conversion-ready website for safari inquiries, beach escapes, luxury groups,
            family adventures, and long-haul travelers from priority global markets.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white/70">Contact</h3>
          <div className="mt-5 space-y-4 text-sm text-white/80">
            <a className="flex items-center gap-3 hover:text-white" href={`mailto:${contact.email}`}>
              <Mail className="size-4 text-[#e8a317]" />
              {contact.email}
            </a>
            <a className="flex items-center gap-3 hover:text-white" href={`tel:${contact.phone}`}>
              <Phone className="size-4 text-[#e8a317]" />
              {contact.phoneDisplay}
            </a>
            <p className="flex items-center gap-3">
              <MapPin className="size-4 text-[#e8a317]" />
              Tanzania based, serving East Africa
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white/70">Explore</h3>
          <div className="mt-5 grid gap-3 text-sm text-white/80">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </a>
            ))}
            <a href="/privacy" className="hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="section-shell flex flex-col gap-2 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Leviva Investments. All rights reserved.</p>
          <p>Built for publishing on Vercel, Netlify, Render, or AWS Amplify.</p>
        </div>
      </div>
    </footer>
  );
}
