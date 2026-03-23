import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Music, BarChart3, Users, FileCheck } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="text-xl font-bold text-primary">slydr</div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#services" className="text-sm hover:text-primary transition-colors">Services</Link>
            <Link href="#how-it-works" className="text-sm hover:text-primary transition-colors">How It Works</Link>
            <Link href="#about" className="text-sm hover:text-primary transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-balance leading-tight">
              Launch your music,{' '}
              <span className="text-primary">scale your reach</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Slydr is the all-in-one platform for independent musicians to manage promotion campaigns, connect with specialists, and grow their audience.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/auth/signup">
                Start Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="#how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Services */}
      <section id="services" className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Services we offer</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need to promote your music effectively</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Music, title: 'Music Promotion', desc: 'Strategic campaigns to get your tracks heard by the right audience' },
              { icon: Users, title: 'Playlist Pitching', desc: 'Connect with curators and get your music on influential playlists' },
              { icon: FileCheck, title: 'Cover Art Design', desc: 'Professional artwork that captures your music\'s essence' },
              { icon: BarChart3, title: 'Analytics & Tracking', desc: 'Monitor campaign performance in real-time with detailed insights' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <Icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">How it works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Four simple steps to launch your music promotion</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: '1', title: 'Create Account', desc: 'Sign up and build your artist profile' },
              { number: '2', title: 'Choose Service', desc: 'Pick the promotion services you need' },
              { number: '3', title: 'Submit Assets', desc: 'Upload your music and promotional materials' },
              { number: '4', title: 'Launch Campaign', desc: 'Our team executes and you track progress' },
            ].map((step) => (
              <div key={step.number} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold">
                  {step.number}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-t border-border">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to grow?</h2>
          <p className="text-lg text-muted-foreground">Join independent artists who are scaling their music careers with Slydr</p>
          <Button size="lg" asChild>
            <Link href="/auth/signup">Get Started Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="text-lg font-bold text-primary">slydr</div>
              <p className="text-sm text-muted-foreground">Music promotion platform for independent artists</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#services" className="hover:text-foreground transition-colors">Services</Link></li>
                <li><Link href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>{'© 2026 Slydr. All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
