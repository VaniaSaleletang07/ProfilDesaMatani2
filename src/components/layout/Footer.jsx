import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { siteInfo } from '../../data/site'
import { useContent } from '../../context/ContentContext'
import { adminEntryPath } from '../../lib/api'

export default function Footer() {
  const { content: { village } } = useContent()
  const navigate = useNavigate()
  const clicks = useRef({ count: 0, firstClickAt: 0 })

  function handleHiddenEntry() {
    const now = Date.now()
    if (!clicks.current.firstClickAt || now - clicks.current.firstClickAt > 2500) {
      clicks.current.count = 0
      clicks.current.firstClickAt = now
    }
    clicks.current.count += 1
    if (clicks.current.count >= 3) {
      clicks.current.count = 0
      clicks.current.firstClickAt = 0
      navigate(adminEntryPath)
    }
  }
  return (
    <footer className="bg-[#4c1111] text-white">
      <div className="h-1 bg-primary" />
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <img src={siteInfo.logo} alt="" className="h-12 w-12 rounded-full bg-white p-1" />
            <div><h2 className="text-lg font-bold">{siteInfo.fullName}</h2><p className="mt-0.5 text-xs text-red-200">{siteInfo.region}</p></div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-red-100/80">{siteInfo.footerDescription} Informasi disajikan untuk memudahkan masyarakat mengenal wilayah dan pelayanan kelurahan.</p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Informasi Kantor</h2>
          <div className="mt-5 h-0.5 w-8 bg-red-400" />
          <p className="mt-4 text-sm leading-7 text-red-100/80">{village.address}</p>
          <p className="mt-2 text-sm text-red-100/80">{village.phone}</p>
        </div>
      </div>
      <div className="relative border-t border-white/10 bg-black/10 py-5 text-center text-xs text-red-100/70">
        <div className="container-page flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
          <span>&copy; {new Date().getFullYear()} {siteInfo.copyright}. Semua hak dilindungi.</span>
          <span className="font-semibold text-red-100/90">Dibuat oleh KKT 149 Posko Matani 2</span>
        </div>
        <button
          type="button"
          onClick={handleHiddenEntry}
          className="absolute inset-y-0 right-0 flex w-16 cursor-default items-center justify-center text-lg text-white/10 hover:text-white/20"
          aria-label="Informasi versi website"
        >
          <span aria-hidden="true">&#8226;</span>
        </button>
      </div>
    </footer>
  )
}
