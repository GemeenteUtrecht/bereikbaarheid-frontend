import { render, screen } from '@testing-library/react'

import { RoadSectionFeatureCollection } from '../../../../api/nationaalwegenbestand/wegvakken'
import { withAppContext } from '../../../../../test/utils/withAppContext'
import { RoadSectionMap, RoadSectionMapProps } from './Map'

import roadSectionJson from '../../../../../test/mocks/nationaalwegenbestand/wegvakken/600778786.json'

describe('RoadSectionMap', () => {
  const roadSection = roadSectionJson as RoadSectionFeatureCollection
  const props: RoadSectionMapProps = {
    roadSection: roadSection.features[0],
  }

  it('renders correctly', () => {
    render(withAppContext(<RoadSectionMap {...props} />))

    expect(screen.getByText(/NWB/)).toBeInTheDocument()
  })

  it('renders the road section', async () => {
    const { container } = render(withAppContext(<RoadSectionMap {...props} />))

    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const roadSectionSvg = container.querySelectorAll(
      '.leaflet-overlay-pane svg',
    )

    expect(roadSectionSvg.length).toBe(1)
  })
})
