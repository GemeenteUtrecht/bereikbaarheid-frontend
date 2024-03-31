import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

import { withAppContext } from '../../../../../../test/utils/withAppContext'
import { withQueryClient } from '../../../../../../test/utils/withQueryClient'

import ProhibitorySignsPageProvider from '../../../contexts/PageProvider'
import { ProhibitorySignsFormScenarioAddress } from './Form'

describe('ProhibitorySignsFormScenarioAddress', () => {
  const setup = (children: ReactNode) => {
    return {
      user: userEvent.setup(),
      ...withQueryClient(
        withAppContext(
          <MemoryRouter>
            <ProhibitorySignsPageProvider>
              {children}
            </ProhibitorySignsPageProvider>
          </MemoryRouter>,
        ),
      ),
    }
  }

  it('renders correctly', async () => {
    setup(<ProhibitorySignsFormScenarioAddress />)

    expect(
      await screen.findByLabelText('Adres van uw bestemming'),
    ).toBeInTheDocument()
  })

  it('renders a list of address options', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioAddress />)

    // search for (part of) an address
    await user.type(
      screen.getByRole('textbox', {
        name: /adres van uw bestemming/i,
      }),
      'Annas',
    )

    // wait for search results
    await screen.findByRole('list')

    expect(within(screen.getByRole('list')).getAllByRole('link')).toHaveLength(
      10,
    )
  })

  it('shows an error message if no address is selected', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioAddress />)

    // search for (part of) an address
    await user.type(
      screen.getByRole('textbox', {
        name: /adres van uw bestemming/i,
      }),
      'Annas',
    )

    // wait for search results
    await screen.findByRole('list')

    // try to submit the form
    await user.click(screen.getByText('Volgende', { selector: 'button' }))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(screen.getByText('Selecteer een adres uit de lijst')).toBeVisible()
  })

  it('shows an error message if the search input contains less than 3 characters', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioAddress />)

    // search for (part of) an address
    await user.type(
      screen.getByRole('textbox', {
        name: /adres van uw bestemming/i,
      }),
      'An',
    )

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(screen.getByText('Voer tenminste 3 letters in')).toBeVisible()

    // type the 4th character - the input now contains 'Anna'
    await user.type(
      screen.getByRole('textbox', {
        name: /adres van uw bestemming/i,
      }),
      'a',
    )

    // a list with search results should be visible
    expect(await screen.findByRole('list')).toBeVisible()
  })

  it('shows an error message if an address is not found', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioAddress />)

    // search for (part of) an address
    await user.type(
      screen.getByRole('textbox', {
        name: /adres van uw bestemming/i,
      }),
      'Noresults',
    )

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(screen.getByText('Geen adres gevonden')).toBeVisible()
  })

  it('shows an error message when the PDOK API is not available', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioAddress />)

    // search for (part of) an address
    await user.type(
      screen.getByRole('textbox', {
        name: /adres van uw bestemming/i,
      }),
      'API500',
    )

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(
      screen.getByText(
        'De PDOK API is momenteel niet beschikbaar. Hierdoor kan er niet worden gezocht op een adres. Probeer het later nog een keer.',
      ),
    ).toBeVisible()
  })
})
