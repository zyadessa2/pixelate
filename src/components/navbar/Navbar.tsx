"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Navbar = () => {
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { scrollY } = useScroll()
  
  // Transform scroll position to width percentage
  const navWidth = useTransform(scrollY, [0, 100], [95, 85])
  const navPadding = useTransform(scrollY, [0, 100], [1, 0.8])

  useEffect(() => {
    // Check system preference on mount
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(isDarkMode)

    // Handle scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    closeMobileMenu()
    
    const element = document.getElementById(targetId)
    if (element) {
      const offset = 100 // offset for fixed navbar
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <motion.nav 
        style={{
          width: useTransform(navWidth, (w) => `${w}vw`),
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          scale: isScrolled ? 0.98 : 1,
        }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        className="fixed left-1/2 top-4 z-50 flex h-auto min-h-[60px] max-w-[1284px] -translate-x-1/2 items-center justify-between rounded-[40px] border-b-[0.5px] border-[#73828D] bg-[rgba(43,53,60,0.33)] px-4 py-3 shadow-[0_5px_4px_0_rgba(0,0,0,0.09)] backdrop-blur-[10px] sm:top-6 sm:rounded-[50px] sm:px-6 sm:py-3.5 md:top-8 md:h-[68.632px] md:px-10 md:py-[14.267px] lg:top-10 lg:rounded-[61.525px] lg:px-[52.608px]"
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2 max-h-10">
          <motion.div
            animate={{ scale: isScrolled ? 0.9 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/pixelate-svg-white.svg"
              alt="Pixelate Logo"
              width={180}
              height={60}
              className="  w-[140px] sm:w-[160px] md:w-[180px] lg:w-[150px]"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-4 lg:flex xl:gap-6">
          <a href="/" className="rounded-2xl px-3 py-2 text-sm text-white transition-colors hover:bg-black/15 xl:px-4 xl:text-base cursor-pointer">
            Home
          </a>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="rounded-2xl px-3 py-2 text-sm text-white transition-colors hover:bg-black/15 xl:px-4 xl:text-base cursor-pointer">
            About Us
          </a>
          <a href="/projects"  className="rounded-2xl px-3 py-2 text-sm text-white transition-colors hover:bg-black/15 xl:px-4 xl:text-base cursor-pointer">
            Projects
          </a>
          <a href="#service" onClick={(e) => handleSmoothScroll(e, 'service')} className="rounded-2xl px-3 py-2 text-sm text-white transition-colors hover:bg-black/15 xl:px-4 xl:text-base cursor-pointer">
            Services
          </a>
          <a href="#process" onClick={(e) => handleSmoothScroll(e, 'process')} className="rounded-2xl px-3 py-2 text-sm text-white transition-colors hover:bg-black/15 xl:px-4 xl:text-base cursor-pointer">
            Process
          </a>
        </div>

        {/* Right Side - Theme Toggle & Contact Button */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-white transition-all hover:bg-white/10 active:scale-95"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} className="sm:h-5 sm:w-5" /> : <Moon size={18} className="sm:h-5 sm:w-5" />}
          </button> */}
          
          <Link
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, 'contact')}
            className="hidden rounded-full bg-gray-700 px-4 py-2 text-sm text-white text-center transition-all hover:bg-gray-600 active:scale-95 sm:block lg:px-6 xl:text-base mx-auto"
          >
            Contact Us
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="rounded-full p-2 text-white transition-all hover:bg-white/10 active:scale-95 lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} className="sm:h-6 sm:w-6" /> : <Menu size={22} className="sm:h-6 sm:w-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed left-1/2 top-[76px] z-40 w-[95vw] max-w-[600px] -translate-x-1/2 overflow-hidden rounded-3xl border border-white/10 bg-[rgba(20,26,30,0.98)] shadow-2xl backdrop-blur-xl sm:top-[92px] md:top-[108px] lg:hidden"
      >
        <div className="flex max-h-[calc(100vh-120px)] flex-col overflow-y-auto p-4 sm:p-5">
          <a
            href="/"
            
            className="rounded-xl px-4 py-3.5 text-base text-white transition-all hover:bg-white/10 active:bg-white/15 sm:text-lg cursor-pointer"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => handleSmoothScroll(e, 'about')}
            className="rounded-xl px-4 py-3.5 text-base text-white transition-all hover:bg-white/10 active:bg-white/15 sm:text-lg cursor-pointer"
          >
            About Us
          </a>
          <a
            href="/projects"
            className="rounded-xl px-4 py-3.5 text-base text-white transition-all hover:bg-white/10 active:bg-white/15 sm:text-lg cursor-pointer"
          >
            Projects
          </a>
          <a
            href="#service"
            onClick={(e) => handleSmoothScroll(e, 'service')}
            className="rounded-xl px-4 py-3.5 text-base text-white transition-all hover:bg-white/10 active:bg-white/15 sm:text-lg cursor-pointer"
          >
            Services
          </a>
          <a
            href="#process"
            onClick={(e) => handleSmoothScroll(e, 'process')}
            className="rounded-xl px-4 py-3.5 text-base text-white transition-all hover:bg-white/10 active:bg-white/15 sm:text-lg cursor-pointer"
          >
            Process
          </a>
          <div className="mt-2 border-t border-white/10 pt-3">
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="block rounded-full bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-3.5 text-center text-base font-medium text-white transition-all hover:from-gray-600 hover:to-gray-500 active:scale-[0.98] sm:text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Navbar
