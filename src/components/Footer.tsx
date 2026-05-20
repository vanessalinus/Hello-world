import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center font-bold text-lg text-white">
                L
              </div>
              <div>
                <span
                  className="text-xl font-bold text-white tracking-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Leviva
                </span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-primary-400 -mt-1">
                  Travel & Tours
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Your gateway to East Africa&apos;s most extraordinary
              destinations. Expert-guided safaris, mountain treks, and beach
              retreats crafted with passion and local expertise.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/levivatravel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/levivatravel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.16c3.2,0,3.58.01,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s-.01,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.17,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33.01,7.05.07,2.7.27.27,2.69.07,7.05.01,8.33,0,8.74,0,12s.01,3.67.07,4.95c.2,4.36,2.62,6.78,6.98,6.98,1.28.06,1.69.07,4.95.07s3.67-.01,4.95-.07c4.35-.2,6.78-2.62,6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.36-2.62-6.78-6.98-6.98C15.67.01,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z"/></svg>
              </a>
              <a
                href={`https://wa.me/255758996047`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.47,14.38c-.29-.15-1.7-.84-1.97-.94s-.45-.15-.64.15-.74.94-.91,1.13-.33.22-.62.07a7.82,7.82,0,0,1-2.3-1.42,8.6,8.6,0,0,1-1.59-1.98c-.17-.29,0-.44.13-.59s.29-.33.44-.5a2,2,0,0,0,.29-.49.54.54,0,0,0,0-.5c-.07-.15-.64-1.54-.88-2.11s-.46-.48-.64-.49h-.54a1.05,1.05,0,0,0-.76.35,3.18,3.18,0,0,0-1,2.36,5.52,5.52,0,0,0,1.16,2.93,12.63,12.63,0,0,0,4.86,4.29,16.26,16.26,0,0,0,1.62.6,3.89,3.89,0,0,0,1.79.11,2.93,2.93,0,0,0,1.92-1.35,2.37,2.37,0,0,0,.17-1.35C17.94,14.6,17.76,14.53,17.47,14.38Zm-5.42,7.4a9.88,9.88,0,0,1-5.03-1.38l-.36-.21-3.74.98.99-3.64-.24-.37a9.88,9.88,0,0,1-1.51-5.26A9.94,9.94,0,0,1,12.05,2.17a9.88,9.88,0,0,1,7,2.9,9.83,9.83,0,0,1,2.9,7A9.94,9.94,0,0,1,12.05,21.78ZM20.52,3.48A11.78,11.78,0,0,0,12.05.13,11.92,11.92,0,0,0,1.82,17.88L0,24l6.3-1.65a11.89,11.89,0,0,0,5.68,1.45h0A11.93,11.93,0,0,0,24,11.86,11.82,11.82,0,0,0,20.52,3.48Z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/tours", label: "Our Tours" },
                { href: "/destinations", label: "Destinations" },
                { href: "/about", label: "About Us" },
                { href: "/booking", label: "Book a Tour" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">
              Top Destinations
            </h4>
            <ul className="space-y-3">
              {[
                "Serengeti National Park",
                "Mount Kilimanjaro",
                "Zanzibar Island",
                "Okavango Delta",
                "Ngorongoro Crater",
                "Maasai Mara",
              ].map((dest) => (
                <li key={dest}>
                  <span className="text-sm hover:text-primary-400 transition-colors cursor-pointer">
                    {dest}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-primary-400 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:info@levivainvestments.co.tz"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  info@levivainvestments.co.tz
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-primary-400 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+255758996047"
                  className="text-sm hover:text-primary-400 transition-colors"
                >
                  +255 758 996 047
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-primary-400 mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm">
                  Dar es Salaam, Tanzania
                </span>
              </li>
            </ul>

            <div className="mt-8">
              <h5 className="text-white font-semibold text-sm mb-3">
                Trusted & Licensed
              </h5>
              <div className="flex gap-3 text-xs text-gray-400">
                <span className="bg-gray-800 px-3 py-1.5 rounded">TATO Member</span>
                <span className="bg-gray-800 px-3 py-1.5 rounded">Licensed Tour Operator</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Leviva Investments Co. Ltd. All rights
            reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
