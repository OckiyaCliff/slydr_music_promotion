'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getUserProfile, updateUserProfile } from '@/lib/supabase/queries'
import { getCurrentUser, signOut } from '@/lib/supabase/auth'
import { useRouter } from 'next/navigation'
import type { User } from '@/lib/types/database'

export default function ArtistSettingsPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Partial<User>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const user = await getCurrentUser()
        if (user) setProfile(await getUserProfile(user.id))
      } catch {}
      finally { setIsLoading(false) }
    }
    load()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage('')
    try {
      const user = await getCurrentUser()
      if (user) {
        await updateUserProfile(user.id, {
          full_name: profile.full_name,
          bio: profile.bio,
          website: profile.website,
        })
        setMessage('Profile updated successfully.')
      }
    } catch (err: any) {
      setMessage(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (isLoading) return <div className="p-8 text-muted-foreground">Loading...</div>

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your artist profile</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your public artist profile</CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <div className="mb-4 p-3 bg-primary/10 text-primary text-sm rounded-md">{message}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                value={profile.full_name ?? ''}
                onChange={e => setProfile(p => ({ ...p, full_name: e.target.value }))}
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input value={profile.email ?? ''} disabled className="opacity-60" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <Input
                value={profile.bio ?? ''}
                onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                placeholder="Tell us about yourself"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Website</label>
              <Input
                value={profile.website ?? ''}
                onChange={e => setProfile(p => ({ ...p, website: e.target.value }))}
                placeholder="https://yourwebsite.com"
              />
            </div>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
        </CardContent>
      </Card>
    </div>
  )
}
