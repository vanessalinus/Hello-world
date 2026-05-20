export default function TrustBadges() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container-custom">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">
            Trusted by travelers from around the world
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16">
          {[
            { flag: "🇨🇳", country: "China" },
            { flag: "🇺🇸", country: "USA" },
            { flag: "🇬🇧", country: "UK" },
            { flag: "🇩🇪", country: "Germany" },
            { flag: "🇫🇷", country: "France" },
            { flag: "🇰🇷", country: "South Korea" },
            { flag: "🇦🇺", country: "Australia" },
            { flag: "🇳🇿", country: "New Zealand" },
          ].map((item) => (
            <div key={item.country} className="flex items-center gap-2 text-gray-500">
              <span className="text-3xl">{item.flag}</span>
              <span className="text-sm font-medium">{item.country}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
