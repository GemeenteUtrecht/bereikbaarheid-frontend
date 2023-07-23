import { List, ListItem, styles, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'

import { useProhibitorySignsPageContext } from '../../../contexts/PageContext'
import { useRdwInfo } from '../../../hooks/useRdwInfo'

const StyledList = styled(List)`
  background-color: ${props => props.theme.colors.tint?.level2};
  flex-direction: row;
  flex-wrap: wrap;
  font-weight: 700;
  margin-bottom: ${themeSpacing(5)};
  padding: calc(0.625rem - 0.35rem) 0.625rem 0.625rem;

  ${styles.ListItemStyle} {
    margin-bottom: 0;
    padding-top: 0.35rem;
    position: relative;
  }

  ${styles.ListItemStyle}:not(:last-child):after {
    color: ${props => props.theme.colors.tint?.level5};
    content: '\\007C';
    font-weight: normal;
    padding: 0 0.35rem;
  }
`

const FormRdwInfoVehicleSummary = () => {
  const { vehicle } = useProhibitorySignsPageContext()
  const { fuelInfo, generalInfo } = useRdwInfo()

  return (
    <StyledList>
      <ListItem>{vehicle.licensePlate}</ListItem>
      <ListItem>
        {generalInfo.data?.[0].server.merk}{' '}
        {generalInfo.data?.[0].server.handelsbenaming}
      </ListItem>
      <ListItem>{generalInfo.data?.[0].server.voertuigsoort}</ListItem>
      <ListItem>{fuelInfo.data?.[0].server.brandstof_omschrijving}</ListItem>
      <ListItem>
        Emissieklasse {fuelInfo.data?.[0].server.emissiecode_omschrijving}
      </ListItem>
    </StyledList>
  )
}

export default FormRdwInfoVehicleSummary
