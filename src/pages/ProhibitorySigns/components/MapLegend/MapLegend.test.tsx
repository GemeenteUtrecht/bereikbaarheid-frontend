import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { generatePath } from 'react-router-dom'

import { getPathTo } from '../../../../routes'
import { withApp } from '../../../../../test/utils/withApp'

describe('MapLegend', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('ACCESSIBILITY_MAP'))
    const user = userEvent.setup()

    withApp(pathToPage)

    // wait until page is rendered
    await screen.findAllByText(/bereikbaarheid/i)

    // fill out the first form
    await user.type(await screen.findByLabelText('Kenteken'), 'BXLS14')
    await user.type(
      await screen.findByLabelText('Hoogte van uw voertuig'),
      '2.78',
    )

    // ... but uncheck the address option
    await user.click(await screen.findByLabelText('Ik wil een adres invoeren'))

    await user.click(screen.getByText('Volgende', { selector: 'button' }))

    // the next step should be the form with RDW information
    expect(
      await within(screen.getByRole('dialog')).findByText('RDW gegevens'),
    ).toBeVisible()

    // complete the wizard
    await user.click(screen.getByText('Kaart bekijken', { selector: 'button' }))

    await waitFor(() =>
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelectorAll('.leaflet-overlay-pane svg path'),
    )

    expect(screen.getByLabelText(/benodigde ontheffingen/i)).toBeChecked()
    expect(screen.getByLabelText(/verbodsborden/i)).toBeChecked()
  })
})
