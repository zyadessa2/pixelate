'use client'

import { SessionProvider } from 'next-auth/react'
import dynamic from 'next/dynamic'

const Sidebar = dynamic(() => import('@/src/components/admin/Sidebar'), {
  ssr: false
})

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-[#0F1419]">
        <Sidebar />
        <main className="ml-64 min-h-screen p-8">
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}
