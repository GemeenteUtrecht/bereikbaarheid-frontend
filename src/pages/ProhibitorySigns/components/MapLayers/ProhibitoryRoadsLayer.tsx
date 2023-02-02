import { GeoJSON } from '@amsterdam/arm-core'
import { PathOptions } from 'leaflet'
import { useQuery } from 'react-query'

import { getRoadSectionsRvv } from '../../../../api/nationaalwegenbestand/rvv/wegvakken'

import { prohibitoryRoadsLayerId } from '../../contexts/mapLayersReducer'
import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { useRdwGeneralInfo } from '../../hooks/useRdwGeneralInfo'
import { useEffect } from 'react'

export const prohibitoryRoadsColors = {
  rvv: '#ffd83d',
}

const statusCodesToColors = new Map([[11001, prohibitoryRoadsColors.rvv]])

const ProhibitorySignsProhibitoryRoadsLayer = () => {
  const { activeMapLayers, updateActiveMapLayers } =
    useProhibitorySignsMapContext()
  const { showScenarioWizard, vehicle } = useProhibitorySignsPageContext()
  const rdwGeneralInfo = useRdwGeneralInfo()
  const rdwGeneralData = rdwGeneralInfo.data
  const prohibitoryRoads = useQuery({
    enabled: !!rdwGeneralData && !!vehicle.axleWeight && !!vehicle.weight,
    queryKey: ['prohibitoryRoads'].concat(Object.values(vehicle)),
    queryFn: ({ signal }) =>
      getRoadSectionsRvv(
        vehicle,
        rdwGeneralData![0].derived.maxAllowedWeight,
        rdwGeneralData![0].derived.vehicleType,
        signal
      ),
  })

  useEffect(() => {
    updateActiveMapLayers({
      type: 'UPDATE',
      layerId: prohibitoryRoadsLayerId,
      enabled: true,
    })
  }, [prohibitoryRoads.data, updateActiveMapLayers])

  if (prohibitoryRoads.isError && prohibitoryRoads.error instanceof Error)
    console.error(prohibitoryRoads.error.message)

  if (prohibitoryRoads.isLoading) return null

  if (showScenarioWizard) return null

  if (!activeMapLayers[prohibitoryRoadsLayerId]) return null

  return (
    <GeoJSON
      args={[prohibitoryRoads.data!]}
      options={{
        interactive: false,
        style: (feature): PathOptions => {
          const statusCode = feature?.properties.bereikbaarheidStatusCode

          return { color: statusCodesToColors.get(statusCode) ?? 'grey' }
        },
      }}
    />
  )
}

export default ProhibitorySignsProhibitoryRoadsLayer
