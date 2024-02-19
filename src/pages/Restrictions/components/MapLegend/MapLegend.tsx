import { Column, Divider, RadioGroup, Row } from '@amsterdam/asc-ui'

import { MapLegend } from '../../../../shared/components/MapLegend'

import {
  vehicleAxleWeightLayerId,
  vehicleWidthLayerId,
} from '../../contexts/mapLayersReducer'

import { vehicleAxleWeightCategories } from '../MapLayers/VehicleAxleWeight'
import { vehicleWidthCategories } from '../MapLayers/VehicleWidth'

import { RestrictionsMapLegendBaseLayers } from './BaseLayers'
import { RestrictionsMapLegendRoadNetwork } from './RoadNetwork'
import { RestrictionsMapLegendVehicleProperty } from './VehicleProperty'

export const RestrictionsMapLegend = () => {
  return (
    <MapLegend>
      <RestrictionsMapLegendBaseLayers />

      <Divider />

      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <RestrictionsMapLegendRoadNetwork />
        </Column>
      </Row>

      <Divider />

      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <RadioGroup name="maplayers-vehicle-properties">
            <RestrictionsMapLegendVehicleProperty
              categories={vehicleAxleWeightCategories}
              layerId={vehicleAxleWeightLayerId}
              label="Aslast"
            />

            <RestrictionsMapLegendVehicleProperty
              categories={vehicleWidthCategories}
              layerId={vehicleWidthLayerId}
              label="Breedte"
            />
          </RadioGroup>
        </Column>
      </Row>
    </MapLegend>
  )
}
