'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import ProjectForm from '@/src/components/admin/ProjectForm'

interface ProjectData {
  id: string
  mainTitle: string
  client: string
  location: string
  date: string
  category: string
  featured: boolean
  overview: string
  stats: { value: string; label: string }[]
  services: string[]
  images: string[]
  clientLogo: string
}

export default function EditProjectPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [project, setProject] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}`)
        const data = await response.json()
        if (data.success) {
          setProject(data.data)
        } else {
          router.push('/admin/projects')
        }
      } catch (error) {
        console.error('Error fetching project:', error)
        router.push('/admin/projects')
      } finally {
        setLoading(false)
      }
    }

    if (session && params.id) {
      fetchProject()
    }
  }, [session, params.id, router])

  if (status === 'loading' || loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-600 border-t-white" />
      </div>
    )
  }

  if (!session || !project) {
    return null
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Edit Project</h1>
        <p className="mt-2 text-gray-400">Update project details</p>
      </div>

      <div className="rounded-xl bg-[#1a1f25] border border-[#2B353C] p-6 md:p-8">
        <ProjectForm
          initialData={{
            mainTitle: project.mainTitle,
            client: project.client,
            location: project.location,
            date: project.date,
            category: project.category,
            featured: project.featured,
            overview: project.overview,
            stats: project.stats,
            services: project.services,
            images: project.images,
            clientLogo: project.clientLogo
          }}
          projectId={project.id}
        />
      </div>
    </div>
  )
}
