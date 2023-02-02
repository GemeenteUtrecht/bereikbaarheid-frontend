import { useQuery } from 'react-query'

import { getPermitsByLocation } from '../../../api/nationaalwegenbestand/rvv/locatie'

import { useProhibitorySignsPageContext } from '../contexts/PageContext'
import { useRdwGeneralInfo } from './useRdwGeneralInfo'

export const usePermitsByLocation = () => {
  const { address, vehicle } = useProhibitorySignsPageContext()
  const rdwGeneralInfo = useRdwGeneralInfo()
  const rdwGeneralData = rdwGeneralInfo.data

  // setting a higher stale time, so that if the user works with the
  // application for a while - and using the same vehicle & address -
  // our API doesn't get queried on every render of a component.
  const queryResult = useQuery({
    enabled:
      !!rdwGeneralData &&
      !!address.lat &&
      !!vehicle.axleWeight &&
      !!vehicle.weight,
    queryKey: ['permitsByLocation', address.lat, address.lon].concat(
      Object.values(vehicle)
    ),
    queryFn: ({ signal }) =>
      getPermitsByLocation(
        address,
        vehicle,
        rdwGeneralData![0].derived.maxAllowedWeight,
        rdwGeneralData![0].derived.vehicleType,
        signal
      ),
    staleTime: 1000 * 60 * 10,
  })

  return {
    data: queryResult.data,
    isLoading: queryResult.isLoading,
  }
}
