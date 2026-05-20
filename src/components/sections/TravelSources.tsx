const sources = [
  {
    flag: "🇨🇳",
    country: "China",
    label: "中文服务",
    description: "Mandarin-speaking guides available. WeChat & Alipay accepted.",
    color: "from-red-900/40 to-red-800/20",
    border: "border-red-800/30",
  },
  {
    flag: "🇺🇸",
    country: "USA",
    label: "American Travelers",
    description: "ASTA member. USD pricing. US flight connections from JFK, LAX, ATL.",
    color: "from-blue-900/40 to-blue-800/20",
    border: "border-blue-800/30",
  },
  {
    flag: "🇪🇺",
    country: "Europe",
    label: "European Guests",
    description: "German, French, Italian-speaking guides. EUR pricing available.",
    color: "from-indigo-900/40 to-indigo-800/20",
    border: "border-indigo-800/30",
  },
  {
    flag: "🇰🇷",
    country: "South Korea",
    label: "한국인 환영",
    description: "Korean-speaking guides. Direct Seoul connections via Ethiopian Airlines.",
    color: "from-sky-900/40 to-sky-800/20",
    border: "border-sky-800/30",
  },
  {
    flag: "🇦🇺",
    country: "Australia",
    label: "Australian Adventurers",
    description: "AUD pricing. Direct connections via Sydney and Melbourne.",
    color: "from-amber-900/40 to-amber-800/20",
    border: "border-amber-800/30",
  },
  {
    flag: "🇳🇿",
    country: "New Zealand",
    label: "NZ Travelers",
    description: "NZD pricing. Pacific routes via Auckland and Doha.",
    color: "from-emerald-900/40 to-emerald-800/20",
    border: "border-emerald-800/30",
  },
];

export default function TravelSources() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Serving Travelers Worldwide
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We specialize in welcoming guests from major source markets with culturally
            tailored service, multilingual guides, and flexible payment options.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sources.map((source) => (
            <div
              key={source.country}
              className={`bg-gradient-to-br ${source.color} border ${source.border} rounded-2xl p-6 hover:scale-[1.02] transition-transform`}
            >
              <div className="text-4xl mb-3">{source.flag}</div>
              <h3 className="font-bold text-white text-lg">{source.country}</h3>
              <div className="text-brand-300 text-sm font-medium mb-2">{source.label}</div>
              <p className="text-gray-400 text-sm">{source.description}</p>
            </div>
          ))}
        </div>

        {/* Languages */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">Our guides speak:</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              "🇬🇧 English",
              "🇨🇳 Mandarin",
              "🇰🇷 Korean",
              "🇩🇪 German",
              "🇫🇷 French",
              "🇹🇿 Swahili",
              "🇯🇵 Japanese",
              "🇮🇹 Italian",
            ].map((lang) => (
              <span
                key={lang}
                className="bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 rounded-full text-sm"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
