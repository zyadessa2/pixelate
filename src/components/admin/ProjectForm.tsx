'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Plus, X, Loader2 } from 'lucide-react'
import { getImageUrl } from '@/src/lib/image-utils'

interface Stat {
  value: string
  label: string
}

interface ProjectFormData {
  mainTitle: string
  client: string
  location: string
  date: string
  category: string
  featured: boolean
  overview: string
  stats: Stat[]
  services: string[]
  images: string[]
  clientLogo: string
}

interface ProjectFormProps {
  initialData?: ProjectFormData
  projectId?: string
}

const defaultFormData: ProjectFormData = {
  mainTitle: '',
  client: '',
  location: '',
  date: '',
  category: '',
  featured: false,
  overview: '',
  stats: [{ value: '', label: '' }],
  services: [''],
  images: [''],
  clientLogo: ''
}

const ProjectForm = ({ initialData, projectId }: ProjectFormProps) => {
  const router = useRouter()
  const [formData, setFormData] = useState<ProjectFormData>(
    initialData || defaultFormData
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleStatChange = (index: number, field: 'value' | 'label', value: string) => {
    const newStats = [...formData.stats]
    newStats[index][field] = value
    setFormData((prev) => ({ ...prev, stats: newStats }))
  }

  const addStat = () => {
    setFormData((prev) => ({
      ...prev,
      stats: [...prev.stats, { value: '', label: '' }]
    }))
  }

  const removeStat = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }))
  }

  const handleServiceChange = (index: number, value: string) => {
    const newServices = [...formData.services]
    newServices[index] = value
    setFormData((prev) => ({ ...prev, services: newServices }))
  }

  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, '']
    }))
  }

  const removeService = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }))
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData((prev) => ({ ...prev, images: newImages }))
  }

  const addImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, '']
    }))
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Filter out empty values
      const cleanedData = {
        ...formData,
        stats: formData.stats.filter((s) => s.value && s.label),
        services: formData.services.filter((s) => s),
        images: formData.images.filter((i) => i)
      }

      const url = projectId ? `/api/projects/${projectId}` : '/api/projects'
      const method = projectId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData)
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to save project')
      }

      router.push('/admin/projects')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-red-400">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project Title
          </label>
          <input
            type="text"
            name="mainTitle"
            value={formData.mainTitle}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-[#2B353C] border border-[#3B454C] px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            placeholder="International Conference Reportage"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Client
          </label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-[#2B353C] border border-[#3B454C] px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            placeholder="Client Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-[#2B353C] border border-[#3B454C] px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            placeholder="Dubai, UAE"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Date
          </label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-[#2B353C] border border-[#3B454C] px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            placeholder="April 2025"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-[#2B353C] border border-[#3B454C] px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            placeholder="Conferences, Exhibitions, Events, etc."
          />
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="featured"
          id="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="h-5 w-5 rounded border-[#3B454C] bg-[#2B353C] text-blue-500 focus:ring-blue-500"
        />
        <label htmlFor="featured" className="text-sm font-medium text-gray-300">
          Featured Project
        </label>
      </div>

      {/* Overview */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Overview
        </label>
        <textarea
          name="overview"
          value={formData.overview}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-lg bg-[#2B353C] border border-[#3B454C] px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none resize-none"
          placeholder="Project description..."
        />
      </div>

      {/* Client Logo */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Client Logo URL
        </label>
        <input
          type="text"
          name="clientLogo"
          value={formData.clientLogo}
          onChange={handleChange}
          required
          className="w-full rounded-lg bg-[#2B353C] border border-[#3B454C] px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          placeholder="/projects/client-logo.png or Google Drive link"
        />
        <p className="mt-1 text-xs text-gray-500">
          You can use local path (/path/to/image.jpg) or Google Drive link
        </p>
        {formData.clientLogo && (
          <div className="mt-3 relative h-20 w-40 bg-[#2B353C] rounded-lg overflow-hidden border border-[#3B454C]">
            <Image
              src={getImageUrl(formData.clientLogo)}
              alt="Client Logo"
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
        )}
      </div>

      {/* Stats */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Statistics
          </label>
          <button
            type="button"
            onClick={addStat}
            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
          >
            <Plus className="h-4 w-4" /> Add Stat
          </button>
        </div>
        <div className="space-y-3">
          {formData.stats.map((stat, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                value={stat.value}
                onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                className="flex-1 rounded-lg bg-[#2B353C] border border-[#3B454C] px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                placeholder="2,000"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                className="flex-1 rounded-lg bg-[#2B353C] border border-[#3B454C] px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                placeholder="Attendees"
              />
              {formData.stats.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStat(index)}
                  className="rounded-lg bg-red-500/10 p-3 text-red-400 hover:bg-red-500/20"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Services
          </label>
          <button
            type="button"
            onClick={addService}
            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
          >
            <Plus className="h-4 w-4" /> Add Service
          </button>
        </div>
        <div className="space-y-3">
          {formData.services.map((service, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="text"
                value={service}
                onChange={(e) => handleServiceChange(index, e.target.value)}
                className="flex-1 rounded-lg bg-[#2B353C] border border-[#3B454C] px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                placeholder="Conference AV"
              />
              {formData.services.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="rounded-lg bg-red-500/10 p-3 text-red-400 hover:bg-red-500/20"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Images */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Project Images
            </label>
            <p className="mt-1 text-xs text-gray-500">
              Add multiple images for the project gallery
            </p>
          </div>
          <button
            type="button"
            onClick={addImage}
            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
          >
            <Plus className="h-4 w-4" /> Add Image
          </button>
        </div>
        <div className="space-y-3">
          {formData.images.map((image, index) => (
            <div key={index} className="space-y-2">
              <div className="flex gap-3 items-start">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-1 rounded-lg bg-[#2B353C] border border-[#3B454C] px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  placeholder="/projects/1.jpg or Google Drive link"
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="rounded-lg bg-red-500/10 p-3 text-red-400 hover:bg-red-500/20 flex-shrink-0"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              {image && (
                <div className="relative h-32 w-48 bg-[#2B353C] rounded-lg overflow-hidden border border-[#3B454C]">
                  <Image
                    src={getImageUrl(image)}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      if (target.parentElement) {
                        target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full w-full text-red-400 text-xs">Failed to load image</div>'
                      }
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {projectId ? 'Update Project' : 'Create Project'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg bg-[#2B353C] px-6 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-[#3B454C]"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ProjectForm
