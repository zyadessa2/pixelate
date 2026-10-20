'use client'

import { useEffect, useRef } from 'react'

// Keep large below-the-fold media out of the initial page download.
export default function LazyVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!video.getAttribute('src')) video.src = src
        if (!reducedMotion.matches) void video.play().catch(() => {})
      } else {
        video.pause()
      }
    }, { rootMargin: '200px' })
    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  return <video ref={videoRef} className={className} controls muted loop playsInline preload="none" aria-label="Pixelate event production showreel" />
}
