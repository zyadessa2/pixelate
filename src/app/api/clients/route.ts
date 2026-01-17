import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/src/lib/auth'
import prisma from '@/src/lib/prisma'

// GET all clients
export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { order: 'asc' }
    })
    
    return NextResponse.json({ success: true, data: clients })
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch clients' },
      { status: 500 }
    )
  }
}

// POST create new client (admin only)
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
    const { name, logo, subtitle, description, order } = body

    if (!name || !logo || !subtitle || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const client = await prisma.client.create({
      data: {
        name,
        logo,
        subtitle,
        description,
        order: order || 0
      }
    })

    return NextResponse.json({ success: true, data: client }, { status: 201 })
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create client' },
      { status: 500 }
    )
  }
}
