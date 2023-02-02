import { mapPanelConstants, MapPanelContent } from '@amsterdam/arm-core'
import { useEffect, useState } from 'react'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'

import ProhibitorySignsDetailFeatureTrafficSign from './TrafficSign'

const { Overlay } = mapPanelConstants

const ProhibitorySignsDetailFeature = () => {
  const { currentTrafficSign, setCurrentTrafficSign } =
    useProhibitorySignsMapContext()
  const [currentOverlay, setCurrentOverlay] = useState(Overlay.None)

  useEffect(() => {
    if (!currentTrafficSign) {
      setCurrentOverlay(Overlay.None)
    } else {
      setCurrentOverlay(Overlay.Results)
    }
  }, [currentTrafficSign])

  if (!currentTrafficSign) return null

  return (
    <MapPanelContent
      animate
      stackOrder={currentOverlay === mapPanelConstants.Overlay.Results ? 2 : 1}
      onClose={() => {
        setCurrentTrafficSign(undefined)
      }}
    >
      {currentTrafficSign && <ProhibitorySignsDetailFeatureTrafficSign />}
    </MapPanelContent>
  )
}

export default ProhibitorySignsDetailFeature
