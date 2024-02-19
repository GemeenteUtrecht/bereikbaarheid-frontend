import { GeoJSON } from '@amsterdam/arm-core'
import { useQueries } from '@tanstack/react-query'

import { getRoadSectionsRvv } from '../../../../api/nationaalwegenbestand/rvv/wegvakken'

import { vehicleAxleWeightLayerId } from '../../contexts/mapLayersReducer'
import { useRestrictionsMapContext } from '../../contexts/MapContext'
import type { VehiclePropertyCategory } from '../../types/vehiclePropertyCategory'
import { defaultVehicle } from '../../defaultVehicle'

// determines the order of drawing GeoJSON layers
//  categorieen: 2 ton, 3.5 ton, 4 ton, 5 ton, 8 ton, 9 ton
export const vehicleAxleWeightCategories: VehiclePropertyCategory[] = [
  { color: 'rgb(197,59,47)', label: '9 t', value: 9001 },
  { color: 'rgb(229, 153, 93)', label: '8 t', value: 8001 },
  { color: 'rgb(0, 195, 169)', label: '5 t', value: 5001 },
  { color: 'rgb(252, 132, 173)', label: '4 t', value: 4001 },
  { color: 'rgb(0, 186, 249)', label: '3,5 t', value: 3501 },
  { color: 'rgb(185, 157, 250)', label: '2 t', value: 2001 },
]

export const RestrictionsMapLayerVehicleAxleWeight = () => {
  const { activeMapLayers } = useRestrictionsMapContext()
  const queryResults = useQueries({
    queries: vehicleAxleWeightCategories.map(category => ({
      enabled: activeMapLayers[vehicleAxleWeightLayerId],
      queryKey: ['vehicleAxleWeight', category.value],
      queryFn: ({ signal }: { signal?: AbortSignal }) =>
        getRoadSectionsRvv(
          { ...defaultVehicle, axleWeight: category.value },
          0,
          'Bedrijfsauto',
          signal,
        ),
      staleTime: 1000 * 60 * 15,
    })),
  })

  const isLoading = queryResults.some(query => query.isLoading)
  const hasError = queryResults.some(
    query => query.isError && query.error instanceof Error,
  )

  if (hasError) console.error('something went wrong')

  if (isLoading) return null

  if (!activeMapLayers[vehicleAxleWeightLayerId]) return null

  return (
    <>
      {queryResults.map((query, index) => {
        return (
          <GeoJSON
            args={[query.data!]}
            key={index}
            options={{
              interactive: false,
              style: {
                color: vehicleAxleWeightCategories[index].color,
              },
            }}
          />
        )
      })}
    </>
  )
}
