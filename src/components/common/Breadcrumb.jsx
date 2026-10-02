import { Link } from 'react-router-dom'

export default function Breadcrumb({ current }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
      <ol className="flex items-center gap-2">
        <li><Link to="/" className="font-semibold text-primary hover:underline">Beranda</Link></li>
        <li className="text-gray-400" aria-hidden="true">&#8250;</li>
        <li className="font-medium text-gray-600" aria-current="page">{current}</li>
      </ol>
    </nav>
  )
}
