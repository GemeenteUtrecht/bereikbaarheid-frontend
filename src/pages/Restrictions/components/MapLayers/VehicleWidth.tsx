import { GeoJSON } from '@amsterdam/arm-core'
import { useQueries } from '@tanstack/react-query'

import { getRoadSectionsRvv } from '../../../../api/nationaalwegenbestand/rvv/wegvakken'

import { vehicleWidthLayerId } from '../../contexts/mapLayersReducer'
import { useRestrictionsMapContext } from '../../contexts/MapContext'
import { defaultVehicle } from '../../defaultVehicle'

// determines the order of drawing GeoJSON layers
export const vehicleWidthCategories = [
  { color: '#da3417', label: '2,3 m', value: 2.31 },
  { color: '#f59309', label: '2,1 m', value: 2.11 },
]

export const RestrictionsMapLayerVehicleWidth = () => {
  const { activeMapLayers } = useRestrictionsMapContext()
  const queryResults = useQueries({
    queries: vehicleWidthCategories.map(category => ({
      enabled: activeMapLayers[vehicleWidthLayerId],
      queryKey: ['vehicleWidth', category.value],
      queryFn: ({ signal }: { signal?: AbortSignal }) =>
        getRoadSectionsRvv(
          { ...defaultVehicle, width: category.value },
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

  if (!activeMapLayers[vehicleWidthLayerId]) return null

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
                color: vehicleWidthCategories[index].color,
              },
            }}
          />
        )
      })}
    </>
  )
}
