import { TrafficSignCategory } from '../../../../api/nationaalwegenbestand/rvv/verkeersborden'

import c01Prohibition from './images/C01--verbod.png'
import c01ProhibitionAhead from './images/C01--vooraankondiging-verbod.png'
import c01ProhibitionException from './images/C01--verbod-met-uitzondering.png'
import c07Prohibition from './images/C07--verbod.png'
import c07ProhibitionAhead from './images/C07--vooraankondiging-verbod.png'
import c07ProhibitionException from './images/C07--verbod-met-uitzondering.png'
import c07aProhibition from './images/C07a--verbod.png'
import c07aProhibitionAhead from './images/C07a--vooraankondiging-verbod.png'
import c07aProhibitionException from './images/C07a--verbod-met-uitzondering.png'
import c07bProhibition from './images/C07b--verbod.png'
import c07bProhibitionAhead from './images/C07b--vooraankondiging-verbod.png'
import c07bProhibitionException from './images/C07b--verbod-met-uitzondering.png'
import c07zbProhibition from './images/C07ZB--verbod.png'
import c07zbProhibitionAhead from './images/C07ZB--vooraankondiging-verbod.png'
import c07zbProhibitionException from './images/C07ZB--verbod-met-uitzondering.png'
import c08Prohibition from './images/C08--verbod.png'
import c09Prohibition from './images/C09--verbod.png'
import c10Prohibition from './images/C10--verbod.png'
import c10ProhibitionAhead from './images/C10--vooraankondiging-verbod.png'
import c10ProhibitionException from './images/C10--verbod-met-uitzondering.png'
import c17Prohibition from './images/C17--verbod.png'
import c17ProhibitionAhead from './images/C17--vooraankondiging-verbod.png'
import c17ProhibitionException from './images/C17--verbod-met-uitzondering.png'
import c18Prohibition from './images/C18--verbod.png'
import c18ProhibitionAhead from './images/C18--vooraankondiging-verbod.png'
import c18ProhibitionException from './images/C18--verbod-met-uitzondering.png'
import c19Prohibition from './images/C19--verbod.png'
import c19ProhibitionAhead from './images/C19--vooraankondiging-verbod.png'
import c19ProhibitionException from './images/C19--verbod-met-uitzondering.png'
import c20Prohibition from './images/C20--verbod.png'
import c20ProhibitionAhead from './images/C20--vooraankondiging-verbod.png'
import c20ProhibitionException from './images/C20--verbod-met-uitzondering.png'
import c21Prohibition from './images/C21--verbod.png'
import c21ProhibitionAhead from './images/C21--vooraankondiging-verbod.png'
import c21ProhibitionException from './images/C21--verbod-met-uitzondering.png'
import c21zbProhibition from './images/C21ZB--verbod.png'
import c22Prohibition from './images/C22--verbod.png'

export type TrafficSignBackground = Record<
  string,
  Partial<Record<TrafficSignCategory, string>>
>

export const trafficSignBackgrounds: TrafficSignBackground = {
  c01: {
    verplichting: c01Prohibition,
    'verbod met uitzondering': c01ProhibitionException,
    vooraankondiging: c01ProhibitionAhead,
  },
  c7: {
    verplichting: c07Prohibition,
    'verbod met uitzondering': c07ProhibitionException,
    vooraankondiging: c07ProhibitionAhead,
  },
  c7a: {
    verplichting: c07aProhibition,
    'verbod met uitzondering': c07aProhibitionException,
    vooraankondiging: c07aProhibitionAhead,
  },
  c7b: {
    verplichting: c07bProhibition,
    'verbod met uitzondering': c07bProhibitionException,
    vooraankondiging: c07bProhibitionAhead,
  },
  'c7(zone)': {
    verplichting: c07zbProhibition,
    'verbod met uitzondering': c07zbProhibitionException,
    vooraankondiging: c07zbProhibitionAhead,
  },
  c08: {
    verplichting: c08Prohibition,
  },
  c09: {
    verplichting: c09Prohibition,
  },
  c10: {
    verplichting: c10Prohibition,
    'verbod met uitzondering': c10ProhibitionException,
    vooraankondiging: c10ProhibitionAhead,
  },
  c17: {
    verplichting: c17Prohibition,
    'verbod met uitzondering': c17ProhibitionException,
    vooraankondiging: c17ProhibitionAhead,
  },
  c18: {
    verplichting: c18Prohibition,
    'verbod met uitzondering': c18ProhibitionException,
    vooraankondiging: c18ProhibitionAhead,
  },
  c19: {
    verplichting: c19Prohibition,
    'verbod met uitzondering': c19ProhibitionException,
    vooraankondiging: c19ProhibitionAhead,
  },
  c20: {
    verplichting: c20Prohibition,
    'verbod met uitzondering': c20ProhibitionException,
    vooraankondiging: c20ProhibitionAhead,
  },
  c21: {
    verplichting: c21Prohibition,
    'verbod met uitzondering': c21ProhibitionException,
    vooraankondiging: c21ProhibitionAhead,
  },
  // the underscore in the key below is intentional
  c21_zb: {
    verplichting: c21zbProhibition,
  },
  c22: {
    verplichting: c22Prohibition,
  },
}
