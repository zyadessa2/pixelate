'use client'

import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getImageUrl } from '@/src/lib/image-utils'

export interface Project {
  id: string
  mainTitle: string
  client: string
  location: string
  date: string
  image: string
  clientLogo: string
  category: string
  featured: boolean
  overview: string
  stats: { value: string; label: string }[]
  services: string[]
  images: string[]
  views?: number
  createdAt?: string
  updatedAt?: string
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0)
      document.body.style.overflow = 'hidden'
      
      // Track project view
      fetch('/api/analytics/project-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: project.id })
      }).catch(console.error)
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [project])

  if (!project) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[25px] bg-[#0F1419] shadow-2xl scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 backdrop-blur-sm transition-all hover:bg-black/70"
          aria-label="Close"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        {/* Hero Image with Carousel */}
        <div className="relative h-[300px] w-full sm:h-[400px] md:h-[500px]">
          <Image
            src={getImageUrl(project.images[currentImageIndex])}
            alt={`${project.mainTitle} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Navigation Arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </>
          )}

          {/* Main Title */}
          {/* <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="font-[family-name:var(--font-outerion)] text-5xl font-normal text-white drop-shadow-2xl sm:text-6xl md:text-7xl text-center px-4">
              {project.mainTitle}
            </h2>
          </div> */}

          {/* Image Indicators */}
          {project.images.length > 1 && (
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
          )}
        </div>

        {/* Thumbnails */}
        {/* {project.images.length > 1 && (
          <div className="flex gap-2 p-4 overflow-x-auto bg-[#1a1f25]">
            {project.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                  index === currentImageIndex 
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1a1f25]' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={getImageUrl(img)}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )} */}

        {/* Project Details */}
        <div className="p-6 sm:p-8 md:p-10">
          {/* Category Badge & Featured */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
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

          {/* Title */}
          <h3 className="mb-3 font-[family-name:var(--font-poppins)] text-2xl font-normal text-white sm:text-3xl md:text-4xl">
            {project.mainTitle}
          </h3>

          {/* Location & Date */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{project.date}</span>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-6 rounded-[15px] bg-[#2B353C]/30 p-4 backdrop-blur-sm md:p-6">
            <h4 className="mb-2 text-lg font-semibold text-white">Project Overview</h4>
            <p className="leading-relaxed text-gray-300">{project.overview}</p>
          </div>

          {/* Statistics */}
          {project.stats && project.stats.length > 0 && (
            <div className="mb-6 grid grid-cols-3 gap-3 md:gap-4">
              {project.stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-[#2B353C]/50 p-3 text-center backdrop-blur-sm md:p-4"
                >
                  <div className="mb-1 font-[family-name:var(--font-poppins)] text-xl font-bold text-gray-300 md:text-2xl lg:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 md:text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Services */}
          {project.services && project.services.length > 0 && (
            <div className="rounded-[15px] bg-[#2B353C]/30 p-4 backdrop-blur-sm md:p-6">
              <h4 className="mb-4 text-lg font-semibold text-white">Services Provided</h4>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
                {project.services.map((service, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-[#0F1419] px-3 py-2 text-center text-sm text-gray-300"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
