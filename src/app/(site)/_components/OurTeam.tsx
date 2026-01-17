import Image from 'next/image'
import Header from '@/src/components/Header'

const OurTeam = () => {
  const team = [
    {
      image: "/team/team-1.png",
      name: "ESLAM MAHROUS",
      position: "CEO"
    },
    {
      image: "/team/team-2.png",
      name: "RAMY WADIE",
      position: "Account Director"
    },
    {
      image: "/team/team-3.png",
      name: "MOHAMED ASHRAF",
      position: "Operations & Logistics coordinator"
    },
    {
      image: "/team/team-4.png",
      name: "VIKRAM SETHI",
      position: "Creative Director"
    },
    {
      image: "/team/team-5.png",
      name: "ELIAS SARKIS",
      position: "Production Manager"
    },
    {
      image: "/team/team-6.png",
      name: "YASMINA FARHAT",
      position: "Event Project Manager"
    }
  ]

  return (
    <section id="team" className="bg-[#0F1419] relative min-h-screen px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24 overflow-hidden">
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
          word2="Team" 
          para="Meet the talented individuals behind Pixelate's success" 
        />

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[10px] mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-[family-name:var(--font-poppins)] text-sm font-semibold text-white uppercase tracking-wide">
                  {member.name}
                </h3>

                <p className="font-[family-name:var(--font-poppins)] text-xs text-gray-400">
                  {member.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurTeam
