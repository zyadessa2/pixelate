'use client'

import Image from 'next/image'
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '@/src/components/Header'
import { useState, useEffect } from 'react'
import { getImageUrl } from '@/src/lib/image-utils'

interface Client {
  id: string
  name: string
  logo: string
  subtitle: string
  description: string
  order: number
}

const OurClient = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients')
        const data = await response.json()
        if (data.success) {
          setClients(data.data)
        }
      } catch (error) {
        console.error('Error fetching clients:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  const nextSlide = () => {
    if (isAnimating) return
    setDirection('next')
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % clients.length)
      setIsAnimating(false)
    }, 300)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setDirection('prev')
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + clients.length) % clients.length)
      setIsAnimating(false)
    }, 300)
  }

  const getVisibleClients = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      visible.push(clients[(currentIndex + i) % clients.length])
    }
    return visible
  }

  if (loading) {
    return (
      <section id="clients" className="bg-[#0F1419] relative min-h-screen px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24 overflow-hidden">
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-white"></div>
        </div>
      </section>
    )
  }

  if (clients.length === 0) {
    return null
  }

  return (
    <section id="clients" className="bg-[#0F1419] relative min-h-screen px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24 overflow-hidden">
      <div
        className="absolute left-0 top-0 h-full w-1/3 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      <div
        className="absolute right-0 top-0 h-full w-1/3 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="relative mx-auto max-w-7xl rounded-[20px] bg-[#2B353C]/10 p-6 backdrop-blur-sm sm:rounded-[25px] sm:p-8 md:rounded-[30px] md:p-10 lg:rounded-[35px] lg:p-12 xl:p-16 z-10">
        <Header
          word1="Our"
          word2="Client"
          para="We are grateful for the opportunity to work with esteemed partners and clients. Our strong relationships are a testament to our dedication and expertise in the digital realm."
        />

        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 rounded-full bg-[#2B353C]/80 p-3 backdrop-blur-sm transition-all hover:bg-[#2B353C] hover:scale-110 hidden lg:block"
            aria-label="Previous clients"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 rounded-full bg-[#2B353C]/80 p-3 backdrop-blur-sm transition-all hover:bg-[#2B353C] hover:scale-110 hidden lg:block"
            aria-label="Next clients"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Clients Grid */}
          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative">
            {getVisibleClients().map((client, index) => {
              const animationClass = isAnimating
                ? direction === 'next'
                  ? index === 0
                    ? 'animate-slide-out-left'
                    : 'animate-slide-in-right'
                  : index === 2
                    ? 'animate-slide-out-right'
                    : 'animate-slide-in-left'
                : ''

              return (
                <div
                  key={`${client.id}-${currentIndex}-${index}`}
                  className={`group relative overflow-hidden rounded-[20px] p-8 backdrop-blur-sm transition-all duration-300 ${animationClass}`}
                  style={{
                    background: 'linear-gradient(180deg, rgba(31, 40, 51, 0.2) 0%, rgba(20, 27, 35, 1) 100%)',
                    borderImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.02) 100%) 1',
                  }}
                >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 80%)',
                  }}
                />

                <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(100, 150, 200, 0.1) 0%, rgba(80, 120, 160, 0.05) 100%)',
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />

                <div className="relative flex flex-col items-center text-center space-y-5">
                  <div
                    className="relative flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(60, 80, 100, 0.4) 0%, rgba(40, 55, 70, 0.6) 100%)',
                      boxShadow: '0 4px 20px rgba(100, 150, 200, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(120, 180, 220, 0.3) 0%, rgba(80, 140, 180, 0.2) 100%)',
                        filter: 'blur(8px)',
                      }}
                    />
                    <Image
                      src="/pixelate-nav-2.svg"
                      alt={client.name}
                      width={38}
                      height={38}
                      className="relative z-10 opacity-70 group-hover:opacity-100 transition-opacity object-contain"
                    />
                  </div>

                  <div className="relative">
                    <Plus
                      className="h-7 w-7 transition-all duration-300"
                      style={{
                        color: 'rgba(150, 180, 200, 0.6)',
                        filter: 'drop-shadow(0 2px 4px rgba(100, 150, 200, 0.3))',
                      }}
                    />
                  </div>

            <div className=''>
              <Image
                src={getImageUrl(client.logo)}
                alt={client.name}
                width={228}
                height={228}
                className="relative -my-22 z-10 opacity-70 group-hover:opacity-100 transition-opacity object-contain"
              />
            </div>

                  <p className="font-[family-name:var(--font-poppins)] text-md font-medium text-gray-300 transition-colors duration-300 group-hover:text-gray-300">
                    {client.subtitle}
                  </p>

                  <p className="font-[family-name:var(--font-poppins)] text-[13px] leading-relaxed text-gray-400/90">
                    {client.description}
                  </p>
                </div>
              </div>
              )
            })}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {clients.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${index === currentIndex ? 'w-8 bg-white' : 'bg-white/30 hover:bg-white/50'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-4 lg:hidden">
            <button
              onClick={prevSlide}
              className="rounded-full bg-[#2B353C]/80 p-3 backdrop-blur-sm transition-all hover:bg-[#2B353C]"
              aria-label="Previous clients"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="rounded-full bg-[#2B353C]/80 p-3 backdrop-blur-sm transition-all hover:bg-[#2B353C]"
              aria-label="Next clients"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}


const styles = `
  @keyframes slide-in-right {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slide-out-left {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-100%);
    }
  }

  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slide-out-right {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }

  .animate-slide-in-right {
    animation: slide-in-right 0.5s ease-out forwards;
  }

  .animate-slide-out-left {
    animation: slide-out-left 0.5s ease-out forwards;
  }

  .animate-slide-in-left {
    animation: slide-in-left 0.5s ease-out forwards;
  }

  .animate-slide-out-right {
    animation: slide-out-right 0.5s ease-out forwards;
  }
`

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = styles
  if (!document.head.querySelector('[data-client-animations]')) {
    styleElement.setAttribute('data-client-animations', 'true')
    document.head.appendChild(styleElement)
  }
}
export default OurClient
