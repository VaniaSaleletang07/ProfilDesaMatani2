export const territoryData = {
  demographicsPendingVerification: {
    male: 1527,
    female: 1820,
    reportedTotal: 3347,
    calculatedTotal: 3347,
  },
  boundaries: [
    { direction: 'Utara', neighbor: 'Kelurahan Paslaten Dua' },
    { direction: 'Selatan', neighbor: 'Kelurahan Walian dan Matani Tiga' },
    { direction: 'Barat', neighbor: 'Kelurahan Matani Tiga' },
    { direction: 'Timur', neighbor: 'Kelurahan Paslaten Dua dan Satu' },
  ],
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=1.3189788,124.8427179',
  boundarySource: 'GADM 4.1 — IDN.29.15.3.5_1',
  boundaryDisclaimer: 'Batas wilayah pada peta bersifat indikatif dan bukan acuan penetapan batas hukum.',
}

export const mataniDuaBoundary = {
  type: 'Feature',
  properties: { name: 'Kelurahan Matani Dua', code: '7173020002' },
  geometry: {
    type: 'MultiPolygon',
    coordinates: [[[[124.8612, 1.2973], [124.8556, 1.2948], [124.8592, 1.2895], [124.8583, 1.285], [124.8507, 1.294], [124.8501, 1.3003], [124.8417, 1.3092], [124.8428, 1.3112], [124.8415, 1.3135], [124.8423, 1.3206], [124.8445, 1.318], [124.8434, 1.3116], [124.8467, 1.311], [124.8612, 1.2973]]]],
  },
}
