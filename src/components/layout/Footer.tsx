import Link from "next/link";
import { Phone, Mail, MapPin, Share2 } from "lucide-react";

const footerLinks = {
  tours: [
    { label: "Serengeti Migration Safari", href: "/tours/serengeti-wildebeest-migration-safari" },
    { label: "Zanzibar Beach Paradise", href: "/tours/zanzibar-beach-paradise" },
    { label: "Kilimanjaro Climb", href: "/tours/kilimanjaro-summit-climb" },
    { label: "Botswana Okavango Safari", href: "/tours/botswana-okavango-delta-safari" },
    { label: "Tanzania & Zanzibar Combo", href: "/tours/tanzania-zanzibar-combination" },
    { label: "Honeymoon Package", href: "/tours/honeymoon-zanzibar-safari" },
  ],
  destinations: [
    { label: "Serengeti National Park", href: "/destinations/serengeti" },
    { label: "Zanzibar Island", href: "/destinations/zanzibar" },
    { label: "Ngorongoro Crater", href: "/destinations/ngorongoro" },
    { label: "Okavango Delta", href: "/destinations/okavango-delta" },
    { label: "Mount Kilimanjaro", href: "/destinations/kilimanjaro" },
    { label: "Chobe National Park", href: "/destinations/chobe" },
  ],
  company: [
    { label: "About Leviva", href: "/about" },
    { label: "Why Choose Us", href: "/about#why-us" },
    { label: "Our Team", href: "/about#team" },
    { label: "Blog & Travel Tips", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Newsletter section */}
      <div className="bg-brand-600 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-display font-bold text-white">
                Get Inspired – Subscribe to Our Newsletter
              </h3>
              <p className="text-brand-100 mt-1">
                Safari tips, destination guides, and exclusive offers from East Africa's experts
              </p>
            </div>
            <form className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:w-72 px-4 py-3 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 text-sm"
              />
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center font-bold text-white text-lg">
                L
              </div>
              <div>
                <div className="font-display font-bold text-xl text-white">Leviva Travel</div>
                <div className="text-xs text-brand-400 tracking-widest uppercase">& Tours</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              East Africa's premier safari and travel company, specializing in transformative
              journeys across Tanzania, Zanzibar, Botswana, Rwanda, and beyond. We craft
              extraordinary experiences for discerning travelers from around the world.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Arusha, Tanzania | Zanzibar, Tanzania</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-brand-400 flex-shrink-0" />
                <a href="tel:+255758996047" className="text-sm hover:text-white transition-colors">
                  +255 758 996 047
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-brand-400 flex-shrink-0" />
                <a
                  href="mailto:info@levivainvestments.co.tz"
                  className="text-sm hover:text-white transition-colors"
                >
                  info@levivainvestments.co.tz
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <a href="https://facebook.com/levivatravel" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-brand-600 rounded-lg transition-colors text-sm font-bold text-white w-9 h-9 flex items-center justify-center">f</a>
              <a href="https://instagram.com/levivatravel" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-brand-600 rounded-lg transition-colors text-sm font-bold text-white w-9 h-9 flex items-center justify-center">in</a>
              <a href="https://youtube.com/@levivatravel" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-brand-600 rounded-lg transition-colors text-sm font-bold text-white w-9 h-9 flex items-center justify-center">yt</a>
              <a href="https://twitter.com/levivatravel" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 hover:bg-brand-600 rounded-lg transition-colors">
                <Share2 size={18} />
              </a>
            </div>
          </div>

          {/* Tours */}
          <div>
            <h4 className="font-semibold text-white mb-4">Our Tours</h4>
            <ul className="space-y-2">
              {footerLinks.tours.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-semibold text-white mb-4">Destinations</h4>
            <ul className="space-y-2">
              {footerLinks.destinations.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-xs text-gray-500">Happy Travelers</div>
            </div>
            <div className="w-px h-10 bg-gray-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">4.9★</div>
              <div className="text-xs text-gray-500">Average Rating</div>
            </div>
            <div className="w-px h-10 bg-gray-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">15+</div>
              <div className="text-xs text-gray-500">Years Experience</div>
            </div>
            <div className="w-px h-10 bg-gray-700" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">25+</div>
              <div className="text-xs text-gray-500">Countries Served</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2025 Leviva Travel & Tours. All rights reserved. | Registered in Tanzania</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
