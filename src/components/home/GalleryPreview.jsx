import { Link } from 'react-router-dom'
import SectionHeading from '../common/SectionHeading'
import { useContent } from '../../context/ContentContext'

export default function GalleryPreview() {
  const { content: { galleryPreview } } = useContent()
  return (
    <section className="bg-[#f7f3f3] py-5">
      <div className="container-page section-panel p-6 sm:p-10 lg:p-14">
        <SectionHeading eyebrow="Dokumentasi" title="Galeri Kelurahan" description="Sekilas dokumentasi kegiatan, lingkungan, dan kehidupan masyarakat." />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {galleryPreview.map((item) => (
            <figure key={item.id} className="group relative overflow-hidden rounded-xl bg-gray-200 shadow-sm md:rounded-2xl">
              <img src={item.image} alt={item.alt} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90 transition group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold text-white md:p-5 md:text-base"><span className="mb-2 block h-0.5 w-7 bg-red-300" />{item.title}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 text-center"><Link to="/galeri" className="btn-primary">Buka Galeri <span className="ml-2" aria-hidden="true">&#8594;</span></Link></div>
      </div>
    </section>
  )
}
