import { Column, Paragraph, Row } from '@amsterdam/asc-ui'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import {
  getRoadSection,
  RoadSectionFeatureCollection,
} from '../../api/nationaalwegenbestand/wegvakken'
import ContentContainer from '../../shared/components/ContentContainer'
import Header from '../../shared/components/Header'
import LoadingSpinner from '../../shared/components/LoadingSpinner'
import { useDocumentTitle } from '../../shared/hooks/useDocumentTitle'

import RoadSectionDetails from './components/Details'
import RoadSectionMap from './components/Map'

const StyledColumn = styled(Column)`
  flex-direction: column;
`

function NoRoadSection(roadSection: RoadSectionFeatureCollection) {
  return roadSection.features.length === 0
}

function displayDetails(roadSection: RoadSectionFeatureCollection) {
  if (NoRoadSection(roadSection)) {
    return <Paragraph>Wegvak niet gevonden.</Paragraph>
  }

  return <RoadSectionDetails properties={roadSection.features[0].properties} />
}

function displayMap(roadSection: RoadSectionFeatureCollection) {
  if (NoRoadSection(roadSection)) return

  return <RoadSectionMap roadSections={roadSection} />
}

const RoadSectionPage = () => {
  const { wegvakId: roadSectionId } = useParams()
  useDocumentTitle(`Wegvak ${roadSectionId}`)
  const roadSection = useQuery({
    queryKey: ['roadSection', roadSectionId],
    queryFn: ({ signal }) => getRoadSection(roadSectionId, signal),
  })

  if (!roadSection.data || roadSection.isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Header />

      <main data-testid="road-section-page">
        <ContentContainer>
          <Row valign="flex-start">
            <StyledColumn span={6}>
              {roadSection.isError && roadSection.error instanceof Error && (
                <div>{roadSection.error.message}</div>
              )}
              {roadSection && displayDetails(roadSection.data)}
            </StyledColumn>

            <StyledColumn span={6}>
              {roadSection && displayMap(roadSection.data)}
            </StyledColumn>
          </Row>
        </ContentContainer>
      </main>
    </>
  )
}

export default RoadSectionPage
