import { screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { withPageContext } from '../../../../test/utils/prohibitorySigns/withPageContext'
import { withQueryClient } from '../../../../test/utils/withQueryClient'

import ProhibitorySignsHeader, { ProhibitorySignsHeaderProps } from './Header'

describe('ProhibitorySignsHeader', () => {
  const props: ProhibitorySignsHeaderProps = {
    setOpenFeedbackModal: vi.fn(),
  }

  it('renders correctly', async () => {
    const { rerender } = withQueryClient(
      withPageContext(
        <BrowserRouter>
          <ProhibitorySignsHeader {...props} />
        </BrowserRouter>,
        {
          showScenarioWizard: true,
        },
      ),
    )

    // wait until the info has been fetched from the API
    await waitFor(() => rerender)

    expect(screen.getByTestId('header')).toBeInTheDocument()

    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
