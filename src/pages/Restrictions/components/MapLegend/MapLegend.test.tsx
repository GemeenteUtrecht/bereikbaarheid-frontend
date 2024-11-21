import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { generatePath } from 'react-router-dom'

import { getPathTo } from '../../../../routes'
import { withApp } from '../../../../../test/utils/withApp'

describe('MapLegend', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('RESTRICTIONS_MAP'))

    withApp(pathToPage)

    // wait until page is rendered
    await screen.findAllByText(/beperkingen/i)

    await waitFor(() =>
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelectorAll('.leaflet-overlay-pane svg path'),
    )

    // the map legend should be visible
    expect(screen.getByLabelText(/topografie/i)).toBeChecked()

    expect(screen.getByLabelText(/aslast/i)).toBeChecked()
  })

  it('updates no restrictions label when changing the vehicle property', async () => {
    const pathToPage = generatePath(getPathTo('RESTRICTIONS_MAP'))
    const user = userEvent.setup()

    withApp(pathToPage)

    // wait until page is rendered
    await screen.findAllByText(/beperkingen/i)

    await waitFor(() =>
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelectorAll('.leaflet-overlay-pane svg path'),
    )

    // by default vehicle property axleweight is active
    expect(screen.getByLabelText(/aslast/i)).toBeChecked()

    expect(
      await within(screen.getByLabelText('Legenda')).findByText(
        'geen aslastbeperking',
      ),
    ).toBeVisible()

    await user.click(await screen.findByLabelText('Breedte'))

    expect(screen.getByLabelText(/breedte/i)).toBeChecked()

    expect(
      await within(screen.getByLabelText('Legenda')).findByText(
        'geen breedtebeperking',
      ),
    ).toBeVisible()
  })
})
