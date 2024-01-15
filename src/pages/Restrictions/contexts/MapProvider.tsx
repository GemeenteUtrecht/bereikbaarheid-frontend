import { ReactNode, useReducer, useState } from 'react'

import { topoBlackWhite } from '../../../shared/map/mapLayers'

import { mapLayersInitialState, mapLayersReducer } from './mapLayersReducer'
import { RestrictionsMapContext } from './MapContext'

type Props = {
  children: ReactNode
}

const RestrictionsMapProvider = ({ children }: Props) => {
  const [activeBaseLayer, setActiveBaseLayer] = useState(topoBlackWhite.id)
  const [activeMapLayers, updateActiveMapLayers] = useReducer(
    mapLayersReducer,
    mapLayersInitialState,
  )

  return (
    <RestrictionsMapContext.Provider
      value={{
        activeBaseLayer,
        setActiveBaseLayer,
        activeMapLayers,
        updateActiveMapLayers,
      }}
    >
      {children}
    </RestrictionsMapContext.Provider>
  )
}

export default RestrictionsMapProvider
