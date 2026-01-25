"use client"

import Image from 'next/image'
import { Calendar, MapPin, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import Header from '@/src/components/Header'
import GetInTouch from '../_components/GetInTouch'
import { getImageUrl } from '@/src/lib/image-utils'
import ProjectModal, { Project } from '@/src/components/ProjectModal'

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Hero Images for slideshow
  const heroImages = [
    '/portfolio/2.jpeg',
    '/portfolio/1.jpeg',
    '/portfolio/3.png',
    '/portfolio/4.jpeg',
  ]

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 2000) // Change image every 2 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/projects')
        const data = await response.json()
        
        if (data.success) {
          setProjects(data.data)
        } else {
          setError(data.error || 'Failed to fetch projects')
        }
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
  }

  return (
    <main className="relative bg-[#0F1419] pt-25 min-h-screen overflow-hidden">
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          width: '6240px',
          height: '1441px',
          transform: 'rotate(90deg)',
          opacity: 0.1,
          mixBlendMode: 'overlay',
          left: '50%',
          top: '50%',
          marginLeft: '-3120px',
          marginTop: '-720.5px'
        }}
      >
        <Image
          src="/hero-portfolio.png"
          alt="Background"
          fill
          className="object-cover"
          style={{ backgroundColor: 'lightgray' }}
        />
      </div>

      <section className="relative px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="relative mx-auto h-[300px] w-full max-w-[1284px] overflow-hidden rounded-[15px] sm:h-[350px] sm:rounded-[20px] md:h-[414px] md:rounded-[25px]">
          {heroImages.map((img, index) => (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={img}
                alt={`Portfolio Hero ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.33) 0%, rgba(0, 0, 0, 0.33) 100%)'
            }}
          />

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentImageIndex ? 'w-8 bg-white' : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20 ">
        <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[600px] w-[90vw] max-w-[1283px] rounded-[20px] bg-[#2B353C] opacity-[0.07] sm:h-[700px] sm:rounded-[25px] md:h-[900px] md:rounded-[30px] lg:h-[1100px] lg:rounded-[35px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <Header
            word1="port"
            word2="folio"
            para="Explore our diverse range of successful events and experiences"
          />

          <div className="mt-12 space-y-8 md:space-y-10 lg:space-y-12">
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-[#73828D]" />
                <p className="mt-4 text-gray-400">Loading projects...</p>
              </div>
            )}

            {error && !loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-red-400">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 rounded-lg bg-[#73828D]/30 px-6 py-2 text-white transition-all hover:bg-[#73828D]/50"
                >
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && projects.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-gray-400">No projects available yet.</p>
              </div>
            )}

            {!loading && !error && projects.map((project) => (
              <div
                key={project.id}
                onClick={() => openProjectModal(project)}
                className="group block w-full overflow-hidden rounded-[20px] bg-[#2B353C]/60 backdrop-blur-sm transition-all duration-300 hover:border-[#73828D]/40 hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-center justify-between border-b border-[#73828D]/20 px-3  sm:px-4  md:px-5 -py-3 max-h-23">
                  <div>
                    <Image
                      src="/pixelate-svg-white.svg"
                      alt="Pixelate"
                      width={180}
                      height={60}
                      className="h-auto w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
                    />
                  </div>

                  <div>
                    <Image
                      src={getImageUrl(project.clientLogo)}
                      alt={project.client}
                      width={180}
                      height={60}
                      className="h-auto w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
                    />
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                  <div className="relative h-[280px] w-full overflow-hidden rounded-[15px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
                    <Image
                      src={getImageUrl(project.image)}
                      alt={project.mainTitle}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                    <div className="absolute inset-0 flex items-end justify-between px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
                      <div className="flex flex-col gap-3 sm:gap-4">
                        <h3 className="font-[family-name:var(--font-poppins)] text-xl font-normal text-white sm:text-2xl md:text-3xl lg:text-4xl">
                          {project.mainTitle}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-200 sm:gap-4 sm:text-sm md:text-base">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                            <span>{project.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                            <span>{project.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="hidden rounded-lg sm:block absolute -bottom-5 right-0 sm:-bottom-15 sm:right-0 md:-bottom-15 md:right-10 lg:-bottom-15 lg:right-0">
                          <Image
                            src={getImageUrl(project.clientLogo)}
                            alt={`${project.client} Logo`}
                            width={250}
                            height={80}
                            className="object-contain"
                          />
                      </div>
                    </div>
                  </div>

                  {/* Thumbnails Section
                  {project.images && project.images.length > 1 && (
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                      {project.images.slice(0, 5).map((img, index) => (
                        <div
                          key={index}
                          className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-[#2B353C] transition-all hover:ring-2 hover:ring-white/50"
                        >
                          <Image
                            src={getImageUrl(img)}
                            alt={`${project.mainTitle} - Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      {project.images.length > 5 && (
                        <div className="flex h-16 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-[#2B353C]/80 text-sm text-gray-300">
                          +{project.images.length - 5} more
                        </div>
                      )}
                    </div>
                  )} */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={closeProjectModal} />

      <GetInTouch/>
    </main>
  )
}

export default ProjectsPage