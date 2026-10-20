import type { MetadataRoute } from 'next'
import { prisma } from '@/src/lib/prisma'
import { services } from '@/src/lib/services'
import { site } from '@/src/lib/site'

// Query current projects on each sitemap request, including after admin edits.
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await prisma.project.findMany({ select: { id: true } })
  return [
    ...['', '/services', '/projects', '/contact', ...services.map(service => `/services/${service.slug}`)]
      .map(path => ({ url: `${site.url}${path}` })),
    ...projects.map(project => ({ url: `${site.url}/projects/${project.id}` })),
  ]
}
