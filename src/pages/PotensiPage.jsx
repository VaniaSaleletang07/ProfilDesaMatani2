import { useMemo, useState } from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import SectionHeading from '../components/common/SectionHeading'
import { useContent } from '../context/ContentContext'
import { businessSource } from '../data/umkm'
import usePageMeta from '../hooks/usePageMeta'

const allCategory = 'Semua'

export default function PotensiPage() {
  usePageMeta('Potensi | Kelurahan Matani 2', 'Daftar potensi usaha dan UMKM di Kelurahan Matani 2.')
  const { content: { businesses = [] } } = useContent()
  const [activeCategory, setActiveCategory] = useState(allCategory)
  const categories = useMemo(() => [allCategory, ...new Set(businesses.map((item) => item.category))], [businesses])
  const visibleBusinesses = activeCategory === allCategory
    ? businesses
    : businesses.filter((item) => item.category === activeCategory)
  const categoryCounts = useMemo(() => businesses.reduce((counts, item) => ({
    ...counts,
    [item.category]: (counts[item.category] || 0) + 1,
  }), {}), [businesses])

  return (
    <>
      <header className="relative overflow-hidden border-b border-red-100 bg-gradient-to-br from-red-50 to-white py-12 md:py-16">
        <div className="absolute -right-16 -top-28 h-72 w-72 rounded-full border-[40px] border-primary/5" />
        <div className="container-page">
          <Breadcrumb current="Potensi" />
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-primary">Ekonomi Wilayah</p>
          <h1 className="mt-3 text-3xl font-bold text-ink md:text-5xl">Potensi dan Usaha</h1>
          <p className="mt-3 max-w-3xl leading-7 text-gray-700">Informasi potensi pendapatan, pelaku usaha, dan aktivitas ekonomi yang tercatat di Kelurahan Matani 2.</p>
          <div className="mt-5 h-1 w-12 rounded-full bg-primary" />
        </div>
      </header>

      <section className="section-space bg-white">
        <div className="container-page">
          <SectionHeading eyebrow="Potensi Ekonomi" title="Daftar Usaha dan Aktivitas" description={businessSource.note} />

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {Object.entries(categoryCounts).map(([category, count]) => (
              <article key={category} className="rounded-2xl border border-red-100 bg-gradient-to-br from-white to-red-50 p-5 shadow-sm">
                <p className="text-3xl font-bold text-primary-dark">{count}</p>
                <p className="mt-1 text-sm font-semibold text-gray-700">{category}</p>
              </article>
            ))}
          </div>

          <div className="mb-7 flex flex-wrap gap-2" aria-label="Filter kategori usaha">
            {categories.map((category) => (
              <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-primary-light'}`}>
                {category}
              </button>
            ))}
          </div>

          <div className="hidden overflow-x-auto rounded-xl border border-gray-200 shadow-sm md:block">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm">
              <thead className="bg-primary-dark text-white">
                <tr><th className="px-4 py-4">No.</th><th className="px-4 py-4">Jenis Potensi</th><th className="px-4 py-4">Nama Usaha</th><th className="px-4 py-4">Pemilik</th><th className="px-4 py-4">Alamat</th><th className="px-4 py-4">Telepon</th><th className="px-4 py-4">Informasi</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {visibleBusinesses.map((business, index) => (
                  <tr key={business.id || `${business.category}-${index}`} className="align-top odd:bg-white even:bg-gray-50 hover:bg-primary-light/50">
                    <td className="px-4 py-4 text-gray-500">{index + 1}</td>
                    <td className="px-4 py-4 font-semibold text-primary-dark">{business.category}</td>
                    <td className="px-4 py-4 font-semibold">{business.name || '—'}</td>
                    <td className="px-4 py-4">{business.owner || '—'}</td>
                    <td className="px-4 py-4">{business.address || '—'}</td>
                    <td className="px-4 py-4">{business.phone ? <a className="font-medium text-primary hover:underline" href={`tel:${business.phone.replace(/\D/g, '')}`}>{business.phone}</a> : '—'}</td>
                    <td className="px-4 py-4">{[business.info, business.notes].filter(Boolean).join(' · ') || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 md:hidden">
            {visibleBusinesses.map((business, index) => (
              <article key={business.id || `${business.category}-${index}`} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">{business.category}</p>
                <h2 className="mt-2 text-lg font-bold">{business.name || 'Nama usaha belum tercantum'}</h2>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div><dt className="font-semibold text-gray-500">Pemilik</dt><dd className="mt-1">{business.owner || '—'}</dd></div>
                  <div><dt className="font-semibold text-gray-500">Alamat</dt><dd className="mt-1">{business.address || '—'}</dd></div>
                  <div><dt className="font-semibold text-gray-500">Telepon</dt><dd className="mt-1">{business.phone ? <a className="font-medium text-primary" href={`tel:${business.phone.replace(/\D/g, '')}`}>{business.phone}</a> : '—'}</dd></div>
                  {(business.info || business.notes) && <div><dt className="font-semibold text-gray-500">Informasi</dt><dd className="mt-1">{[business.info, business.notes].filter(Boolean).join(' · ')}</dd></div>}
                </dl>
              </article>
            ))}
          </div>

          <p className="mt-6 text-sm text-gray-500">Sumber data: {businessSource.title}, {businessSource.period}.</p>
        </div>
      </section>
    </>
  )
}
