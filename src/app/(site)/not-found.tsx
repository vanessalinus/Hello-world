import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[55vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-amber-800">
        404
      </p>
      <h1 className="mt-2 font-display text-4xl text-stone-900">
        This page drifted off the migration route
      </h1>
      <p className="mt-4 text-stone-600">
        Let us bring you back to camps we actually operate.
      </p>
      <Link
        className="mt-8 rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white hover:bg-amber-700"
        href="/"
      >
        Back to home
      </Link>
    </div>
  );
}
