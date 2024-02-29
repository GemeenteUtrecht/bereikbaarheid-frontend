import { Vehicle } from '../../ProhibitorySigns/types/vehicle'

export interface RestrictionsVehicle extends Vehicle {
  maxAllowedWeight: number
  type: string
}
