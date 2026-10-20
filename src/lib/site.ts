import type { Metadata } from 'next'

export const site = {
  name: 'Pixelate',
  url: 'https://www.pixelateuae.com',
  description: 'Pixelate provides event production, audio visual lighting, LED screens, exhibitions and creative design in Dubai, UAE. Plan your next event with our team.',
  email: 'eslam@pixelateuae.com',
  phone: '+971555570449',
  streetAddress: 'Office 1914, 19th Floor, The Binary by Omniyat, Business Bay',
  address: 'Office 1914, 19th Floor, The Binary by Omniyat, Business Bay, Dubai, United Arab Emirates',
  socials: {
    facebook: 'https://www.facebook.com/pixelate.events',
    instagram: 'https://www.instagram.com/pixelate_events',
    linkedin: 'https://www.linkedin.com/in/pixelateevents/',
  },
} as const

export const isPreview = process.env.VERCEL_ENV === 'preview'
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${site.url}${path === '/' ? '' : path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website', locale: 'en_AE', siteName: site.name,
      title: `${title} | ${site.name}`, description, url,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Pixelate — Event Production & AVL in Dubai' }],
    },
    twitter: {
      card: 'summary_large_image', title: `${title} | ${site.name}`, description,
      images: ['/opengraph-image'],
    },
  }
}

export const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#organization`,
  name: site.name,
  alternateName: 'Pixelate Events',
  url: site.url,
  description: site.description,
  logo: `${site.url}/pixelate-svg-white.svg`,
  image: `${site.url}/opengraph-image`,
  telephone: site.phone,
  email: site.email,
  address: {
    '@type': 'PostalAddress', streetAddress: site.streetAddress,
    addressLocality: 'Dubai', addressRegion: 'Dubai', addressCountry: 'AE',
  },
  areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
  sameAs: Object.values(site.socials),
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name,
      item: `${site.url}${item.path}`,
    })),
  }
}
