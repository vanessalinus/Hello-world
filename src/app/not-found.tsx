import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1
          className="text-8xl font-bold text-primary-600 mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          404
        </h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Safari Trail Not Found
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Looks like you&apos;ve wandered off the trail! Don&apos;t worry — let
          us guide you back to explore East Africa&apos;s best adventures.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
          <Link href="/tours" className="btn-outline">
            Explore Tours
          </Link>
        </div>
      </div>
    </section>
  );
}
