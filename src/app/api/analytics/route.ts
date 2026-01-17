import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'

// GET - Return analytics dashboard data (protected)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Total page views
    const totalPageViews = await prisma.analytics.count({ 
      where: { type: 'page_view' } 
    })

    // Views today
    const viewsToday = await prisma.analytics.count({
      where: {
        type: 'page_view',
        createdAt: { gte: todayStart }
      }
    })

    // Views last 7 days
    const viewsLast7Days = await prisma.analytics.count({
      where: {
        type: 'page_view',
        createdAt: { gte: sevenDaysAgo }
      }
    })

    // Views last 30 days
    const viewsLast30Days = await prisma.analytics.count({
      where: {
        type: 'page_view',
        createdAt: { gte: thirtyDaysAgo }
      }
    })

    // Total project views
    const totalProjectViews = await prisma.analytics.count({ 
      where: { type: 'project_view' } 
    })

    // Top 5 projects by views
    const topProjects = await prisma.project.findMany({
      orderBy: { views: 'desc' },
      take: 5,
      select: {
        id: true,
        mainTitle: true,
        views: true,
        images: true
      }
    })

    // Daily views for last 30 days (for chart) - using groupBy
    const dailyViewsRaw = await prisma.analytics.groupBy({
      by: ['createdAt'],
      where: {
        type: 'page_view',
        createdAt: { gte: thirtyDaysAgo }
      },
      _count: true
    })

    // Process daily views to group by date string
    const dailyViewsMap = new Map<string, number>()
    dailyViewsRaw.forEach((item: { createdAt: Date; _count: number }) => {
      const dateStr = item.createdAt.toISOString().split('T')[0]
      dailyViewsMap.set(dateStr, (dailyViewsMap.get(dateStr) || 0) + item._count)
    })
    const dailyViews = Array.from(dailyViewsMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))

    // Unique visitors (by IP)
    const uniqueVisitorsRaw = await prisma.analytics.findMany({
      where: {
        type: 'page_view',
        createdAt: { gte: thirtyDaysAgo }
      },
      select: { ip: true },
      distinct: ['ip']
    })

    return NextResponse.json({
      success: true,
      data: {
        totalPageViews,
        viewsToday,
        viewsLast7Days,
        viewsLast30Days,
        totalProjectViews,
        topProjects,
        dailyViews,
        uniqueVisitorsCount: uniqueVisitorsRaw.length
      }
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
