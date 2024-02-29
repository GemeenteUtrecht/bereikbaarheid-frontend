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
  { color: colors[0], label: 't/m 9 t', value: 9001 },
  { color: colors[1], label: 't/m 8 t', value: 8001 },
  { color: colors[2], label: 't/m 5 t', value: 5001 },
  { color: colors[3], label: 't/m 4 t', value: 4001 },
  { color: colors[4], label: 't/m 3,5 t', value: 3501 },
  { color: colors[5], label: 't/m 2 t', value: 2001 },
]

export const heightCategories: VehiclePropertyCategory[] = [
  { color: colors[0], label: 't/m 4 m', value: 4.0 },
  { color: colors[1], label: 't/m 3,5 m', value: 3.51 },
  { color: colors[2], label: 't/m 3,1 m', value: 3.11 },
  { color: colors[3], label: 't/m 2,7 m', value: 2.71 },
  { color: colors[4], label: 't/m 2,4 m', value: 2.41 },
  { color: colors[5], label: 't/m 2,1 m', value: 2.11 },
  { color: colors[6], label: 't/m 1,8 m', value: 1.81 },
]

export const lengthCategories: VehiclePropertyCategory[] = [
  { color: colors[0], label: 'vanaf 9 m', value: 22.0 },
  { color: colors[1], label: 'tot 9 m', value: 9.0 },
]

export const maximumAllowedWeightCategories: VehiclePropertyCategory[] = [
  { color: colors[0], label: 'meer dan 3500 kg', value: 60000 },
  { color: colors[1], label: 'max. 3500kg', value: 3500 },
]

export const weightCategories: VehiclePropertyCategory[] = [
  { color: colors[0], label: 't/m 30 t', value: 30001 },
  { color: colors[1], label: 't/m 25 t', value: 25001 },
  { color: colors[2], label: 't/m 20 t', value: 20001 },
  { color: colors[3], label: 't/m 5 t', value: 5001 },
  { color: colors[4], label: 't/m 3,5 t', value: 3501 },
  { color: colors[5], label: 't/m 2,5 t', value: 2501 },
  { color: colors[6], label: 't/m 1 t', value: 1001 },
]

export const widthCategories: VehiclePropertyCategory[] = [
  { color: colors[0], label: 't/m 2,3 m', value: 2.31 },
  { color: colors[1], label: 't/m 2,1 m', value: 2.11 },
]
