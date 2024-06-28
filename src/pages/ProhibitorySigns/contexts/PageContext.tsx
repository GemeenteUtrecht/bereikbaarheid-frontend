import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import { Address } from '../../../types/address'
import { ProhibitorySignsVehicle } from '../types/vehicle'

export type ProhibitorySignsPageContextProps = {
  activeStepWizard: number
  setActiveStepWizard: Dispatch<SetStateAction<number>>
  address: Address
  setAddress: Dispatch<SetStateAction<Address>>
  expertMode: boolean
  showScenarioWizard: boolean
  setShowScenarioWizard: Dispatch<SetStateAction<boolean>>
  vehicle: ProhibitorySignsVehicle
  setVehicle: Dispatch<SetStateAction<ProhibitorySignsVehicle>>
}

export const ProhibitorySignsPageContext = createContext<
  ProhibitorySignsPageContextProps | undefined
>(undefined)

export function useProhibitorySignsPageContext() {
  const context = useContext(ProhibitorySignsPageContext)
  if (context === undefined) {
    throw new Error(
      'useProhibitorySignsPageContext must be within ProhibitorySignsPageProvider',
    )
  }

  return context
}
