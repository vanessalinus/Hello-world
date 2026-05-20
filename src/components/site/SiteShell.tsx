import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { StickyMobileBar } from "@/components/conversion/StickyMobileBar";
import { WhatsAppFab } from "@/components/conversion/WhatsAppFab";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <Footer />
      <WhatsAppFab />
      <StickyMobileBar />
    </div>
  );
}
