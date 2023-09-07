import { roadNetworkNoRestrictions } from '../../../shared/map/mapLayers'

export const prohibitoryRoadsLayerId = 'prohibitoryRoads'
export const trafficSignsLayerId = 'trafficSigns'

export const mapLayersInitialState = {
  [roadNetworkNoRestrictions.id]: false,
  [prohibitoryRoadsLayerId]: false,
  [trafficSignsLayerId]: false,
}

// layer ids are equal to layer id in shared/map/mapLayers
export const layerIds = [
  'roadNetworkNoRestrictions',
  'prohibitoryRoads',
  'trafficSigns',
] as const

export type mapLayerActionType =
  | { type: 'ACTIVE_ROAD_NETWORK'; layerId: (typeof layerIds)[number] }
  | { type: 'TOGGLE'; layerId: (typeof layerIds)[number] }
  | { type: 'UPDATE'; layerId: (typeof layerIds)[number]; enabled: boolean }

export const mapLayersReducer = (
  state: typeof mapLayersInitialState,
  action: mapLayerActionType,
) => {
  switch (action.type) {
    case 'ACTIVE_ROAD_NETWORK':
      return {
        ...state,
        // reset
        [roadNetworkNoRestrictions.id]: false,
        // activate requested layer
        [action.layerId]: true,
      }
    case 'TOGGLE':
      return {
        ...state,
        [action.layerId]: !state[action.layerId],
      }
    case 'UPDATE':
      return {
        ...state,
        [action.layerId]: action.enabled,
      }
    default:
      return state
  }
}
