export const galleryPreview = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: `[ISI: judul foto galeri ${index + 1}]`,
  image: `/images/gallery-${index + 1}-placeholder.svg`,
  alt: `[ISI: deskripsi foto galeri ${index + 1}]`,
}))
