import { Paragraph, themeSpacing } from '@amsterdam/asc-ui'
import styled from 'styled-components'

const LegendItemWrapper = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: ${themeSpacing(1)};
  }
`
const LegendItemSymbol = styled.div<{
  $color: string
  $height: string
  $marginLeft: number
}>`
  background-color: ${props => props.$color};
  margin-left: ${props => themeSpacing(props.$marginLeft)};
  margin-right: ${themeSpacing(2)};
  height: ${props => props.$height};
  width: 25px;
`
interface MapLegendItemProps {
  color: string
  height?: string
  marginLeft?: number
  text: string
}

export const MapLegendItem = ({
  color,
  height = '8px',
  marginLeft = 10,
  text,
}: MapLegendItemProps) => {
  return (
    <LegendItemWrapper>
      <LegendItemSymbol
        $color={color}
        $height={height}
        $marginLeft={marginLeft}
      />
      <Paragraph gutterBottom={0}>{text}</Paragraph>
    </LegendItemWrapper>
  )
}
