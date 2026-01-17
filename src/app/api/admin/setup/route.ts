import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/src/lib/prisma'
import bcrypt from 'bcryptjs'

// Force dynamic rendering - don't run at build time
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const fetchCache = 'force-no-store'

// GET - Check if setup is needed (safe version that won't run at build)
export async function GET() {
  // During build time, return a simple response
  if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
    return NextResponse.json({ 
      message: 'Setup endpoint available at runtime'
    })
  }

  try {
    const adminCount = await prisma.admin.count()
    return NextResponse.json({ 
      setupRequired: adminCount === 0,
      message: adminCount === 0 ? 'No admin exists, setup required' : 'Admin already exists'
    })
  } catch (error) {
    console.error('Error checking admin:', error)
    return NextResponse.json(
      { error: 'Failed to check admin status' },
      { status: 500 }
    )
  }
}

// POST - Create admin user (only works if no admin exists)
export async function POST(request: NextRequest) {
  try {
    // Check if any admin already exists
    const existingAdminCount = await prisma.admin.count()

    if (existingAdminCount > 0) {
      return NextResponse.json(
        { success: false, error: 'Admin already exists. This route is disabled.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Admin created successfully',
      data: { email: admin.email, name: admin.name }
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating admin:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create admin' },
      { status: 500 }
    )
  }
}
