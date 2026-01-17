'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ProjectForm from '@/src/components/admin/ProjectForm'

export default function NewProjectPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  if (status === 'loading') {
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">New Project</h1>
        <p className="mt-2 text-gray-400">Create a new portfolio project</p>
      </div>

      <div className="rounded-xl bg-[#1a1f25] border border-[#2B353C] p-6 md:p-8">
        <ProjectForm />
      </div>
    </div>
  )
}
