import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// GET - Fetch all projects (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {}

    if (featured === 'true') {
      where.featured = true
    }

    if (category) {
      where.category = category
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      ...(limit ? { take: parseInt(limit, 10) } : {})
    })

    return NextResponse.json({ success: true, data: projects })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST - Create new project (protected)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()

    const project = await prisma.project.create({
      data: {
        mainTitle: body.mainTitle,
        client: body.client,
        location: body.location,
        date: body.date,
        category: body.category,
        featured: body.featured || false,
        overview: body.overview,
        stats: body.stats || [],
        services: body.services || [],
        images: body.images || [],
        clientLogo: body.clientLogo
      }
    })

    return NextResponse.json({ success: true, data: project }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
