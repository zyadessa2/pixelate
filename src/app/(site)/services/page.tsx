import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/src/components/JsonLd'
import { services } from '@/src/lib/services'
import { breadcrumbSchema, pageMetadata } from '@/src/lib/site'

export const metadata = pageMetadata('Event, AVL & Creative Services in Dubai', 'Explore Pixelate’s event production, AVL, LED screens, exhibition design, 3D visualization and digital design services in Dubai, UAE.', '/services')

export default function ServicesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#0F1419] px-5 pt-36 pb-20 text-white sm:px-8 lg:pt-44">
      <div className="mx-auto max-w-6xl">
        <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])} />
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-400"><Link href="/" className="hover:text-white">Home</Link> / Services</nav>
        <p className="mb-4 text-sm tracking-[0.2em] text-[#a6bac8] uppercase">What we do</p>
        <h1 className="max-w-4xl text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">Event, AVL & creative services in Dubai</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-300">From the first concept to the event experience, Pixelate brings creative design and technical production together. Explore our services to plan your stage, exhibition, corporate gathering or digital project.</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(service => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#1e262d] transition-colors hover:border-[#73828D]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={service.image} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-6"><h2 className="text-xl font-semibold">{service.title}</h2><p className="mt-3 text-sm leading-relaxed text-gray-300">{service.description}</p><span className="mt-5 inline-block text-sm text-[#b5d3e7]">Explore service →</span></div>
            </Link>
          ))}
        </div>
        <div className="mt-16 rounded-2xl bg-[#2B353C] p-8"><h2 className="text-2xl font-semibold">Bring your brief to Pixelate</h2><p className="mt-3 max-w-2xl leading-relaxed text-gray-300">Tell us what you are planning, where it will take place and what you want to achieve. We can discuss which services fit your project.</p><Link href="/contact" className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-medium text-[#0F1419]">Discuss your project</Link></div>
      </div>
    </main>
  )
}
