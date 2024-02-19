import { GeoJSON } from '@amsterdam/arm-core'
import { useQueries } from '@tanstack/react-query'

import { getRoadSectionsRvv } from '../../../../api/nationaalwegenbestand/rvv/wegvakken'

import { Vehicle } from '../../../ProhibitorySigns/types/vehicle'

import { layerIds } from '../../contexts/mapLayersReducer'
import { useRestrictionsMapContext } from '../../contexts/MapContext'
import type { VehiclePropertyCategory } from '../../types/vehiclePropertyCategory'
import { defaultVehicle } from '../../defaultVehicle'

interface RestrictionsMapLayerVehiclePropertyProps {
  categories: VehiclePropertyCategory[]
  layerId: (typeof layerIds)[number]
  propertyName: keyof Vehicle
}

export const RestrictionsMapLayerVehicleProperty = ({
  categories,
  layerId,
  propertyName,
}: RestrictionsMapLayerVehiclePropertyProps) => {
  const { activeMapLayers } = useRestrictionsMapContext()
  const queryResults = useQueries({
    queries: categories.map(category => ({
      enabled: activeMapLayers[layerId],
      queryKey: [`vehicle-${propertyName}`, category.value],
      queryFn: ({ signal }: { signal?: AbortSignal }) =>
        getRoadSectionsRvv(
          { ...defaultVehicle, [propertyName]: category.value },
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

  if (!activeMapLayers[layerId]) return null

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
                color: categories[index].color,
              },
            }}
          />
        )
      })}
    </>
  )
}
