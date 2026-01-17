import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/src/lib/prisma'
import bcrypt from 'bcryptjs'

// Force dynamic rendering - don't run at build time
export const dynamic = 'force-dynamic'

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
