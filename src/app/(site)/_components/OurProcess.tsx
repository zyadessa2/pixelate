import { Eye, Lightbulb, Palette, Rocket, TrendingUp } from 'lucide-react'
import Header from '@/src/components/Header'

const OurProcess = () => {
  const steps = [
    {
      icon: Eye,
      number: "01",
      title: "Vision",
      description: "Understanding your goals and creative aspirations"
    },
    {
      icon: Lightbulb,
      number: "02",
      title: "Concept",
      description: "Developing innovative ideas and strategic plans"
    },
    {
      icon: Palette,
      number: "03",
      title: "Design",
      description: "Crafting detailed visual and technical specifications"
    },
    {
      icon: Rocket,
      number: "04",
      title: "Execution",
      description: "Professional implementation with precision"
    },
    {
      icon: TrendingUp,
      number: "05",
      title: "Impact",
      description: "Delivering memorable experiences that resonate"
    }
  ]

  return (
    <section id="process" className="bg-[#0F1419] relative min-h-screen px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24 overflow-hidden">
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
          word2="Process" 
          para="A refined approach to creating exceptional brand experiences" 
        />

        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-[rgba(30,36,40,0.15)] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-[#4D606E] hover:scale-[1.02]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-white/5 transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/10">
                <step.icon className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1 w-full">
                <div className="mb-3 font-[family-name:var(--font-poppins)] text-5xl font-normal text-white/20">
                  {step.number}
                </div>
                <h3 className="mb-3 font-[family-name:var(--font-poppins)] text-xl font-bold capitalize leading-tight tracking-wider text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurProcess