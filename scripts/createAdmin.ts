/**
 * Script to create an admin user
 * Run with: npx tsx scripts/createAdmin.ts
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    console.log('Connecting to MongoDB via Prisma...')

    // Admin credentials - CHANGE THESE!
    const adminData = {
      email: 'admte.com',
      password: '', // Change this to a secure password
      name: 'Admin User'
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: adminData.email }
    })

    if (existingAdmin) {
      console.log('Admin user already exists!')
      console.log('Email:', existingAdmin.email)
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(adminData.password, 12)
      
      // Create new admin
      const admin = await prisma.admin.create({
        data: {
          email: adminData.email,
          password: hashedPassword,
          name: adminData.name
        }
      })
      console.log('Admin user created successfully!')
      console.log('Email:', admin.email)
      console.log('Name:', admin.name)
    }

    console.log('\n⚠️  Remember to change the default password!')

    await prisma.$disconnect()
    console.log('Disconnected from MongoDB')
    process.exit(0)
  } catch (error) {
    console.error('Error creating admin:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

createAdmin()
