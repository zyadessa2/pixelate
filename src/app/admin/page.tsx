'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, Users, TrendingUp, FolderOpen } from 'lucide-react'
import AnalyticsCard from '@/src/components/admin/AnalyticsCard'
import Image from 'next/image'
import { getImageUrl } from '@/src/lib/image-utils'

interface TopProject {
  id: string
  mainTitle: string
  views: number
  images: string[]
}

interface AnalyticsData {
  totalPageViews: number
  viewsToday: number
  viewsLast7Days: number
  viewsLast30Days: number
  totalProjectViews: number
  topProjects: TopProject[]
  uniqueVisitorsCount: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics')
        const data = await response.json()
        if (data.success) {
          setAnalytics(data.data)
        }
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchAnalytics()
    }
  }, [session])

  if (status === 'loading' || loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-600 border-t-white" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-gray-400">
          Welcome back, {session.user?.name}
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          title="Total Page Views"
          value={analytics?.totalPageViews || 0}
          icon={<Eye className="h-6 w-6" />}
        />
        <AnalyticsCard
          title="Views Today"
          value={analytics?.viewsToday || 0}
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <AnalyticsCard
          title="Views (7 Days)"
          value={analytics?.viewsLast7Days || 0}
          icon={<TrendingUp className="h-6 w-6" />}
        />
        <AnalyticsCard
          title="Unique Visitors"
          value={analytics?.uniqueVisitorsCount || 0}
          icon={<Users className="h-6 w-6" />}
        />
      </div>

      {/* Top Projects */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-white">Top Projects</h2>
        <div className="rounded-xl bg-[#1a1f25] border border-[#2B353C] overflow-hidden">
          {analytics?.topProjects && analytics.topProjects.length > 0 ? (
            <table className="w-full">
              <thead className="bg-[#2B353C]/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                    Project
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                    Views
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B353C]">
                {analytics.topProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-[#2B353C]/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-[#2B353C]">
                          {project.images?.[0] && (
                            <Image
                              src={getImageUrl(project.images[0])}
                              alt={project.mainTitle}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">{project.mainTitle}</p>
                          <p className="text-sm text-gray-400">{project.mainTitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 text-white">
                        <Eye className="h-4 w-4 text-gray-400" />
                        {project.views}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <FolderOpen className="h-12 w-12 mb-4" />
              <p>No projects yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
