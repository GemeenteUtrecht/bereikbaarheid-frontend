import { BaseLayer } from '@amsterdam/arm-core'
import { TileLayer } from '@amsterdam/react-maps'

import {
  aerialImages,
  oneWayArrows,
  roadNetworkNoRestrictions,
  topoBlackWhite,
} from '../../../../shared/map/mapLayers'

import { useRestrictionsMapContext } from '../../contexts/MapContext'
import {
  vehicleAxleWeightLayerId,
  vehicleWidthLayerId,
} from '../../contexts/mapLayersReducer'
import {
  axleWeightCategories,
  widthCategories,
} from '../../vehiclePropertyCategories'

import { RestrictionsMapLayerVehicleProperty } from './VehicleProperty'

function selectedBaseLayer(id: string) {
  return [aerialImages, topoBlackWhite].find(layer => layer.id === id)
}

export const RestrictionsMapLayers = () => {
  const { activeBaseLayer } = useRestrictionsMapContext()

  return (
    <>
      <RestrictionsMapLayerVehicleProperty
        categories={axleWeightCategories}
        layerId={vehicleAxleWeightLayerId}
        propertyName="axleWeight"
      />

      <RestrictionsMapLayerVehicleProperty
        categories={widthCategories}
        layerId={vehicleWidthLayerId}
        propertyName="width"
      />

      <TileLayer
        options={{ ...roadNetworkNoRestrictions.options, opacity: 0.5 }}
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
