import { Paragraph } from '@amsterdam/asc-ui'
import endsWith from 'lodash/endsWith'
import styled from 'styled-components'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { ImageContainer, Image } from './DetailFeatureStyles'
import { trafficSignBackgrounds } from '../TrafficSignMarker/backgrounds'

const signTextPadding: Record<string, string> = {
  c17: '12px',
  c20: '20px',
}

const SignTextContainer = styled(Paragraph)<{ signType: string }>`
  padding-bottom: ${props =>
    props.signType ? signTextPadding[props.signType] : 0};
  position: absolute;
`

const ProhibitorySignsDetailFeatureTrafficSignImage = () => {
  const { currentTrafficSign } = useProhibitorySignsMapContext()

  const signType = currentTrafficSign?.properties.rvvCode.toLowerCase()
  const isZonalSign = endsWith(signType, '(zone)')
  const signCategory = currentTrafficSign?.properties.categorie
  const signText = () => {
    let signValue = currentTrafficSign?.properties.bordWaarde

    if (!signValue) return null

    if (signType === 'c20' || signType === 'c21') {
      signValue = signValue / 1000
    }

    return String(signValue).replace('.', ',')
  }

  if (!signType || !signCategory) return null

  return (
    <ImageContainer>
      <Image src={trafficSignBackgrounds[signType][signCategory]} />
      {!isZonalSign && signText() && (
        <SignTextContainer gutterBottom={0} strong signType={signType}>
          {signText()}
        </SignTextContainer>
      )}
    </ImageContainer>
  )
}

export default ProhibitorySignsDetailFeatureTrafficSignImage
