"use client"

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import GetInTouch from '../../_components/GetInTouch'
import { getImageUrl } from '@/src/lib/image-utils'

interface Project {
  id: string
  mainTitle: string
  client: string
  location: string
  date: string
  category: string
  featured: boolean
  overview: string
  stats: { value: string; label: string }[]
  services: string[]
  images: string[]
  clientLogo: string
}

const ProjectDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [projectId, setProjectId] = useState<string | null>(null)
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    params.then(async (resolvedParams) => {
      setProjectId(resolvedParams.id)
      
      try {
        const response = await fetch(`/api/projects/${resolvedParams.id}`)
        const data = await response.json()
        
        if (data.success) {
          setProject(data.data)
          
          fetch('/api/analytics/project-view', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectId: resolvedParams.id })
          }).catch(console.error)
        } else {
          setError(data.error || 'Project not found')
        }
      } catch (err) {
        console.error('Error fetching project:', err)
        setError('Failed to load project')
      } finally {
        setLoading(false)
      }
    })
  }, [params])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0F1419]">
        <Loader2 className="h-12 w-12 animate-spin text-[#73828D]" />
        <p className="mt-4 text-gray-400">Loading project...</p>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0F1419]">
        <p className="text-red-400">{error || 'Project not found'}</p>
        <Link
          href="/projects"
          className="mt-4 rounded-lg bg-[#73828D]/30 px-6 py-2 text-white transition-all hover:bg-[#73828D]/50"
        >
          Back to Projects
        </Link>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <main className="relative min-h-screen bg-[#0F1419]">
      <section className="relative h-[300px] w-full sm:h-[400px] md:h-[500px] lg:h-[600px]">
        <div className="relative h-full w-full">
          <Image
            src={getImageUrl(project.images[currentImageIndex])}
            alt={`${project.mainTitle} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20 md:left-8 md:p-3"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 text-white md:h-6 md:w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20 md:right-8 md:p-3"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 text-white md:h-6 md:w-6" />
        </button>

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-[family-name:var(--font-outerion)] text-5xl font-normal text-white drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-8xl">
            {project.mainTitle}
          </h1>
        </div>

        Image Indicators
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {project.images.map((_, index) => (
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

        {/* Small Thumbnail Previews (Left & Right) */}
        <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="relative h-24 w-16 overflow-hidden rounded-lg opacity-70">
            <Image
              src={getImageUrl(project.images[(currentImageIndex - 1 + project.images.length) % project.images.length])}
              alt="Previous"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="relative h-24 w-16 overflow-hidden rounded-lg opacity-70">
            <Image
              src={getImageUrl(project.images[(currentImageIndex + 1) % project.images.length])}
              alt="Next"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Project Details Section */}
      <section className="relative px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Category Badge & Featured */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#2B353C] px-4 py-1.5 text-sm text-gray-300">
              {project.category}
            </span>
            {project.featured && (
              <span className="flex items-center gap-1.5 rounded-full bg-[#2B353C] px-4 py-1.5 text-sm text-gray-300">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured Project
              </span>
            )}
          </div>

          {/* Project Title */}
          <h2 className="mb-4 font-[family-name:var(--font-poppins)] text-3xl font-normal text-white sm:text-4xl md:text-5xl">
            {project.mainTitle}
          </h2>

          {/* Location & Date */}
          <div className="mb-8 flex flex-wrap items-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{project.date}</span>
            </div>
          </div>

          {/* Project Overview */}
          <div className="mb-12 rounded-[20px] bg-[#2B353C]/30 p-6 backdrop-blur-sm md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-white">Project Overview</h3>
            <p className="leading-relaxed text-gray-300">{project.overview}</p>
          </div>

          {/* Statistics */}
          <div className="mb-12 grid grid-cols-3 gap-4 md:gap-6">
            {project.stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-[15px] bg-[#2B353C]/50 p-4 text-center backdrop-blur-sm md:p-6"
              >
                <div className="mb-2 font-[family-name:var(--font-outerion)] text-2xl font-normal text-white md:text-3xl lg:text-4xl">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Services Provided */}
          <div className="mb-12 rounded-[20px] bg-[#2B353C]/30 p-6 backdrop-blur-sm md:p-8">
            <h3 className="mb-6 text-xl font-semibold text-white">Services Provided</h3>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {project.services.map((service, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-[#0F1419] px-4 py-3 text-center text-sm text-gray-300 md:text-base"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Back to Projects Button */}
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-[#2B353C] px-6 py-3 text-white transition-all hover:bg-[#3B454C]"
            >
              <ChevronLeft className="h-5 w-5" />
              Back to Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <GetInTouch />
    </main>
  )
}

export default ProjectDetailPage
