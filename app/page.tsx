'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BusFront,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Headphones,
  MapPin,
  Menu,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  Star,
  Ticket,
  UserRound,
  X,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

const buses = [
  { name: 'Rajasthan Roadways', type: 'Volvo Multi-Axle A/C', depart: '08:30 PM', arrive: '06:15 AM', duration: '09h 45m', price: 899, rating: '4.6', seats: 18 },
  { name: 'Shree Ganesh Travels', type: 'A/C Sleeper', depart: '09:45 PM', arrive: '07:00 AM', duration: '09h 15m', price: 1099, rating: '4.8', seats: 7 },
  { name: 'Royal Express', type: 'Non A/C Seater', depart: '10:30 PM', arrive: '08:20 AM', duration: '09h 50m', price: 699, rating: '4.4', seats: 24 },
]

function Logo() {
  return (
    <div className="flex items-center gap-2.5" aria-label="SafarGo home">
      <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <BusFront aria-hidden="true" />
      </div>
      <div className="leading-none">
        <div className="text-xl font-black tracking-tight text-foreground">Safar<span className="text-primary">Go</span></div>
        <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Travel with trust</div>
      </div>
    </div>
  )
}

function SearchBox({ onSearch }: { onSearch: () => void }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-border bg-card p-3 shadow-xl shadow-black/10 md:grid-cols-[1fr_auto_1fr_1fr_auto] md:items-end md:gap-2 md:p-4">
      <label className="flex flex-col gap-2 px-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        From
        <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-3 text-sm font-medium normal-case text-foreground">
          <MapPin className="text-primary" aria-hidden="true" />
          <select className="w-full bg-transparent outline-none" defaultValue="Jaipur">
            <option>Jaipur</option><option>Delhi</option><option>Ajmer</option><option>Udaipur</option>
          </select>
          <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
        </div>
      </label>
      <div className="hidden items-center justify-center pb-3 md:flex"><div className="rounded-full border border-border bg-background p-2 text-primary"><ArrowRight aria-hidden="true" /></div></div>
      <label className="flex flex-col gap-2 px-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        To
        <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-3 text-sm font-medium normal-case text-foreground">
          <MapPin className="text-primary" aria-hidden="true" />
          <select className="w-full bg-transparent outline-none" defaultValue="Delhi"><option>Delhi</option><option>Jaipur</option><option>Ajmer</option><option>Udaipur</option></select>
          <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
        </div>
      </label>
      <label className="flex flex-col gap-2 px-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
        Departure date
        <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-3 text-sm font-medium normal-case text-foreground"><CalendarDays className="text-primary" aria-hidden="true" /><input className="w-full bg-transparent outline-none" type="date" defaultValue="2026-09-27" /></div>
      </label>
      <Button onClick={onSearch} className="h-12 gap-2 rounded-lg px-6 text-sm font-bold"><Search data-icon="inline-start" />Search buses</Button>
    </div>
  )
}

function BusCard({ bus, onSelect }: { bus: typeof buses[number]; onSelect: () => void }) {
  return (
    <article className="grid gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/50 hover:shadow-md md:grid-cols-[1.2fr_1fr_auto] md:items-center">
      <div className="flex gap-4"><div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><BusFront aria-hidden="true" /></div><div><h3 className="font-bold text-foreground">{bus.name}</h3><p className="mt-1 text-sm text-muted-foreground">{bus.type}</p><div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Star className="size-3 fill-amber-400 text-amber-400" /> {bus.rating}</span><span className="flex items-center gap-1"><ShieldCheck className="size-3 text-emerald-600" /> Live tracking</span></div></div></div>
      <div className="flex items-center gap-5 text-sm"><div><div className="text-lg font-bold">{bus.depart}</div><div className="text-muted-foreground">Jaipur</div></div><div className="flex flex-1 flex-col items-center gap-1 text-xs text-muted-foreground"><span>{bus.duration}</span><span className="w-full border-t border-dashed border-border" /></div><div><div className="text-lg font-bold">{bus.arrive}</div><div className="text-muted-foreground">Delhi</div></div></div>
      <div className="flex items-center justify-between gap-4 border-t border-border pt-4 md:block md:border-t-0 md:pt-0 md:text-right"><div><span className="text-xs text-muted-foreground">Starting from</span><div className="text-2xl font-black">₹{bus.price}</div></div><Button onClick={onSelect} variant="outline" className="mt-2 rounded-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground">View seats</Button></div>
    </article>
  )
}

