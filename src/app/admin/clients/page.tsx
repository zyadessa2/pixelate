'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Loader2, Image as ImageIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getImageUrl } from '@/src/lib/image-utils'

interface Client {
  id: string
  name: string
  logo: string
  subtitle: string
  description: string
  order: number
  createdAt: string
  updatedAt: string
}

export default function ClientsManagement() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    subtitle: '',
    description: '',
    order: 0
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    fetchClients()
  }, [])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/clients')
      const data = await response.json()
      if (data.success) {
        setClients(data.data)
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = editingClient 
        ? `/api/clients/${editingClient.id}` 
        : '/api/clients'
      
      const method = editingClient ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        await fetchClients()
        setShowForm(false)
        setEditingClient(null)
        setFormData({ name: '', logo: '', subtitle: '', description: '', order: 0 })
      } else {
        alert(data.error || 'Failed to save client')
      }
    } catch (error) {
      console.error('Error saving client:', error)
      alert('Failed to save client')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setFormData({
      name: client.name,
      logo: client.logo,
      subtitle: client.subtitle,
      description: client.description,
      order: client.order
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return

    try {
      const response = await fetch(`/api/clients/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        await fetchClients()
      } else {
        alert(data.error || 'Failed to delete client')
      }
    } catch (error) {
      console.error('Error deleting client:', error)
      alert('Failed to delete client')
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingClient(null)
    setFormData({ name: '', logo: '', subtitle: '', description: '', order: 0 })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Clients Management</h1>
          <p className="mt-2 text-gray-400">Manage your clients and partners</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Add New Client
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8 rounded-lg bg-[#1a1f25] p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            {editingClient ? 'Edit Client' : 'Add New Client'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg bg-[#0F1419] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Logo URL *
                </label>
                <input
                  type="text"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="w-full rounded-lg bg-[#0F1419] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/clients/logo.png or Google Drive link"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  You can use local path or Google Drive link
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Subtitle *
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full rounded-lg bg-[#0F1419] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  className="w-full rounded-lg bg-[#0F1419] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full rounded-lg bg-[#0F1419] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Logo Preview */}
            {formData.logo && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Logo Preview
                </label>
                <div className="relative h-32 w-32 overflow-hidden rounded-lg bg-[#0F1419] border border-[#2B353C] flex items-center justify-center">
                  <Image
                    src={getImageUrl(formData.logo)}
                    alt="Logo preview"
                    fill
                    className="object-contain p-2"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      if (target.parentElement) {
                        target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full w-full text-red-400 text-xs">Failed to load</div>'
                      }
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>Save Client</>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg bg-gray-600 px-6 py-2 text-white transition-colors hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Clients List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <div
            key={client.id}
            className="group relative overflow-hidden rounded-lg bg-[#1a1f25] p-6 transition-all hover:bg-[#1f2530]"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-[#0F1419] border border-[#2B353C]">
                <Image
                  src={getImageUrl(client.logo)}
                  alt={client.name}
                  fill
                  className="object-contain p-2"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/pixelate-nav-2.svg' // Fallback to default logo
                  }}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(client)}
                  className="rounded-lg bg-blue-600/20 p-2 text-blue-400 transition-colors hover:bg-blue-600/30"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="rounded-lg bg-red-600/20 p-2 text-red-400 transition-colors hover:bg-red-600/30"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <h3 className="mb-2 text-xl font-semibold text-white">{client.name}</h3>
            <p className="mb-2 text-sm text-gray-400">{client.subtitle}</p>
            <p className="text-sm text-gray-500 line-clamp-3">{client.description}</p>
            
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <span>Order: {client.order}</span>
              <span>{new Date(client.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {clients.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <ImageIcon className="mb-4 h-16 w-16 opacity-50" />
          <p className="text-lg">No clients yet</p>
          <p className="text-sm">Add your first client to get started</p>
        </div>
      )}
    </div>
  )
}
