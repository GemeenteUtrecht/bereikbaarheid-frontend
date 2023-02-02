import { Column, Divider, Row } from '@amsterdam/asc-ui'

import { MapLegend } from '../../../../shared/components/MapLegend'

import ProhibitorySignsMapLegendBaseLayers from './BaseLayers'
import ProhibitorySignsMapLegendRoadNetwork from './RoadNetwork'
import ProhibitorySignsMapLegendTrafficSigns from './TrafficSigns'

const ProhibitorySignsMapLegend = () => {
  return (
    <MapLegend>
      <ProhibitorySignsMapLegendBaseLayers />

      <Divider />

      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <ProhibitorySignsMapLegendRoadNetwork />
        </Column>
      </Row>

      <Row halign="flex-start" hasMargin={false}>
        <Column span={12}>
          <ProhibitorySignsMapLegendTrafficSigns />
        </Column>
      </Row>
    </MapLegend>
  )
}

export default ProhibitorySignsMapLegend
