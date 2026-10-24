import { Smartphone } from 'lucide-react'

// Placeholder store links until the apps are published.
const PLAY_STORE_URL = '#'
const APP_STORE_URL = '#'

function PlayIcon() {
  return <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true"><path fill="#00d7fe" d="M3.6 2.3c-.2.2-.3.6-.3 1v17.4c0 .4.1.8.3 1l9.7-9.7z" /><path fill="#00f076" d="m16.5 15.2-3.2-3.2 3.2-3.2 3.9 2.2c1.1.6 1.1 1.6 0 2.2z" /><path fill="#ff3a44" d="m16.5 15.2-3.2-3.2L3.6 21.7c.4.4 1 .4 1.7.1z" /><path fill="#ffd500" d="M5.3 2.2c-.7-.4-1.300-.3-1.700.1l9.700 9.700 3.200-3.200z" /></svg>
}

function AppleIcon() {
  return <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true"><path d="M16.4 12.6c0-2.400 2-3.500 2.100-3.600-1.100-1.700-2.900-1.900-3.500-1.900-1.500-.2-2.900.9-3.700.9s-1.900-.9-3.200-.8c-1.600 0-3.100 1-4 2.400-1.700 3-.4 7.400 1.200 9.800.8 1.200 1.800 2.500 3 2.400 1.200 0 1.700-.8 3.100-.8s1.800.8 3.100.8 2.100-1.200 2.900-2.400c.9-1.300 1.300-2.600 1.300-2.700-.1 0-2.300-.9-2.300-3.500zM14.100 5.500c.7-.8 1.100-1.900 1-3-1 0-2.100.7-2.800 1.500-.6.700-1.100 1.800-1 2.900 1.100.1 2.100-.6 2.800-1.400z" /></svg>
}

export function AppDownloadBanner() {
  const badge = 'flex flex-1 items-center justify-center gap-2 rounded-lg bg-black px-3 py-2 text-white'
  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] md:hidden" aria-label="Download the mobile app">
      <p className="mb-2 flex items-center justify-center gap-1.5 text-xs font-bold text-[#111111]"><Smartphone className="size-3.5 text-[#d71920]" aria-hidden="true" /> On mobile? Download our app for a faster way to book</p>
      <div className="flex gap-2">
        <a href={PLAY_STORE_URL} className={badge} aria-label="Get it on Google Play"><PlayIcon /><span className="text-left leading-tight"><span className="block text-[9px] uppercase">Get it on</span><span className="block text-sm font-bold">Google Play</span></span></a>
        <a href={APP_STORE_URL} className={badge} aria-label="Download on the App Store"><AppleIcon /><span className="text-left leading-tight"><span className="block text-[9px] uppercase">Download on the</span><span className="block text-sm font-bold">App Store</span></span></a>
      </div>
    </aside>
  )
}
