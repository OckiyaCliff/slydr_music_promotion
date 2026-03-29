'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Plus, TrendingUp, Music, Zap, BarChart3, Clock } from 'lucide-react'
import { getCampaignsByArtist } from '@/lib/supabase/queries'
import { getCurrentUser } from '@/lib/supabase/auth'
import type { Campaign } from '@/lib/types/database'
import { gsap } from 'gsap'

export default function ArtistDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState('')
  
  const containerRef = useRef(null)
  const statsRef = useRef(null)
  const campaignsRef = useRef(null)

  useEffect(() => {
    async function load() {
      try {
        const user = await getCurrentUser()
        if (user) {
          setUserName(user.user_metadata?.full_name?.split(' ')[0] || 'Artist')
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

  useEffect(() => {
    if (!isLoading && containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.reveal', {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        })
        
        gsap.from('.stat-card', {
          scale: 0.95,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          delay: 0.2,
          ease: 'elastic.out(1, 0.8)'
        })
      }, containerRef)
      return () => ctx.revert()
    }
  }, [isLoading])

  const active = campaigns.filter(c => c.status !== 'completed').length
  const pending = campaigns.filter(c => c.status === 'pending').length

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16">
      {/* Hero Section */}
      <div className="relative mb-12 reveal">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              Welcome back, <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{userName}</span>
            </h1>
            <p className="text-white/50 text-lg max-w-xl font-medium">
              Your music is moving. You have <span className="text-white font-bold">{active} active</span> campaigns running across the platform.
            </p>
          </div>
          <Button asChild className="h-14 px-8 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-lg shadow-xl shadow-purple-600/20 border-0 transition-all duration-300 hover:scale-105 active:scale-95">
            <Link href="/artist/services">
              <Plus className="h-5 w-5 mr-2 stroke-[3px]" /> Launch Campaign
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <StatCard 
          label="Active Promotion" 
          value={active.toString()} 
          icon={Zap} 
          color="purple"
          trend="+12%"
        />
        <StatCard 
          label="Pending Tasks" 
          value={pending.toString()} 
          icon={Clock} 
          color="cyan"
          trend="In sync"
        />
        <StatCard 
          label="Total Campaigns" 
          value={campaigns.length.toString()} 
          icon={Music} 
          color="white"
        />
        <StatCard 
          label="Est. Reach" 
          value="42.5k" 
          icon={BarChart3} 
          color="purple-cyan"
          trend="+5.2k"
        />
      </div>

      {/* Campaign List Section */}
      <div className="reveal">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Recent Campaigns</h2>
          <Link href="/artist/campaigns" className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div ref={campaignsRef} className="space-y-4">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
              ))}
            </div>
          ) : campaigns.length === 0 ? (
            <Card className="bg-white/5 border-white/10 rounded-[2rem] overflow-hidden border-dashed border-2">
              <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <TrendingUp className="h-10 w-10 text-white/20" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No campaigns yet</h3>
                <p className="text-white/40 mb-8 max-w-xs">Start your first promotion and watch your music grow on Slydr.</p>
                <Button asChild size="lg" className="rounded-2xl px-10 h-14 bg-white text-black hover:bg-white/90 font-bold transition-transform hover:scale-105">
                  <Link href="/artist/services">Choose a Service</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {campaigns.map(c => (
                <Link key={c.id} href={`/artist/campaigns/${c.id}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                      <Music className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-lg mb-1 group-hover:text-cyan-400 transition-colors">{c.title}</div>
                      <div className="flex items-center gap-4 text-sm font-medium">
                        <span className="text-white/40">Campaign progress</span>
                        <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" 
                            style={{ width: `${c.progress_percentage}%` }}
                          />
                        </div>
                        <span className="text-cyan-400">{c.progress_percentage}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between sm:justify-end gap-6 mt-6 sm:mt-0">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      c.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      c.status === 'in_progress' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>{c.status}</span>
                    <div className="p-3 rounded-full bg-white/5 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon: Icon, color, trend }: any) {
  const colorClasses = {
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-400',
    cyan: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400',
    white: 'from-white/10 to-white/5 text-white',
    'purple-cyan': 'from-purple-500/20 to-cyan-500/20 text-cyan-400'
  }

  return (
    <div className={`stat-card p-6 rounded-[2rem] border border-white/5 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} hover:border-white/20 transition-all duration-300 group`}>
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform">
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-black/20 border border-white/5">
            {trend}
          </span>
        )}
      </div>
      <div className="text-4xl font-black tracking-tighter mb-1 text-white">{value}</div>
      <div className="text-xs font-bold uppercase tracking-widest text-white/30">{label}</div>
    </div>
  )
}
