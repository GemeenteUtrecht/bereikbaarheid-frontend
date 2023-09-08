import { ReactNode, useReducer, useState } from 'react'

import { TrafficSign } from '../../../api/nationaalwegenbestand/rvv/verkeersborden'
import { topoBlackWhite } from '../../../shared/map/mapLayers'

import { mapLayersInitialState, mapLayersReducer } from './mapLayersReducer'
import { ProhibitorySignsMapContext } from './MapContext'

type Props = {
  children: ReactNode
}

const ProhibitorySignsMapProvider = ({ children }: Props) => {
  const [activeBaseLayer, setActiveBaseLayer] = useState(topoBlackWhite.id)
  const [activeMapLayers, updateActiveMapLayers] = useReducer(
    mapLayersReducer,
    mapLayersInitialState,
  )
  const [currentTrafficSign, setCurrentTrafficSign] = useState<
    TrafficSign | undefined
  >(undefined)

  return (
    <ProhibitorySignsMapContext.Provider
      value={{
        activeBaseLayer,
        setActiveBaseLayer,
        activeMapLayers,
        updateActiveMapLayers,
        currentTrafficSign,
        setCurrentTrafficSign,
      }}
    >
      {children}
    </ProhibitorySignsMapContext.Provider>
  )
}

export default ProhibitorySignsMapProvider
