export const siteInfo = {
  shortName: 'Matani 2',
  fullName: 'Kelurahan Matani 2',
  region: 'Kecamatan Tomohon Tengah, Kota Tomohon, Sulawesi Utara',
  logo: '/images/logo-placeholder.svg',
  footerDescription: 'Portal informasi profil Kelurahan Matani 2.',
  copyright: 'Kelurahan Matani 2',
}

export const navigation = [
  { label: 'Beranda', path: '/' },
  { label: 'Profil', path: '/profil' },
  { label: 'Pemerintahan', path: '/pemerintahan' },
  { label: 'Data Penduduk', path: '/data-penduduk' },
  { label: 'Potensi', path: '/potensi' },
  { label: 'Wisata & Budaya', path: '/wisata-budaya' },
  { label: 'Fasilitas', path: '/fasilitas' },
  { label: 'Galeri', path: '/galeri' },
  { label: 'Kontak', path: '/kontak' },
]

export const pageRoutes = navigation.slice(1).map((item) => ({
  ...item,
  title: item.label,
  description: `Informasi ${item.label.toLowerCase()} Kelurahan Matani 2.`,
  placeholder: `[ISI: konten halaman ${item.label}]`,
}))

export const meta = {
  home: {
    title: 'Beranda | Kelurahan Matani 2',
    description: 'Website profil Kelurahan Matani 2, Kecamatan Tomohon Tengah, Kota Tomohon, Sulawesi Utara.',
  },
  notFound: {
    title: 'Halaman Tidak Ditemukan | Kelurahan Matani 2',
    description: 'Halaman yang Anda cari tidak ditemukan.',
  },
}
