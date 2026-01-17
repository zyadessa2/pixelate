import Image from 'next/image'
import Link from 'next/link'

const Hero = () => {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <video
        autoPlay
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/70" />

      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0F1419)'
        }}
      />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center py-16 text-center sm:py-20 md:py-24 lg:py-36">
        <div className="mb-5 w-full sm:mb-6 md:mb-8">
          <Image
            src="/hero-logo.png"
            alt="Pixelate Portfolio Logo"
            width={500}
            height={266}
            priority
            className="mx-auto h-auto w-48 sm:w-56 md:w-64 lg:w-[566px]"
          />
        </div>

        <p className="mb-2 max-w-2xl px-1 text-center font-[family-name:var(--font-poppins)] text-sm font-normal capitalize leading-[100%] tracking-[0.1em] text-white sm:text-base md:text-[17.622px] md:tracking-[1.762px]">
          A Collection Of Our Most Impactful<span className="inline-block  bg-gradient-to-r from-[#292F33]/5 to-[#73828D]/50 px-1 py-1 sm:px-1">Event Experiences</span>
        </p>
        <p className="mb-8 max-w-2xl  text-center font-[family-name:var(--font-poppins)] text-sm font-normal capitalize leading-[100%] tracking-[0.1em] text-white sm:mb-10 sm:text-base md:mb-12 md:text-[17.622px] md:tracking-[1.762px]">
          <span className="inline-block  bg-gradient-to-r from-[#292F33]/5 to-[#73828D]/50  py-1 ">Get In Touch </span> To Bring Your Next Event To Life. 
        </p>

        <div className="flex flex-col items-center gap-[10.187px] sm:flex-row">
          <Link
            href="/projects"
            className="inline-flex h-[45px] items-center justify-center gap-[10.187px] rounded-full bg-gray-700/80 px-8 py-2 text-sm text-white transition-all hover:bg-gray-600/80 sm:h-[50.935px] sm:px-[40.748px] sm:py-[10.187px] sm:text-base"
          >
            Our Projects
          </Link>
          <Link
            href="#contact"
            className="inline-flex h-[45px] items-center justify-center gap-[10.187px] rounded-full border-2 border-white/80 px-8 py-2 text-sm text-white transition-all hover:bg-white/10 sm:h-[50.935px] sm:px-[40.748px] sm:py-[10.187px] sm:text-base"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero