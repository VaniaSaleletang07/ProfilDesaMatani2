import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import { meta } from '../data/site'

export default function NotFoundPage() {
  usePageMeta(meta.notFound.title, meta.notFound.description)
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-heading text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-3xl font-bold">Halaman Tidak Ditemukan</h1>
      <p className="mt-3 text-gray-600">Halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>
      <Link to="/" className="btn-primary mt-8">Kembali ke Beranda</Link>
    </section>
  )
}
