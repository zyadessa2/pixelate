import Image from "next/image"

const Header = ({word1 , word2 , para }: {word1: string, word2: string, para: string}) => {
  return (
     <div className="relative mb-12 text-center md:mb-16">
          {/* Gradient Circle behind title */}
          <div className="absolute left-1/2 top-5 -z-10 -translate-x-1/2 -translate-y-1/4">
            <div
              className="h-[150px] w-[150px] rounded-full opacity-[0.42] sm:h-[180px] sm:w-[180px] md:h-[220px] md:w-[220px] lg:h-[263px] lg:w-[263px]"
              style={{
                background: 'linear-gradient(180deg, #73828D 0.17%, rgba(115, 130, 141, 0.00) 55.27%)'
              }}
            />
          </div>

          <div className="mb-6 mt-7 flex flex-wrap items-center justify-center">
            <h2 className="font-[family-name:var(--font-outerion-local)] text-[36px] font-normal capitalize leading-[100%] tracking-[3.6px] text-white sm:text-[45px] sm:tracking-[4.5px] md:text-[55px] md:tracking-[5.5px] lg:text-[70px] lg:tracking-[7px] xl:text-[81.885px] xl:tracking-[8.188px]">
              {word1}
            </h2>
            <Image
              src="/pixelate-nav-2.svg"
              alt="Pixelate Icon"
              width={122}
              height={122}
              className="h-10 w-10 shrink-0 -mx-2 sm:-mx-2 md:-mx-3 lg:-mx-4 xl:-mx-6 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 xl:h-[122px] xl:w-[122px]"
            />
            <h2 className="font-[family-name:var(--font-outerion-local)] text-[36px] font-normal capitalize leading-[100%] tracking-[3.6px] text-[#4D606E] sm:text-[45px] sm:tracking-[4.5px] md:text-[55px] md:tracking-[5.5px] lg:text-[70px] lg:tracking-[7px] xl:text-[81.885px] xl:tracking-[8.188px]">
              {word2}
            </h2>
          </div>

          <p className="mx-auto max-w-5xl mt-6 font-[family-name:var(--font-poppins)] text-[14px] font-normal leading-[148%] text-white sm:text-[16px] md:text-[18px]">
            {para}
          </p>
        </div>
  )
}

export default Header
