import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/src/lib/prisma'

// Helper to validate ObjectId
function isValidObjectId(id: string): boolean {
  return /^[a-fA-F0-9]{24}$/.test(id)
}

// POST - Track project view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId } = body

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      )
    }

    if (!isValidObjectId(projectId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid project ID' },
        { status: 400 }
      )
    }

    // Get IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

    // Get user agent
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Get referrer
    const referrer = request.headers.get('referer') || ''

    // Create analytics record
    await prisma.analytics.create({
      data: {
        type: 'project_view',
        page: `/projects/${projectId}`,
        projectId,
        ip,
        userAgent,
        referrer
      }
    })

    // Increment project views counter
    await prisma.project.update({
      where: { id: projectId },
      data: { views: { increment: 1 } }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking project view:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track project view' },
      { status: 500 }
    )
  }
}
