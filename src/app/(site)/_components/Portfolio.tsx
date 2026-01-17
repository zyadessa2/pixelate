'use client'

import Image from 'next/image'
import { MapPin, Calendar } from 'lucide-react'
import Header from '@/src/components/Header'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getImageUrl } from '@/src/lib/image-utils'
import ProjectModal, { Project } from '@/src/components/ProjectModal'

const Portfolio = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects?limit=6')
        const data = await response.json()
        if (data.success) {
          setProjects(data.data)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
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

  const displayProjects: Project[] = projects.length > 0 ? projects : []

  return (
    <section id="portfolio" className="bg-[#0F1419] relative min-h-screen px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24 overflow-hidden">
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
          word1="port"
          word2="folio"
          para="Explore our diverse range of successful events and experiences"
        />

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-600 border-t-white" />
            </div>
          ) : displayProjects.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-12">
              No projects available yet.
            </div>
          ) : (
            displayProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => openProjectModal(project)}
                className="group relative overflow-hidden rounded-[20px] bg-[#2B353C] backdrop-blur-sm transition-all duration-300 hover:bg-[#2B353C]/80 cursor-pointer"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={getImageUrl(project.image) || '/portfolio-image.jpg'}
                    alt={project.mainTitle}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B353C] via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-sans text-[20.921px] font-normal leading-[29.289px] text-white">
                    {project.mainTitle}
                  </h3>

                  <div className="flex items-center gap-4 font-sans text-[14.645px] font-normal leading-[20.921px] text-[#9CA3AF]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>{project.date}</span>
                    </div>
                  </div>

                  <p className="font-sans text-[14px] font-normal leading-[20.921px] text-[#9CA3AF] line-clamp-2">
                    {project.overview}
                  </p>

                  {/* Thumbnails */}
                  {/* {project.images && project.images.length > 1 && (
                    <div className="flex gap-1.5 pt-2 overflow-x-auto">
                      {project.images.slice(0, 4).map((img, index) => (
                        <div
                          key={index}
                          className="relative h-10 w-14 flex-shrink-0 overflow-hidden rounded bg-[#1a1f25]"
                        >
                          <Image
                            src={getImageUrl(img)}
                            alt={`${project.mainTitle} - ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      {project.images.length > 4 && (
                        <div className="flex h-10 w-14 flex-shrink-0 items-center justify-center rounded bg-[#1a1f25] text-xs text-gray-400">
                          +{project.images.length - 4}
                        </div>
                      )}
                    </div>
                  )} */}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-12 flex justify-center">
            <Link href="/projects" className="rounded-full bg-[rgba(115,130,141,0.3)] px-8 py-3 font-[family-name:var(--font-poppins)] text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-[rgba(115,130,141,0.5)] hover:scale-105 inline-block">
              More Projects
            </Link>
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={closeProjectModal} />
    </section>
  )
}

export default Portfolio
