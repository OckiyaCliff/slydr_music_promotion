import Link from 'next/link'
import { LayoutDashboard, Music, Settings, LogOut, Headphones, Plus } from 'lucide-react'

export default function ArtistLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-72 border-r border-white/5 flex-col bg-black/40 backdrop-blur-2xl z-20">
        <div className="p-8">
          <Link href="/artist/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
              <Headphones className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">slydr</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <div className="px-4 mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Main Menu</p>
          </div>
          <NavLink href="/artist/dashboard" label="Dashboard" icon={LayoutDashboard} />
          <NavLink href="/artist/campaigns" label="Campaigns" icon={Music} />
          <NavLink href="/artist/services" label="Services" icon={Headphones} />
          <NavLink href="/artist/settings" label="Settings" icon={Settings} />
        </nav>

        <div className="p-6 mt-auto">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10 mb-6">
            <p className="text-xs font-medium text-white/70 mb-2">Need help with a campaign?</p>
            <Link href="/artist/services" className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors">
              Browse services <Plus className="h-3 w-3" />
            </Link>
          </div>
          
          <form action="/api/auth/signout" method="post">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/40 hover:text-white rounded-xl hover:bg-white/5 transition-all group">
              <LogOut className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              <span className="font-medium">Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 relative overflow-hidden">
        {/* Header - Desktop & Mobile */}
        <header className="flex items-center justify-between px-6 py-4 md:px-10 md:py-6 border-b border-white/5 bg-black/20 backdrop-blur-md z-1 relative">
          <div className="flex items-center gap-2 md:hidden">
            <Headphones className="h-5 w-5 text-purple-500" />
            <span className="text-xl font-black tracking-tighter">slydr</span>
          </div>
          <div className="hidden md:block">
             {/* Dynamic Breadcrumbs or Search could go here */}
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 p-[1px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                <span className="text-[10px] md:text-xs font-bold">AZ</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-32 md:pb-10 custom-scrollbar">
          {children}
        </main>

        {/* Floating Mobile Nav */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md md:hidden z-50">
          <nav className="flex items-center justify-around p-2 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl shadow-black/50">
            <MobileNavLink href="/artist/dashboard" label="Home" icon={LayoutDashboard} />
            <MobileNavLink href="/artist/campaigns" label="Music" icon={Music} />
            <div className="relative -top-4">
              <Link href="/artist/services" className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 shadow-lg shadow-purple-600/30 active:scale-95 transition-transform border-4 border-[#050505]">
                <Plus className="h-7 w-7 text-white" />
              </Link>
            </div>
            <MobileNavLink href="/artist/settings" label="Settings" icon={Settings} />
            <MobileNavLink href="/artist/settings" label="Support" icon={Headphones} />
          </nav>
        </div>
      </div>
    </div>
  )
}

function NavLink({ href, label, icon: Icon }: { href: string; label: string; icon: any }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300 group">
      <div className="p-1 px-[2px] transition-transform group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </div>
      {label}
    </Link>
  )
}

function MobileNavLink({ href, label, icon: Icon }: { href: string; label: string; icon: any }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 px-4 py-2 text-white/40 hover:text-cyan-400 transition-all duration-300">
      <Icon className="h-5 w-5" />
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </Link>
  )
}
