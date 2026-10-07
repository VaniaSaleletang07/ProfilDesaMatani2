import { Link } from 'react-router-dom'

const facilities = [
  { number: '01', title: 'Kantor Kelurahan', description: 'Pusat pelayanan administrasi dan informasi bagi masyarakat Matani 2.', icon: 'office' },
  { number: '02', title: 'Layanan Kesehatan', description: 'Akses informasi fasilitas kesehatan yang melayani kebutuhan warga.', icon: 'health' },
  { number: '03', title: 'Sarana Sosial', description: 'Ruang dan fasilitas bersama untuk kegiatan sosial serta kemasyarakatan.', icon: 'community' },
  { number: '04', title: 'Gereja GMIM Nazaret', description: 'Tempat ibadah Gereja GMIM Nazaret yang berada di Kelurahan Matani 2.', icon: 'office', image: '/images/fasilitas-gmim-nazaret-matani-2.jpg' },
  { number: '05', title: 'Minimarket Alfamart', description: 'Minimarket untuk memenuhi kebutuhan belanja harian masyarakat dan pengunjung.', icon: 'community' },
]

function FacilityIcon({ type }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: '1.7', strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (type === 'health') return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M12 5v14M5 12h14" /><path {...common} d="M4 4h16v16H4z" /></svg>
  if (type === 'education') return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="m3 9 9-5 9 5-9 5-9-5Z" /><path {...common} d="M7 12v5c3 2 7 2 10 0v-5" /></svg>
  if (type === 'community') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle {...common} cx="9" cy="8" r="3" /><path {...common} d="M3.5 20c.6-3.6 2.4-5.5 5.5-5.5s4.9 1.9 5.5 5.5M17 10a2.5 2.5 0 1 0 0-5M16 15c2.4 0 3.8 1.7 4.3 5" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path {...common} d="M4 21V7l8-4 8 4v14M8 21v-5h8v5M8 10h.01M12 10h.01M16 10h.01" /></svg>
}

export default function FacilitiesPreview() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 border-b border-gray-200 pb-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">Fasilitas Wilayah</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">Fasilitas untuk Masyarakat</h2>
            <p className="mt-3 leading-7 text-gray-600">Rangkuman fasilitas umum yang menunjang pelayanan dan aktivitas masyarakat Kelurahan Matani 2.</p>
          </div>
          <Link to="/fasilitas" className="inline-flex w-fit items-center gap-2 border-b-2 border-primary pb-1 text-sm font-bold text-primary transition hover:text-primary-dark">Lihat informasi fasilitas <span aria-hidden="true">→</span></Link>
        </div>

        <div className="grid divide-y divide-gray-200 border-x border-b border-gray-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
          {facilities.map((facility) => (
            <article key={facility.title} className="group relative min-h-64 p-7 transition hover:bg-primary-light/40">
              <span className="absolute right-6 top-5 text-4xl font-bold text-gray-100 transition group-hover:text-primary/10">{facility.number}</span>
              {facility.image ? (
                <img src={facility.image} alt={facility.title} className="h-24 w-full rounded-sm object-cover" />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-primary text-white [&_svg]:h-5 [&_svg]:w-5"><FacilityIcon type={facility.icon} /></div>
              )}
              <h3 className={`text-lg font-bold text-ink ${facility.image ? 'mt-6' : 'mt-10'}`}>{facility.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">{facility.description}</p>
              <div className="mt-5 h-px w-8 bg-primary transition-all duration-300 group-hover:w-16" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
