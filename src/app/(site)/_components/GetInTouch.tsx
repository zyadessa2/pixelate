import Image from 'next/image'
import { Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react'
import Header from '@/src/components/Header'

const GetInTouch = () => {
  return (
    <section id="contact" className="bg-[#0F1419] relative min-h-screen px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24 overflow-hidden">
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

      <div className="relative mx-auto max-w-7xl rounded-[20px] bg-[#2B353C]/30 p-6 backdrop-blur-sm sm:rounded-[25px] sm:p-8 md:rounded-[30px] md:p-10 lg:rounded-[35px] lg:p-12 xl:p-16 z-10">
        <Header 
          word1="Get In" 
          word2="Touch" 
          para="Ready to elevate your event? Let's discuss your vision" 
        />

        <div className="mt-8 sm:mt-12 flex justify-center px-4">
          <div 
            className="flex flex-col justify-center items-center w-full max-w-[609px] min-h-[407px] px-6 py-8 sm:px-8 sm:py-10 rounded-[21.038px] border-[1.05px] border-white/10 bg-[#2B353C] text-center"
          >
            <div className="relative mx-auto mb-4 sm:mb-6 h-24 w-24 sm:h-32 sm:w-32">
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[rgba(255,255,255,0.1)]">
                <Image
                  src="/team/team-1.png"
                  alt="Eslam Mahrous"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-green-500 border-2 border-[#2B353C] flex items-center justify-center">
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white"></div>
              </div>
            </div>

            <h3 className="font-sans text-2xl sm:text-[30.39px] font-normal leading-tight sm:leading-[36.469px] text-white text-center mb-1">
              Eslam Mahrous
            </h3>
            <p className="font-sans text-lg sm:text-[21.007px] font-normal leading-relaxed sm:leading-[31.511px] text-[#9CA3AF] text-center mb-6 sm:mb-8">
              CEO
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6 sm:mb-8 w-full sm:w-auto">
              <a 
                href="tel:+971555570449"
                className="flex items-center justify-center gap-2 rounded-lg bg-[rgba(115,130,141,0.3)] px-4 py-3 font-[family-name:var(--font-poppins)] text-xs sm:text-sm text-white backdrop-blur-sm transition-all duration-300 hover:bg-[rgba(115,130,141,0.5)] whitespace-nowrap"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">+971 55 557 0449</span>
              </a>
              <a 
                href="mailto:eslam@pixelateuae.com"
                className="flex items-center justify-center gap-2 rounded-lg bg-black/50 px-4 py-3 font-[family-name:var(--font-poppins)] text-xs sm:text-sm text-white backdrop-blur-sm transition-all duration-300 hover:bg-black/70"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">eslam@pixelateuae.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 flex flex-col items-center gap-2 sm:gap-[10.008px] w-full max-w-[1123.935px] mx-auto px-4 sm:px-[10.008px] py-6 sm:py-[26.022px] border-t-[0.5px] border-[rgba(115,130,141,0.54)]">
          <p className="font-[family-name:var(--font-poppins)] text-xs sm:text-sm text-gray-400 text-center">
            Follow us on social media for updates
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 justify-center w-full sm:w-auto">
            <a 
              href="https://www.facebook.com/pixelate.events"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full sm:w-[215.179px] h-[90px] sm:h-[111.092px] rounded-[12.01px] border-[0.801px] border-[#73828D] transition-all duration-300 hover:bg-[rgba(30,36,40,0.3)] px-4"
            >
              <div className="flex w-[50px] h-[50px] sm:w-[64.053px] sm:h-[64.053px] justify-center items-center flex-shrink-0 rounded-full bg-[rgba(115,130,141,0.10)]">
                <Facebook className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="font-[family-name:var(--font-poppins)] text-sm text-white">Facebook</span>
            </a>
            <a 
              href="https://www.instagram.com/pixelate_events"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full sm:w-[215.179px] h-[90px] sm:h-[111.092px] rounded-[12.01px] border-[0.801px] border-[#73828D] transition-all duration-300 hover:bg-[rgba(30,36,40,0.3)] px-4"
            >
              <div className="flex w-[50px] h-[50px] sm:w-[64.053px] sm:h-[64.053px] justify-center items-center flex-shrink-0 rounded-full bg-[rgba(115,130,141,0.10)]">
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="font-[family-name:var(--font-poppins)] text-sm text-white">Instagram</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/pixelateevents/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full sm:w-[215.179px] h-[90px] sm:h-[111.092px] rounded-[12.01px] border-[0.801px] border-[#73828D] transition-all duration-300 hover:bg-[rgba(30,36,40,0.3)] px-4"
            >
              <div className="flex w-[50px] h-[50px] sm:w-[64.053px] sm:h-[64.053px] justify-center items-center flex-shrink-0 rounded-full bg-[rgba(115,130,141,0.10)]">
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="font-[family-name:var(--font-poppins)] text-sm text-white">LinkedIn</span>
            </a>
            <a 
              href="https://allpixelate.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full sm:w-[215.179px] h-[90px] sm:h-[111.092px] rounded-[12.01px] border-[0.801px] border-[#73828D] transition-all duration-300 hover:bg-[rgba(30,36,40,0.3)] px-4"
            >
              <div className="flex w-[50px] h-[50px] sm:w-[64.053px] sm:h-[64.053px] justify-center items-center flex-shrink-0 rounded-full bg-[rgba(115,130,141,0.10)] overflow-hidden">
                <Image
                  src="/logo.svg"
                  alt="Portfolio"
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
              <span className="font-[family-name:var(--font-poppins)] text-sm text-white">Portfolio</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GetInTouch
