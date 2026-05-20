import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">
        Page not found
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
        That destination or page is unavailable
      </h1>
      <p className="mt-4 text-base leading-8 text-slate-600">
        Return to the homepage or start the booking planner to speak with Leviva
        directly about the trip you want.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to homepage
        </Link>
        <Link
          href="/book"
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
        >
          Open booking planner
        </Link>
      </div>
    </main>
  );
}
