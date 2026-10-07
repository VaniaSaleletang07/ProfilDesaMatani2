import { Link } from 'react-router-dom'
const categories = [
  { number: '01', title: 'Hotel & Penginapan', description: 'Pilihan hotel, guest house, dan hunian sementara bagi pengunjung.', symbol: '⌂' },
  { number: '02', title: 'Restoran & Kuliner', description: 'Restoran, kafe, serta ragam kuliner yang melayani warga dan tamu.', symbol: '✦' },
  { number: '03', title: 'Laundry & SPPG', description: 'Layanan laundry serta SPPG yang menunjang kebutuhan sehari-hari.', symbol: '◌' },
  { number: '04', title: 'Klinik', description: 'Layanan kesehatan yang tersedia di wilayah Kelurahan Matani 2.', symbol: '+' },
  { number: '05', title: 'Wisata & Rekreasi', description: 'Destinasi rekreasi dan ruang bersantai untuk menikmati kawasan Matani 2.', symbol: '⌁' },
]

export default function Potentials() {
  return (
    <section className="bg-[#f7f8fc] py-16 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-primary"><span className="h-0.5 w-7 bg-primary" />Ekonomi Warga<span className="h-0.5 w-7 bg-primary" /></p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink md:text-4xl">Potensi & Layanan di Matani 2</h2>
          <p className="mt-3 leading-7 text-gray-600">Pilihan kategori usaha dan layanan yang tersedia untuk warga maupun pengunjung Kelurahan Matani 2.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((item) => (
            <article key={item.title} className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-card">
              <div className="flex w-full flex-col">
                <div className="flex h-24 items-center justify-center bg-primary-light text-5xl font-bold text-primary" aria-hidden="true">{item.symbol}</div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Kategori layanan · {item.number}</p>
                  <h3 className="mt-2 text-xl font-bold leading-7 text-ink">{item.title}</h3>
                  <p className="mt-3 leading-6 text-gray-600">{item.description}</p>
                  <Link to="/potensi" className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-xs font-bold text-primary transition hover:text-primary-dark"><span>{item.location || 'Lihat detail potensi'}</span><span className="text-base" aria-hidden="true">↗</span></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center"><Link to="/potensi" className="inline-flex items-center gap-2 border-b-2 border-primary pb-1 text-sm font-bold text-primary transition hover:text-primary-dark">Lihat seluruh potensi dan UMKM <span aria-hidden="true">→</span></Link></div>
      </div>
    </section>
  )
}
