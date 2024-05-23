import { DefaultBodyType, rest } from 'msw'

import { ENDPOINT as ENDPOINT_TRAFFIC_SIGNS } from '../src/api/nationaalwegenbestand/rvv/verkeersborden'
import { ENDPOINT as ENDPOINT_PROHIBITORY_ROADS } from '../src/api/nationaalwegenbestand/rvv/wegvakken'
import { ENDPOINT as ENDPOINT_ROAD_SECTION } from '../src/api/nationaalwegenbestand/wegvakken'
import { ENDPOINT as ENDPOINT_ADDRESS_SEARCH } from '../src/api/pdok/suggest'
import { ENDPOINT as ENDPOINT_RDW_AXLES } from '../src/api/rdw/axles'
import { ENDPOINT as ENDPOINT_RDW_FUEL } from '../src/api/rdw/fuel'
import { ENDPOINT as ENDPOINT_RDW_SUBCATEGORY } from '../src/api/rdw/subcategory'
import { ENDPOINT as ENDPOINT_RDW_VEHICLE } from '../src/api/rdw/vehicle'

// addresses
import addressDefault from './mocks/pdok/suggest/annas.json'
import addressNoResults from './mocks/pdok/suggest/no-results.json'

// road sections
import roadSection600778786 from './mocks/nationaalwegenbestand/wegvakken/600778786.json'
import roadSectionNotFound from './mocks/nationaalwegenbestand/wegvakken/not-found.json'

// rvv related data
import rvvRoadSections from './mocks/nationaalwegenbestand/rvv/wegvakken/data.json'
import rvvTrafficSigns from './mocks/nationaalwegenbestand/rvv/verkeersborden/data.json'

// vehicles
import onlyTrailer from './mocks/rdw/vehicle/ot77fj.json'
import vehicleWithTrailer from './mocks/rdw/vehicle/24bjl7.json'
import vehicleNoMaximumAllowedWeight from './mocks/rdw/vehicle/65jrdp.json'
import vehicleMobileCrane from './mocks/rdw/vehicle/85bpf2.json'
import vehicleValidTruck from './mocks/rdw/vehicle/bxls14.json'

export const handlers = [
  rest.get(ENDPOINT_ADDRESS_SEARCH, (req, res, ctx) => {
    const searchResultsMock = getAddressResults(req.url.searchParams)
    return res(ctx.status(200), ctx.json(searchResultsMock))
  }),

  rest.get(ENDPOINT_PROHIBITORY_ROADS, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(rvvRoadSections))
  }),

  rest.get(`/${ENDPOINT_ROAD_SECTION}:roadSectionId`, (req, res, ctx) => {
    const { roadSectionId } = req.params
    const roadSectionMock = getRoadSection(roadSectionId)
    return res(ctx.status(200), ctx.json(roadSectionMock))
  }),

  rest.get(ENDPOINT_TRAFFIC_SIGNS, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(rvvTrafficSigns))
  }),

  rest.get(ENDPOINT_RDW_AXLES, async (req, res, ctx) => {
    const licensePlate = req.url.searchParams.get('kenteken')
    let axlesMock: [] | Promise<unknown> = []

    if (licensePlate) {
      axlesMock = await import(
        `./mocks/rdw/axles/${licensePlate.toLowerCase()}.json`
      ).then(module => module.default)
    }

    return res(ctx.status(200), ctx.json(axlesMock))
  }),

  rest.get(ENDPOINT_RDW_FUEL, async (req, res, ctx) => {
    const licensePlate = req.url.searchParams.get('kenteken')
    let fuelMock: [] | Promise<unknown> = []

    if (licensePlate) {
      fuelMock = await import(
        `./mocks/rdw/fuel/${licensePlate.toLowerCase()}.json`
      ).then(module => module.default)
    }

    return res(ctx.status(200), ctx.json(fuelMock))
  }),

  rest.get(ENDPOINT_RDW_SUBCATEGORY, async (req, res, ctx) => {
    const licensePlate = req.url.searchParams.get('kenteken')
    let subcategoryMock: [] | Promise<unknown> = []

    if (licensePlate) {
      subcategoryMock = await import(
        `./mocks/rdw/subcategory/${licensePlate.toLowerCase()}.json`
      ).then(module => module.default)
    }

    return res(ctx.status(200), ctx.json(subcategoryMock))
  }),

  rest.get(ENDPOINT_RDW_VEHICLE, async (req, res, ctx) => {
    const vehicleMock = await getVehicle(req.url.searchParams)
    return res(ctx.status(vehicleMock.status), ctx.json(vehicleMock.body))
  }),
]

const getAddressResults = (params: URLSearchParams) => {
  if (params.get('q')?.includes('Noresults')) {
    return addressNoResults
  }

  if (params.get('q')?.includes('API500')) {
    return { status: 500, body: {} }
  }

  return addressDefault
}

const getRoadSection = (id: string | ReadonlyArray<string>) => {
  if (id === '600778786') {
    return roadSection600778786
  }

  if (id === '404404') {
    return roadSectionNotFound
  }

  return roadSectionNotFound
}

const getVehicle = async (params: URLSearchParams) => {
  const licensePlate = params.get('kenteken')
  const mocks: Record<string, DefaultBodyType> = {
    '24BJL7': vehicleWithTrailer,
    '65JRDP': vehicleNoMaximumAllowedWeight,
    '85BPF2': vehicleMobileCrane,
    BXLS14: vehicleValidTruck,
    OT77FJ: onlyTrailer,
  }

  if (licensePlate === 'API429') {
    return { status: 429, body: {} }
  }

  if (licensePlate === 'API500') {
    return { status: 500, body: {} }
  }

  if (
    licensePlate &&
    Object.prototype.hasOwnProperty.call(mocks, licensePlate)
  ) {
    return { status: 200, body: mocks[licensePlate] }
  }

  // RDW returns an empty array when a license plate is not found
  return { status: 200, body: [] }
}
