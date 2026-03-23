'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getAllPackages, deletePackage } from '@/lib/supabase/queries'
import { Edit, Trash2, Plus } from 'lucide-react'
import type { Package } from '@/lib/types/database'

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => { load() }, [])

  async function load() {
    try { setPackages(await getAllPackages()) }
    catch {}
    finally { setIsLoading(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this package?')) return
    try {
      await deletePackage(id)
      setPackages(prev => prev.filter(p => p.id !== id))
    } catch (err: any) { alert(err.message) }
  }

  const grouped = packages.reduce((acc, pkg) => {
    if (!acc[pkg.category]) acc[pkg.category] = []
    acc[pkg.category].push(pkg)
    return acc
  }, {} as Record<string, Package[]>)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Service Packages</h1>
          <p className="text-muted-foreground">Manage promotion service packages</p>
        </div>
        <Button asChild>
          <Link href="/admin/packages/new"><Plus className="h-4 w-4 mr-2" />New Package</Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : packages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No packages yet</p>
            <Button asChild><Link href="/admin/packages/new">Create First Package</Link></Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([cat, pkgs]) => (
            <div key={cat}>
              <h2 className="text-lg font-semibold mb-3 capitalize text-muted-foreground">{cat}</h2>
              <div className="space-y-3">
                {pkgs.map(pkg => (
                  <Card key={pkg.id} className="hover:border-primary/50 transition-colors">
                    <CardContent className="py-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="font-semibold mb-1">{pkg.name}</div>
                          <div className="text-sm text-muted-foreground mb-2">{pkg.description}</div>
                          <div className="flex flex-wrap gap-3 text-sm">
                            <span><span className="text-muted-foreground">Price: </span><span className="font-medium">${pkg.price.toFixed(2)}</span></span>
                            <span><span className="text-muted-foreground">Turnaround: </span><span className="font-medium">{pkg.turnaround_days}d</span></span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${pkg.is_active ? 'bg-green-500/20 text-green-700' : 'bg-gray-500/20 text-gray-600'}`}>
                              {pkg.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/admin/packages/${pkg.id}/edit`}><Edit className="h-4 w-4" /></Link>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(pkg.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
