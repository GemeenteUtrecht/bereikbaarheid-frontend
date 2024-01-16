import { BaseLayer } from '@amsterdam/arm-core'
import { TileLayer } from '@amsterdam/react-maps'

import {
  aerialImages,
  oneWayArrows,
  roadNetworkNoRestrictions,
  topoBlackWhite,
} from '../../../../shared/map/mapLayers'

import { useRestrictionsMapContext } from '../../contexts/MapContext'
import { RestrictionsMapLayerVehicleWidth } from './VehicleWidth'

function selectedBaseLayer(id: string) {
  return [aerialImages, topoBlackWhite].find(layer => layer.id === id)
}

export const RestrictionsMapLayers = () => {
  const { activeBaseLayer } = useRestrictionsMapContext()

  return (
    <>
      <RestrictionsMapLayerVehicleWidth />

      <TileLayer
        options={{ ...roadNetworkNoRestrictions.options, opacity: 0.65 }}
        args={[roadNetworkNoRestrictions.url]}
      />

      <TileLayer options={oneWayArrows.options} args={[oneWayArrows.url]} />

      <BaseLayer
        baseLayer={selectedBaseLayer(activeBaseLayer)!.url}
        options={selectedBaseLayer(activeBaseLayer)!.options}
      />
    </>
  )
}
