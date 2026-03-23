'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { getCampaignsByArtist } from '@/lib/supabase/queries'
import { getCurrentUser } from '@/lib/supabase/auth'
import { ArrowRight, TrendingUp } from 'lucide-react'
import type { Campaign } from '@/lib/types/database'

export default function ArtistCampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const user = await getCurrentUser()
        if (user) setCampaigns(await getCampaignsByArtist(user.id))
      } catch {}
      finally { setIsLoading(false) }
    }
    load()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">My Campaigns</h1>
        <p className="text-muted-foreground">View and manage all your promotion campaigns</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>
            {campaigns.length === 0 ? 'No campaigns yet' : `${campaigns.length} campaign${campaigns.length !== 1 ? 's' : ''}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">Loading...</div>
          ) : campaigns.length === 0 ? (
            <div className="py-12 text-center">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground mb-4">No campaigns yet. Browse services to get started.</p>
              <Button asChild><Link href="/artist/services">Browse Services</Link></Button>
            </div>
          ) : (
            <div className="space-y-3">
              {campaigns.map(c => (
                <div key={c.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/40 transition-colors">
                  <div>
                    <div className="font-semibold mb-1">{c.title}</div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-muted-foreground">Progress: {c.progress_percentage}%</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        c.status === 'completed' ? 'bg-green-500/20 text-green-700' :
                        c.status === 'in_progress' ? 'bg-blue-500/20 text-blue-700' :
                        'bg-yellow-500/20 text-yellow-700'
                      }`}>{c.status}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
