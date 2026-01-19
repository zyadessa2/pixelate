import Image from "next/image";
import Hero from "./_components/Hero";
import About from "./_components/About";
import OurProcess from "./_components/OurProcess";
import OurService from "./_components/OurService";
import OurClient from "./_components/OurClient";
import Portfolio from "./_components/Portfolio";
import OurTeam from "./_components/OurTeam";
import GetInTouch from "./_components/GetInTouch";
import Script from "next/script";

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Pixelate Events",
    "image": "https://pixelate.ae/pixelate-nav-2.svg",
    "description": "Leading event production company in Dubai specializing in AVL, LED screens, sound systems, lighting, event management, exhibitions, 3D concepts, and creative design with over 20 years of expertise.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.2048",
      "longitude": "55.2708"
    },
    "url": "https://pixelate.ae",
    "telephone": "+971-XX-XXX-XXXX",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/pixelateevents",
      "https://www.instagram.com/pixelateevents",
      "https://www.linkedin.com/company/pixelateevents",
      "https://twitter.com/pixelateevents"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Event Production Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AVL - Audio Visual Lighting",
            "description": "Complete audio-visual and lighting solutions for professional events, concerts, and conferences."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "LED Screen Display Solutions",
            "description": "Premium LED screen rental and installation for events of any scale."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sound System",
            "description": "Premium sound systems delivering crystal-clear audio for events."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Stage Lighting",
            "description": "Dynamic lighting design that transforms spaces and creates unforgettable experiences."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Event Management",
            "description": "End-to-end event management services ensuring seamless execution."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Exhibition Design",
            "description": "Custom exhibition booth design and management for trade shows and expos."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "3D Concept & Visualization",
            "description": "Photorealistic 3D visualizations and renderings for event design."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Creative Design",
            "description": "Innovative design solutions combining graphics and visual communications."
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150"
    }
  };

  return (
    <>
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
    <Hero />
    <About/>
    <OurProcess/>
    <OurService/>
    <OurClient/>
    <Portfolio/>
    <OurTeam/>
    <GetInTouch/>
    </>
  );
}
