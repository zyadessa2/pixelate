import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '@/src/components/JsonLd'
import { getService, services } from '@/src/lib/services'
import { breadcrumbSchema, pageMetadata, site } from '@/src/lib/site'

type Props = { params: Promise<{ slug: string }> }
export const dynamicParams = false
export const generateStaticParams = () => services.map(({ slug }) => ({ slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug)
  if (!service) notFound()
  return pageMetadata(`${service.title} in Dubai`, service.description, `/services/${service.slug}`)
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug)
  if (!service) notFound()
  const related = service.related.map(getService).filter(item => item !== undefined)
  return (
    <main id="main-content" className="min-h-screen bg-[#0F1419] pt-36 pb-20 text-white lg:pt-44">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: service.title, description: service.description, url: `${site.url}/services/${service.slug}`, serviceType: service.title, provider: { '@id': `${site.url}/#organization` }, areaServed: { '@type': 'Country', name: 'United Arab Emirates' } }} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: service.title, path: `/services/${service.slug}` }])} />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-gray-400"><Link href="/" className="hover:text-white">Home</Link><span>/</span><Link href="/services" className="hover:text-white">Services</Link><span>/</span><span aria-current="page">{service.title}</span></nav>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div><p className="mb-4 text-sm tracking-[0.15em] text-[#a6bac8] uppercase">{service.subtitle}</p><h1 className="text-4xl leading-tight font-semibold sm:text-5xl">{service.title} in Dubai</h1><p className="mt-6 text-lg leading-relaxed text-gray-300">{service.intro}</p><Link href="/contact" className="mt-8 inline-block rounded-full bg-white px-7 py-3 font-medium text-[#0F1419]">Discuss your requirements</Link></div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl"><Image src={service.image} alt={`${service.title} — visual inspiration`} fill priority sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" /></div>
        </div>
        <section className="mt-20"><h2 className="text-3xl font-semibold">Planning your {service.title.toLowerCase()}</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{service.scope.map(item => <article key={item.title} className="rounded-2xl border border-white/10 bg-[#1e262d] p-6"><h3 className="text-xl font-medium">{item.title}</h3><p className="mt-4 leading-relaxed text-gray-300">{item.text}</p></article>)}</div></section>
        <section className="mt-16 grid gap-8 rounded-2xl bg-[#2B353C] p-7 sm:p-10 md:grid-cols-[1fr_2fr]"><h2 className="text-3xl font-semibold">What to include in your brief</h2><div><p className="leading-relaxed text-gray-200">{service.brief}</p><p className="mt-4 text-gray-300">Our team is based in Business Bay, Dubai. <Link href="/contact" className="text-white underline underline-offset-4">Get in touch</Link> to discuss the scope and next steps.</p></div></section>
        <section className="mt-16 max-w-3xl"><h2 className="text-3xl font-semibold">Questions about {service.title.toLowerCase()}</h2><div className="mt-6 divide-y divide-white/10">{service.faq.map(item => <details key={item.question} className="py-5"><summary className="cursor-pointer text-lg font-medium">{item.question}</summary><p className="mt-4 leading-relaxed text-gray-300">{item.answer}</p></details>)}</div></section>
        <section className="mt-16"><h2 className="text-3xl font-semibold">Related services</h2><div className="mt-6 flex flex-wrap gap-3">{related.map(item => <Link key={item.slug} href={`/services/${item.slug}`} className="rounded-full border border-white/20 px-5 py-3 hover:bg-white/10">{item.title} →</Link>)}</div><Link href="/projects" className="mt-8 inline-block text-[#b5d3e7] underline underline-offset-4">Explore our project portfolio</Link></section>
      </div>
    </main>
  )
}
