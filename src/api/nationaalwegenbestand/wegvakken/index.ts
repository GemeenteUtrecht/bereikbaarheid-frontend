import axios from 'axios'
import { Feature, FeatureCollection } from 'geojson'

import { API_ROOT } from '../index'

interface NwbCorrection {
  attribuutnaam: string
  nwbWaarde: string | null
  gecorrigeerdNaar: string
}

export interface RoadSection extends Feature {
  properties: {
    wegvakId: number
    wegvakBegindatum: string
    junctieIdBegin: number
    junctieIdEind: number
    wegbeheerdersoort: string
    wegnummer: string
    wegdeelletter: string
    hectoletter: string
    baansubsoortCode: string
    relatievePositieCode: string
    administratieveRichting: string
    rijrichting: string
    straatNaam: string
    straatNaamBron: string
    woonplaats: string
    gemeenteId: number
    toegepasteCorrecties: NwbCorrection[]
  }
}

export interface RoadSectionFeatureCollection extends FeatureCollection {
  features: RoadSection[]
}

export function getRoadSection(
  wegvakId: string | undefined,
  signal: AbortSignal | undefined,
): Promise<RoadSectionFeatureCollection> {
  if (wegvakId === undefined) {
    throw new Error('please provide an NWB road section id')
  }

  return axios
    .get(`${API_ROOT}v1/wegvakken/${wegvakId}`, { signal })
    .then(response => response.data)
}
