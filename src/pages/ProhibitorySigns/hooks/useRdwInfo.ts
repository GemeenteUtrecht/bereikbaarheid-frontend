import { useRdwAxlesInfo } from './useRdwAxlesInfo'
import { useRdwFuelInfo } from './useRdwFuelInfo'
import { useRdwGeneralInfo } from './useRdwGeneralInfo'
import { useRdwSubcategoryInfo } from './useRdwSubcategoryInfo'

export const useRdwInfo = () => {
  const axlesInfo = useRdwAxlesInfo()
  const fuelInfo = useRdwFuelInfo()
  const generalInfo = useRdwGeneralInfo()
  const subcategoryInfo = useRdwSubcategoryInfo()
  const rdwDataIsError =
    axlesInfo.isError ||
    fuelInfo.isError ||
    generalInfo.isError ||
    subcategoryInfo.isError

  const rdwDataIsLoading =
    axlesInfo.isLoading ||
    fuelInfo.isLoading ||
    generalInfo.isLoading ||
    subcategoryInfo.isLoading

  return {
    axlesInfo,
    fuelInfo,
    generalInfo,
    subcategoryInfo,
    rdwDataIsError,
    rdwDataIsLoading,
  }
}
