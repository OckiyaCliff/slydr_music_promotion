'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signIn } from '@/lib/supabase/auth'

import dynamic from 'next/dynamic'

const Hyperspeed = dynamic(() => import('@/components/ui/Hyperspeed'), { ssr: false })

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const result = await signIn(formData.email, formData.password)
      if (result?.user) {
        router.push('/artist/dashboard')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed />
      </div>
      <div className="absolute inset-0 z-[1] bg-background/60 backdrop-blur-[2px]" />

      <Card className="w-full max-w-md relative z-10 border-black/10 dark:border-white/10 bg-white/5 backdrop-blur-xl shadow-none overflow-hidden">
        <CardHeader className="space-y-1 pb-6 pt-10 text-center">
          <Link href="/" className="inline-block mb-4">
            <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">slydr</span>
          </Link>
          <CardTitle className="text-2xl font-bold text-foreground">Welcome back</CardTitle>
          <CardDescription className="text-foreground/50">Enter your credentials to access your artist portal</CardDescription>
        </CardHeader>
        <CardContent className="pb-10">
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/70 uppercase tracking-wider ml-1">Email Address</label>
              <Input 
                type="email" 
                name="email" 
                placeholder="artist@slydr.com" 
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus:ring-purple-500/50"
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/70 uppercase tracking-wider ml-1">Password</label>
              <Input 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus:ring-purple-500/50"
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold text-base transition-all duration-300 mt-4 border-0 shadow-none" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 text-center">
            <p className="text-sm text-foreground/40">
              New to the platform?{' '}
              <Link href="/auth/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">Create account</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
