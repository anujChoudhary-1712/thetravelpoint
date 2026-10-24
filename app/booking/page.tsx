'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, BusFront, Check, Clock3, Filter, MapPin, ShieldCheck, Star } from 'lucide-react'
import { Footer, SiteHeader } from '@/components/site-header'

const buses = [
  { id: 1, departure: '06:30 AM', arrival: '01:15 PM', duration: '6h 45m', price: 699, rating: '4.8', type: 'AC Sleeper', seats: 18 },
  { id: 2, departure: '09:00 AM', arrival: '04:10 PM', duration: '7h 10m', price: 549, rating: '4.6', type: 'AC Seater', seats: 26 },
  { id: 3, departure: '10:45 PM', arrival: '06:00 AM', duration: '7h 15m', price: 799, rating: '4.7', type: 'Sleeper / Seater', seats: 12 },
]

const seats = Array.from({ length: 32 }, (_, index) => index + 1)
const unavailableSeats = new Set([2, 5, 11, 14, 19, 22, 28, 31])

function formatDate(value: string | null) {
  const date = value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00`) : null
  return date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : null
}

export default function BookingPage() {
  return <Suspense><BookingContent /></Suspense>
}

function BookingContent() {
  const params = useSearchParams()
  const from = params.get('from') || 'Jaipur'
  const to = params.get('to') || 'Delhi'
  const dateLabel = formatDate(params.get('date'))
  const [selectedBus, setSelectedBus] = useState<number | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const bus = buses.find((item) => item.id === selectedBus)
  const total = useMemo(() => (bus ? bus.price * selectedSeats.length : 0), [bus, selectedSeats])

  function chooseBus(id: number) {
    setSelectedBus(id)
    setSelectedSeats([])
  }

  function toggleSeat(seat: number) {
    if (unavailableSeats.has(seat)) return
    setSelectedSeats((current) => current.includes(seat) ? current.filter((item) => item !== seat) : [...current, seat])
  }

  return (
    <main className="min-h-screen bg-[#f6f6f6]">
      <SiteHeader />
      <section className="border-b border-[#dedede] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d71920]">Search results</p>
              <h1 className="mt-1 text-2xl font-black text-[#111111] sm:text-3xl">{from} <span className="text-[#d71920]">→</span> {to}</h1>
              <p className="mt-1 text-sm text-[#555555]">{dateLabel ? `${dateLabel} · ` : ''}{buses.length} buses available</p>
            </div>
            <button type="button" onClick={() => setShowFilters((value) => !value)} className="inline-flex items-center gap-2 rounded-lg border border-[#cfcfcf] bg-white px-4 py-2 text-sm font-bold text-[#111111] lg:hidden">
              <Filter className="size-4 text-[#d71920]" aria-hidden="true" /> Filters
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[235px_1fr] lg:px-8">
        <aside className={`${showFilters ? 'block' : 'hidden'} h-fit rounded-xl border border-[#dedede] bg-white p-5 lg:block`}>
          <div className="flex items-center gap-2 text-base font-bold text-[#111111]"><Filter className="size-4 text-[#d71920]" aria-hidden="true" /> Filters</div>
          <fieldset className="mt-6 border-t border-[#eeeeee] pt-5"><legend className="text-sm font-bold text-[#111111]">Bus type</legend><div className="mt-3 flex flex-col gap-3 text-sm text-[#555555]"><label className="flex gap-2"><input type="checkbox" defaultChecked className="accent-[#d71920]" /> AC buses</label><label className="flex gap-2"><input type="checkbox" className="accent-[#d71920]" /> Sleeper</label><label className="flex gap-2"><input type="checkbox" className="accent-[#d71920]" /> Seater</label></div></fieldset>
          <fieldset className="mt-6 border-t border-[#eeeeee] pt-5"><legend className="text-sm font-bold text-[#111111]">Departure time</legend><div className="mt-3 flex flex-col gap-3 text-sm text-[#555555]"><label className="flex gap-2"><input type="radio" name="departure" defaultChecked className="accent-[#d71920]" /> Any time</label><label className="flex gap-2"><input type="radio" name="departure" className="accent-[#d71920]" /> Morning</label><label className="flex gap-2"><input type="radio" name="departure" className="accent-[#d71920]" /> Evening</label></div></fieldset>
          <div className="mt-6 rounded-lg bg-[#fff1f1] p-3 text-xs leading-5 text-[#7a1519]"><ShieldCheck className="mb-1 size-4 text-[#d71920]" aria-hidden="true" /> Every Travel Point bus is checked for comfort and safety.</div>
        </aside>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between"><p className="text-sm font-semibold text-[#555555]">Choose your preferred bus</p><select aria-label="Sort buses" className="rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 text-sm font-semibold text-[#111111]"><option>Sort by departure</option><option>Price: low to high</option><option>Rating</option></select></div>
          {buses.map((item) => {
            const isSelected = selectedBus === item.id
            return <article key={item.id} className={`overflow-hidden rounded-xl border bg-white transition-shadow duration-200 ${isSelected ? 'border-[#d71920] shadow-[0_8px_24px_rgba(215,25,32,0.12)]' : 'border-[#dedede] hover:shadow-md'}`}>
              <div className="grid gap-5 p-5 md:grid-cols-[1fr_auto] md:items-center">
                <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                  <div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-full bg-[#fff1f1]"><BusFront className="size-5 text-[#d71920]" aria-hidden="true" /></div><div><p className="font-bold text-[#111111]">The Travel Point</p><p className="text-xs text-[#666666]">{item.type}</p></div></div>
                  <div><p className="text-lg font-black text-[#111111]">{item.departure}</p><p className="text-xs text-[#666666]">{from}</p></div><div className="flex min-w-24 items-center gap-2 text-xs text-[#777777]"><span className="h-px flex-1 bg-[#d9d9d9]" /><Clock3 className="size-4" aria-hidden="true" /><span>{item.duration}</span><span className="h-px flex-1 bg-[#d9d9d9]" /></div><div><p className="text-lg font-black text-[#111111]">{item.arrival}</p><p className="text-xs text-[#666666]">{to}</p></div>
                  <div className="flex items-center gap-1 rounded bg-[#eef8ee] px-2 py-1 text-xs font-bold text-[#27712b]"><Star className="size-3 fill-current" aria-hidden="true" /> {item.rating}</div>
                </div>
                <div className="flex items-center justify-between gap-5 md:justify-end"><div><p className="text-xs text-[#777777]">Starting from</p><p className="text-xl font-black text-[#111111]">₹{item.price}</p></div><button type="button" onClick={() => chooseBus(item.id)} className="inline-flex items-center gap-2 rounded-lg bg-[#d71920] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#b9141a]">{isSelected ? 'Seats selected' : 'View seats'} <ArrowRight className="size-4" aria-hidden="true" /></button></div>
              </div>
              {isSelected && <div className="border-t border-[#eeeeee] bg-[#fcfcfc] p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-lg font-black text-[#111111]">Select your seats</h2><p className="mt-1 text-sm text-[#666666]">Click an available seat to reserve it for this journey.</p></div><div className="flex gap-4 text-xs text-[#555555]"><span className="flex items-center gap-1.5"><span className="size-3 rounded border border-[#d71920] bg-white" /> Available</span><span className="flex items-center gap-1.5"><span className="size-3 rounded bg-[#d71920]" /> Selected</span><span className="flex items-center gap-1.5"><span className="size-3 rounded bg-[#d9d9d9]" /> Booked</span></div></div><div className="mt-5 grid gap-6 md:grid-cols-[1fr_250px]"><div className="rounded-xl border border-[#dedede] bg-white p-5"><div className="mb-5 flex items-center justify-between border-b border-[#eeeeee] pb-3 text-xs font-bold uppercase tracking-wider text-[#777777]"><span>Front</span><span className="flex items-center gap-1"><MapPin className="size-3" aria-hidden="true" /> Driver</span></div><div className="mx-auto grid max-w-sm grid-cols-4 gap-3">{seats.map((seat) => { const unavailable = unavailableSeats.has(seat); const selected = selectedSeats.includes(seat); return <button key={seat} type="button" disabled={unavailable} onClick={() => toggleSeat(seat)} aria-label={`Seat ${seat}${unavailable ? ', booked' : selected ? ', selected' : ', available'}`} className={`flex h-11 items-center justify-center rounded-md border text-sm font-bold transition-all duration-150 ${unavailable ? 'cursor-not-allowed border-[#d9d9d9] bg-[#eeeeee] text-[#999999]' : selected ? 'border-[#d71920] bg-[#d71920] text-white scale-105' : 'border-[#d71920] bg-white text-[#d71920] hover:bg-[#fff1f1]'}`}>{unavailable ? '×' : <><span className="sr-only">Seat </span>{seat}</>}</button> })}</div></div><div className="rounded-xl border border-[#dedede] bg-white p-5"><p className="text-sm font-bold text-[#555555]">Your selection</p><p className="mt-2 text-3xl font-black text-[#111111]">{selectedSeats.length} <span className="text-base font-semibold text-[#777777]">seat{selectedSeats.length === 1 ? '' : 's'}</span></p><p className="mt-1 min-h-5 text-sm text-[#666666]">{selectedSeats.length ? `Seat ${selectedSeats.sort((a, b) => a - b).join(', ')}` : 'No seats selected yet'}</p><div className="my-5 border-t border-[#eeeeee]" /><div className="flex items-center justify-between"><span className="text-sm text-[#666666]">Total fare</span><span className="text-xl font-black text-[#111111]">₹{total}</span></div><button type="button" disabled={!selectedSeats.length} className="mt-5 w-full rounded-lg bg-[#111111] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#d71920] disabled:cursor-not-allowed disabled:bg-[#d5d5d5]">Proceed to payment</button><p className="mt-2 text-center text-[11px] text-[#888888]">Demo button · payment will be added later</p></div></div></div>}
            </article>
          })}
        </section>
      </div>
      <Footer />
    </main>
  )
}
