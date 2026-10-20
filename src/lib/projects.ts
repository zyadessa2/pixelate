import { cache } from 'react'
import type { Prisma } from '@prisma/client'
import { prisma } from './prisma'

// Public fields only. Dates and analytics stay out of client component props.
const projectSelect = {
  id: true, mainTitle: true, client: true, location: true, date: true,
  category: true, featured: true, overview: true, stats: true,
  services: true, images: true, clientLogo: true,
} satisfies Prisma.ProjectSelect

export type PublicProject = Prisma.ProjectGetPayload<{ select: typeof projectSelect }>

export const getProjects = cache(async (limit?: number) => prisma.project.findMany({
  select: projectSelect, orderBy: { createdAt: 'desc' }, ...(limit ? { take: limit } : {}),
}))

export const getProject = cache(async (id: string) => {
  if (!/^[a-f\d]{24}$/i.test(id)) return null
  return prisma.project.findUnique({ where: { id }, select: projectSelect })
})
