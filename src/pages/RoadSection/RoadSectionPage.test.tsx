import { screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { generatePath } from 'react-router-dom'

import { ENDPOINT as ENDPOINT_ROAD_SECTION } from '../../api/nationaalwegenbestand/wegvakken'
import { server } from '../../../test/server'
import { withApp } from '../../../test/utils/withApp'
import { getPathTo } from '../../routes'

describe('RoadSectionPage', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('ROAD_SECTION_DETAIL_PAGE'), {
      wegvakId: 600778786,
    })

    withApp(pathToPage)

    // wait until the page is rendered
    await screen.findByText('Wegvak 600778786')

    // // two h1's are rendered: logo & page title
    expect(screen.getAllByRole('heading', { level: 1 })[1]).toHaveTextContent(
      'Wegvak 600778786',
    )

    // smoke test map - see if attribution is visible
    expect(screen.getByText(/NWB/)).toBeInTheDocument()
  })

  it('shows the error page when a road section is not found', async () => {
    const pathToPage = generatePath(getPathTo('ROAD_SECTION_DETAIL_PAGE'), {
      wegvakId: 404404,
    })

    server.use(
      http.get(`/${ENDPOINT_ROAD_SECTION}:roadSectionId`, () => {
        return HttpResponse.json(
          { features: [], type: 'FeatureCollection' },
          { status: 200 },
        )
      }),
    )

    withApp(pathToPage)

    // on render of the page, the error is logged to the console.
    vi.spyOn(console, 'error').mockImplementation(() => {})

    // wait until the page is rendered
    await screen.findByText(/Wegvak niet gevonden/)

    expect(screen.getByText(/Wegvak niet gevonden/)).toBeInTheDocument()

    expect(console.error).toHaveBeenCalled()

    vi.restoreAllMocks()
  })
})
