import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Orbitron } from "next/font/google";
import localFont from "next/font/local";
import { isPreview, site } from "@/src/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const poppins = Poppins({ variable: "--font-poppins-loaded", weight: ["300", "400", "500", "600", "700"], subsets: ["latin"], display: "swap" });
const orbitron = Orbitron({ variable: "--font-orbitron-loaded", subsets: ["latin"], display: "swap" });
const outerion = localFont({ src: "../../public/fonts/Outerion-Regular.otf", variable: "--font-outerion-local", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Event Production & AVL in Dubai | Pixelate", template: "%s | Pixelate" },
  description: site.description,
  applicationName: site.name,
  robots: isPreview ? { index: false, follow: false } : {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  icons: { icon: { url: "/pixelate-nav-2.svg", type: "image/svg+xml" } },
  manifest: "/site.webmanifest",
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${outerion.variable} ${poppins.variable} ${orbitron.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
