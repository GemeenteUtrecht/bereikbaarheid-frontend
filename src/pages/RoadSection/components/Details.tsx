import {
  DescriptionList,
  DescriptionListItem,
  Heading,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  themeSpacing,
} from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { RoadSection } from '../../../api/nationaalwegenbestand/wegvakken'

const StyledH1 = styled(Heading)`
  margin-bottom: ${themeSpacing(5)};
`

const StyledH2 = styled(Heading)`
  margin-top: ${themeSpacing(8)};
`

const StyledDescriptionList = styled(DescriptionList)`
  margin-bottom: 0;
`

const RoadSectionDetails = ({
  properties,
}: Pick<RoadSection, 'properties'>) => {
  return (
    <>
      <StyledH1>Wegvak {properties.wegvakId}</StyledH1>

      <StyledDescriptionList>
        <DescriptionListItem term="Straatnaam">
          {properties.straatNaam}
        </DescriptionListItem>

        <DescriptionListItem term="Woonplaats">
          {properties.woonplaats}
        </DescriptionListItem>

        <DescriptionListItem term="Baansubsoort code">
          {properties.baansubsoortCode}
        </DescriptionListItem>

        <DescriptionListItem term="Rijrichting">
          {properties.rijrichting}
        </DescriptionListItem>
      </StyledDescriptionList>

      <StyledH2 forwardedAs="h2">Toegepaste correcties</StyledH2>
      {properties.toegepasteCorrecties.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell as="th">Attribuut</TableCell>
                <TableCell as="th">NWB waarde</TableCell>
                <TableCell as="th">Gecorrigeerd naar</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.toegepasteCorrecties.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.attribuutnaam}</TableCell>
                    <TableCell>{item.nwbWaarde}</TableCell>
                    <TableCell>{item.gecorrigeerdNaar}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paragraph gutterBottom={0}>Geen correcties toegepast.</Paragraph>
      )}
    </>
  )
}

export default RoadSectionDetails
