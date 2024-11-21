import { screen, waitFor, within } from '@testing-library/react'
import { generatePath } from 'react-router-dom'

import { getPathTo } from '../../routes'
import { axleWeightCategories } from './vehiclePropertyCategories.ts'
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
})
