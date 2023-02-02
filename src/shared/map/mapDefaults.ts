//
// Map
//
import { CRS, LatLngExpression } from 'leaflet'

export const defaultMapOptions = {
  center: [52.083, 5.116] as LatLngExpression,
  crs: CRS.EPSG3857, // default arm-core map is in RD
  minZoom: 12, // tile layers are viewable from this zoomlevel
  maxZoom: 18,
  zoom: 13,
  zoomControl: false,
}
