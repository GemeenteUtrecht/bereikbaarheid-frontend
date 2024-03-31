import { mapPanelConstants, MapPanelContext } from '@amsterdam/arm-core'
import { ChevronLeft } from '@amsterdam/asc-assets'
import {
  Button,
  Column,
  CompactThemeProvider,
  Link,
  Paragraph,
} from '@amsterdam/asc-ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import {
  DeepMap,
  FieldError,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from 'react-hook-form'
import { z } from 'zod'

import LoadingSpinner from '../../../../../shared/components/LoadingSpinner'
import { theme } from '../../../../../styles/Theme'

import { useProhibitorySignsPageContext } from '../../../contexts/PageContext'
import { useRdwInfo } from '../../../hooks/useRdwInfo'
import ScenarioWizardNav from './../ScenarioWizardNav'

import { RdwInfoFormInnerContainer, RdwInfoFormRow } from './FormStyle'
import FormRdwInfoIntroText from './IntroText'
import FormRdwInfoVehicleAxleWeight from './VehicleAxleWeight'
import FormRdwInfoVehicleCurbWeight from './VehicleCurbWeight'
import FormRdwInfoVehicleLength from './VehicleLength'
import FormRdwInfoVehicleSummary from './VehicleSummary'
import FormRdwInfoVehicleTotalWeight from './VehicleTotalWeight'
import FormRdwInfoVehicleWidth from './VehicleWidth'
import { useRdwInfoValidationSchema } from './useValidationSchema'
import FormRdwInfoVehiclePayload from './VehiclePayload'

export type FormRdwInfoInputs = {
  vehicleCurbWeight: number
  vehiclePayload: number
  vehicleTotalWeight: number
  vehicleAxleWeight: number
  vehicleLength: number
  vehicleWidth: number
}

export interface FormRdwInfoInputProps<TFormValues extends FieldValues> {
  errors: Partial<DeepMap<TFormValues, FieldError>>
  register: UseFormRegister<TFormValues>
}

export interface ProhibitorySignsFormScenarioRdwInfoProps {
  addressInputEnabled: boolean
}

export const ProhibitorySignsFormScenarioRdwInfo = ({
  addressInputEnabled,
}: ProhibitorySignsFormScenarioRdwInfoProps) => {
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)
  const { setActiveStepWizard, setShowScenarioWizard, vehicle, setVehicle } =
    useProhibitorySignsPageContext()
  const previousFormStep = addressInputEnabled ? 1 : 0
  const { rdwDataIsError, rdwDataIsLoading } = useRdwInfo()
  const validationSchema = useRdwInfoValidationSchema()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormRdwInfoInputs>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
  })

  const onSubmit: SubmitHandler<z.infer<typeof validationSchema>> = data => {
    setVehicle({
      ...vehicle,
      axleWeight: data.vehicleAxleWeight,
      length: data.vehicleLength,
      payload: data.vehiclePayload,
      weight: data.vehicleTotalWeight,
      width: data.vehicleWidth,
    })

    setPositionFromSnapPoint(mapPanelConstants.SnapPoint.Full)
    setShowScenarioWizard(false)
  }

  if (rdwDataIsError) {
    return (
      <CompactThemeProvider overrides={theme}>
        <Paragraph>
          De RDW API is momenteel niet beschikbaar. Probeer het later nog een
          keer.
        </Paragraph>
      </CompactThemeProvider>
    )
  }

  if (rdwDataIsLoading) return <LoadingSpinner />

  return (
    <CompactThemeProvider overrides={theme}>
      <Paragraph>
        Uw voertuiggegevens volgens{' '}
        <Link
          variant="inline"
          href={`https://ovi.rdw.nl/default.aspx?kenteken=${vehicle.licensePlate}`}
          target="_blank"
        >
          RDW
        </Link>
      </Paragraph>

      <FormRdwInfoVehicleSummary />

      <FormRdwInfoIntroText />

      <form
        data-testid="form-scenario-rdw-info"
        onSubmit={handleSubmit(onSubmit)}
      >
        <RdwInfoFormInnerContainer>
          <RdwInfoFormRow hasMargin={false}>
            <Column push={4} span={4}>
              <Paragraph gutterBottom={0} strong>
                RDW gegevens
              </Paragraph>
            </Column>
            <Column span={4}>
              <Paragraph gutterBottom={0} strong>
                Uw gegevens
              </Paragraph>
            </Column>
          </RdwInfoFormRow>

          <FormRdwInfoVehicleCurbWeight errors={errors} register={register} />

          <FormRdwInfoVehiclePayload
            errors={errors}
            register={register}
            setValue={setValue}
          />

          <FormRdwInfoVehicleTotalWeight errors={errors} register={register} />

          <FormRdwInfoVehicleAxleWeight errors={errors} register={register} />

          <FormRdwInfoVehicleLength errors={errors} register={register} />

          <FormRdwInfoVehicleWidth errors={errors} register={register} />
        </RdwInfoFormInnerContainer>

        <ScenarioWizardNav>
          <Button
            variant="textButton"
            iconSize={14}
            iconLeft={<ChevronLeft />}
            onClick={() => setActiveStepWizard(previousFormStep)}
          >
            Vorige
          </Button>

          <Button variant="secondary" type="submit">
            Kaart bekijken
          </Button>
        </ScenarioWizardNav>
      </form>
    </CompactThemeProvider>
  )
}
