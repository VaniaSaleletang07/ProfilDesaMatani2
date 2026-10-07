import Hero from '../components/home/Hero'
import Welcome from '../components/home/Welcome'
import Potentials from '../components/home/Potentials'
import FacilitiesPreview from '../components/home/FacilitiesPreview'
import GalleryPreview from '../components/home/GalleryPreview'
import Location from '../components/home/Location'
import TerritoryBoundaries from '../components/home/TerritoryBoundaries'
import usePageMeta from '../hooks/usePageMeta'
import { meta } from '../data/site'

export default function HomePage() {
  usePageMeta(meta.home.title, meta.home.description)

  return (
    <>
      <Hero />
      <Welcome />
      <TerritoryBoundaries />
      <Potentials />
      <FacilitiesPreview />
      <GalleryPreview />
      <Location />
    </>
  )
}
