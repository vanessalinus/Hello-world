import Link from "next/link";
import { MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🌍</div>
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
          404 – Lost in Africa?
        </h1>
        <p className="text-gray-600 mb-8">
          Looks like this page has gone on safari! Don't worry – we'll help you find your way back.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/tours"
            className="border-2 border-brand-400 text-brand-600 hover:bg-brand-50 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Browse Tours
          </Link>
        </div>
      </div>
    </div>
  );
}
