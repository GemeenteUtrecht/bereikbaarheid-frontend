import axios from 'axios'
import {
  Feature,
  FeatureCollection,
  LineString,
  MultiLineString,
} from 'geojson'

import { Vehicle } from '../../../../types/vehicle'

import { API_ROOT } from '../../index'

export const ENDPOINT = `${API_ROOT}v1/rvv/wegvakken`

interface ProhibitoryRoad extends Feature {
  geometry: LineString | MultiLineString
  properties: {
    bereikbaarheidStatusCode: number
    id: number
  }
}

export interface ProhibitoryRoadsFeatureCollection extends FeatureCollection {
  features: [] | ProhibitoryRoad[]
}

export function getRoadSectionsRvv(
  vehicle: Vehicle,
  vehicleMaxAllowedWeight: number,
  vehicleType: string,
  signal: AbortSignal | undefined,
): Promise<ProhibitoryRoadsFeatureCollection> {
  return axios
    .get(ENDPOINT, {
      params: {
        voertuigAslast: vehicle.axleWeight,
        voertuigBreedte: vehicle.width,
        voertuigHeeftAanhanger: vehicle.hasTrailer,
        voertuigHoogte: vehicle.height,
        voertuigLengte: vehicle.length,
        voertuigToegestaanMaximaalGewicht: vehicleMaxAllowedWeight,
        voertuigTotaalGewicht: vehicle.weight,
        voertuigType: vehicleType,
      },
      signal,
    })
    .then(response => response.data)
}
