import { Link } from 'react-router-dom'
import { useContent } from '../../context/ContentContext'
import { profileData } from '../../data/profil'

export default function Hero() {
  const { content: { village } } = useContent()
  return (
    <section className="relative isolate overflow-visible bg-[#18263a] pb-24 text-white md:pb-28">
      <img src={village.heroImage} alt="Foto suasana Kelurahan Matani 2" className="absolute inset-0 -z-30 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(20,31,48,0.92),rgba(20,31,48,0.88))]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 before:absolute before:inset-10 before:rounded-full before:border before:border-white/10 after:absolute after:inset-20 after:rounded-full after:border after:border-white/10" />
      <div className="container-page flex min-h-[410px] flex-col items-center justify-center py-14 text-center md:min-h-[430px] md:py-16">
        <div className="max-w-3xl">
          <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">Semua tentang <span className="text-red-200">Matani 2</span>,<br />dalam satu tempat</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-200">Website ini hadir sebagai pusat informasi bagi masyarakat dan pengunjung.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/profil" className="inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-primary-dark">Jelajahi Profil Wilayah <span className="ml-2" aria-hidden="true">&#8594;</span></Link>
            <Link to="/potensi" className="inline-flex min-h-11 items-center justify-center rounded-sm bg-white/15 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/25">Lihat Potensi & UMKM</Link>
          </div>
        </div>
        <div className="mt-8 grid w-full max-w-4xl overflow-hidden rounded-md border border-white/10 bg-white/10 text-left backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4">
          {[['Kecamatan', 'Tomohon Tengah'], ['Kota', 'Tomohon'], ['Provinsi', 'Sulawesi Utara'], ['Kode Pos', '95444']].map(([label, value], index) => <div key={label} className={`p-4 ${index < 3 ? 'border-b border-white/10 sm:border-r lg:border-b-0' : ''}`}><p className="text-[9px] font-bold uppercase tracking-wider text-slate-300">{label}</p><p className="mt-1 text-xs font-bold text-white">{value}</p></div>)}
        </div>
        <div className="mt-8 grid w-full gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
          {profileData.heroStatistics.map((item, index) => <article key={item.label} className="relative overflow-hidden rounded-md border border-gray-200 bg-white p-5 text-ink shadow-card before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-primary"><p className="text-[9px] font-bold uppercase tracking-[0.1em] text-gray-500">{item.label}</p><p className="mt-2 font-heading text-2xl font-bold text-ink">{item.value} <span className="text-[10px] text-primary">{item.unit}</span></p><p className="mt-2 border-t border-gray-100 pt-2 text-[10px] text-gray-500">{index === 0 ? 'Laki-laki: 1.527 · Perempuan: 1.820' : item.note}</p></article>)}
        </div>
      </div>
    </section>
  )
}
