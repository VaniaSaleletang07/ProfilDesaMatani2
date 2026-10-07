import { useContent } from '../../context/ContentContext'

const icons = {
  people: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15M15 6v15" /></>,
  location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
}

export default function Statistics() {
  const { content: { statistics } } = useContent()
  return (
    <section aria-label="Ringkasan statistik" className="bg-[#f7f3f3] py-8 md:py-10">
      <div className="container-page grid sm:grid-cols-2 lg:grid-cols-4">
        {statistics.map((item) => (
          <article key={item.label} className="flex items-center gap-4 border-b border-gray-100 bg-white p-5 first:rounded-t-2xl last:rounded-b-2xl sm:[&:nth-child(1)]:rounded-tl-2xl sm:[&:nth-child(2)]:rounded-tr-2xl lg:border-b-0 lg:border-r lg:first:rounded-l-2xl lg:first:rounded-tr-none lg:last:rounded-r-2xl lg:last:border-r-0 lg:last:rounded-bl-none lg:[&:nth-child(2)]:rounded-none shadow-soft transition hover:bg-red-50/60 md:p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">{icons[item.icon]}</svg>
            </div>
            <div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500">{item.label}</p><p className="mt-1 truncate font-heading text-xl font-bold text-primary-dark">{item.value}</p><p className="text-xs text-gray-500">{item.unit}</p></div>
          </article>
        ))}
      </div>
    </section>
  )
}
