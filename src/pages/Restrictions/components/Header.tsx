import { Link, MenuButton, MenuInline, MenuItem } from '@amsterdam/asc-ui'
import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

import Header, { HeaderProps } from '../../../shared/components/Header'

export interface RestrictionsHeaderProps extends HeaderProps {
  setOpenFeedbackModal: Dispatch<SetStateAction<boolean>>
}

const StyledHrefLink = styled(Link)`
  display: inherit;
  font-size: inherit;
`

const RestrictionsHeader = ({
  setOpenFeedbackModal,
  title,
}: RestrictionsHeaderProps) => {
  return (
    <Header
      title={title}
      navigation={
        <>
          <MenuInline>
            <MenuItem>
              <MenuButton
                as={StyledHrefLink}
                data-testid="header-menu-contact-link"
                onClick={() => {
                  setOpenFeedbackModal(true)
                }}
              >
                Contact
              </MenuButton>
            </MenuItem>
          </MenuInline>
        </>
      }
    />
  )
}

export default RestrictionsHeader
