import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navigation, siteInfo } from '../../data/site'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="sticky top-0 z-[1100] border-b border-red-100/70 bg-white/95 text-ink shadow-[0_4px_24px_rgba(69,10,10,0.06)] backdrop-blur-lg">
      <div className="hidden bg-[#24344a] text-[10px] font-semibold text-slate-200 md:block"><div className="container-page flex h-8 items-center"><p className="flex items-center gap-1.5"><span aria-hidden="true">◷</span>Senin-Jumat: Mengikuti Jam Kerja Pemerintah Daerah</p></div></div>
      <nav className="container-page flex min-h-[68px] items-center justify-between gap-4" aria-label="Navigasi utama">
        <Link to="/" className="flex min-w-0 items-center gap-3 rounded" aria-label={`${siteInfo.fullName}, kembali ke beranda`}>
          <img src={siteInfo.logo} alt="" className="h-10 w-10 shrink-0 rounded-full bg-white p-0.5 ring-1 ring-red-100 sm:h-11 sm:w-11" />
          <span className="min-w-0">
            <span className="block truncate font-heading text-sm font-bold tracking-tight text-ink sm:text-base">{siteInfo.fullName}</span>
            <span className="hidden truncate text-[10px] font-medium text-gray-500 sm:block">Kota Tomohon</span>
          </span>
        </Link>

        <button type="button" className="rounded-xl border border-red-100 bg-red-50 p-2.5 text-primary-dark min-[900px]:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Tutup menu' : 'Buka menu'}>
          <span className="sr-only">Menu</span>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        <ul className="hidden items-center gap-1 min-[900px]:flex">
          {navigation.map((item) => <NavItem key={item.path} item={item} />)}
        </ul>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-red-100 bg-white shadow-xl min-[900px]:hidden">
          <ul className="container-page grid gap-1 py-4 sm:grid-cols-2">
            {navigation.map((item) => <NavItem key={item.path} item={item} mobile />)}
          </ul>
        </div>
      )}
    </header>
  )
}

function NavItem({ item, mobile = false }) {
  return (
    <li>
      <NavLink to={item.path} end={item.path === '/'} className={({ isActive }) => `${mobile ? 'block rounded-lg px-4 py-3' : 'block rounded-lg px-2.5 py-2 text-[12px]'} font-semibold transition ${isActive ? 'bg-primary text-white shadow-sm' : 'text-gray-700 hover:bg-red-50 hover:text-primary-dark'}`}>
        {item.label}
      </NavLink>
    </li>
  )
}

function MenuIcon() {
  return <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
}

function CloseIcon() {
  return <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
}
