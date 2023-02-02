import { render, screen } from '@testing-library/react'

import { withMapContext } from '../../../../../test/utils/prohibitorySigns/withMapContext'
import DetailFeature from './DetailFeature'

const trafficSigns = require('./../../../../../test/mocks/trafficSigns.json')

it('renders the traffic sign info', async () => {
  const mapContextProps = {
    currentTrafficSign: trafficSigns.features[0],
  }

  render(withMapContext(<DetailFeature />, mapContextProps))

  const trafficSignId = screen.getByText(trafficSigns.features[0].properties.id)
  expect(trafficSignId).toBeInTheDocument()
})
