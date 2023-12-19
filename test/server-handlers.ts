import { rest } from 'msw'

import { ENDPOINT as ENDPOINT_TRAFFIC_SIGNS } from '../src/api/nationaalwegenbestand/rvv/verkeersborden'
import { ENDPOINT as ENDPOINT_PROHIBITORY_ROADS } from '../src/api/nationaalwegenbestand/rvv/wegvakken'
import { ENDPOINT as ENDPOINT_ROAD_SECTION } from '../src/api/nationaalwegenbestand/wegvakken'
import { ENDPOINT as ENDPOINT_ADDRESS_SEARCH } from '../src/api/pdok/suggest'
import { ENDPOINT as ENDPOINT_RDW_AXLES } from '../src/api/rdw/axles'
import { ENDPOINT as ENDPOINT_RDW_FUEL } from '../src/api/rdw/fuel'
import { ENDPOINT as ENDPOINT_RDW_SUBCATEGORY } from '../src/api/rdw/subcategory'
import { ENDPOINT as ENDPOINT_RDW_VEHICLE } from '../src/api/rdw/vehicle'

export const handlers = [
  rest.get(ENDPOINT_ADDRESS_SEARCH, (req, res, ctx) => {
    const searchResultsMock = getAddressResults(req.url.searchParams)
    return res(ctx.status(200), ctx.json(searchResultsMock))
  }),

  rest.get(ENDPOINT_PROHIBITORY_ROADS, (req, res, ctx) => {
    const roadsMock = require('./mocks/nationaalwegenbestand/rvv/wegvakken/data.json')
    return res(ctx.status(200), ctx.json(roadsMock))
  }),

  rest.get(`/${ENDPOINT_ROAD_SECTION}:roadSectionId`, (req, res, ctx) => {
    const { roadSectionId } = req.params
    const roadSectionMock = getRoadSection(roadSectionId)
    return res(ctx.status(200), ctx.json(roadSectionMock))
  }),

  rest.get(ENDPOINT_TRAFFIC_SIGNS, (req, res, ctx) => {
    const trafficSignsMock = require('./mocks/nationaalwegenbestand/rvv/verkeersborden/data.json')
    return res(ctx.status(200), ctx.json(trafficSignsMock))
  }),

  rest.get(ENDPOINT_RDW_AXLES, (req, res, ctx) => {
    const licensePlate = req.url.searchParams.get('kenteken')
    const axlesMock = !licensePlate
      ? []
      : require(`./mocks/rdw/axles/${licensePlate.toLowerCase()}.json`)

    return res(ctx.status(200), ctx.json(axlesMock))
  }),

  rest.get(ENDPOINT_RDW_FUEL, (req, res, ctx) => {
    const licensePlate = req.url.searchParams.get('kenteken')
    const fuelMock = !licensePlate
      ? []
      : require(`./mocks/rdw/fuel/${licensePlate.toLowerCase()}.json`)

    return res(ctx.status(200), ctx.json(fuelMock))
  }),

  rest.get(ENDPOINT_RDW_SUBCATEGORY, (req, res, ctx) => {
    const licensePlate = req.url.searchParams.get('kenteken')
    const subcategoryMock = !licensePlate
      ? []
      : require(`./mocks/rdw/subcategory/${licensePlate.toLowerCase()}.json`)

    return res(ctx.status(200), ctx.json(subcategoryMock))
  }),

  rest.get(ENDPOINT_RDW_VEHICLE, (req, res, ctx) => {
    const vehicleMock = getVehicle(req.url.searchParams)
    return res(ctx.status(vehicleMock.status), ctx.json(vehicleMock.body))
  }),
]

const getAddressResults = (params: URLSearchParams) => {
  let result = require('./mocks/pdok/suggest/annas.json')

  if (params.get('q')?.includes('Noresults')) {
    result = require('./mocks/pdok/suggest/no-results.json')
  }

  return result
}

const getRoadSection = (id: string | ReadonlyArray<string>) => {
  if (id === '600778786') {
    return require('./mocks/nationaalwegenbestand/wegvakken/600778786.json')
  }

  if (id === '404404') {
    return require('./mocks/nationaalwegenbestand/wegvakken/not-found.json')
  }

  return console.error('no roadSection mock found.')
}

const getVehicle = (params: URLSearchParams) => {
  const licensePlate = params.get('kenteken')
  const mocks: Record<string, string> = {
    '24BJL7': require('./mocks/rdw/vehicle/24bjl7.json'), // vehicle + trailer use case
    '65JRDP': require('./mocks/rdw/vehicle/65jrdp.json'), // no maximum allowed weight
    '85BPF2': require('./mocks/rdw/vehicle/85bpf2.json'), // mobile crane
    BXLS14: require('./mocks/rdw/vehicle/bxls14.json'), // valid vehicle
    OT77FJ: require('./mocks/rdw/vehicle/ot77fj.json'), // trailer
  }

  if (licensePlate === 'API429') {
    return { status: 429, body: {} }
  }

  if (licensePlate === 'API500') {
    return { status: 500, body: {} }
  }

  if (licensePlate && Object.hasOwn(mocks, licensePlate)) {
    return { status: 200, body: mocks[licensePlate] }
  }

  // RDW returns an empty array when a license plate is not found
  return { status: 200, body: [] }
}
