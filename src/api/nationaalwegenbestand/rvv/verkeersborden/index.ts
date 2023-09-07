import axios from 'axios'
import { Feature, FeatureCollection, Point } from 'geojson'

import { Vehicle } from '../../../../pages/ProhibitorySigns/types/vehicle'

const API_ROOT = process.env.REACT_APP_API_ROOT

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

interface TrafficSignsFeatureCollection extends FeatureCollection {
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
          .map(([key, value], i) =>
            Array.isArray(value)
              ? `${key}=${value.join('&' + key + '=')}`
              : `${key}=${value}`,
          )
          .join('&')
      },
    },
  })

  return trafficSignsRequest
    .get(`${API_ROOT}v1/rvv/verkeersborden`, {
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
