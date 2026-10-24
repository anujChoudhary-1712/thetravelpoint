'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, CalendarDays, ChevronDown, MapPin, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

const cities = ['Jaipur', 'Delhi', 'Ajmer', 'Udaipur', 'Jodhpur', 'Kota']

export function SearchBox() {
  const [today, setToday] = useState('')
  useEffect(() => { const d = new Date(); d.setDate(d.getDate() + 1); setToday(d.toLocaleDateString('en-CA')) }, [])
  return <form action="/booking" className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 md:grid-cols-[1fr_auto_1fr_1fr_auto] md:items-end md:gap-2" aria-label="Search buses">
    <label className="flex flex-col gap-2 px-1 text-xs font-bold uppercase tracking-wide text-slate-600">From<div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm font-semibold normal-case text-[#111111]"><MapPin className="text-[#d71920]" aria-hidden="true" /><select name="from" className="w-full bg-transparent outline-none" defaultValue="Jaipur">{cities.map((city) => <option key={city}>{city}</option>)}</select><ChevronDown className="size-4 text-slate-500" aria-hidden="true" /></div></label>
    <ArrowRight className="mx-auto hidden text-[#d71920] md:mb-3 md:block" aria-hidden="true" />
    <label className="flex flex-col gap-2 px-1 text-xs font-bold uppercase tracking-wide text-slate-600">To<div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm font-semibold normal-case text-[#111111]"><MapPin className="text-[#d71920]" aria-hidden="true" /><select name="to" className="w-full bg-transparent outline-none" defaultValue="Delhi">{cities.map((city) => <option key={city}>{city}</option>)}</select><ChevronDown className="size-4 text-slate-500" aria-hidden="true" /></div></label>
    <label className="flex flex-col gap-2 px-1 text-xs font-bold uppercase tracking-wide text-slate-600">Departure date<div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm font-semibold normal-case text-[#111111]"><CalendarDays className="text-[#d71920]" aria-hidden="true" /><input name="date" className="w-full bg-transparent outline-none" type="date" key={today} min={today} defaultValue={today} required /></div></label>
    <Button type="submit" className="h-12 rounded-lg bg-[#d71920] px-6 font-bold text-white hover:bg-[#b51218]"><Search data-icon="inline-start" />Search buses</Button>
  </form>
}
