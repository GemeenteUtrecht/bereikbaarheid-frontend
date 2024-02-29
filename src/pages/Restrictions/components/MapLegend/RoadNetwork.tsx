import { CompactThemeProvider } from '@amsterdam/asc-ui'

import { MapLegendItem } from '../../../../shared/components/MapLegendItem'
import {
  LegendWrapper,
  LegendItemsWrapper,
} from '../../../../shared/components/MapLegendStyles'

import { layerIds } from '../../contexts/mapLayersReducer'
import { useRestrictionsMapContext } from '../../contexts/MapContext'

const vehiclePropertyToLabel: Record<(typeof layerIds)[number], string> = {
  vehicleAxleWeight: 'aslast',
  vehicleHeight: 'hoogte',
  vehicleLength: 'lengte',
  vehicleMaxAllowedWeight: 'gewichts',
  vehicleWeight: 'gewichts',
  vehicleWidth: 'breedte',
}

export const RestrictionsMapLegendRoadNetwork = () => {
  const { activeMapLayers } = useRestrictionsMapContext()
  const noRestrictionsLabel = () => {
    const activeLayer = (
      Object.keys(activeMapLayers) as (keyof typeof activeMapLayers)[]
    ).find(key => activeMapLayers[key])

    return `geen ${vehiclePropertyToLabel[activeLayer!]}beperking`
  }

  return (
    <>
      <LegendWrapper>
        <CompactThemeProvider>
          <LegendItemsWrapper>
            <MapLegendItem
              color="#60b20d"
              marginLeft={1}
              text={noRestrictionsLabel()}
            />

            <MapLegendItem
              color="#91522d"
              height="4px"
              marginLeft={1}
              text="voetgangersgebied"
            />
          </LegendItemsWrapper>
        </CompactThemeProvider>
      </LegendWrapper>
    </>
  )
}
