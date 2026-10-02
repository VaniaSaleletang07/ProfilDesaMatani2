export default function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="mb-12 max-w-3xl text-left">
      {eyebrow && <p className={`mb-3 text-xs font-bold uppercase tracking-[0.22em] ${light ? 'text-primary-light' : 'text-primary'}`}>{eyebrow}</p>}
      <h2 className={`text-3xl font-bold leading-tight md:text-4xl ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
      <div className={`mt-4 h-1 w-12 rounded-full ${light ? 'bg-red-200' : 'bg-primary'}`} />
      {description && <p className={`mt-5 leading-7 ${light ? 'text-red-100' : 'text-gray-600'}`}>{description}</p>}
    </div>
  )
}
