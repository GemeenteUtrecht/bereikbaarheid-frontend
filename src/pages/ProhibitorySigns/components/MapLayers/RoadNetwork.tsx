import { TileLayer } from '@amsterdam/react-maps'
import { useEffect } from 'react'

import { roadNetworkNoRestrictions } from '../../../../shared/map/mapLayers'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { useActiveRoadNetwork } from '../../hooks/useActiveRoadNetwork'

const ProhibitorySignsRoadNetwork = () => {
  const activeRoadNetwork = useActiveRoadNetwork()
  const { activeMapLayers, updateActiveMapLayers } =
    useProhibitorySignsMapContext()
  const { showScenarioWizard } = useProhibitorySignsPageContext()

  useEffect(() => {
    updateActiveMapLayers({
      type: 'ACTIVE_ROAD_NETWORK',
      layerId: activeRoadNetwork,
    })
  }, [activeRoadNetwork, updateActiveMapLayers])

  if (showScenarioWizard) {
    return null
  }

  return (
    <>
      {activeMapLayers[roadNetworkNoRestrictions.id] && (
        <TileLayer
          options={roadNetworkNoRestrictions.options}
          args={[roadNetworkNoRestrictions.url]}
        />
      )}
    </>
  )
}

export default ProhibitorySignsRoadNetwork
