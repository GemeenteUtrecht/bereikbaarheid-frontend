import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import { TrafficSign } from '../../../api/nationaalwegenbestand/rvv/verkeersborden'

import { mapLayerActionType, mapLayersInitialState } from './mapLayersReducer'

export type ProhibitorySignsMapContextProps = {
  activeBaseLayer: string
  setActiveBaseLayer: Dispatch<SetStateAction<string>>
  activeMapLayers: typeof mapLayersInitialState
  updateActiveMapLayers: Dispatch<mapLayerActionType>
  currentTrafficSign: TrafficSign | undefined
  setCurrentTrafficSign: Dispatch<SetStateAction<TrafficSign | undefined>>
}

export const ProhibitorySignsMapContext = createContext<
  ProhibitorySignsMapContextProps | undefined
>(undefined)

export function useProhibitorySignsMapContext() {
  const context = useContext(ProhibitorySignsMapContext)
  if (context === undefined) {
    throw new Error(
      'useProhibitorySignsMapContext must be within ProhibitorySignsMapProvider',
    )
  }

  return context
}
