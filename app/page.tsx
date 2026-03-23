'use client'

import { useMemo, useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight, Music, BarChart3, Users, FileCheck, Zap, Shield, Headphones, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BorderGlow from '@/components/ui/BorderGlow'

const Hyperspeed = dynamic(() => import('@/components/ui/Hyperspeed'), { ssr: false })

function useScrollFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return { ref, isVisible }
}

function FadeInSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollFadeIn()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

const hyperspeedConfig = {
  distortion: 'turbulentDistortion' as const,
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5] as [number, number],
  lightStickHeight: [1.3, 1.7] as [number, number],
  movingAwaySpeed: [60, 80] as [number, number],
  movingCloserSpeed: [-120, -160] as [number, number],
  carLightsLength: [12, 80] as [number, number],
  carLightsRadius: [0.05, 0.14] as [number, number],
  carWidthPercentage: [0.3, 0.5] as [number, number],
  carShiftX: [-0.8, 0.8] as [number, number],
  carFloorSeparation: [0, 5] as [number, number],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0x131318,
    brokenLines: 0x131318,
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
    sticks: 0x03b3c3,
  },
}

const services = [
  { icon: Music, title: 'Music Promotion', desc: 'Strategic campaigns to get your tracks heard by the right audience across top platforms.' },
  { icon: Users, title: 'Playlist Pitching', desc: 'Connect with influential curators and land your music on high-traffic playlists.' },
  { icon: FileCheck, title: 'Cover Art Design', desc: 'Eye-catching, professional artwork that captures your music\'s unique essence.' },
  { icon: BarChart3, title: 'Analytics & Tracking', desc: 'Monitor campaign performance in real-time with beautiful, detailed insights.' },
]

const steps = [
  { number: '01', title: 'Create Account', desc: 'Sign up and build your artist profile in minutes.', icon: Zap },
  { number: '02', title: 'Choose Service', desc: 'Pick the promotion package that fits your goals.', icon: Shield },
  { number: '03', title: 'Submit Assets', desc: 'Upload your music, artwork, and promo materials.', icon: Headphones },
  { number: '04', title: 'Launch & Track', desc: 'We execute. You track progress in real-time.', icon: Star },
]

const testimonials = [
  { name: 'Alex Rivera', role: 'Independent Artist', quote: 'Slydr completely transformed my release strategy. My streams tripled in the first month.', avatar: 'AR' },
  { name: 'Maya Chen', role: 'Singer-Songwriter', quote: 'The playlist pitching alone was worth it. Got placed on 12 editorial playlists.', avatar: 'MC' },
  { name: 'Jordan Blake', role: 'Producer & DJ', quote: 'Finally a platform that understands independent artists. The analytics are next level.', avatar: 'JB' },
]

const stats = [
  { value: '10K+', label: 'Artists Served' },
  { value: '50M+', label: 'Streams Generated' },
  { value: '2.5K+', label: 'Playlist Placements' },
  { value: '98%', label: 'Satisfaction Rate' },
]

