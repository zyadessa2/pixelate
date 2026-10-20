import Navbar from "@/src/components/navbar/Navbar";
import Footer from "@/src/components/Footer/Footer";
import JsonLd from "@/src/components/JsonLd";
import { businessSchema } from "@/src/lib/site";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[100] focus:bg-white focus:p-4 focus:text-black">Skip to content</a>
      <Navbar />
      <JsonLd data={businessSchema} />
      {children}
      <Footer />
    </>
  );
}
