'use client'

import Image from 'next/image'
import { Target, Lightbulb, Package, Award } from 'lucide-react'
import Header from '@/src/components/Header'
import { useState } from 'react'

const About = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  
  const features = [
    {
      icon: Target,
      title: "Our Story",
      description: "With over 20 years of high-end event production experience, we are known for our creativity, precision, and seamless execution across private and corporate events."
    },
    {
      icon: Lightbulb,
      title: "Our Approach",
      description: "We transform concepts into immersive experiences by combining compelling storytelling with meticulous attention to detail."
    },
    {
      icon: Package,
      title: "What We Offer",
      description: "As a full-service event production company, we manage everything from concept development and design to logistics, production, and on-site execution—ensuring a smooth and flawless process."
    },
    {
      icon: Award,
      title: "Our Promise",
      description: "Driven by innovation, professionalism, and personalized service, we create meaningful moments that inspire, connect, and leave a lasting impact."
    }
  ]

  return (
    <section id="about" className="bg-[#0F1419] relative min-h-screen px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24 overflow-hidden">
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
       <Header word1="About" word2="Us" para="Pixelate is a premier creative agency based in Dubai, specializing in transforming events into extraordinary experiences. We combine artistic vision with technical expertise to deliver exceptional results across the Middle East." />

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4 md:space-y-5">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => setActiveFeature(activeFeature === index ? null : index)}
                className={`group flex items-start gap-3 rounded-2xl border p-5 backdrop-blur-sm transition-all duration-300 sm:gap-4 sm:p-6 cursor-pointer md:cursor-default ${
                  activeFeature === index 
                    ? 'border-white/20 bg-[#4D606E] md:border-white/10 md:bg-[rgba(30,36,40,0.15)]' 
                    : 'border-white/10 bg-[rgba(30,36,40,0.15)]'
                } md:hover:border-white/20 md:hover:bg-[#4D606E]`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-white/5 transition-all duration-300 sm:h-12 sm:w-12 ${
                  activeFeature === index
                    ? 'border-white/40 bg-white/10 md:border-white/20 md:bg-white/5'
                    : 'border-white/20'
                } md:group-hover:border-white/40 md:group-hover:bg-white/10`}>
                  <feature.icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 font-[family-name:var(--font-poppins)] text-lg font-bold capitalize leading-tight tracking-wider text-white sm:text-xl md:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative h-[350px] w-full max-w-md overflow-hidden rounded-3xl border-4 border-white/20 shadow-2xl sm:h-[450px] md:h-[550px] lg:h-[600px]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/about-video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About