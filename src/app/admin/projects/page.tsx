'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit, Trash2, Eye, Loader2 } from 'lucide-react'
import { getImageUrl } from '@/src/lib/image-utils'

interface Project {
  id: string
  mainTitle: string
  client: string
  category: string
  featured: boolean
  views: number
  images: string[]
  createdAt: string
}

export default function ProjectsListPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        if (data.success) {
          setProjects(data.data)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchProjects()
    }
  }, [session])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    setDeleting(id)
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (data.success) {
        setProjects(projects.filter((p) => p.id !== id))
      }
    } catch (error) {
      console.error('Error deleting project:', error)
    } finally {
      setDeleting(null)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-600 border-t-white" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="mt-2 text-gray-400">Manage your portfolio projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </Link>
      </div>

      <div className="rounded-xl bg-[#1a1f25] border border-[#2B353C] overflow-hidden">
        {projects.length > 0 ? (
          <table className="w-full">
            <thead className="bg-[#2B353C]/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Project
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Featured
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  Views
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2B353C]">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-[#2B353C]/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-[#2B353C]">
                        {project.images?.[0] && (
                          <Image
                            src={getImageUrl(project.images[0])}
                            alt={project.mainTitle}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{project.mainTitle}</p>
                        <p className="text-sm text-gray-400">{project.client}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-[#2B353C] px-3 py-1 text-xs text-gray-300">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {project.featured ? (
                      <span className="text-green-400">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-gray-300">
                      <Eye className="h-4 w-4 text-gray-400" />
                      {project.views}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="rounded-lg bg-[#2B353C] p-2 text-gray-400 transition-colors hover:bg-[#3B454C] hover:text-white"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={deleting === project.id}
                        className="rounded-lg bg-red-500/10 p-2 text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                      >
                        {deleting === project.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Plus className="h-12 w-12 mb-4" />
            <p className="mb-4">No projects yet</p>
            <Link
              href="/admin/projects/new"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Add Your First Project
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
