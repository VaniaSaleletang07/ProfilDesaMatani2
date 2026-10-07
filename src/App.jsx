import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'
import NotFoundPage from './pages/NotFoundPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute'
import PotensiPage from './pages/PotensiPage'
import ProfilePage from './pages/ProfilePage'
import KktTeamPage from './pages/KktTeamPage'
import { pageRoutes } from './data/site'
import { adminEntryPath, adminPanelPath } from './lib/api'

export default function App() {
  return (
    <Routes>
      <Route path={adminEntryPath} element={<AdminLoginPage />} />
      <Route element={<ProtectedAdminRoute />}>
        <Route path={adminPanelPath} element={<AdminDashboardPage />} />
      </Route>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/tim-kkt" element={<KktTeamPage />} />
        <Route path="/potensi" element={<PotensiPage />} />
        {pageRoutes.filter((page) => !['/potensi', '/profil', '/tim-kkt'].includes(page.path)).map((page) => (
          <Route key={page.path} path={page.path} element={<PlaceholderPage page={page} />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
