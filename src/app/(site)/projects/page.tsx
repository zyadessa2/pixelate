import ProjectsClient from './ProjectsClient'
import { getProjects } from '@/src/lib/projects'
import { pageMetadata } from '@/src/lib/site'

export const dynamic = 'force-dynamic'
export const metadata = pageMetadata('Event & Creative Projects', 'Explore Pixelate’s event production and creative portfolio. Discover project details, event locations and the services behind each experience.', '/projects')

export default async function ProjectsPage() {
  const projects = await getProjects()
  return <ProjectsClient projects={projects} />
}
