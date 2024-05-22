import {
  Column,
  CompactThemeProvider,
  Heading,
  Paragraph,
  Row,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { useState } from 'react'
import styled from 'styled-components'

import LoadingSpinner from '../../../../shared/components/LoadingSpinner'
import DistanceToDestinationIcon from '../../../../shared/icons/bootstrap-icon-flag-fill.svg?react'
import { theme } from '../../../../styles/Theme'

import { usePermitsByLocation } from '../../hooks/usePermitsByLocation'
import { RvvDetailExplanation, RvvDetailToggle } from '../RvvDetail'

import { FiltersContainer } from './ScenarioDisplayStyle'
import ScenarioDisplayResultIntro from './ResultIntro'
import ScenarioDisplayResultPermitRVV from './ResultPermitRVV'

const HeaderRow = styled(Row)`
  margin-top: ${themeSpacing(4)};
`

const PermitInfoHeader = styled(Paragraph)<{
  $permitLocationData?: boolean
}>`
  margin-top: ${props => (props.$permitLocationData ? themeSpacing(2) : 0)};
`

const DistanceToDestination = styled(Paragraph)`
  font-size: 14px;
  margin-top: ${themeSpacing(3)};
`

const StyledDistanceToDestinationIcon = styled(DistanceToDestinationIcon)`
  position: relative;
  top: 1px;
`

const ScenarioDisplayResult = () => {
  const permitsByLocation = usePermitsByLocation()
  const [showRvvDetails, setShowRvvDetails] = useState(false)

  if (permitsByLocation.isInitialLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <HeaderRow halign="space-between" hasMargin={false}>
        <Column span={12}>
          <Heading as="h4">Resultaat</Heading>
        </Column>
      </HeaderRow>

      <FiltersContainer>
        <CompactThemeProvider overrides={theme}>
          <Row halign="flex-start" hasMargin={false}>
            <Column span={12}>
              <ScenarioDisplayResultIntro />
            </Column>
          </Row>

          <Row halign="flex-start" hasMargin={false}>
            <Column span={12}>
              <PermitInfoHeader
                gutterBottom={0}
                strong
                $permitLocationData={Boolean(permitsByLocation.data?.data)}
              >
                Ontheffingen
              </PermitInfoHeader>
            </Column>
          </Row>

          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>
              <RvvDetailToggle
                showDetails={showRvvDetails}
                setShowDetails={setShowRvvDetails}
                title="RVV"
              />
            </Column>

            <Column span={6}>
              <ScenarioDisplayResultPermitRVV />
            </Column>

            {showRvvDetails && (
              <Column span={12}>
                <RvvDetailExplanation />
              </Column>
            )}
          </Row>

          {permitsByLocation.data?.data &&
            Object.prototype.hasOwnProperty.call(
              permitsByLocation.data?.data.attributes,
              'afstandTotBestemmingInMeters',
            ) && (
              <Row halign="flex-start" hasMargin={false}>
                <Column span={12}>
                  <DistanceToDestination gutterBottom={0}>
                    Let op: afstand tussen adres en dichtsbijzijnde weg{' '}
                    <StyledDistanceToDestinationIcon
                      role="img"
                      title="Een vlaggetje. Hiermee is de dichtsbijzijnde weg gemarkeerd op de kaart."
                    />{' '}
                    is{' '}
                    <span style={{ whiteSpace: 'nowrap' }}>
                      {
                        permitsByLocation.data?.data.attributes
                          .afstandTotBestemmingInMeters
                      }{' '}
                      meter
                    </span>
                    . Controleer of u met dit advies uw bestemming kan bereiken.
                  </DistanceToDestination>
                </Column>
              </Row>
            )}
        </CompactThemeProvider>
      </FiltersContainer>
    </>
  )
}

export default ScenarioDisplayResult
