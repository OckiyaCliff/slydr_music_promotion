'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signUp } from '@/lib/supabase/auth'

import dynamic from 'next/dynamic'

const Hyperspeed = dynamic(() => import('@/components/ui/Hyperspeed'), { ssr: false })

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setIsLoading(true)
    try {
      await signUp(formData.email, formData.password, formData.fullName)
      router.push('/artist/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden py-12">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <Hyperspeed />
      </div>
      <div className="absolute inset-0 z-[1] bg-background/60 backdrop-blur-[2px]" />

      <Card className="w-full max-w-lg relative z-10 border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl shadow-none overflow-hidden">
        <CardHeader className="space-y-1 pb-6 pt-10 text-center">
          <Link href="/" className="inline-block mb-4">
            <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">slydr</span>
          </Link>
          <CardTitle className="text-2xl font-bold text-foreground">Join the platform</CardTitle>
          <CardDescription className="text-foreground/50">Start your journey as an independent artist today</CardDescription>
        </CardHeader>
        <CardContent className="pb-10">
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground/60 uppercase tracking-wider ml-1">Full Name</label>
                <Input 
                  name="fullName" 
                  placeholder="John Doe" 
                  className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground placeholder:text-foreground/30 h-12 rounded-xl focus:ring-purple-500/50"
                  value={formData.fullName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground/60 uppercase tracking-wider ml-1">Email</label>
                <Input 
                  type="email" 
                  name="email" 
                  placeholder="artist@slydr.com" 
                  className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground placeholder:text-foreground/30 h-12 rounded-xl focus:ring-purple-500/50"
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground/60 uppercase tracking-wider ml-1">Password</label>
              <Input 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground placeholder:text-foreground/30 h-12 rounded-xl focus:ring-purple-500/50"
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground/60 uppercase tracking-wider ml-1">Confirm Password</label>
              <Input 
                type="password" 
                name="confirmPassword" 
                placeholder="••••••••" 
                className="bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-foreground placeholder:text-foreground/30 h-12 rounded-xl focus:ring-purple-500/50"
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required 
              />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold text-base transition-all duration-300 mt-4 border-0 shadow-none" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
          <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 text-center">
            <p className="text-sm text-foreground/40">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">Sign in</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
