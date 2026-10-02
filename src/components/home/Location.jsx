import SectionHeading from '../common/SectionHeading'
import { useContent } from '../../context/ContentContext'
import { GeoJSON, LayerGroup, LayersControl, MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import { mataniDuaBoundary, territoryData } from '../../data/wilayah'

export default function Location() {
  const { content: { village } } = useContent()
  const officeMapsUrl = village.mapEmbedUrl?.replace('&output=embed', '').replace('?output=embed', '') || territoryData.googleMapsUrl

  return (
    <section className="bg-[#f7f3f3] py-5 pb-16 md:pb-24">
      <div className="container-page section-panel p-6 sm:p-10 lg:p-14">
        <SectionHeading eyebrow="Temukan Kami" title="Lokasi Kelurahan" />
        <div className="grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-card lg:grid-cols-[1.55fr_1fr]">
          <div className="min-h-[380px] bg-gray-200">
            <MapContainer center={[1.302, 124.851]} zoom={14} scrollWheelZoom={false} className="h-full min-h-[380px] w-full" aria-label="Peta batas wilayah Kelurahan Matani Dua">
              <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Satelit">
                  <LayerGroup>
                    <TileLayer attribution='Tiles &copy; Esri — Sources: Esri, Maxar, Earthstar Geographics, and the GIS User Community' url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                    <TileLayer attribution="Esri reference labels" url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}" />
                  </LayerGroup>
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Peta Jalan">
                  <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </LayersControl.BaseLayer>
              </LayersControl>
              <GeoJSON data={mataniDuaBoundary} interactive={false} style={{ color: '#FFFFFF', weight: 8, opacity: 0.9, fillOpacity: 0 }} />
              <GeoJSON data={mataniDuaBoundary} style={{ color: '#EF4444', weight: 4, opacity: 1, fillColor: '#B91C1C', fillOpacity: 0.2, dashArray: '8 7' }} onEachFeature={(_feature, layer) => layer.bindPopup('<strong>Kelurahan Matani Dua</strong><br>Batas wilayah indikatif')} />
              <FitBoundary />
            </MapContainer>
          </div>
          <div className="relative flex flex-col justify-center overflow-hidden bg-primary-dark p-8 text-white md:p-10 lg:p-12">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border-[28px] border-white/5" />
            <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-red-200">Kantor Kelurahan</p>
            <h3 className="relative mt-3 text-2xl font-bold">{village.name}</h3>
            <div className="relative mt-7 space-y-6">
              <InfoRow label="Alamat" value={village.address} icon={<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />} />
              <InfoRow label="Telepon" value={village.phone} icon={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />} />
              <InfoRow label="Jam Layanan" value={village.serviceHours} icon={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>} />
            </div>
            <a href={officeMapsUrl} target="_blank" rel="noreferrer" className="relative mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-primary-dark transition hover:bg-red-50">Buka Titik Kantor di Google Maps <span className="ml-2" aria-hidden="true">&#8599;</span></a>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-1 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between"><p>{territoryData.boundaryDisclaimer}</p><p>Sumber batas: {territoryData.boundarySource}</p></div>
      </div>
    </section>
  )
}

function InfoRow({ label, value, icon }) {
  return <div className="flex gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-red-100"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">{icon}</svg></span><div><p className="text-xs font-bold uppercase tracking-wider text-red-200">{label}</p><p className="mt-1 leading-6 text-red-50">{value}</p></div></div>
}

function FitBoundary() {
  const map = useMap()
  useEffect(() => {
    map.fitBounds(L.geoJSON(mataniDuaBoundary).getBounds(), { padding: [24, 24] })
  }, [map])
  return null
}
