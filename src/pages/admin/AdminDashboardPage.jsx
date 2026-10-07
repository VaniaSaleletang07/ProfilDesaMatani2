import { useNavigate } from 'react-router-dom'
import SectionEditor from '../../components/admin/SectionEditor'
import StatisticsEditor from '../../components/admin/StatisticsEditor'
import ItemsManager from '../../components/admin/ItemsManager'
import BusinessesManager from '../../components/admin/BusinessesManager'
import NeighborhoodsEditor from '../../components/admin/NeighborhoodsEditor'
import { useContent } from '../../context/ContentContext'
import { apiRequest } from '../../lib/api'
import usePageMeta from '../../hooks/usePageMeta'

const villageFields = [
  { key: 'name', label: 'Nama wilayah' }, { key: 'region', label: 'Wilayah administratif' },
  { key: 'slogan', label: 'Slogan' }, { key: 'heroImage', label: 'URL gambar hero' },
  { key: 'shortProfile', label: 'Profil singkat', multiline: true }, { key: 'address', label: 'Alamat', multiline: true },
  { key: 'phone', label: 'Nomor telepon' }, { key: 'serviceHours', label: 'Jam layanan' },
  { key: 'mapEmbedUrl', label: 'URL embed Google Maps (bukan link Bagikan/maps.app.goo.gl)', multiline: true },
]
const officialFields = [
  { key: 'name', label: 'Nama kepala wilayah' }, { key: 'position', label: 'Jabatan' },
  { key: 'photo', label: 'URL foto' }, { key: 'greeting', label: 'Teks sambutan', multiline: true },
]
const organizationFields = [
  { key: 'headName', label: 'Nama Lurah' }, { key: 'headNip', label: 'NIP Lurah' },
  { key: 'secretaryName', label: 'Nama Sekretaris' }, { key: 'secretaryNip', label: 'NIP Sekretaris' },
  { key: 'governmentName', label: 'Kasie Pemerintahan & Trantib' }, { key: 'governmentNip', label: 'NIP Kasie Pemerintahan & Trantib' },
  { key: 'developmentName', label: 'Kasie Pembangunan' }, { key: 'developmentNip', label: 'NIP Kasie Pembangunan' },
  { key: 'financeName', label: 'Kasie Keuangan' }, { key: 'financeNip', label: 'NIP Kasie Keuangan' },
  { key: 'welfareName', label: 'Kasie Kesra' }, { key: 'welfareNip', label: 'NIP Kasie Kesra' },
  { key: 'governmentAssistantName', label: 'Pemb. Kasie Pemerintahan & Trantib' }, { key: 'developmentAssistantName', label: 'Pemb. Kasie Pembangunan' },
  { key: 'financeAssistantName', label: 'JFU / Bendahara' }, { key: 'welfareAssistantName', label: 'JFU' },
]

export default function AdminDashboardPage() {
  usePageMeta('Dashboard Admin | Kelurahan Matani 2', 'Dashboard pengelolaan konten website.', 'noindex, nofollow')
  const { content, setContent } = useContent()
  const navigate = useNavigate()

  async function logout() {
    await apiRequest('/api/auth/logout', { method: 'POST' })
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 bg-primary-dark text-white shadow">
        <div className="container-page flex min-h-20 items-center justify-between gap-4">
          <div><p className="font-heading text-lg font-bold">Dashboard Admin</p><p className="text-xs text-primary-light">Kelurahan Matani 2</p></div>
          <div className="flex gap-2"><a href="/" target="_blank" rel="noreferrer" className="rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold hover:bg-white/10">Lihat Website</a><button type="button" onClick={logout} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary-dark">Keluar</button></div>
        </div>
      </header>
      <main className="container-page py-10">
        <div className="mb-8"><h1 className="text-3xl font-bold">Kelola Konten</h1><p className="mt-2 text-gray-600">Perubahan yang disimpan langsung ditampilkan pada website publik.</p></div>
        <div className="space-y-7">
          <BusinessesManager businesses={content.businesses || []} onChanged={setContent} />
          <SectionEditor title="Profil dan Kontak" section="village" value={content.village} fields={villageFields} onSaved={setContent} />
          <SectionEditor title="Kepala Wilayah dan Sambutan" section="headOfficial" value={content.headOfficial} fields={officialFields} onSaved={setContent} />
          <SectionEditor title="Struktur Organisasi Kelurahan" section="organization" value={content.organization} fields={organizationFields} onSaved={setContent} />
          <NeighborhoodsEditor neighborhoods={content.neighborhoods || []} onSaved={setContent} />
          <StatisticsEditor statistics={content.statistics} onSaved={setContent} />
          <ItemsManager title="Potensi Unggulan" type="potentials" items={content.featuredPotentials} onChanged={setContent} />
          <ItemsManager title="Galeri" type="galleries" items={content.galleryPreview} onChanged={setContent} />
        </div>
      </main>
    </div>
  )
}
