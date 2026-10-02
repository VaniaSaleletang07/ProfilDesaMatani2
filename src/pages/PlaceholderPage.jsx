import Breadcrumb from '../components/common/Breadcrumb'
import usePageMeta from '../hooks/usePageMeta'

export default function PlaceholderPage({ page }) {
  usePageMeta(`${page.title} | Kelurahan Matani 2`, page.description)

  return (
    <>
      <header className="relative overflow-hidden border-b border-red-100 bg-gradient-to-br from-red-50 to-white py-12 md:py-16">
        <div className="absolute -right-16 -top-28 h-72 w-72 rounded-full border-[40px] border-primary/5" />
        <div className="container-page">
          <Breadcrumb current={page.title} />
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-primary">Kelurahan Matani 2</p>
          <h1 className="mt-3 text-3xl font-bold text-ink md:text-5xl">{page.title}</h1>
          <div className="mt-5 h-1 w-12 rounded-full bg-primary" />
        </div>
      </header>
      <section className="section-space">
        <div className="container-page">
          <div className="flex min-h-72 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-500">
            <div><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary"><svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 4h16v16H4zM8 9h8M8 13h8M8 17h5" /></svg></span><p className="mt-4">{page.placeholder}</p></div>
          </div>
        </div>
      </section>
    </>
  )
}
