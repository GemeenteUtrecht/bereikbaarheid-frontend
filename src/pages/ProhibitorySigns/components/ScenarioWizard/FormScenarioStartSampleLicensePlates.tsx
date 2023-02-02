import { Select, themeSpacing } from '@amsterdam/asc-ui'
import { FormEvent, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import styled from 'styled-components'

import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { FormScenarioStartInputs } from './FormScenarioStart'

const licensePlates = [
  {
    height: 1.65,
    label: 'Fiat Punto',
    licensePlate: 'J595XS',
  },
  {
    height: 2.65,
    label: 'Vuilniswagen',
    licensePlate: 'BXLS14',
  },
  {
    height: 2.18,
    label: 'Lichte vrachtwagen',
    licensePlate: '34BBX2',
  },
  {
    height: 1.95,
    label: 'Jeep Cherokee',
    licensePlate: '21RZZH',
  },
  {
    height: 1.88,
    label: 'Kampeerwagen',
    licensePlate: '8SNT31',
  },
  {
    height: 3.45,
    label: 'Kraan',
    licensePlate: '85BPF2',
  },
  {
    height: 3.13,
    label: 'Bus euro 6',
    licensePlate: '77BJJ3',
  },
]

const StyledSelect = styled(Select)`
  margin-left: ${themeSpacing(3)};
`

type ExpertModeLicensePlatesProps = {
  setValue: UseFormSetValue<FormScenarioStartInputs>
}

const FormScenarioStartSampleLicensePlates = ({
  setValue,
}: ExpertModeLicensePlatesProps) => {
  const { vehicle, setVehicle } = useProhibitorySignsPageContext()
  const [selected, setSelected] = useState(vehicle?.licensePlate)

  const presetFormValues = (e: FormEvent<HTMLSelectElement>) => {
    setSelected(e.currentTarget.value)

    if (e.currentTarget.value === 'no-vehicle-selected') {
      setValue('licensePlate', '')
      setValue('vehicleHeight', 0)

      setVehicle({
        ...vehicle,
        licensePlate: '',
        hasTrailer: false,
        height: 0,
      })
    }

    const selectedItem = licensePlates.find(
      item => item.licensePlate === e.currentTarget.value
    )

    if (selectedItem) {
      setValue('licensePlate', selectedItem.licensePlate)
      setValue('vehicleHeight', selectedItem.height)
    }
  }

  return (
    <StyledSelect
      id="expertModeLicensePlate"
      defaultValue={selected}
      onChange={presetFormValues}
    >
      <option key="no-vehicle-selected" value="no-vehicle-selected">
        Selecteer een voertuig
      </option>

      {licensePlates.map(item => (
        <option key={item.licensePlate} value={item.licensePlate}>
          {item.label}
        </option>
      ))}
    </StyledSelect>
  )
}

export default FormScenarioStartSampleLicensePlates
