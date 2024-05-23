import { layerIds } from '../contexts/mapLayersReducer'

export const useActiveRoadNetwork = () => {
  const activeRoadNetwork: (typeof layerIds)[number] =
    'roadNetworkNoRestrictions'

  return activeRoadNetwork
}
