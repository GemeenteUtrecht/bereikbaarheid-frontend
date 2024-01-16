import { CompactThemeProvider, Label, Radio } from '@amsterdam/asc-ui'
import { MouseEvent } from 'react'

import { MapLegendItem } from '../../../../shared/components/MapLegendItem'
import { LegendItemsWrapper } from '../../../../shared/components/MapLegendStyles'

import { vehicleWidthLayerId } from '../../contexts/mapLayersReducer'
import { useRestrictionsMapContext } from '../../contexts/MapContext'

import { vehicleWidthCategories } from '../MapLayers/VehicleWidth'

export const RestrictionsMapLegendVehicleWidth = () => {
  const { activeMapLayers, updateActiveMapLayers } = useRestrictionsMapContext()
  const categories = [...vehicleWidthCategories].reverse()
  const onClick = (e: MouseEvent<HTMLInputElement>) => {
    updateActiveMapLayers({ type: 'TOGGLE', layerId: vehicleWidthLayerId })
    e.currentTarget.blur()
  }

  return (
    <>
      <Label htmlFor={`maplegend-${vehicleWidthLayerId}`} label="Breedte">
        <Radio
          id={`maplegend-${vehicleWidthLayerId}`}
          checked={activeMapLayers[vehicleWidthLayerId]}
          onClick={onClick}
        />
      </Label>

      {activeMapLayers[vehicleWidthLayerId] && (
        <CompactThemeProvider>
          <LegendItemsWrapper>
            {categories.map(category => (
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
