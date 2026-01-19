import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outerion = localFont({
  src: "../../public/fonts/Outerion-Regular.otf",
  variable: "--font-outerion-local",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pixelate - Premier Event Production & AVL Services in Dubai | Event Management Company",
  description: "Leading event production company in Dubai specializing in AVL, LED screens, sound systems, lighting, event management, exhibitions, 3D concepts, and creative design. Transform your events with 20+ years of expertise.",
  keywords: [
    "event production Dubai",
    "AVL services Dubai",
    "audio visual lighting Dubai",
    "LED screen rental Dubai",
    "sound system rental Dubai",
    "stage lighting Dubai",
    "event management Dubai",
    "exhibition booth design Dubai",
    "corporate events Dubai",
    "3D event visualization",
    "event planning Dubai",
    "Dubai event company",
    "professional event production",
    "concert production Dubai",
    "conference production Dubai",
    "trade show Dubai",
    "event logistics Dubai",
    "creative event design",
    "event production Middle East",
    "Pixelate Dubai"
  ],
  authors: [{ name: "Pixelate Events" }],
  creator: "Pixelate",
  publisher: "Pixelate",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://pixelate.ae",
    siteName: "Pixelate Events",
    title: "Pixelate - Premier Event Production & AVL Services in Dubai",
    description: "Leading event production company in Dubai specializing in AVL, LED screens, sound systems, lighting, event management, exhibitions, and creative design. 20+ years of excellence.",
    images: [
      {
        url: "/pixelate-nav-2.svg",
        width: 1200,
        height: 630,
        alt: "Pixelate Events - Event Production Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixelate - Premier Event Production & AVL Services in Dubai",
    description: "Leading event production company in Dubai. Specializing in AVL, LED screens, event management, and creative design.",
    images: ["/pixelate-nav-2.svg"],
    creator: "@pixelate",
  },
  icons: {
    icon: [
      { url: "/pixelate-nav-2.svg", type: "image/svg+xml" },
      { url: "/pixelate-nav-2.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/pixelate-nav-2.svg", sizes: "16x16", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/pixelate-nav-2.svg", type: "image/svg+xml" },
    ],
    shortcut: "/pixelate-nav-2.svg",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://pixelate.ae",
  },
  category: "Event Production",
  classification: "Business",
  other: {
    "google-site-verification": "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outerion.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
