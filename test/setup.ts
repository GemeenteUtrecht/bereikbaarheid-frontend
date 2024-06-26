import { afterEach, beforeAll } from 'vitest'
import { cleanup } from '@testing-library/react'
// @ts-expect-error no types available for mq-polyfill?
import matchMediaPolyfill from 'mq-polyfill'
import '@testing-library/jest-dom/vitest'

import { server } from './server'

// Leaflet uses SVG renderer which JSDOM does not support SVG to a full extent.
// In particular createSVGRect is not supported.
// thanks to this SO answer: https://stackoverflow.com/a/54384719/1908609
const createElementNSOrig = global.document.createElementNS
// @ts-expect-error fix this later
global.document.createElementNS = function (
  namespaceURI: string,
  qualifiedName: string,
) {
  if (
    namespaceURI === 'http://www.w3.org/2000/svg' &&
    qualifiedName === 'svg'
  ) {
    const element = createElementNSOrig.apply(this, [
      namespaceURI,
      qualifiedName,
    ])
    // @ts-expect-error fix this later
    element.createSVGRect = function () {}
    return element
  }

  return createElementNSOrig.apply(this, [namespaceURI, qualifiedName])
}

beforeAll(() => {
  // Establish API mocking before all tests.
  server.listen({
    onUnhandledRequest: 'error',
  })

  // default viewport is 1024x768
  matchMediaPolyfill(window)
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'))
  }
})

afterEach(() => {
  cleanup()

  // Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  server.resetHandlers()
})

afterAll(() => {
  // Clean up after the tests are finished.
  server.close()
})
