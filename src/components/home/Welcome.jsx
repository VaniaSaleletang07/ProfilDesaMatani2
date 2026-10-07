import { Link } from 'react-router-dom'
import { profileData } from '../../data/profil'

export default function Welcome() {
  return (
    <section className="section-space bg-white">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Mengenal Matani 2</p>
          <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-ink md:text-5xl">Wilayah yang terhubung, informasi yang terbuka.</h2>
          <p className="mt-6 max-w-2xl leading-8 text-gray-600">Kelurahan Matani 2 berada di Kecamatan Tomohon Tengah, Kota Tomohon, Provinsi Sulawesi Utara. Website ini hadir sebagai pusat informasi bagi masyarakat dan pengunjung.</p>
          <Link to="/profil" className="mt-8 inline-flex items-center text-sm font-bold text-primary transition hover:text-primary-dark hover:underline">Lihat profil wilayah <span className="ml-2" aria-hidden="true">&#8594;</span></Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {profileData.identity.slice(1, 5).map(([label, value], index) => <div key={label} className={`rounded-2xl border p-5 ${index === 0 ? 'border-primary bg-primary text-white sm:col-span-2' : 'border-gray-200 bg-[#fcfbfb]'}`}><p className={`text-xs font-bold uppercase tracking-[0.14em] ${index === 0 ? 'text-red-100' : 'text-gray-400'}`}>{label}</p><p className="mt-2 font-heading text-lg font-bold">{value}</p></div>)}
        </div>
      </div>
    </section>
  )
}
