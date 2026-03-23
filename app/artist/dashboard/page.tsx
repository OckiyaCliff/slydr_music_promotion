'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Plus, TrendingUp } from 'lucide-react'
import { getCampaignsByArtist } from '@/lib/supabase/queries'
import { getCurrentUser } from '@/lib/supabase/auth'
import type { Campaign } from '@/lib/types/database'

export default function ArtistDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const user = await getCurrentUser()
        if (user) {
          const data = await getCampaignsByArtist(user.id)
          setCampaigns(data)
        }
      } catch {
        // silent
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const active = campaigns.filter(c => c.status !== 'completed').length
  const completed = campaigns.filter(c => c.status === 'completed').length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Welcome back</h1>
          <p className="text-muted-foreground">Manage your music promotion campaigns</p>
        </div>
        <Button asChild>
          <Link href="/artist/services">
            <Plus className="h-4 w-4 mr-2" />New Campaign
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Campaigns</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{active}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{completed}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Campaigns</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{campaigns.length}</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : campaigns.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
              <p className="text-muted-foreground mb-6">Start by choosing a promotion service</p>
              <Button asChild><Link href="/artist/services">Browse Services</Link></Button>
            </div>
          ) : (
            <div className="space-y-3">
              {campaigns.map(c => (
                <Link key={c.id} href={`/artist/campaigns`}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-colors">
                  <div>
                    <div className="font-semibold mb-1">{c.title}</div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-muted-foreground">Progress: {c.progress_percentage}%</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        c.status === 'completed' ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
                        c.status === 'in_progress' ? 'bg-blue-500/20 text-blue-700 dark:text-blue-400' :
                        'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                      }`}>{c.status}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
