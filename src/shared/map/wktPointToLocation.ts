//
// Translates "POINT(4.57166443 52.20547231)"
// to { lat: 52.20547231, lng: 4.57166443 }
// credits: https://github.com/Signalen/frontend/blob/develop/src/shared/services/map-location/map-location.ts
//
import type { LatLngLiteral, LatLngTuple } from 'leaflet'

const sanitizeCoordinates = (coordinates: LatLngTuple): LatLngTuple =>
  coordinates.sort((a, b) => (a > b ? 1 : -1)).reverse() as LatLngTuple

export const wktPointToLocation = (wktPoint: string): LatLngLiteral => {
  const pointMatch = wktPoint.match(/\d+\.\d+/gi)

  if (!wktPoint.includes('POINT') || !pointMatch || pointMatch?.length <= 1) {
    throw new TypeError('Provided WKT geometry is not a point.')
  }

  const [lat, lng] = sanitizeCoordinates(
    pointMatch.map(str => Number.parseFloat(str)) as LatLngTuple
  )

  return {
    lat,
    lng,
  }
}
