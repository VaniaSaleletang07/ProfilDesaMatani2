import { Link } from 'react-router-dom'
import { useContent } from '../../context/ContentContext'

export default function ProfileSummary() {
  const { content: { village } } = useContent()
  return (
    <section className="bg-[#f7f3f3] py-5">
      <div className="container-page">
        <div className="section-panel relative overflow-hidden px-6 py-12 sm:px-10 lg:flex lg:items-end lg:justify-between lg:gap-14 lg:px-14 lg:py-14">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border-[45px] border-primary/5" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Sekilas Profil</p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">Mengenal {village.name}</h2>
            <p className="mt-5 leading-8 text-gray-600">{village.shortProfile}</p>
          </div>
          <Link to="/profil" className="relative mt-8 shrink-0 text-sm font-bold text-primary hover:text-primary-dark hover:underline lg:mt-0">Baca profil lengkap <span aria-hidden="true">&#8594;</span></Link>
        </div>
      </div>
    </section>
  )
}
