import Navbar from "@/src/components/navbar/Navbar";
import Footer from "@/src/components/Footer/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://pixelate.ae'),
  title: {
    default: 'Pixelate - Premier Event Production & AVL Services in Dubai',
    template: '%s | Pixelate Events Dubai'
  },
  description: 'Leading event production company in Dubai specializing in AVL, LED screens, sound systems, lighting, event management, exhibitions, 3D concepts, and creative design. Transform your events with 20+ years of expertise.',
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
