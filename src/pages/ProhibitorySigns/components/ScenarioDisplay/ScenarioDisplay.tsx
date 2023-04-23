import { MapPanelContent, MapPanelContentProps } from '@amsterdam/arm-core'

import { useProhibitorySignsPageContext } from '../../contexts/PageContext'

import ScenarioDisplayRdwInfo from './RdwInfo'
import ScenarioDisplayResult from './Result'
import ScenarioDisplayStartAndAddress from './StartAndAddress'

const ScenarioDisplay = ({ ...otherProps }: MapPanelContentProps) => {
  const { showScenarioWizard } = useProhibitorySignsPageContext()

  return (
    <MapPanelContent {...otherProps}>
      {/* only display scenario outcome when needed info is available
          for hooks embedded in included components */}
      {!showScenarioWizard && (
        <>
          <ScenarioDisplayStartAndAddress />

          <ScenarioDisplayRdwInfo />

          <ScenarioDisplayResult />
        </>
      )}
    </MapPanelContent>
  )
}

export default ScenarioDisplay
