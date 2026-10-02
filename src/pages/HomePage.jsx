import Hero from '../components/home/Hero'
import Statistics from '../components/home/Statistics'
import Welcome from '../components/home/Welcome'
import ProfileSummary from '../components/home/ProfileSummary'
import Potentials from '../components/home/Potentials'
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
      <Statistics />
      <Welcome />
      <ProfileSummary />
      <TerritoryBoundaries />
      <Potentials />
      <GalleryPreview />
      <Location />
    </>
  )
}
