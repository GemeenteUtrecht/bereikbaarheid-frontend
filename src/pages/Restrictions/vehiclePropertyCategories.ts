/*
  Defines vehicle property categories used in maplayers and maplegends.
  The order of the categories in the array determines the drawing order of
  the GeoJSON layers.
 */
import type { VehiclePropertyCategory } from './types/vehiclePropertyCategory'

// https://mk.bcgsc.ca/colorblind/palettes.mhtml#12-color-palette-for-colorbliness
const colors = [
  '#9f0162',
  '#ff5aaf',
  '#009f81',
  '#008df9',
  '#ffc33b',
  '#8400cd',
  '#e20134',
  '#ff6e3a',
  '#ffb2fd',
  '#00fccf',
  '#a40122',
  '#00c2f9',
]

export const axleWeightCategories: VehiclePropertyCategory[] = [
  { color: colors[0], label: '9 t', value: 9001 },
  { color: colors[1], label: '8 t', value: 8001 },
  { color: colors[2], label: '5 t', value: 5001 },
  { color: colors[3], label: '4 t', value: 4001 },
  { color: colors[4], label: '3,5 t', value: 3501 },
  { color: colors[5], label: '2 t', value: 2001 },
]

export const widthCategories: VehiclePropertyCategory[] = [
  { color: colors[0], label: '2,3 m', value: 2.31 },
  { color: colors[1], label: '2,1 m', value: 2.11 },
]
