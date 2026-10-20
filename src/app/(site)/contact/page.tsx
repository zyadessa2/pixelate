import JsonLd from '@/src/components/JsonLd'
import { breadcrumbSchema, pageMetadata, site } from '@/src/lib/site'
import GetInTouch from '../_components/GetInTouch'

export const metadata = pageMetadata('Contact Pixelate in Dubai', `Discuss event production, AVL and design with Pixelate. Call +971 55 557 0449 or find us at ${site.streetAddress}, Dubai.`, '/contact')

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#0F1419] pt-36 text-white lg:pt-44">
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />
      <div className="mx-auto max-w-4xl px-6 text-center"><h1 className="text-4xl font-semibold sm:text-5xl">Contact Pixelate in Dubai</h1><p className="mt-6 text-lg leading-relaxed text-gray-300">Planning an event or a design project? Share your brief, date, location and requirements with our team in Business Bay. We will discuss the services that fit your plans.</p></div>
      <GetInTouch />
    </main>
  )
}
