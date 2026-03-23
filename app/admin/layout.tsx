import Link from 'next/link'
import { LayoutDashboard, Package, Zap, Users, LogOut, ShieldCheck } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <aside className="hidden md:flex w-64 border-r border-border flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="text-xl font-bold text-primary">slydr admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavLink href="/admin/dashboard" label="Dashboard" icon={LayoutDashboard} />
          <NavLink href="/admin/packages" label="Packages" icon={Package} />
          <NavLink href="/admin/campaigns" label="Campaigns" icon={Zap} />
          <NavLink href="/admin/users" label="Users" icon={Users} />
        </nav>
        <div className="p-4 border-t border-border">
          <form action="/api/auth/signout" method="post">
            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="md:hidden flex items-center px-4 py-3 border-b border-border">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="font-bold text-primary">slydr admin</span>
          </Link>
        </div>
        <main className="flex-1 overflow-auto">{children}</main>
        <nav className="md:hidden flex items-center justify-around border-t border-border py-2 bg-background">
          <MobileNavLink href="/admin/dashboard" label="Dashboard" icon={LayoutDashboard} />
          <MobileNavLink href="/admin/packages" label="Packages" icon={Package} />
          <MobileNavLink href="/admin/campaigns" label="Campaigns" icon={Zap} />
          <MobileNavLink href="/admin/users" label="Users" icon={Users} />
        </nav>
      </div>
    </div>
  )
}

function NavLink({ href, label, icon: Icon }: { href: string; label: string; icon: any }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  )
}

function MobileNavLink({ href, label, icon: Icon }: { href: string; label: string; icon: any }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 px-3 py-1 text-muted-foreground hover:text-primary transition-colors">
      <Icon className="h-5 w-5" />
      <span className="text-xs">{label}</span>
    </Link>
  )
}
