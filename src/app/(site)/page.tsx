import Hero from "./_components/Hero";
import About from "./_components/About";
import OurProcess from "./_components/OurProcess";
import OurService from "./_components/OurService";
import OurClient from "./_components/OurClient";
import Portfolio from "./_components/Portfolio";
import OurTeam from "./_components/OurTeam";
import GetInTouch from "./_components/GetInTouch";
import JsonLd from "@/src/components/JsonLd";
import { pageMetadata, site } from "@/src/lib/site";

export const metadata = pageMetadata("Event Production & AVL in Dubai", site.description, "/");
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main id="main-content">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, alternateName: "Pixelate Events", publisher: { "@id": `${site.url}/#organization` } }} />
      <Hero />
      <About />
      <OurProcess />
      <OurService />
      <OurClient />
      <Portfolio />
      <OurTeam />
      <GetInTouch />
    </main>
  );
}
