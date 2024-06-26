import { http, HttpResponse } from 'msw'

import { ENDPOINT as ENDPOINT_TRAFFIC_SIGNS } from '../src/api/nationaalwegenbestand/rvv/verkeersborden'
import { ENDPOINT as ENDPOINT_PROHIBITORY_ROADS } from '../src/api/nationaalwegenbestand/rvv/wegvakken'
import { ENDPOINT as ENDPOINT_ROAD_SECTION } from '../src/api/nationaalwegenbestand/wegvakken'
import { ENDPOINT as ENDPOINT_ADDRESS_SEARCH } from '../src/api/pdok/suggest'
import { ENDPOINT as ENDPOINT_RDW_AXLES } from '../src/api/rdw/axles'
import { ENDPOINT as ENDPOINT_RDW_FUEL } from '../src/api/rdw/fuel'
import { ENDPOINT as ENDPOINT_RDW_SUBCATEGORY } from '../src/api/rdw/subcategory'
import { ENDPOINT as ENDPOINT_RDW_VEHICLE } from '../src/api/rdw/vehicle'

import addressSuggestions from './mocks/pdok/suggest/annas.json'
import roadSection from './mocks/nationaalwegenbestand/wegvakken/600778786.json'
import rvvRoadSections from './mocks/nationaalwegenbestand/rvv/wegvakken/data.json'
import rvvTrafficSigns from './mocks/nationaalwegenbestand/rvv/verkeersborden/data.json'
import vehicleValidTruck from './mocks/rdw/vehicle/bxls14.json'

export const handlers = [
  http.get(ENDPOINT_ADDRESS_SEARCH, () => {
    return HttpResponse.json(addressSuggestions, { status: 200 })
  }),

  http.get(ENDPOINT_PROHIBITORY_ROADS, () => {
    return HttpResponse.json(rvvRoadSections, { status: 200 })
  }),

  http.get(`/${ENDPOINT_ROAD_SECTION}:roadSectionId`, () => {
    return HttpResponse.json(roadSection, { status: 200 })
  }),

  http.get(ENDPOINT_TRAFFIC_SIGNS, () => {
    return HttpResponse.json(rvvTrafficSigns, { status: 200 })
  }),

  http.get(ENDPOINT_RDW_AXLES, async ({ request }) => {
    const url = new URL(request.url)
    const licensePlate = url.searchParams.get('kenteken')
    let axlesMock: [] | Promise<unknown> = []

    if (licensePlate) {
      axlesMock = await import(
        `./mocks/rdw/axles/${licensePlate.toLowerCase()}.json`
      ).then(module => module.default)
    }

    return HttpResponse.json(axlesMock, { status: 200 })
  }),

  http.get(ENDPOINT_RDW_FUEL, async ({ request }) => {
    const url = new URL(request.url)
    const licensePlate = url.searchParams.get('kenteken')
    let fuelMock: [] | Promise<unknown> = []

    if (licensePlate) {
      fuelMock = await import(
        `./mocks/rdw/fuel/${licensePlate.toLowerCase()}.json`
      ).then(module => module.default)
    }

    return HttpResponse.json(fuelMock, { status: 200 })
  }),

  http.get(ENDPOINT_RDW_SUBCATEGORY, async ({ request }) => {
    const url = new URL(request.url)
    const licensePlate = url.searchParams.get('kenteken')
    let subcategoryMock: [] | Promise<unknown> = []

    if (licensePlate) {
      subcategoryMock = await import(
        `./mocks/rdw/subcategory/${licensePlate.toLowerCase()}.json`
      ).then(module => module.default)
    }

    return HttpResponse.json(subcategoryMock, { status: 200 })
  }),

  http.get(ENDPOINT_RDW_VEHICLE, () => {
    return HttpResponse.json(vehicleValidTruck, { status: 200 })
  }),
]
