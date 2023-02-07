import {
  Button,
  Column,
  CompactThemeProvider,
  Link,
  Row,
  themeSpacing,
} from '@amsterdam/asc-ui'
import { useState } from 'react'
import { generatePath, Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

import { getPathTo } from '../../../../routes'
import { theme } from '../../../../styles/Theme'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import {
  linkToPermitCheck,
  RvvDetailExplanation,
  RvvDetailToggle,
} from '../RvvDetail'

import { PropertiesContainer } from './DetailFeatureStyles'
import ProhibitorySignsDetailFeatureTrafficSignImage from './TrafficSignImage'

const AdditionalInfo = styled.div`
  border: 1px solid ${props => props.theme.colors.tint?.level5};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 60%;
  padding: ${themeSpacing(1)} ${themeSpacing(2)};
  text-align: center;
  word-break: break-word;
`

const AdditionalInfoColumn = styled(Column)`
  word-break: break-word;
`

const ProhibitorySignsDetailFeatureTrafficSign = () => {
  const { currentTrafficSign } = useProhibitorySignsMapContext()
  const { expertMode } = useProhibitorySignsPageContext()
  const [showRvvDetails, setShowRvvDetails] = useState(false)

  return (
    <>
      <ProhibitorySignsDetailFeatureTrafficSignImage />

      {currentTrafficSign?.properties.onderbordTekst && (
        <AdditionalInfo>
          {currentTrafficSign.properties.onderbordTekst}
        </AdditionalInfo>
      )}

      <PropertiesContainer>
        <CompactThemeProvider overrides={theme}>
          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Bordnummer</Column>
            <Column span={6}>{currentTrafficSign?.properties.id}</Column>
          </Row>

          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Straatnaam</Column>
            <Column span={6}>
              {currentTrafficSign?.properties.straatNaam}
            </Column>
          </Row>

          {expertMode && (
            <Row halign="flex-start" hasMargin={false} valign="center">
              <Column span={6}>Link nummer</Column>
              <Column span={6}>
                <Link
                  variant="inline"
                  as={RouterLink}
                  to={generatePath(getPathTo('ROAD_SECTION_DETAIL_PAGE'), {
                    wegvakId: String(
                      Math.abs(currentTrafficSign!.properties.netwerkWegvakId)
                    ),
                  })}
                >
                  {currentTrafficSign!.properties.netwerkWegvakId}
                </Link>
              </Column>
            </Row>
          )}

          {currentTrafficSign?.properties.onderbordTekst && (
            <Row halign="flex-start" hasMargin={false} valign="center">
              <Column span={6}>Onderbord</Column>
              <AdditionalInfoColumn span={6}>
                {currentTrafficSign?.properties.onderbordTekst}
              </AdditionalInfoColumn>
            </Row>
          )}

          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Geldigheid</Column>
            <Column span={6}>{currentTrafficSign?.properties.categorie}</Column>
          </Row>

          {expertMode && currentTrafficSign?.properties.urlNaarAfbeelding && (
            <Row halign="flex-start" hasMargin={false} valign="center">
              <Column span={6}>Bekijk foto</Column>
              <Column span={6}>
                <Link
                  href={currentTrafficSign?.properties.urlNaarAfbeelding}
                  target="_blank"
                  variant="inline"
                >
                  panoramabeeld
                </Link>
              </Column>
            </Row>
          )}

          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>Bekijk in Google</Column>
            <Column span={6}>
              <Link
                href={`https://www.google.com/maps/place/${currentTrafficSign?.geometry.coordinates[1]}+${currentTrafficSign?.geometry.coordinates[0]}`}
                target="_blank"
                variant="inline"
              >
                Streetview
              </Link>
            </Column>
          </Row>

          <Row halign="flex-start" hasMargin={false} valign="center">
            <Column span={6}>
              <RvvDetailToggle
                showDetails={showRvvDetails}
                setShowDetails={setShowRvvDetails}
                title="RVV-ontheffing"
              />
            </Column>
            <Column span={6}>
              <Button
                onClick={() => window.open(linkToPermitCheck, '_blank')}
                variant="primary"
              >
                RVV aanvragen
              </Button>
            </Column>

            {showRvvDetails && (
              <Column span={12}>
                <RvvDetailExplanation />
              </Column>
            )}
          </Row>
        </CompactThemeProvider>
      </PropertiesContainer>
    </>
  )
}

export default ProhibitorySignsDetailFeatureTrafficSign
