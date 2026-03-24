"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Header() {
  return (
    <header className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none px-4">
      <div className="flex items-center justify-between w-full max-w-2xl px-6 py-3 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur-md pointer-events-auto shadow-none">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent select-none">
          slydr
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Home</Link>
          <Link href="#services" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Services</Link>
          <Link href="#how-it-works" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Process</Link>
          <Link href="/auth/signin" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Sign In</Link>
          <div className="h-4 w-px bg-black/10 dark:bg-white/10" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
