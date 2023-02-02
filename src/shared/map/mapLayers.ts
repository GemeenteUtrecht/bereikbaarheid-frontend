/**
 * Map layers used on various pages
 */
import { TileLayerOptions } from 'leaflet'
// for an explanation of TileLayerOptions type usage see:
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/15313#issuecomment-441331339

const AERIAL_IMAGES_ATTRIBUTION = `Luchtfoto: © <a class="font-weight-bold" href="https://www.beeldmateriaal.nl/" target="_blank" rel="noopener noreferrer">Beeldmateriaal Nederland</a>.`
const TOPOGRAPHY_ATTRIBUTION = `Topografie: © <a href="http://www.cbs.nl">CBS</a>, <a href="http://www.kadaster.nl">Kadaster</a>, <a href="http://openstreetmap.org">OpenStreetMap</a><span class="printhide">-auteurs (<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>).</span>`

export const aerialImages = {
  id: 'aerialImages',
  label: 'Luchtfoto',
  options: {
    attribution: AERIAL_IMAGES_ATTRIBUTION,
    minZoom: 11,
    maxZoom: 18,
  } as TileLayerOptions,
  url: 'https://service.pdok.nl/hwh/luchtfotorgb/wmts/v1_0/Actueel_ortho25/EPSG:3857/{z}/{x}/{y}.jpeg',
}

export const linkIds = {
  id: 'linkIds',
  label: 'NWB Linknummers',
  options: {
    attribution: 'NWB 2023-01 Link IDs',
    bounds: [
      [52.0114, 4.9477],
      [52.1551, 5.2165],
    ],
    minZoom: 18,
    maxZoom: 18,
    pane: 'overlayPane',
    zIndex: 275,
  } as TileLayerOptions,
  url: 'https://prdstorageutr.blob.core.windows.net/blobstore-utr/data/nwb202301/id/{z}/{x}/{y}.png',
}

export const oneWayArrows = {
  id: 'oneWayArrows',
  label: 'NWB Eenrichtingsverkeer',
  options: {
    attribution: 'NWB 2023-01 Eenrichtingsverkeer',
    bounds: [
      [52.0114, 4.9477],
      [52.1551, 5.2165],
    ],
    minZoom: 18,
    maxZoom: 18,
    pane: 'overlayPane',
    zIndex: 250, // the z-index should be > 200 to let it appear on top of SVG layers.
  } as TileLayerOptions,
  url: 'https://prdstorageutr.blob.core.windows.net/blobstore-utr/data/nwb202301/pijl/{z}/{x}/{y}.png',
}

export const roadNetworkNoRestrictions = {
  id: 'roadNetworkNoRestrictions',
  label: 'NWB Algemeen',
  options: {
    attribution: 'NWB 2023-01 Algemeen',
    bounds: [
      [52.0114, 4.9477],
      [52.1551, 5.2165],
    ],
    minZoom: 6,
    maxZoom: 18,
    zIndex: 50,
  } as TileLayerOptions,
  url: 'https://prdstorageutr.blob.core.windows.net/blobstore-utr/data/nwb202301/lines/{z}/{x}/{y}.png',
}

export const topoBlackWhite = {
  id: 'topoBlackWhite',
  label: 'Topografie grijs',
  options: {
    attribution: TOPOGRAPHY_ATTRIBUTION,
    minZoom: 11,
    maxZoom: 18,
  } as TileLayerOptions,
  url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/grijs/EPSG:3857/{z}/{x}/{y}.png',
}

export const topoColorLight = {
  id: 'topoColorLight',
  label: 'Topografie kleur',
  options: {
    attribution: TOPOGRAPHY_ATTRIBUTION,
    minZoom: 11,
    maxZoom: 18,
  } as TileLayerOptions,
  url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png',
}
