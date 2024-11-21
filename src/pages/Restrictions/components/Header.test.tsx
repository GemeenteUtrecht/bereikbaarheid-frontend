import { screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { withQueryClient } from '../../../../test/utils/withQueryClient'

import RestrictionsHeader, { RestrictionsHeaderProps } from './Header'

describe('RestrictionsHeader', () => {
  const props: RestrictionsHeaderProps = {
    setOpenFeedbackModal: vi.fn(),
  }

  it('renders correctly', async () => {
    const { rerender } = withQueryClient(
      <BrowserRouter>
        <RestrictionsHeader {...props} />
      </BrowserRouter>,
    )

    // wait until the info has been fetched from the API
    await waitFor(() => rerender)

    expect(screen.getByTestId('header')).toBeInTheDocument()

    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
