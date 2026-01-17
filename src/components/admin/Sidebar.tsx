'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { LayoutDashboard, FolderOpen, BarChart3, LogOut, Home, Users } from 'lucide-react'

const Sidebar = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
    { href: '/admin/clients', label: 'Clients', icon: Users },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 }
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#1a1f25] border-r border-[#2B353C]">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-[#2B353C]">
        <Link href="/admin" className="text-xl font-bold text-white">
          Pixelate Admin
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col h-[calc(100vh-4rem)] justify-between p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-[#2B353C] text-white'
                    : 'text-gray-400 hover:bg-[#2B353C]/50 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-400 transition-colors hover:bg-[#2B353C]/50 hover:text-white"
          >
            <Home className="h-5 w-5" />
            View Site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
