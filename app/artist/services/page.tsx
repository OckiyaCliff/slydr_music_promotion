'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getPackages } from '@/lib/supabase/queries'
import { Check } from 'lucide-react'
import type { Package } from '@/lib/types/database'

export default function ServicesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getPackages().then(setPackages).catch(() => {}).finally(() => setIsLoading(false))
  }, [])

  const grouped = packages.reduce((acc, pkg) => {
    if (!acc[pkg.category]) acc[pkg.category] = []
    acc[pkg.category].push(pkg)
    return acc
  }, {} as Record<string, Package[]>)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Promotion Services</h1>
        <p className="text-muted-foreground">Choose the services that fit your music promotion goals</p>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading services...</div>
      ) : packages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No services available yet. Check back soon.</p>
          <Button variant="outline" asChild><Link href="/artist/dashboard">Back to Dashboard</Link></Button>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(grouped).map(([cat, pkgs]) => (
            <div key={cat}>
              <h2 className="text-2xl font-bold mb-6 capitalize">{cat.replace(/-/g, ' ')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pkgs.map(pkg => (
                  <Card key={pkg.id} className="flex flex-col hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      <CardDescription>{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="mb-6">
                        <div className="text-3xl font-bold mb-1">${pkg.price.toFixed(2)}</div>
                        <p className="text-sm text-muted-foreground">{pkg.turnaround_days} days turnaround</p>
                      </div>
                      {pkg.features?.length > 0 && (
                        <ul className="space-y-2 mb-6 flex-1">
                          {pkg.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <Button asChild className="w-full mt-auto">
                        <Link href={`/artist/campaigns/new?package=${pkg.id}`}>Choose Service</Link>
                      </Button>
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
