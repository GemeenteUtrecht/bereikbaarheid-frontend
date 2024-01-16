import { Column, Divider, RadioGroup, Row } from '@amsterdam/asc-ui'

import { MapLegend } from '../../../../shared/components/MapLegend'

import { RestrictionsMapLegendBaseLayers } from './BaseLayers'
import { RestrictionsMapLegendRoadNetwork } from './RoadNetwork'
import { RestrictionsMapLegendVehicleWidth } from './VehicleWidth'

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
            <RestrictionsMapLegendVehicleWidth />
          </RadioGroup>
        </Column>
      </Row>
    </MapLegend>
  )
}
