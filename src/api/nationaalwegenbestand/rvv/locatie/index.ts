import axios from 'axios'
import { Point } from 'geojson'

import { Address } from '../../../../types/address'
import { Vehicle } from '../../../../pages/ProhibitorySigns/types/vehicle'

import { API_ROOT } from '../../index'

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
    .get(`${API_ROOT}v1/rvv/locatie`, {
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
