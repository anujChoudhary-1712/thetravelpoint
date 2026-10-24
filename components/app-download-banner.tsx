import { BusFront, Smartphone } from 'lucide-react'

// Placeholder store links until the apps are published.
const PLAY_STORE_URL = '#'
const APP_STORE_URL = '#'

function PlayIcon() {
  return <svg viewBox="0 0 24 24" className="size-7" aria-hidden="true"><path fill="#00d7fe" d="M3.6 2.3c-.2.2-.3.6-.3 1v17.4c0 .4.1.8.3 1l9.7-9.7z" /><path fill="#00f076" d="m16.5 15.2-3.2-3.2 3.2-3.2 3.9 2.2c1.1.6 1.1 1.6 0 2.2z" /><path fill="#ff3a44" d="m16.5 15.2-3.2-3.2L3.6 21.7c.4.4 1 .4 1.7.1z" /><path fill="#ffd500" d="M5.3 2.2c-.7-.4-1.300-.3-1.700.1l9.700 9.700 3.200-3.200z" /></svg>
}

function AppleIcon() {
  return <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden="true"><path d="M16.4 12.6c0-2.400 2-3.500 2.100-3.600-1.100-1.700-2.900-1.900-3.500-1.900-1.500-.2-2.900.9-3.700.9s-1.900-.9-3.200-.8c-1.600 0-3.100 1-4 2.400-1.700 3-.4 7.400 1.200 9.800.8 1.200 1.800 2.500 3 2.400 1.200 0 1.700-.8 3.100-.8s1.800.8 3.100.8 2.100-1.200 2.900-2.400c.9-1.300 1.300-2.600 1.300-2.700-.1 0-2.300-.9-2.300-3.500zM14.100 5.500c.7-.8 1.100-1.900 1-3-1 0-2.100.7-2.800 1.500-.6.700-1.100 1.800-1 2.900 1.100.1 2.100-.6 2.800-1.400z" /></svg>
}

export function AppDownloadBanner() {
  const badge = 'flex w-full items-center justify-center gap-3 rounded-xl bg-black px-5 py-3.5 text-white'
  return (
    <main className="fixed inset-0 z-[100] flex flex-col items-center justify-between overflow-y-auto bg-[#FFC93C] px-6 py-10 text-center md:hidden" aria-label="Download the mobile app">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-[#d71920] text-white"><BusFront aria-hidden="true" /></div>
        <div className="text-xl font-black tracking-tight text-[#111111]">The Travel <span className="text-[#d71920]">Point</span></div>
      </div>
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="flex size-28 items-center justify-center rounded-[2rem] bg-[#d71920] text-white shadow-xl shadow-red-950/20"><Smartphone className="size-14" aria-hidden="true" /></div>
        <h1 className="text-4xl font-black leading-tight text-[#111111]">Book your bus on our app</h1>
        <p className="max-w-xs text-base font-medium text-[#111111]/75">For mobile, download The Travel Point app to search buses, pick seats and book in seconds.</p>
      </div>
      <div className="flex w-full max-w-xs flex-col gap-3">
        <a href={APP_STORE_URL} className={badge} aria-label="Download on the App Store"><AppleIcon /><span className="text-left leading-tight"><span className="block text-[10px] uppercase">Download on the</span><span className="block text-lg font-bold">App Store</span></span></a>
        <a href={PLAY_STORE_URL} className={badge} aria-label="Get it on Google Play"><PlayIcon /><span className="text-left leading-tight"><span className="block text-[10px] uppercase">Get it on</span><span className="block text-lg font-bold">Google Play</span></span></a>
      </div>
    </main>
  )
}
