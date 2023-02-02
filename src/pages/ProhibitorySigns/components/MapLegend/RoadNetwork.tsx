import { Checkbox, CompactThemeProvider, Label } from '@amsterdam/asc-ui'

import { MapLegendItem } from '../../../../shared/components/MapLegendItem'
import {
  LegendWrapper,
  LegendItemsWrapper,
} from '../../../../shared/components/MapLegendStyles'

import { prohibitoryRoadsLayerId } from '../../contexts/mapLayersReducer'
import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { useActiveRoadNetwork } from '../../hooks/useActiveRoadNetwork'

import { prohibitoryRoadsColors } from '../MapLayers/ProhibitoryRoadsLayer'

const ProhibitorySignsMapLegendRoadNetwork = () => {
  const activeRoadNetwork = useActiveRoadNetwork()
  const { activeMapLayers, updateActiveMapLayers } =
    useProhibitorySignsMapContext()
  const { showScenarioWizard } = useProhibitorySignsPageContext()

  const toggleRoadNetworks = () => {
    updateActiveMapLayers({ type: 'TOGGLE', layerId: activeRoadNetwork })
    updateActiveMapLayers({ type: 'TOGGLE', layerId: prohibitoryRoadsLayerId })
  }

  if (showScenarioWizard) {
    return null
  }

  return (
    <>
      <LegendWrapper>
        <Label htmlFor="mapLegendRoadNetwork" label="Benodigde ontheffingen">
          <Checkbox
            id="mapLegendRoadNetwork"
            onChange={toggleRoadNetworks}
            checked={activeMapLayers[activeRoadNetwork]}
          />
        </Label>

        <CompactThemeProvider>
          <LegendItemsWrapper>
            <MapLegendItem color={prohibitoryRoadsColors.rvv} text="RVV" />

            <MapLegendItem color="#60b20d" text="geen ontheffing" />

            <MapLegendItem color="#91522d" text="voetgangersgebied" />
          </LegendItemsWrapper>
        </CompactThemeProvider>
      </LegendWrapper>
    </>
  )
}

export default ProhibitorySignsMapLegendRoadNetwork
