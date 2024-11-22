import { screen, waitFor, within } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { generatePath } from 'react-router-dom'

import { ENDPOINT as ENDPOINT_PROHIBITORY_ROADS } from '../../api/nationaalwegenbestand/rvv/wegvakken'
import { getPathTo } from '../../routes'
import { axleWeightCategories } from './vehiclePropertyCategories.ts'
import { server } from '../../../test/server.ts'
import { withApp } from '../../../test/utils/withApp'

import prohibitoryRoadSectionsData from '../../../test/mocks/nationaalwegenbestand/rvv/wegvakken/data.json'

describe('RestrictionsPage', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('RESTRICTIONS_MAP'))

    withApp(pathToPage)

    // wait until page is rendered
    await screen.findAllByText(/beperkingen/i)

    const pageTitle = screen.getByRole('heading', { level: 1 })
    const links = within(pageTitle).getAllByText(/beperkingen/i)

    // the first element is the alt tag of the logo, the second one the title
    expect(links[0]).toHaveTextContent('Overzicht beperkingen')

    // for each category a new resultset from the API is requested
    const numberOfFeatures =
      prohibitoryRoadSectionsData.features.length * axleWeightCategories.length

    // wait for the map to load
    await waitFor(() =>
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        document.querySelectorAll('.leaflet-overlay-pane svg path').length,
      ).toBe(numberOfFeatures),
    )
  })

  it('shows the error page when the api is unreachable', async () => {
    const pathToPage = generatePath(getPathTo('RESTRICTIONS_MAP'))

    server.use(
      http.get(ENDPOINT_PROHIBITORY_ROADS, () => {
        return HttpResponse.json({}, { status: 503 })
      }),
    )

    withApp(pathToPage)

    // wait until the page is rendered
    await screen.findByText(/Helaas/)

    expect(screen.getByText(/Er ging iets fout/)).toBeInTheDocument()
  })
})
