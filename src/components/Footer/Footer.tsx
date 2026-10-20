import Image from 'next/image'
import Link from 'next/link'
import { services } from '@/src/lib/services'
import { mapsUrl, site } from '@/src/lib/site'
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Process', href: '/#process' },
    { name: 'Portfolio', href: '/projects' },
    { name: 'Clients', href: '/#clients' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' }
  ]


  return (
    <footer className="bg-[#0F1419] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/pixelate-nav-2.svg"
                alt="Pixelate Logo"
                width={40}
                height={40}
                className="opacity-80"
              />
              <span className="font-[family-name:var(--font-orbitron)] text-lg sm:text-xl font-bold text-white">
                PIXELATE
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm leading-relaxed text-gray-400 mb-6 max-w-xs">
              Event production, audio visual lighting and creative design from Business Bay, Dubai, UAE.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a
                href={site.socials.facebook}
                target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[rgba(115,130,141,0.2)] transition-all duration-300 hover:bg-[rgba(115,130,141,0.4)]"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
              </a>
              <a
                href={site.socials.instagram}
                target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[rgba(115,130,141,0.2)] transition-all duration-300 hover:bg-[rgba(115,130,141,0.4)]"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[rgba(115,130,141,0.2)] transition-all duration-300 hover:bg-[rgba(115,130,141,0.4)]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-sans text-xs sm:text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="font-sans text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">
              Our Services
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="font-sans text-xs sm:text-sm text-gray-400 hover:text-white">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-sans text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs sm:text-sm text-gray-400 leading-relaxed transition-colors hover:text-white"
                >
                  {site.address}
                </a>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                <a
                  href={`tel:${site.phone}`}
                  className="font-sans text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                >
                  +971 55 557 0449
                </a>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                <a
                  href={`mailto:${site.email}`}
                  className="font-sans text-xs sm:text-sm text-gray-400 hover:text-white transition-colors break-all"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 sm:mt-12 border-t border-white/5 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="font-sans text-xs sm:text-sm text-gray-500">
              © {new Date().getFullYear()} Pixelate. All rights reserved.
            </p>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