export default function LandingPage() {
  const effectOptions = useMemo(() => hyperspeedConfig, [])
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="min-h-screen bg-[#030014] text-white overflow-x-hidden">
      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hyperspeed Background */}
        <div className="absolute inset-0 z-0">
          {mounted && <Hyperspeed effectOptions={effectOptions} />}
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#030014]/40 via-[#030014]/60 to-[#030014]" />
        {/* Radial glow accents */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] z-[1] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] z-[1] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-[2] max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-purple-300 mb-6">
              <span className="animate-pulse w-2 h-2 bg-purple-400 rounded-full" />
              Now in Public Beta
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
              Launch your music,
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                scale your reach
              </span>
            </h1>
          </FadeInSection>

          <FadeInSection delay={200}>
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              The all-in-one platform for independent musicians to manage promotion campaigns,
              connect with specialists, and grow their audience — faster than ever.
            </p>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <BorderGlow
                borderRadius={14}
                backgroundColor="transparent"
                glowColor="280 80 60"
                colors={['#a855f7', '#ec4899', '#06b6d4']}
                glowIntensity={0.6}
                glowRadius={20}
                edgeSensitivity={20}
              >
                <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8 py-6 text-base font-semibold rounded-xl" asChild>
                  <Link href="/auth/signup">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </BorderGlow>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base rounded-xl backdrop-blur-sm" asChild>
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
          </FadeInSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2]">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.02] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <FadeInSection key={stat.label} delay={i * 100}>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-white/40 mt-1 uppercase tracking-wider">{stat.label}</div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="relative py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center space-y-4 mb-16">
              <span className="text-sm uppercase tracking-widest text-purple-400 font-medium">What We Offer</span>
              <h2 className="text-4xl sm:text-5xl font-bold">
                Services built for{' '}
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">artists</span>
              </h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">Everything you need to promote your music effectively and professionally.</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map(({ icon: Icon, title, desc }, i) => (
              <FadeInSection key={title} delay={i * 100}>
                <BorderGlow
                  borderRadius={20}
                  backgroundColor="#0a0a1a"
                  glowColor="280 60 60"
                  colors={['#a855f7', '#ec4899', '#06b6d4']}
                  glowIntensity={0.5}
                  glowRadius={30}
                  edgeSensitivity={25}
                  className="h-full"
                >
                  <div className="p-8 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10">
                      <Icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                    <p className="text-white/50 leading-relaxed">{desc}</p>
                  </div>
                </BorderGlow>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="relative py-24 sm:py-32 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <FadeInSection>
            <div className="text-center space-y-4 mb-16">
              <span className="text-sm uppercase tracking-widest text-cyan-400 font-medium">Process</span>
              <h2 className="text-4xl sm:text-5xl font-bold">
                Four steps to{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">launch</span>
              </h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">From signup to streams — it&apos;s that simple.</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <FadeInSection key={step.number} delay={i * 120}>
                <div className="relative group">
                  <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-purple-500/30 transition-all duration-500 hover:bg-white/[0.04] h-full">
                    <div className="text-4xl font-black text-white/[0.06] mb-4 group-hover:text-purple-500/20 transition-colors duration-500">{step.number}</div>
                    <step.icon className="h-8 w-8 text-cyan-400 mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/10 to-transparent" />
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center space-y-4 mb-16">
              <span className="text-sm uppercase tracking-widest text-pink-400 font-medium">Testimonials</span>
              <h2 className="text-4xl sm:text-5xl font-bold">
                Loved by{' '}
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">artists</span>
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeInSection key={t.name} delay={i * 120}>
                <BorderGlow
                  borderRadius={20}
                  backgroundColor="#0a0a1a"
                  glowColor="320 60 60"
                  colors={['#ec4899', '#a855f7', '#06b6d4']}
                  glowIntensity={0.4}
                  glowRadius={25}
                  edgeSensitivity={30}
                  className="h-full"
                >
                  <div className="p-8 flex flex-col h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white/70 leading-relaxed flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{t.name}</div>
                        <div className="text-xs text-white/40">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </BorderGlow>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <FadeInSection>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Ready to{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">grow?</span>
            </h2>
            <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
              Join thousands of independent artists who are scaling their music careers with Slydr.
            </p>
            <BorderGlow
              borderRadius={14}
              backgroundColor="transparent"
              glowColor="280 80 60"
              colors={['#a855f7', '#ec4899', '#06b6d4']}
              glowIntensity={0.8}
              glowRadius={30}
              edgeSensitivity={15}
              className="inline-block"
            >
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-6 text-lg font-semibold rounded-xl border-0" asChild>
                <Link href="/auth/signup">
                  Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </BorderGlow>
          </FadeInSection>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 px-4 sm:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">slydr</div>
              <p className="text-sm text-white/30 leading-relaxed">Music promotion platform for independent artists who refuse to stay underground.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-white/60 uppercase tracking-wider">Platform</h4>
              <ul className="space-y-3 text-sm text-white/30">
                <li><Link href="#services" className="hover:text-purple-400 transition-colors duration-300">Services</Link></li>
                <li><Link href="#how-it-works" className="hover:text-purple-400 transition-colors duration-300">How It Works</Link></li>
                <li><Link href="/auth/signup" className="hover:text-purple-400 transition-colors duration-300">Get Started</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-white/60 uppercase tracking-wider">Company</h4>
              <ul className="space-y-3 text-sm text-white/30">
                <li><Link href="#" className="hover:text-purple-400 transition-colors duration-300">About</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition-colors duration-300">Blog</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition-colors duration-300">Contact</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-white/60 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3 text-sm text-white/30">
                <li><Link href="#" className="hover:text-purple-400 transition-colors duration-300">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-purple-400 transition-colors duration-300">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/20">© 2026 Slydr. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-white/20 hover:text-purple-400 transition-colors">Twitter</Link>
              <Link href="#" className="text-sm text-white/20 hover:text-purple-400 transition-colors">Instagram</Link>
              <Link href="#" className="text-sm text-white/20 hover:text-purple-400 transition-colors">Discord</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
