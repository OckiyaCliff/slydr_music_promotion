"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { StaggeredMenu } from "@/components/ui/StaggeredMenu";

export default function Header() {
  const menuItems = [
    { label: "Home", ariaLabel: "Home", link: "/" },
    { label: "Services", ariaLabel: "Services", link: "#services" },
    { label: "Process", ariaLabel: "Process", link: "#how-it-works" },
    { label: "Sign In", ariaLabel: "Sign In", link: "/auth/signin" },
  ];

  const socialItems = [
    { label: "Twitter", link: "#" },
    { label: "Instagram", link: "#" },
    { label: "Discord", link: "#" },
  ];

  return (
    <header className="fixed top-6 left-0 w-full z-50 flex justify-center pointer-events-none px-4">
      <div className="flex items-center justify-between w-full max-w-2xl px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent select-none">
            slydr
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Home</Link>
          <Link href="#services" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Services</Link>
          <Link href="/auth/signin" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Sign In</Link>
          <div className="h-4 w-px bg-white/10" />
          <ThemeToggle />
          <StaggeredMenu 
            items={menuItems}
            socialItems={socialItems}
            logoText="slydr"
            accentColor="#a855f7"
          />
        </nav>
      </div>
    </header>
  );
}
