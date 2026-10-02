import { territoryData } from '../../data/wilayah'

const directions = { Utara: 'U', Selatan: 'S', Barat: 'B', Timur: 'T' }

export default function TerritoryBoundaries() {
  return (
    <section className="bg-[#f7f3f3] py-5">
      <div className="container-page section-panel grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:p-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Wilayah Administratif</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">Batas Kelurahan Matani 2</h2>
          <div className="mt-5 h-1 w-12 rounded-full bg-primary" />
          <p className="mt-6 leading-8 text-gray-600">Wilayah Kelurahan Matani 2 berbatasan langsung dengan beberapa kelurahan di sekitarnya.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {territoryData.boundaries.map((item) => (
            <article key={item.direction} className="surface-card flex gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light font-heading font-bold text-primary">{directions[item.direction]}</span>
              <div><p className="text-xs font-bold uppercase tracking-wider text-gray-500">Sebelah {item.direction}</p><p className="mt-1 font-semibold leading-6 text-ink">{item.neighbor}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
