import styled from 'styled-components'
import type { ReactNode } from 'react'
import { Header as ASCHeader } from '@amsterdam/asc-ui'

import { HEADER_HEIGHT, Z_INDEX_HEADER } from '../constants'
import { ReactComponent as SvgLogo } from '../../styles/logo.svg'

const StyledLogo = styled(SvgLogo)`
  height: 44px;
  width: 101px;
`

const UtrechtLogo = ({ href = '/' }: { href: string }) => {
  return <StyledLogo href={href} />
}

export interface HeaderProps {
  navigation?: ReactNode
  title?: string
  zIndex?: number
}

const Header = ({ navigation, title, zIndex }: HeaderProps) => {
  return (
    <ASCHeader
      tall={false}
      data-testid="header"
      title={title ?? ''}
      homeLink="/"
      fullWidth
      logo={UtrechtLogo}
      navigation={navigation ?? false}
      css={`
        z-index: ${zIndex ?? Z_INDEX_HEADER};

        && header {
          height: ${HEADER_HEIGHT}px;
        }

        // Header title
        & h1 a:nth-of-type(2) {
          font-size: 1.125rem;
        }
      `}
    />
  )
}

export default Header
