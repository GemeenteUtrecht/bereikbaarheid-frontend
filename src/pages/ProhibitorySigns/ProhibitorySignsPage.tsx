import {
  Map,
  MapPanel,
  mapPanelConstants,
  MapPanelDrawer,
  MapPanelProvider,
} from '@amsterdam/arm-core'
import { useMatchMedia } from '@amsterdam/asc-ui'
import { useState } from 'react'
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css'

import { HEADER_HEIGHT } from '../../shared/constants'
import FeedbackModal from '../../shared/components/FeedbackModal'
import { MainContent, PageWrapper } from '../../shared/components/FullPageSize'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle'
import { MapStyle } from '../../shared/map/mapStyle'
import { defaultMapOptions } from '../../shared/map/mapDefaults'

import ProhibitorySignsHeader from './components/Header'
import ProhibitorySignsDetailFeature from './components/DetailFeature'
import ProhibitorySignsMapLayers from './components/MapLayers'
import ProhibitorySignsScenarioWizard from './components/ScenarioWizard'
import ProhibitorySignsViewerContainer from './components/ViewerContainer'
import ProhibitorySignsPageProvider from './contexts/PageProvider'
import ScenarioDisplay from './components/ScenarioDisplay'
import ProhibitorySignsMapProvider from './contexts/MapProvider'

const { SnapPoint } = mapPanelConstants

const StyledMap = styled(Map<typeof Map>)`
  flex-grow: 1;
`

const ProhibitorySignsPage = () => {
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false)

  useDocumentTitle('Bereikbaarheid Utrecht')

  // variables concerning the map
  const [showDesktopVariant] = useMatchMedia({ minBreakpoint: 'tabletM' })
  const Element = showDesktopVariant ? MapPanel : MapPanelDrawer

  return (
    <PageWrapper>
      <ProhibitorySignsPageProvider>
        <ProhibitorySignsHeader
          setOpenFeedbackModal={setOpenFeedbackModal}
          title="Bereikbaarheid"
        />

        <MainContent data-testid="prohibitory-signs-page">
          <MapStyle />
          <StyledMap options={defaultMapOptions}>
            <ProhibitorySignsMapProvider>
              <MapPanelProvider
                variant={showDesktopVariant ? 'panel' : 'drawer'}
                initialPosition={SnapPoint.Closed}
                topOffset={HEADER_HEIGHT}
              >
                <Element>
                  <ScenarioDisplay />

                  <ProhibitorySignsDetailFeature />
                </Element>

                <ProhibitorySignsViewerContainer {...{ showDesktopVariant }} />

                <ProhibitorySignsScenarioWizard
                  setShowFeedbackModal={setOpenFeedbackModal}
                />
              </MapPanelProvider>

              <ProhibitorySignsMapLayers />
            </ProhibitorySignsMapProvider>
          </StyledMap>
        </MainContent>
      </ProhibitorySignsPageProvider>

      <FeedbackModal setOpen={setOpenFeedbackModal} open={openFeedbackModal} />
    </PageWrapper>
  )
}

export default ProhibitorySignsPage
