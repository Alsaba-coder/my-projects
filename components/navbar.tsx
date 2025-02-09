"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Alsaba Khan
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}