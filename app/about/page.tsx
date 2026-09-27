'use client'

import { useEffect } from 'react'
import { BusFront, Clock3, HeartHandshake, MapPin, ShieldCheck, Users, Wifi } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Footer, SiteHeader } from '@/components/site-header'

const highlights = [
  { icon: BusFront, title: 'Comfortable buses', text: 'Choose from clean, well-maintained buses designed for relaxed journeys.' },
  { icon: ShieldCheck, title: 'Safe by design', text: 'Trusted drivers, clear trip details, and support you can count on.' },
  { icon: Clock3, title: 'On-time travel', text: 'Plan your day with dependable departure and arrival information.' },
  { icon: HeartHandshake, title: 'Here for you', text: 'Friendly help before, during, and after every journey.' },
]

const milestones = [
  ['2018', 'The Travel Point begins with one goal: make bus travel easier.'],
  ['2021', 'We expand our routes and introduce a simpler online booking experience.'],
  ['Today', 'Travellers trust us to connect them with comfortable journeys across India.'],
]

export default function AboutPage() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <SiteHeader />
      <section className="relative overflow-hidden bg-[#111111] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(215,25,32,.35),transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[1fr_.85fr] lg:items-center lg:px-8">
          <div data-reveal>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#ff7075]">About The Travel Point</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] sm:text-6xl">More than a bus ride. It&apos;s your journey.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">We make everyday travel feel easier with comfortable buses, clear information, and a booking experience built around people.</p>
            <Link href="/booking" className="mt-8 inline-flex cursor-pointer rounded-lg bg-[#d71920] px-6 py-3 font-bold text-white transition hover:bg-[#b9141a] hover:-translate-y-0.5">Find your next bus</Link>
          </div>
          <div data-reveal className="relative h-72 overflow-hidden rounded-3xl border border-white/15 sm:h-96">
            <Image src="/bus-hero.png" alt="The Travel Point bus ready for a journey" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div data-reveal className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d71920]">Why we travel</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">A better way to get there</h2><p className="mt-4 text-lg leading-8 text-slate-600">From the first search to the final stop, every detail is designed to keep your journey simple, safe, and comfortable.</p></div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }, index) => <article key={title} data-reveal style={{ transitionDelay: `${index * 80}ms` }} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#f0a0a3] hover:shadow-lg"><div className="flex size-11 items-center justify-center rounded-xl bg-[#fff0f0] text-[#d71920]"><Icon /></div><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 leading-7 text-slate-600">{text}</p></article>)}
        </div>
      </section>

      <section className="bg-[#fff6f6]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8 lg:py-24">
          <div data-reveal className="relative h-80 overflow-hidden rounded-3xl sm:h-[430px]"><Image src="/bus-interior.png" alt="Clean and comfortable bus interior" fill className="object-cover" /></div>
          <div data-reveal><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d71920]">Our promise</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Travel with confidence, every time.</h2><p className="mt-5 leading-8 text-slate-600">The Travel Point brings together the things that matter on the road: reliable schedules, comfortable seats, transparent fares, and help when you need it.</p><div className="mt-7 grid gap-4 sm:grid-cols-2"><div className="flex gap-3"><Wifi className="mt-1 shrink-0 text-[#d71920]" /><p><strong>Thoughtful comfort</strong><br /><span className="text-slate-600">Amenities that make longer routes easier.</span></p></div><div className="flex gap-3"><Users className="mt-1 shrink-0 text-[#d71920]" /><p><strong>People-powered support</strong><br /><span className="text-slate-600">Real help from a team that listens.</span></p></div><div className="flex gap-3"><MapPin className="mt-1 shrink-0 text-[#d71920]" /><p><strong>Routes that connect</strong><br /><span className="text-slate-600">Go further across the places you love.</span></p></div></div></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"><div data-reveal className="text-center"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d71920]">Our story</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Built around better journeys</h2></div><div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">{milestones.map(([year, text], index) => <div key={year} data-reveal style={{ transitionDelay: `${index * 100}ms` }} className="relative border-l-2 border-[#d71920] pl-5"><p className="text-2xl font-black text-[#d71920]">{year}</p><p className="mt-2 leading-7 text-slate-600">{text}</p></div>)}</div></section>

      <section data-reveal className="mx-auto max-w-7xl px-5 pb-16 lg:px-8"><div className="rounded-3xl bg-[#111111] px-6 py-12 text-center text-white sm:px-12"><h2 className="text-3xl font-black">Ready to go further?</h2><p className="mx-auto mt-3 max-w-xl leading-7 text-slate-300">Find a comfortable seat and make your next trip one to remember.</p><Link href="/booking" className="mt-7 inline-flex cursor-pointer rounded-lg bg-[#d71920] px-6 py-3 font-bold transition hover:bg-[#b9141a] hover:-translate-y-0.5">Search buses</Link></div></section>
      <Footer />
    </main>
  )
}
