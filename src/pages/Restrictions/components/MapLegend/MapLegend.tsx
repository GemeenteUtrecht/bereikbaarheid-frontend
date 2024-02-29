import { Column, Divider, RadioGroup, Row } from '@amsterdam/asc-ui'

import { MapLegend } from '../../../../shared/components/MapLegend'

import {
  vehicleAxleWeightLayerId,
  vehicleHeightLayerId,
  vehicleLengthLayerId,
  vehicleMaxAllowedWeightLayerId,
  vehicleWeightLayerId,
  vehicleWidthLayerId,
} from '../../contexts/mapLayersReducer'

import {
  axleWeightCategories,
  heightCategories,
  lengthCategories,
  maximumAllowedWeightCategories,
  weightCategories,
  widthCategories,
} from '../../vehiclePropertyCategories'

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
              categories={axleWeightCategories}
              layerId={vehicleAxleWeightLayerId}
              label="Aslast"
            />

            <RestrictionsMapLegendVehicleProperty
              categories={widthCategories}
              layerId={vehicleWidthLayerId}
              label="Breedte"
            />

            <RestrictionsMapLegendVehicleProperty
              categories={heightCategories}
              layerId={vehicleHeightLayerId}
              label="Hoogte"
            />

            <RestrictionsMapLegendVehicleProperty
              categories={lengthCategories}
              layerId={vehicleLengthLayerId}
              label="Lengte"
            />

            <RestrictionsMapLegendVehicleProperty
              categories={maximumAllowedWeightCategories}
              layerId={vehicleMaxAllowedWeightLayerId}
              label="Max toegestaan gewicht"
            />

            <RestrictionsMapLegendVehicleProperty
              categories={weightCategories}
              layerId={vehicleWeightLayerId}
              label="Totaal gewicht"
            />
          </RadioGroup>
        </Column>
      </Row>
    </MapLegend>
  )
}
