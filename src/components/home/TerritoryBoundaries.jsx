import { territoryData } from '../../data/wilayah'
import { profileData } from '../../data/profil'
import { neighborhoods as defaultNeighborhoods } from '../../data/lingkungan'
import { useContent } from '../../context/ContentContext'
import { useState } from 'react'

const directionOrder = ['Utara', 'Timur', 'Selatan', 'Barat']

export default function TerritoryBoundaries() {
  const [male, female, total, families, neighborhoodCount] = profileData.population
  const { content } = useContent()
  const neighborhoods = content.neighborhoods?.length ? content.neighborhoods : defaultNeighborhoods
  const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState(neighborhoods[0]?.id || 'L-I')
  const selectedNeighborhood = neighborhoods.find((item) => item.id === selectedNeighborhoodId) || neighborhoods[0]
  const boundaries = directionOrder.map((direction) => territoryData.boundaries.find((item) => item.direction === direction)).filter(Boolean)
  const maleCount = Number(male[1].replace(/\D/g, ''))
  const femaleCount = Number(female[1].replace(/\D/g, ''))
  const genderTotal = maleCount + femaleCount
  const malePercent = (maleCount / genderTotal) * 100
  const femalePercent = (femaleCount / genderTotal) * 100

  return (
    <section className="bg-[#f1f4f2] py-16 md:py-24">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Kependudukan & Tata Ruang</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-4xl">Statistik Demografi & Batas Administratif</h2><p className="mt-3 max-w-2xl leading-7 text-gray-600">Ringkasan kependudukan dan batas wilayah Kelurahan Matani 2, Kecamatan Tomohon Tengah.</p></div>
          <p className="w-fit rounded-md border border-green-100 bg-white px-4 py-2 text-xs font-semibold text-primary">Update Data : 2026</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"><h3 className="font-heading text-base font-bold text-ink">Komposisi Penduduk</h3><div className="mt-6 flex items-center gap-5"><div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full text-center ring-4 ring-white shadow-sm" style={{ background: `conic-gradient(#166534 0 ${malePercent}%, #4ade80 ${malePercent}% 100%)` }}><div className="flex h-20 w-20 items-center justify-center rounded-full bg-white"><div><p className="font-heading text-lg font-bold text-ink">{genderTotal.toLocaleString('id-ID')}</p><p className="text-[9px] font-bold uppercase tracking-wider text-gray-500">Data gender</p></div></div></div><div className="min-w-0 flex-1 space-y-4 text-sm"><ChartRow label="Laki-laki" value={male[1]} percent={malePercent} color="bg-primary-dark" /><ChartRow label="Perempuan" value={female[1]} percent={femalePercent} color="bg-green-400" /></div></div><p className="mt-6 border-t border-gray-100 pt-4 text-xs leading-5 text-gray-500">Diagram dihitung otomatis dari data laki-laki dan perempuan.</p></article>
          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"><h3 className="font-heading text-base font-bold text-ink">Ringkasan Demografi</h3><div className="mt-6 divide-y divide-gray-100 border-y border-gray-100"><InfoRow label="Total penduduk tercatat" value={total[1]} /><InfoRow label="Kepala keluarga" value={families[1]} /><InfoRow label="Satuan lingkungan" value={neighborhoodCount[1]} /></div></article>
          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"><h3 className="font-heading text-base font-bold text-ink">Informasi Lingkungan</h3><div className="mt-5 grid grid-cols-5 gap-2">{neighborhoods.map((item) => <button key={item.id} type="button" onClick={() => setSelectedNeighborhoodId(item.id)} className={`rounded-md px-2 py-2 text-center text-xs font-bold transition ${item.id === selectedNeighborhood?.id ? 'bg-primary text-white shadow-sm' : 'bg-primary-light text-primary-dark hover:bg-red-100'}`}>{item.id}</button>)}</div><div className="mt-5 border-t border-gray-100 pt-4"><p className="font-heading text-base font-bold text-ink">{selectedNeighborhood?.label}</p><div className="mt-3 grid gap-3 sm:grid-cols-2"><ContactCard label="Kepala Lingkungan" name={selectedNeighborhood?.headName} phone={selectedNeighborhood?.headPhone} /><ContactCard label="Wakil Kepala Lingkungan" name={selectedNeighborhood?.deputyName} phone={selectedNeighborhood?.deputyPhone} /></div></div></article>
        </div>

        <div className="mt-12"><p className="text-sm font-bold uppercase tracking-wide text-ink"><span className="mr-2 text-primary">⌁</span>Batas Delineasi Administratif Wilayah</p><div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{boundaries.map((item) => <article key={item.direction} className="border-l-4 border-primary bg-white p-5 shadow-sm"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">Sebelah {item.direction}</p><p className="mt-2 font-heading text-lg font-bold text-ink">{item.neighbor}</p><p className="mt-3 text-xs leading-5 text-gray-500">Batas administratif Kelurahan Matani 2.</p></article>)}</div></div>
      </div>
    </section>
  )
}

function ChartRow({ label, value, percent, color }) {
  return <div><div className="flex items-center justify-between gap-3"><p className="text-xs font-semibold text-gray-600">{label}</p><p className="text-xs font-bold text-ink">{percent.toFixed(1)}%</p></div><div className="mt-1.5 h-2 rounded-full bg-gray-100"><div className={`h-2 rounded-full ${color}`} style={{ width: `${percent}%` }} /></div><p className="mt-1 text-xs text-gray-500">{value}</p></div>
}

function InfoRow({ label, value }) {
  return <div className="flex items-center justify-between gap-4 py-4"><p className="text-sm font-semibold text-gray-600">{label}</p><p className="text-sm font-bold text-ink">{value}</p></div>
}

function ContactCard({ label, name, phone }) {
  return <div className="rounded-md bg-gray-50 p-3"><p className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500">{label}</p><p className={`mt-1 text-sm font-bold ${name ? 'text-ink' : 'text-gray-400'}`}>{name || 'Belum diisi'}</p><p className={`mt-1 text-xs ${phone ? 'text-primary' : 'text-gray-400'}`}>{phone || 'Kontak belum diisi'}</p></div>
}
