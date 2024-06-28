import { Vehicle } from '../../../types/vehicle'

export interface RestrictionsVehicle extends Vehicle {
  maxAllowedWeight: number
  type: string
}
