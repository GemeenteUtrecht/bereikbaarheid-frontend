import { render, screen } from '@testing-library/react'

import { withAppContext } from '../../../../../test/utils/withAppContext'
import { RoadSectionDetails } from './Details'

describe('RoadSectionDetails', () => {
  const roadSection = require('../../../../../test/mocks/nationaalwegenbestand/wegvakken/600778786.json')
  const roadSectionWithCorrections = require('../../../../../test/mocks/nationaalwegenbestand/wegvakken/273311154.json')

  it('renders correctly', () => {
    render(
      withAppContext(
        <RoadSectionDetails properties={roadSection.features[0].properties} />,
      ),
    )

    expect(screen.getAllByRole('heading', { level: 1 })[0]).toHaveTextContent(
      'Wegvak 600778786',
    )
  })

  it('shows road attribute corrections', () => {
    render(
      withAppContext(
        <RoadSectionDetails
          properties={roadSectionWithCorrections.features[0].properties}
        />,
      ),
    )

    expect(screen.getAllByRole('heading', { level: 2 })[0]).toHaveTextContent(
      'Toegepaste correcties',
    )

    expect(
      screen.getAllByRole('columnheader', { name: 'Attribuut' }),
    ).toHaveLength(1)

    expect(
      screen.getByRole('cell', {
        name: roadSectionWithCorrections.features[0].properties
          .toegepasteCorrecties[0].attribuutnaam,
      }),
    ).toBeInTheDocument()
  })

  it('shows a message if no corrections are found', () => {
    render(
      withAppContext(
        <RoadSectionDetails properties={roadSection.features[0].properties} />,
      ),
    )

    expect(screen.getByText('Geen correcties toegepast.')).toBeInTheDocument()
  })
})
