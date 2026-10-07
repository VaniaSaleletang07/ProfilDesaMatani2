/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { village as defaultVillage } from '../data/desa'
import { headOfficial as defaultOfficial, organization as defaultOrganization } from '../data/pemerintahan'
import { statistics as defaultStatistics } from '../data/statistik'
import { featuredPotentials as defaultPotentials } from '../data/potensi'
import { galleryPreview as defaultGallery } from '../data/galeri'
import { initialBusinesses } from '../data/umkm'
import { neighborhoods as defaultNeighborhoods } from '../data/lingkungan'
import { apiRequest } from '../lib/api'

const fallbackContent = {
  village: defaultVillage,
  headOfficial: defaultOfficial,
  organization: defaultOrganization,
  statistics: defaultStatistics,
  featuredPotentials: defaultPotentials,
  galleryPreview: defaultGallery,
  businesses: initialBusinesses,
  neighborhoods: defaultNeighborhoods,
}

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent] = useState(fallbackContent)
  const [loading, setLoading] = useState(true)

  async function refreshContent() {
    try {
      const data = await apiRequest('/api/public/content')
      setContent({ ...fallbackContent, ...data })
      return data
    } catch {
      return fallbackContent
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refreshContent() }, [])

  const value = useMemo(() => ({ content, setContent, refreshContent, loading }), [content, loading])
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const context = useContext(ContentContext)
  if (!context) throw new Error('useContent harus digunakan di dalam ContentProvider')
  return context
}
