import { generatePath } from 'react-router-dom'
import { getPathTo } from './routes'
import { withApp } from '../test/utils/withApp'
import { screen } from '@testing-library/react'

describe('routes', () => {
  it('redirects home page to /bereikbaarheid', async () => {
    const pathToPage = generatePath(getPathTo('HOME'))

    withApp(pathToPage)

    expect(
      await screen.findByTestId('prohibitory-signs-page'),
    ).toBeInTheDocument()
  })
})
