import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-stone-50">
      <div className="text-center px-4">
        <h1 className="text-8xl font-bold text-amber-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-stone-600 max-w-md mx-auto mb-8">
          Looks like this trail doesn&apos;t exist. Let us guide you back to the
          right path.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold transition-all"
          >
            <Home className="w-5 h-5" /> Back to Home
          </Link>
          <Link
            href="/tours"
            className="inline-flex items-center justify-center gap-2 border-2 border-amber-500 text-amber-600 hover:bg-amber-50 px-6 py-3 rounded-full font-semibold transition-all"
          >
            Browse Tours <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
