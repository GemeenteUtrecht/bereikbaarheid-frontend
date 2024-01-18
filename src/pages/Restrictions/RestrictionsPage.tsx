import { Map } from '@amsterdam/arm-core'
import { useMatchMedia } from '@amsterdam/asc-ui'
import { useState } from 'react'
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css'

import FeedbackModal from '../../shared/components/FeedbackModal'
import { MainContent, PageWrapper } from '../../shared/components/FullPageSize'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle'
import { MapStyle } from '../../shared/map/mapStyle'
import { defaultMapOptions } from '../../shared/map/mapDefaults'

import RestrictionsHeader from './components/Header'
import { RestrictionsMapLayers } from './components/MapLayers'
import { RestrictionsViewerContainer } from './components/ViewerContainer'
import RestrictionsMapProvider from './contexts/MapProvider'

const StyledMap = styled(Map<typeof Map>)`
  flex-grow: 1;
`

const RestrictionsPage = () => {
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false)

  useDocumentTitle('Overzicht beperkingen Utrecht')

  // variables concerning the map
  const [showDesktopVariant] = useMatchMedia({ minBreakpoint: 'tabletM' })

  return (
    <PageWrapper>
      <RestrictionsHeader
        setOpenFeedbackModal={setOpenFeedbackModal}
        title="Overzicht beperkingen"
      />

      <MainContent data-testid="restrictions-page">
        <MapStyle />
        <StyledMap options={defaultMapOptions}>
          <RestrictionsMapProvider>
            <RestrictionsViewerContainer {...{ showDesktopVariant }} />

            <RestrictionsMapLayers />
          </RestrictionsMapProvider>
        </StyledMap>
      </MainContent>

      <FeedbackModal setOpen={setOpenFeedbackModal} open={openFeedbackModal} />
    </PageWrapper>
  )
}

export default RestrictionsPage
