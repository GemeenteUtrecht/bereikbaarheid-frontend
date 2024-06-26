import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { TrafficSignsFeatureCollection } from '../../../../api/nationaalwegenbestand/rvv/verkeersborden'
import { withMapContext } from '../../../../../test/utils/prohibitorySigns/withMapContext'
import ProhibitorySignsPageProvider from '../../contexts/PageProvider'
import DetailFeature from './DetailFeature'

import trafficSignsJson from './../../../../../test/mocks/nationaalwegenbestand/rvv/verkeersborden/data.json'
const trafficSigns = trafficSignsJson as TrafficSignsFeatureCollection

describe('ProhibitorySignsDetailFeature', () => {
  it('renders the traffic sign info', async () => {
    const mapContextProps = {
      currentTrafficSign: trafficSigns.features[0],
    }

    render(withMapContext(<DetailFeature />, mapContextProps))

    expect(
      screen.getByText(trafficSigns.features[0].properties.id),
    ).toBeVisible()
  })

  it('renders additional traffic sign info when in expert mode', async () => {
    const mapContextProps = {
      currentTrafficSign: trafficSigns.features[0],
    }

    render(
      withMapContext(
        <MemoryRouter initialEntries={['/?expertMode=true']}>
          <ProhibitorySignsPageProvider>
            <DetailFeature />
          </ProhibitorySignsPageProvider>
        </MemoryRouter>,
        mapContextProps,
      ),
    )

    expect(screen.getByText('Link nummer')).toBeVisible()
    expect(screen.getByText('Bekijk foto')).toBeVisible()
  })
})
