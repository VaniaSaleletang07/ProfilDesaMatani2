import { Link } from 'react-router-dom'
import SectionHeading from '../common/SectionHeading'
import { useContent } from '../../context/ContentContext'

export default function Potentials() {
  const { content: { featuredPotentials } } = useContent()
  return (
    <section className="bg-[#f7f3f3] py-5">
      <div className="container-page section-panel p-6 sm:p-10 lg:p-14">
        <SectionHeading eyebrow="Potensi Wilayah" title="Potensi Unggulan" description="Beragam potensi yang menjadi kekuatan dan identitas wilayah Kelurahan Matani 2." />
        <div className="grid gap-6 md:grid-cols-3">
          {featuredPotentials.map((item) => (
            <article key={item.title} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-card">
              <div className="relative overflow-hidden"><img src={item.image} alt="" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" /></div>
              <div className="p-6 md:p-7">
                <div className="mb-4 h-1 w-10 rounded-full bg-primary transition-all group-hover:w-16" />
                <h3 className="text-xl font-bold text-ink">{item.title}</h3>
                <p className="mt-3 leading-7 text-gray-600">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center"><Link to="/potensi" className="btn-primary">Lihat Semua Potensi <span className="ml-2" aria-hidden="true">&#8594;</span></Link></div>
      </div>
    </section>
  )
}
