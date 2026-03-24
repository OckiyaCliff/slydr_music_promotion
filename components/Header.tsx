"use client";

import React from "react";
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
    <div className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
      <div className="flex items-center gap-4 pointer-events-auto">
        <ThemeToggle />
      </div>
      
      <div className="pointer-events-auto">
        <StaggeredMenu 
          items={menuItems}
          socialItems={socialItems}
          logoText="slydr"
          accentColor="#a855f7"
        />
      </div>
    </div>
  );
}
