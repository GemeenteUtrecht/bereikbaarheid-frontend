import axios from 'axios'
import { Feature, FeatureCollection, Point } from 'geojson'

import { Vehicle } from '../../../../types/vehicle'

import { API_ROOT } from '../../index'

export const ENDPOINT = `${API_ROOT}v1/rvv/verkeersborden`

export type TrafficSignCategory =
  | 'verbod met uitzondering'
  | 'verplichting'
  | 'vooraankondiging'

export interface TrafficSign extends Feature {
  geometry: Point
  properties: {
    categorie: TrafficSignCategory
    bordWaarde: number | null
    id: number
    netwerkWegvakId: number
    onderbordTekst: string | null
    rvvCode: string
    straatNaam: string
    urlNaarAfbeelding: string
  }
}

export interface TrafficSignsFeatureCollection extends FeatureCollection {
  features: [] | TrafficSign[]
}

export function getTrafficSigns(
  trafficSignCategories: TrafficSignCategory[],
  vehicle: Vehicle,
  vehicleMaxAllowedWeight: number,
  vehicleType: string,
  signal: AbortSignal | undefined,
): Promise<TrafficSignsFeatureCollection> {
  const trafficSignsRequest = axios.create({
    // create an URL with repeated parameters,
    // it is required for trafficSignCategories array
    paramsSerializer: {
      serialize: query => {
        return Object.entries(query)
          .map(([key, value]) =>
            Array.isArray(value)
              ? `${key}=${value.join('&' + key + '=')}`
              : `${key}=${value}`,
          )
          .join('&')
      },
    },
  })

  return trafficSignsRequest
    .get(ENDPOINT, {
      params: {
        categorie: trafficSignCategories,
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
