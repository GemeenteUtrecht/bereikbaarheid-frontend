export const vehicleAxleWeightLayerId = 'vehicleAxleWeight'
export const vehicleWidthLayerId = 'vehicleWidth'

export const mapLayersInitialState = {
  [vehicleAxleWeightLayerId]: true,
  [vehicleWidthLayerId]: false,
}

export const layerIds = ['vehicleAxleWeight', 'vehicleWidth'] as const

export type mapLayerActionType = {
  type: 'ACTIVATE'
  layerId: (typeof layerIds)[number]
}

export const mapLayersReducer = (
  state: typeof mapLayersInitialState,
  action: mapLayerActionType,
) => {
  switch (action.type) {
    case 'ACTIVATE':
      // reset state
      Object.keys(state).forEach(
        layer => (state[layer as keyof typeof state] = false),
      )

      return {
        ...state,
        [action.layerId]: true,
      }
    default:
      return state
  }
}
