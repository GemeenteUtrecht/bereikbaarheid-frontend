import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { generatePath } from 'react-router-dom'

import { ENDPOINT as ENDPOINT_PROHIBITORY_ROADS } from '../../api/nationaalwegenbestand/rvv/wegvakken'
import { getPathTo } from '../../routes'
import { server } from '../../../test/server.ts'
import { withApp } from '../../../test/utils/withApp'

import prohibitoryRoadSectionsData from '../../../test/mocks/nationaalwegenbestand/rvv/wegvakken/data.json'

describe('ProhibitorySignsPage', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('ACCESSIBILITY_MAP'))

    withApp(pathToPage)

    // wait until page is rendered
    await screen.findAllByText(/bereikbaarheid/i)

    const pageTitle = screen.getByRole('heading', { level: 1 })
    const links = within(pageTitle).getAllByText(/bereikbaarheid/i)

    // the first element is the alt tag of the logo, the second one the title
    expect(links[0]).toHaveTextContent('Bereikbaarheid')

    // the scenario wizard should be visible
    const scenarioWizardModal = screen.getByRole('dialog')
    expect(
      within(scenarioWizardModal).getByRole('heading', {
        name: /invoer gegevens/i,
      }),
    ).toBeVisible()
  })

  it('shows the error page when the api is unreachable', async () => {
    const pathToPage = generatePath(getPathTo('ACCESSIBILITY_MAP'))
    const user = userEvent.setup()

    server.use(
      http.get(ENDPOINT_PROHIBITORY_ROADS, () => {
        return HttpResponse.json({}, { status: 503 })
      }),
    )

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

    // wait until the page is rendered
    await screen.findByText(/Helaas/)

    expect(screen.getByText(/Er ging iets fout/)).toBeInTheDocument()
  })

  it('renders the map when the wizard is completed', async () => {
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

    // wait for the map to load
    await waitFor(() =>
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        document.querySelectorAll('.leaflet-overlay-pane svg path').length,
      ).toBe(prohibitoryRoadSectionsData.features.length),
    )
  })

  // the expert mode of the page provides additional functionality for
  // checking the content of the page (e.g network, traffic signs, etc)
  // it can be activated by adding the URL parameter expertMode=true
  it('provides extra functionality when using the page in expert mode', async () => {
    const pathToPage = generatePath(getPathTo('ACCESSIBILITY_MAP'))
    const user = userEvent.setup()

    withApp(`${pathToPage}?expertMode=true`)

    // wait until page is rendered
    await screen.findAllByText(/bereikbaarheid/i)

    // fill out the first form
    // in expert mode a number of vehicles can be selected from a dropdown
    await user.selectOptions(screen.getByTestId('vehicle-select-list'), [
      'Vuilniswagen',
    ])

    expect(screen.getByLabelText('Kenteken')).toHaveValue('BXLS14')

    // ... but uncheck the address option
    await user.click(await screen.findByLabelText('Ik wil een adres invoeren'))

    await user.click(screen.getByText('Volgende', { selector: 'button' }))

    // the next step should be the form with RDW information
    expect(
      await within(screen.getByRole('dialog')).findByText('RDW gegevens'),
    ).toBeVisible()

    // complete the wizard
    await user.click(screen.getByText('Kaart bekijken', { selector: 'button' }))

    // wait for the map to load
    await waitFor(() =>
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelectorAll('.leaflet-overlay-pane svg path'),
    )

    // an extra baselayer - topography with color style - is available
    expect(screen.getByLabelText(/topografie kleur/i)).toBeVisible()
  })
})
