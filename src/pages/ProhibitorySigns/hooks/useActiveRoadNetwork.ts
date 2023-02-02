import { layerIds } from '../contexts/mapLayersReducer'

export const useActiveRoadNetwork = () => {
  let activeRoadNetwork: typeof layerIds[number] = 'roadNetworkNoRestrictions'

  return activeRoadNetwork
}
