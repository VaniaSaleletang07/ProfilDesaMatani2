import { Link } from 'react-router-dom'
import { useContent } from '../../context/ContentContext'

export default function Hero() {
  const { content: { village } } = useContent()
  return (
    <section className="bg-[#f7f3f3] pt-4 sm:pt-6">
      <div className="container-page">
        <div className="relative isolate flex min-h-[560px] items-center overflow-hidden rounded-3xl bg-primary-dark shadow-card md:min-h-[610px]">
          <img src={village.heroImage} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/90 to-white/5" />
          <div className="w-full px-6 pb-24 pt-16 sm:px-10 md:px-14 lg:px-16">
            <div className="max-w-xl text-ink">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-100 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-md"><span className="h-2 w-2 rounded-full bg-primary" />Portal Kelurahan</p>
              <h1 className="text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">Mengenal <span className="text-primary">{village.name.replace('Kelurahan ', '')}</span></h1>
              <p className="mt-5 max-w-lg text-sm font-medium leading-7 text-gray-600 md:text-base">{village.region}</p>
              <p className="mt-4 max-w-lg text-base leading-7 text-gray-700">{village.slogan}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/potensi" className="btn-primary">Jelajahi Potensi <span className="ml-2" aria-hidden="true">&#8594;</span></Link>
                <Link to="/profil" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-gray-200 bg-white/90 px-6 py-3 text-sm font-bold text-ink transition hover:border-red-200 hover:text-primary">Kenali Matani 2</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
