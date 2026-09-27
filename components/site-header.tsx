'use client'

import Link from 'next/link'
import { BusFront, Headphones, Menu, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="The Travel Point home">
          <div className="flex size-11 items-center justify-center rounded-xl bg-[#d71920] text-white"><BusFront aria-hidden="true" /></div>
          <div className="leading-none"><div className="text-xl font-black tracking-tight text-[#111111]">The Travel <span className="text-[#d71920]">Point</span></div><div className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">Travel with trust</div></div>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-bold md:flex" aria-label="Main navigation">
          <Link className="text-[#111111] hover:text-[#d71920]" href="/">Home</Link>
          <Link className="text-slate-600 hover:text-[#d71920]" href="/about">About us</Link>
          <Link className="text-slate-600 hover:text-[#d71920]" href="/contact">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          <a href="tel:+911144446900" className="hidden items-center gap-2 text-sm font-semibold text-slate-600 lg:flex"><Headphones className="size-4 text-[#d71920]" aria-hidden="true" /> 24/7 support</a>
          <Link href="/signin"><Button className="hidden rounded-lg bg-[#111111] text-white hover:bg-[#d71920] md:flex"><UserRound data-icon="inline-start" />Sign in</Button></Link>
          <Button size="icon" variant="ghost" className="md:hidden" aria-label="Open menu"><Menu /></Button>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  return <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between lg:px-8"><p>© 2026 The Travel Point. Comfortable journeys, made simple.</p><div className="flex gap-5"><Link href="/about" className="hover:text-[#d71920]">About us</Link><Link href="/contact" className="hover:text-[#d71920]">Contact</Link></div></div></footer>
}
