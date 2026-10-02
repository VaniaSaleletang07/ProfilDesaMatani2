import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { apiRequest, adminEntryPath } from '../../lib/api'

export default function ProtectedAdminRoute() {
  const [status, setStatus] = useState('loading')
  const location = useLocation()

  useEffect(() => {
    apiRequest('/api/auth/session')
      .then(() => setStatus('authenticated'))
      .catch(() => setStatus('unauthenticated'))
  }, [])

  if (status === 'loading') {
    return <div className="flex min-h-screen items-center justify-center bg-background text-gray-600">Memeriksa sesi admin…</div>
  }
  if (status === 'unauthenticated') return <Navigate to={adminEntryPath} replace state={{ from: location.pathname }} />
  return <Outlet />
}
