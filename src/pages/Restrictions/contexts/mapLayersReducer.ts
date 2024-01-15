export const prohibitoryRoadsLayerId = 'prohibitoryRoads'
export const trafficSignsLayerId = 'trafficSigns'

export const mapLayersInitialState = {
  [prohibitoryRoadsLayerId]: false,
  [trafficSignsLayerId]: false,
}

// layer ids are equal to layer id in shared/map/mapLayers
export const layerIds = ['prohibitoryRoads', 'trafficSigns'] as const

export type mapLayerActionType =
  | { type: 'TOGGLE'; layerId: (typeof layerIds)[number] }
  | { type: 'UPDATE'; layerId: (typeof layerIds)[number]; enabled: boolean }

export const mapLayersReducer = (
  state: typeof mapLayersInitialState,
  action: mapLayerActionType,
) => {
  switch (action.type) {
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