function SeatPicker({ bus, onClose }: { bus: typeof buses[number]; onClose: () => void }) {
  const [selected, setSelected] = useState<string[]>([])
  const seats = useMemo(() => Array.from({ length: 24 }, (_, i) => `${i + 1}`), [])
  const toggle = (seat: string) => setSelected((current) => current.includes(seat) ? current.filter((item) => item !== seat) : [...current, seat])
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 md:items-center md:p-6" role="dialog" aria-modal="true" aria-labelledby="seat-title">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-background p-5 md:rounded-3xl md:p-8">
        <div className="flex items-start justify-between border-b border-border pb-5"><div><p className="text-sm font-bold uppercase tracking-widest text-primary">Choose your seat</p><h2 id="seat-title" className="mt-1 text-2xl font-black">{bus.name}</h2><p className="mt-1 text-sm text-muted-foreground">{bus.depart} · Jaipur to Delhi</p></div><Button onClick={onClose} variant="ghost" size="icon" aria-label="Close seat selection"><X /></Button></div>
        <div className="grid gap-8 py-7 md:grid-cols-[1fr_280px]">
          <div className="mx-auto w-full max-w-sm rounded-2xl border border-border bg-muted/30 p-5"><div className="mb-6 flex justify-end"><div className="rounded-lg border border-border bg-card px-4 py-2 text-xs font-bold text-muted-foreground">DRIVER</div></div><div className="grid grid-cols-4 gap-3">{seats.map((seat, index) => { const isSelected = selected.includes(seat); const isBooked = [2, 5, 11, 18].includes(index); return <button key={seat} disabled={isBooked} onClick={() => toggle(seat)} className={`flex h-11 items-center justify-center rounded-lg border text-xs font-bold transition ${isSelected ? 'border-primary bg-primary text-primary-foreground' : isBooked ? 'cursor-not-allowed border-border bg-muted text-muted-foreground/50' : 'border-border bg-card hover:border-primary hover:text-primary'}`} aria-label={`Seat ${seat}${isBooked ? ', booked' : ''}${isSelected ? ', selected' : ''}`}>{seat}</button> })}</div><div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-2"><span className="size-3 rounded bg-card ring-1 ring-border" /> Available</span><span className="flex items-center gap-2"><span className="size-3 rounded bg-primary" /> Selected</span><span className="flex items-center gap-2"><span className="size-3 rounded bg-muted" /> Booked</span></div></div>
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5"><div><h3 className="font-bold">Booking summary</h3><div className="mt-5 flex items-center justify-between text-sm"><span className="text-muted-foreground">Selected seats</span><span className="font-bold">{selected.length ? selected.join(', ') : 'None'}</span></div><div className="mt-3 flex items-center justify-between border-t border-border pt-3"><span className="text-muted-foreground">Total fare</span><span className="text-2xl font-black">₹{selected.length * bus.price}</span></div></div><Button disabled={!selected.length} className="mt-8 w-full">Proceed to payment <ArrowRight data-icon="inline-end" /></Button></div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const [searched, setSearched] = useState(false)
  const [selectedBus, setSelectedBus] = useState<typeof buses[number] | null>(null)
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-background"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"><Logo /><nav className="hidden items-center gap-8 text-sm font-semibold md:flex"><a className="text-primary" href="#home">Home</a><a className="text-muted-foreground hover:text-foreground" href="#how-it-works">How it works</a><a className="text-muted-foreground hover:text-foreground" href="#contact">Contact</a></nav><div className="flex items-center gap-3"><a href="tel:+911144446900" className="hidden items-center gap-2 text-sm font-semibold text-muted-foreground lg:flex"><Headphones className="size-4 text-primary" /> 24/7 support</a><Button variant="outline" className="hidden rounded-lg md:flex"><UserRound data-icon="inline-start" />Sign in</Button><Button size="icon" variant="ghost" className="md:hidden" aria-label="Open menu"><Menu /></Button></div></div></header>
      <section id="home" className="relative overflow-hidden border-b border-border bg-[#fff8f7]"><div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-14 lg:grid-cols-[1fr_460px] lg:items-center lg:px-8 lg:pb-24 lg:pt-20"><div className="max-w-xl"><div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary"><Ticket className="size-3.5" /> Simple, safe bus booking</div><h1 className="text-4xl font-black leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">Your journey starts <span className="text-primary">here.</span></h1><p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">Book comfortable bus rides across India with clear prices, trusted operators, and support whenever you need it.</p><div className="mt-7 flex flex-wrap gap-5 text-sm font-semibold text-foreground"><span className="flex items-center gap-2"><Check className="size-4 text-primary" /> Instant confirmation</span><span className="flex items-center gap-2"><Check className="size-4 text-primary" /> Secure payments</span></div></div><div className="relative hidden h-72 lg:block"><div className="absolute inset-0 rounded-[3rem] bg-primary/10" /><div className="absolute right-4 top-5 flex size-56 items-center justify-center rounded-full border-[18px] border-primary/15"><div className="flex size-36 items-center justify-center rounded-full bg-primary text-primary-foreground"><BusFront className="size-20" strokeWidth={1.4} /></div></div><div className="absolute bottom-7 left-4 rounded-xl border border-border bg-card p-4 shadow-lg"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700"><ShieldCheck /></div><div><div className="text-sm font-bold">Trusted travel</div><div className="text-xs text-muted-foreground">10,000+ happy travellers</div></div></div></div></div></div><div className="relative z-10 mx-auto -mt-5 w-full max-w-6xl px-5 lg:-mt-9 lg:px-8"><SearchBox onSearch={() => { setSearched(true); setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50) }} /></div></section>
      <section id="results" className={`mx-auto max-w-7xl px-5 py-14 lg:px-8 ${searched ? '' : 'hidden'}`}><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-widest text-primary">27 September 2026</p><h2 className="mt-1 text-3xl font-black">Buses from Jaipur to Delhi</h2><p className="mt-2 text-sm text-muted-foreground">{buses.length} buses found · Choose a bus that suits you</p></div><Button variant="outline" className="rounded-lg"><Clock3 data-icon="inline-start" /> Sort by departure</Button></div><div className="flex flex-col gap-4">{buses.map((bus) => <BusCard key={bus.name} bus={bus} onSelect={() => setSelectedBus(bus)} />)}</div></section>
      <section id="how-it-works" className="border-y border-border bg-muted/25"><div className="mx-auto max-w-7xl px-5 py-14 lg:px-8"><div className="text-center"><p className="text-sm font-bold uppercase tracking-widest text-primary">How it works</p><h2 className="mt-2 text-3xl font-black">Book your seat in 4 easy steps</h2></div><div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{[['01','Search your route','Enter your source, destination, and travel date.'],['02','Choose your bus','Compare timings, prices, and ratings.'],['03','Pick your seat','Select the seat you like from the layout.'],['04','Pay & travel','Make a secure payment and get your ticket.']].map(([number,title,copy]) => <div key={number} className="relative"><div className="text-5xl font-black text-primary/15">{number}</div><h3 className="mt-2 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div>)}</div></div></section>
      <section id="contact" className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div><h2 className="text-2xl font-black">Need help with your booking?</h2><p className="mt-1 text-sm text-muted-foreground">Our travel team is available 24/7 to help you.</p></div><Button className="w-fit rounded-lg"><Headphones data-icon="inline-start" /> Call support</Button></section>
      <footer className="bg-foreground text-background"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8"><Logo /><p className="text-background/60">© 2026 SafarGo Travels. Comfortable journeys, made simple.</p></div></footer>
      {selectedBus && <SeatPicker bus={selectedBus} onClose={() => setSelectedBus(null)} />}
    </main>
  )
}

function UnusedIconReference() { return <><Minus /><Plus /></> }

void UnusedIconReference
