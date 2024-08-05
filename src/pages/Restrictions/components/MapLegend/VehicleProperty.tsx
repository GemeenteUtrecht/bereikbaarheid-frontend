import { CompactThemeProvider, Label, Radio } from '@amsterdam/asc-ui'
import { MouseEvent } from 'react'

import { MapLegendItem } from '../../../../shared/components/MapLegendItem'
import { LegendItemsWrapper } from '../../../../shared/components/MapLegendStyles'

import { type layerIds } from '../../contexts/mapLayersReducer'
import { useRestrictionsMapContext } from '../../contexts/MapContext'
import type { VehiclePropertyCategory } from '../../types/vehiclePropertyCategory'

interface RestrictionsMapLegendVehiclePropertyProps {
  categories: VehiclePropertyCategory[]
  layerId: (typeof layerIds)[number]
  label: string
}

export const RestrictionsMapLegendVehicleProperty = ({
  categories,
  layerId,
  label,
}: RestrictionsMapLegendVehiclePropertyProps) => {
  const { activeMapLayers, updateActiveMapLayers } = useRestrictionsMapContext()
  const legendCategories = [...categories].reverse()
  const onClick = (e: MouseEvent<HTMLInputElement>) => {
    updateActiveMapLayers({ type: 'ACTIVATE', layerId: layerId })
    e.currentTarget.blur()
  }

  return (
    <>
      <Label htmlFor={`maplegend-${layerId}`} label={label}>
        <Radio
          id={`maplegend-${layerId}`}
          checked={activeMapLayers[layerId]}
          onClick={onClick}
        />
      </Label>

      {activeMapLayers[layerId] && (
        <CompactThemeProvider>
          <LegendItemsWrapper>
            {legendCategories.map(category => (
              <MapLegendItem
                key={category.value}
                color={category.color}
                text={category.label}
              />
            ))}
          </LegendItemsWrapper>
        </CompactThemeProvider>
      )}
    </>
  )
}
