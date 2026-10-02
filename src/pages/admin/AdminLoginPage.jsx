import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { apiRequest, adminPanelPath } from '../../lib/api'
import usePageMeta from '../../hooks/usePageMeta'

export default function AdminLoginPage() {
  usePageMeta('Akses Internal | Kelurahan Matani 2', 'Halaman akses internal pengelola website.', 'noindex, nofollow')
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (location.state?.authenticated) return <Navigate to={adminPanelPath} replace />

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await apiRequest('/api/auth/login', { method: 'POST', body: JSON.stringify(form) })
      navigate(adminPanelPath, { replace: true })
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary-dark px-4 py-12">
      <section className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl sm:p-9">
        <div className="text-center">
          <img src="/images/logo-placeholder.svg" alt="" className="mx-auto h-20 w-20" />
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.18em] text-primary">Akses Internal</p>
          <h1 className="mt-2 text-2xl font-bold text-ink">Masuk sebagai Admin</h1>
          <p className="mt-2 text-sm text-gray-600">Gunakan akun pengelola website Kelurahan Matani 2.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-semibold text-gray-700">
            Username
            <input type="text" autoComplete="username" required value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-primary" />
          </label>
          <label className="block text-sm font-semibold text-gray-700">
            Password
            <input type="password" autoComplete="current-password" required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-primary focus:ring-primary" />
          </label>
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-800">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Memeriksa…' : 'Masuk'}</button>
        </form>
      </section>
    </main>
  )
}
