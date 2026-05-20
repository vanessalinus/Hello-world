"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Calendar, Users } from "lucide-react";

export default function QuickBookingBar() {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("2");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (dates) params.set("dates", dates);
    if (guests) params.set("guests", guests);
    router.push(`/tours?${params.toString()}`);
  };

  return (
    <section className="relative z-20 -mt-10 pb-0 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 md:p-6">
          <h3 className="text-center text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
            Find Your Perfect Safari
          </h3>
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-3"
          >
            {/* Destination */}
            <div className="md:col-span-2 relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent bg-gray-50 text-sm appearance-none"
              >
                <option value="">All Destinations</option>
                <option value="serengeti">Serengeti, Tanzania</option>
                <option value="zanzibar">Zanzibar Island</option>
                <option value="ngorongoro">Ngorongoro Crater</option>
                <option value="kilimanjaro">Kilimanjaro</option>
                <option value="botswana">Okavango Delta, Botswana</option>
                <option value="rwanda">Rwanda Gorillas</option>
              </select>
            </div>

            {/* Date */}
            <div className="relative">
              <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="month"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                placeholder="Travel Month"
                className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent bg-gray-50 text-sm"
              />
            </div>

            {/* Guests */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent bg-gray-50 text-sm appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>
                  ))}
                  <option value="10+">10+ Guests</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors text-sm whitespace-nowrap shadow-md"
              >
                Search Tours
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
