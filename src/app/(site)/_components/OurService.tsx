import { Video, Monitor, Volume2, Lightbulb, Calendar, ClipboardList, Package, Store, Palette, Box } from 'lucide-react'
import Header from '@/src/components/Header'
import Image from 'next/image'

const OurService = () => {
  const services = [
    {
      icon: Video,
      title: "AVL",
      subtitle: "Audio Visual Lighting",
      description: "Complete audio-visual and lighting solutions for professional events, concerts, and conferences with cutting-edge technology.",
      image: "/ourServices/avl (1).webp"
    },
    {
      icon: Monitor,
      title: "LED Screen",
      subtitle: "Display Solutions",
      description: "Premium sound systems delivering crystal-clear audio for events of any scale, from intimate gatherings to large concerts.",
      image: "/ourServices/stage-background-led-screen_9.webp"
    },
    {
      icon: Volume2,
      title: "Sound System",
      subtitle: "Audio Solutions",
      description: "Premium sound systems delivering crystal-clear audio for events of any scale, from intimate gatherings to large concerts.",
      image: "/ourServices/360_F_898633639_pcBdWh3fDOEogkFEoJB2ryQqLSuFloX1.jpg"
    },
    {
      icon: Lightbulb,
      title: "Light System",
      subtitle: "Stage Lighting",
      description: "Dynamic lighting design that transforms spaces and creates unforgettable atmospheric experiences.",
      image: "/ourServices/pngtree-concert-light-show-stage-lights-picture-image_15533230.jpg"
    },
    {
      icon: Calendar,
      title: "Organizational Event",
      subtitle: "Corporate Events",
      description: "Comprehensive planning and execution of corporate events, conferences and business gatherings.",
      image: "/ourServices/360_F_600566798_ktW6oDRY7hFlJJapGJAPPseAPo9CXTQY.jpg"
    },
    {
      icon: ClipboardList,
      title: "Event Management",
      subtitle: "Managed Solutions",
      description: "End-to-end event management services ensuring seamless execution from concept to completion.",
      image: "/ourServices/event-management-july.webp"
    },
    {
      icon: Package,
      title: "Production",
      subtitle: "Event Production",
      description: "Professional production services bringing your creative vision to life with technical excellence.",
      image: "/ourServices/istockphoto-1480245214-612x612.jpg"
    },
    {
      icon: Store,
      title: "Exhibition",
      subtitle: "Trade Shows & Expos",
      description: "Custom exhibition booth design and management for trade shows, expos, and product launches.",
      image: "/ourServices/—Pngtree—concert light show stage lights_15533230.png"
    },
    {
      icon: Palette,
      title: "Design",
      subtitle: "Creative Design",
      description: "Innovative design solutions combining graphics and visual communications that captivate audiences.",
      image: "/ourServices/blue-and-purple-paint-swirl-abstract-17-09-2024-1726572434.jpg"
    },
    {
      icon: Box,
      title: "3D Concept",
      subtitle: "Visualization & Rendering",
      description: "Photorealistic 3D visualizations and renderings to preview and perfect your event design before execution.",
      image: "/ourServices/1.webp"
    }
  ]

  return (
    <section id="service" className="bg-[#0F1419] relative min-h-screen px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24 overflow-hidden">
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
          word2="Service" 
          para="Comprehensive AVL and event production solutions" 
        />

        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-[rgba(30,36,40,0.6)] p-5 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#3B7FAE] hover:bg-[rgba(30,36,40,0.8)] hover:scale-[1.04]"
              style={{
                background: 'linear-gradient(135deg, rgba(30,36,40,0.6) 0%, rgba(20,26,30,0.8) 100%)'
              }}
            >             
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="relative flex flex-col md:flex-row gap-4 md:gap-6 z-10">
                <div className="flex items-center gap-3 sm:gap-4 md:flex-1">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#2B5A7E] bg-[rgba(43,90,126,0.2)] transition-all duration-300 group-hover:border-[#3B7FAE] group-hover:bg-[rgba(43,90,126,0.4)] group-hover:shadow-lg group-hover:shadow-[#2B5A7E]/50">
                    <service.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 font-[family-name:var(--font-poppins)] text-[23px] font-medium leading-[35.006px] text-white">
                      {service.title}
                    </h3>
                    <p className="font-[family-name:var(--font-poppins)] text-[13px] font-normal leading-[19.448px] text-gray-400">
                      {service.subtitle}
                    </p>
                  </div>
                </div>
                <div className="md:flex-1">
                  <p className="font-[family-name:var(--font-poppins)] text-[15px] font-extralight leading-[25.282px] text-white">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurService
