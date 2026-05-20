import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm uppercase tracking-widest text-sunset-500">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-savanna-900">
        This trail leads nowhere.
      </h1>
      <p className="mt-3 max-w-md text-savanna-700">
        The page you're looking for has wandered off the savanna. Let's get you back on track.
      </p>
      <Link href="/" className="btn-primary mt-6">
        Back to the homepage
      </Link>
    </div>
  );
}
