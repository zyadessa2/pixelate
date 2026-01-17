'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, Users, TrendingUp, Calendar } from 'lucide-react'
import AnalyticsCard from '@/src/components/admin/AnalyticsCard'

interface DailyView {
  date: string
  count: number
}

interface AnalyticsData {
  totalPageViews: number
  viewsToday: number
  viewsLast7Days: number
  viewsLast30Days: number
  totalProjectViews: number
  dailyViews: DailyView[]
  uniqueVisitorsCount: number
}

export default function AnalyticsPage() {
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

  // Get max views for chart scaling
  const maxViews = analytics?.dailyViews
    ? Math.max(...analytics.dailyViews.map((d) => d.count), 1)
    : 1

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="mt-2 text-gray-400">Track your website performance</p>
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
          title="Project Views"
          value={analytics?.totalProjectViews || 0}
          icon={<Calendar className="h-6 w-6" />}
        />
        <AnalyticsCard
          title="Unique Visitors (30 Days)"
          value={analytics?.uniqueVisitorsCount || 0}
          icon={<Users className="h-6 w-6" />}
        />
      </div>

      {/* Views Chart */}
      <div className="mt-8 rounded-xl bg-[#1a1f25] border border-[#2B353C] p-6">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Daily Views (Last 30 Days)
        </h2>

        {analytics?.dailyViews && analytics.dailyViews.length > 0 ? (
          <div className="flex h-64 items-end gap-1">
            {analytics.dailyViews.map((day) => {
              const height = (day.count / maxViews) * 100
              return (
                <div
                  key={day.date}
                  className="group relative flex-1 min-w-[8px]"
                >
                  <div
                    className="rounded-t bg-blue-500 transition-all hover:bg-blue-400"
                    style={{ height: `${Math.max(height, 4)}%` }}
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                    <div className="rounded bg-[#2B353C] px-2 py-1 text-xs text-white whitespace-nowrap">
                      {day.date}: {day.count} views
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center text-gray-400">
            No data available
          </div>
        )}
      </div>

      {/* Period Comparison */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-[#1a1f25] border border-[#2B353C] p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">7 Day Views</h3>
          <p className="text-4xl font-bold text-white">
            {analytics?.viewsLast7Days || 0}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Total page views in the last 7 days
          </p>
        </div>

        <div className="rounded-xl bg-[#1a1f25] border border-[#2B353C] p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">30 Day Views</h3>
          <p className="text-4xl font-bold text-white">
            {analytics?.viewsLast30Days || 0}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Total page views in the last 30 days
          </p>
        </div>
      </div>
    </div>
  )
}
