import { Vehicle } from '../../../types/vehicle'

export interface ProhibitorySignsVehicle extends Vehicle {
  licensePlate: string
  payload: number
}
