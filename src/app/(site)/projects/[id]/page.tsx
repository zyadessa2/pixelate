import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/src/components/JsonLd'
import { getProject } from '@/src/lib/projects'
import { breadcrumbSchema, pageMetadata } from '@/src/lib/site'
import ProjectDetailClient from './ProjectDetailClient'

type Props = { params: Promise<{ id: string }> }
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject((await params).id)
  if (!project) notFound()
  const description = project.overview.trim().replace(/\s+/g, ' ').slice(0, 160)
    || `${project.mainTitle}: a Pixelate project in ${project.location}. Explore the event and the services provided.`
  return pageMetadata(project.mainTitle, description, `/projects/${project.id}`)
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject((await params).id)
  if (!project) notFound()
  return <>
    <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }, { name: project.mainTitle, path: `/projects/${project.id}` }])} />
    <ProjectDetailClient project={project} />
  </>
}
