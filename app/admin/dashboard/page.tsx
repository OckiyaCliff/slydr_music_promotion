'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllPackages } from '@/lib/supabase/queries'
import type { Package } from '@/lib/types/database'

export default function AdminDashboard() {
  const [packages, setPackages] = useState<Package[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getAllPackages()
      .then(setPackages)
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage platform operations and campaigns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Packages</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{isLoading ? '—' : packages.length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Packages</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{isLoading ? '—' : packages.filter(p => p.is_active).length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0</div>
            <p className="text-xs text-muted-foreground mt-1">Payment integration coming soon</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">0</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild><Link href="/admin/packages/new">Create Package</Link></Button>
          <Button variant="outline" asChild><Link href="/admin/packages">Manage Packages</Link></Button>
          <Button variant="outline" asChild><Link href="/admin/campaigns">View Campaigns</Link></Button>
          <Button variant="outline" asChild><Link href="/admin/users">Manage Users</Link></Button>
        </CardContent>
      </Card>
    </div>
  )
}
