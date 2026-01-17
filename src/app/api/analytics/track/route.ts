import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/src/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// POST - Track page view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { page } = body

    if (!page) {
      return NextResponse.json(
        { success: false, error: 'Page is required' },
        { status: 400 }
      )
    }

    // Get IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

    // Get user agent
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Get referrer
    const referrer = request.headers.get('referer') || body.referrer || ''

    await prisma.analytics.create({
      data: {
        type: 'page_view',
        page,
        ip,
        userAgent,
        referrer
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking page view:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track page view' },
      { status: 500 }
    )
  }
}
