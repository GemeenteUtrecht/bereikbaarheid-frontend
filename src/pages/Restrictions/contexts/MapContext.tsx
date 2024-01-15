import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import { mapLayerActionType, mapLayersInitialState } from './mapLayersReducer'

export type RestrictionsMapContextProps = {
  activeBaseLayer: string
  setActiveBaseLayer: Dispatch<SetStateAction<string>>
  activeMapLayers: typeof mapLayersInitialState
  updateActiveMapLayers: Dispatch<mapLayerActionType>
}

export const RestrictionsMapContext = createContext<
  RestrictionsMapContextProps | undefined
>(undefined)

export function useRestrictionsMapContext() {
  const context = useContext(RestrictionsMapContext)
  if (context === undefined) {
    throw new Error(
      'useRestrictionsMapContext must be within RestrictionsMapProvider',
    )
  }

  return context
}
