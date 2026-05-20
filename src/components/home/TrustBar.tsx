import { Shield, Award, Clock, Globe } from "lucide-react";
import { type Locale, t } from "@/lib/i18n";

const items = [
  { icon: Shield, label: "Fully Licensed Operator" },
  { icon: Award, label: "4.9★ Average Rating" },
  { icon: Clock, label: "24-Hour Quote Response" },
  { icon: Globe, label: "6 International Markets Served" },
];

interface TrustBarProps {
  locale: Locale;
}

export function TrustBar({ locale }: TrustBarProps) {
  return (
    <section className="border-y border-safari-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-safari-500">
          {t(locale, "trust.title")}
        </p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-800/10 text-forest-700">
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-2 text-sm font-medium text-safari-800">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
