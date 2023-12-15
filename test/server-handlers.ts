import { rest } from 'msw'

import { ENDPOINT as ENDPOINT_ROAD_SECTION } from '../src/api/nationaalwegenbestand/wegvakken'

export const handlers = [
  rest.get(`/${ENDPOINT_ROAD_SECTION}:roadSectionId`, (req, res, ctx) => {
    const { roadSectionId } = req.params
    const roadSectionMock = getRoadSection(roadSectionId)
    return res(ctx.status(200), ctx.json(roadSectionMock))
  }),
]

const getRoadSection = (id: string | ReadonlyArray<string>) => {
  if (id === '600778786') {
    return require('./mocks/nationaalwegenbestand/wegvakken/600778786.json')
  }

  if (id === '404404') {
    return require('./mocks/nationaalwegenbestand/wegvakken/not-found.json')
  }

  return console.error('no roadSection mock found.')
}
