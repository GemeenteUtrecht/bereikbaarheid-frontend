import { CompactThemeProvider, Label, Radio } from '@amsterdam/asc-ui'
import { MouseEvent } from 'react'

import { MapLegendItem } from '../../../../shared/components/MapLegendItem'
import { LegendItemsWrapper } from '../../../../shared/components/MapLegendStyles'

import { vehicleAxleWeightLayerId } from '../../contexts/mapLayersReducer'
import { useRestrictionsMapContext } from '../../contexts/MapContext'

import { vehicleAxleWeightCategories } from '../MapLayers/VehicleAxleWeight'

export const RestrictionsMapLegendVehicleAxleWeight = () => {
  const { activeMapLayers, updateActiveMapLayers } = useRestrictionsMapContext()
  const categories = [...vehicleAxleWeightCategories].reverse()
  const onClick = (e: MouseEvent<HTMLInputElement>) => {
    updateActiveMapLayers({
      type: 'ACTIVATE',
      layerId: vehicleAxleWeightLayerId,
    })
    e.currentTarget.blur()
  }

  return (
    <>
      <Label htmlFor={`maplegend-${vehicleAxleWeightLayerId}`} label="Aslast">
        <Radio
          id={`maplegend-${vehicleAxleWeightLayerId}`}
          checked={activeMapLayers[vehicleAxleWeightLayerId]}
          onClick={onClick}
        />
      </Label>

      {activeMapLayers[vehicleAxleWeightLayerId] && (
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
