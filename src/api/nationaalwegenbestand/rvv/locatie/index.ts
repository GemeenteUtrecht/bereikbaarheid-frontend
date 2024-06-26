import axios from 'axios'
import { Point } from 'geojson'

import { Address } from '../../../../types/address'
import { Vehicle } from '../../../../types/vehicle'

import { API_ROOT } from '../../index'

export const ENDPOINT = `${API_ROOT}v1/rvv/locatie`

interface PermitsByLocationData {
  data: {
    attributes: {
      afstandTotBestemmingInMeters: number
      behoeftOntheffingRvv: boolean
      locatie: Point
    }
    id: number
  } | null
}

export function getPermitsByLocation(
  address: Address,
  vehicle: Vehicle,
  vehicleMaxAllowedWeight: number,
  vehicleType: string,
  signal: AbortSignal | undefined,
): Promise<PermitsByLocationData> {
  return axios
    .get(ENDPOINT, {
      params: {
        lat: address.lat,
        lon: address.lon,
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
