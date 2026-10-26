'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, CalendarDays, ChevronDown, MapPin, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

const cities = ['Jaipur', 'Delhi', 'Ajmer', 'Udaipur', 'Jodhpur', 'Kota']

const labelClass = 'flex flex-col gap-2 px-1 text-xs font-bold uppercase tracking-wide text-slate-600'
// The control itself fills the whole box so a click anywhere on it works, not just on the text or arrow.
const controlClass = 'h-12 w-full appearance-none rounded-lg border border-slate-300 bg-white pl-10 pr-9 text-sm font-semibold normal-case text-[#111111] outline-none transition-colors hover:border-[#d71920]/60 focus:border-[#d71920] focus:ring-2 focus:ring-[#d71920]/20'
const iconClass = 'pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#d71920]'

function CitySelect({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
  return <label className={labelClass}>{label}
    <div className="relative">
      <MapPin className={iconClass} aria-hidden="true" />
      <select name={name} className={controlClass} defaultValue={defaultValue}>{cities.map((city) => <option key={city}>{city}</option>)}</select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
    </div>
  </label>
}

export function SearchBox() {
  const router = useRouter()
  const [tomorrow, setTomorrow] = useState('')
  const [error, setError] = useState('')
  useEffect(() => { const d = new Date(); d.setDate(d.getDate() + 1); setTomorrow(d.toLocaleDateString('en-CA')) }, [])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const from = String(data.get('from')), to = String(data.get('to')), date = String(data.get('date'))
    if (from === to) return setError('Please choose different cities for From and To.')
    setError('')
    router.push(`/booking?${new URLSearchParams({ from, to, date })}`)
  }

  return <form onSubmit={onSubmit} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 md:grid-cols-[1fr_auto_1fr_1fr_auto] md:items-end md:gap-2" aria-label="Search buses">
    <CitySelect name="from" label="From" defaultValue="Jaipur" />
    <ArrowRight className="mx-auto hidden text-[#d71920] md:mb-3.5 md:block" aria-hidden="true" />
    <CitySelect name="to" label="To" defaultValue="Delhi" />
    <label className={labelClass}>Departure date
      <div className="relative">
        <CalendarDays className={iconClass} aria-hidden="true" />
        <input name="date" type="date" key={tomorrow} min={tomorrow} defaultValue={tomorrow} required className={controlClass.replace('appearance-none ', '') + ' pr-3'}
          onClick={(e) => { try { e.currentTarget.showPicker() } catch {} }} />
      </div>
    </label>
    <Button type="submit" className="h-12 w-full rounded-lg bg-[#d71920] px-6 text-base font-bold text-white hover:bg-[#b51218] md:w-auto"><Search data-icon="inline-start" />Search buses</Button>
    {error && <p role="alert" className="px-1 text-sm font-semibold text-[#d71920] md:col-span-5">{error}</p>}
  </form>
}
