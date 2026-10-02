import { useContent } from '../../context/ContentContext'

export default function Welcome() {
  const { content: { headOfficial } } = useContent()
  return (
    <section className="bg-[#f7f3f3] py-5">
      <div className="container-page section-panel grid items-center gap-12 p-6 sm:p-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:p-14">
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-2xl bg-primary-light" />
          <div className="absolute -right-3 -top-3 h-24 w-24 rounded-2xl border-2 border-red-200" />
          <div className="relative overflow-hidden rounded-2xl border-4 border-white bg-primary-light shadow-card">
            <img src={headOfficial.photo} alt={`Foto ${headOfficial.name}`} className="aspect-[4/5] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-dark/90 to-transparent p-6 pt-20 text-white">
              <p className="font-heading text-lg font-bold">{headOfficial.name}</p>
              <p className="mt-1 text-sm text-red-100">{headOfficial.position}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Sambutan Kepala Wilayah</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">Melayani dengan Sepenuh Hati</h2>
          <div className="mt-6 h-1 w-14 rounded-full bg-primary" />
          <blockquote className="relative mt-8 text-base leading-8 text-gray-600 md:text-lg"><span className="absolute -left-2 -top-8 font-heading text-7xl leading-none text-primary-light" aria-hidden="true">&ldquo;</span><p className="relative pl-6">{headOfficial.greeting}</p></blockquote>
          <div className="mt-8 flex items-center gap-3 border-t border-gray-200 pt-6"><span className="h-px w-10 bg-primary" /><p className="text-sm font-semibold text-gray-500">Pemerintah {`Kelurahan Matani 2`}</p></div>
        </div>
      </div>
    </section>
  )
}
