import { Column, Divider, Row } from '@amsterdam/asc-ui'

import { MapLegend } from '../../../../shared/components/MapLegend'

import { RestrictionsMapLegendBaseLayers } from './BaseLayers'
import { RestrictionsMapLegendRoadNetwork } from './RoadNetwork'

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
    </MapLegend>
  )
}
