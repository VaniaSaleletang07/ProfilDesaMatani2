import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="fixed left-4 top-3 z-[60] -translate-y-20 rounded bg-white px-4 py-2 font-semibold text-primary-dark shadow focus:translate-y-0">
        Lewati ke konten
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <SiteWatermark />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

function SiteWatermark() {
  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-40 select-none sm:bottom-5 sm:left-5" aria-hidden="true">
      <div className="rounded-lg border border-primary/15 bg-white/80 px-3 py-2 shadow-soft backdrop-blur-md">
        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-500">Dibuat oleh</p>
        <p className="mt-0.5 font-heading text-[11px] font-bold text-primary-dark sm:text-xs">KKT 149 Posko Matani 2</p>
      </div>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
