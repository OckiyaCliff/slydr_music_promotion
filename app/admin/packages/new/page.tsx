'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createPackage } from '@/lib/supabase/queries'
import type { Package } from '@/lib/types/database'

const CATEGORIES = [
  { value: 'music-promotion', label: 'Music Promotion' },
  { value: 'playlist-pitching', label: 'Playlist Pitching' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'design', label: 'Design' },
  { value: 'video', label: 'Video Production' },
]

export default function NewPackagePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [features, setFeatures] = useState<string[]>([''])
  const [form, setForm] = useState({
    name: '', description: '', price: '0',
    category: 'music-promotion', turnaround_days: '14', is_active: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const pkg: Omit<Package, 'id' | 'created_at' | 'updated_at'> = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category,
        features: features.filter(f => f.trim() !== ''),
        turnaround_days: parseInt(form.turnaround_days),
        is_active: form.is_active,
      }
      await createPackage(pkg)
      router.push('/admin/packages')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Package</CardTitle>
          <CardDescription>Add a new service package to the platform</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-md">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Package Name</label>
                <Input name="name" placeholder="e.g., Basic Promotion" value={form.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm">
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input name="description" placeholder="Brief description" value={form.description} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price ($)</label>
                <Input type="number" step="0.01" min="0" name="price" value={form.price} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Turnaround (days)</label>
                <Input type="number" min="1" name="turnaround_days" value={form.turnaround_days} onChange={handleChange} required />
              </div>
              <div className="space-y-2 flex items-end pb-0.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} className="rounded" />
                  <span className="text-sm font-medium">Active</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Features</label>
              <div className="space-y-2">
                {features.map((feat, i) => (
                  <div key={i} className="flex gap-2">
                    <Input placeholder={`Feature ${i + 1}`} value={feat}
                      onChange={e => { const f = [...features]; f[i] = e.target.value; setFeatures(f) }} />
                    {features.length > 1 && (
                      <Button type="button" variant="outline" size="sm" onClick={() => setFeatures(features.filter((_, idx) => idx !== i))}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => setFeatures([...features, ''])}>
                Add Feature
              </Button>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isLoading}>{isLoading ? 'Creating...' : 'Create Package'}</Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
