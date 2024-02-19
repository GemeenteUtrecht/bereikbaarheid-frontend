/*
  Defines vehicle property categories used in maplayers and maplegends.
  The order of the categories in the array determines the drawing order of
  the GeoJSON layers.
 */
import type { VehiclePropertyCategory } from './types/vehiclePropertyCategory'

export const axleWeightCategories: VehiclePropertyCategory[] = [
  { color: 'rgb(197,59,47)', label: '9 t', value: 9001 },
  { color: 'rgb(229, 153, 93)', label: '8 t', value: 8001 },
  { color: 'rgb(0, 195, 169)', label: '5 t', value: 5001 },
  { color: 'rgb(252, 132, 173)', label: '4 t', value: 4001 },
  { color: 'rgb(0, 186, 249)', label: '3,5 t', value: 3501 },
  { color: 'rgb(185, 157, 250)', label: '2 t', value: 2001 },
]

export const widthCategories: VehiclePropertyCategory[] = [
  { color: '#da3417', label: '2,3 m', value: 2.31 },
  { color: '#f59309', label: '2,1 m', value: 2.11 },
]
