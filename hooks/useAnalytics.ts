'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function usePageTracking() {
  const pathname = usePathname()

  useEffect(() => {
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: pathname,
            referrer: document.referrer
          })
        })
      } catch (error) {
        console.error('Error tracking page view:', error)
      }
    }

    if (!pathname.startsWith('/admin')) {
      trackPageView()
    }
  }, [pathname])
}

export async function trackProjectView(projectId: string) {
  try {
    await fetch('/api/analytics/project-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId })
    })
  } catch (error) {
    console.error('Error tracking project view:', error)
  }
}
