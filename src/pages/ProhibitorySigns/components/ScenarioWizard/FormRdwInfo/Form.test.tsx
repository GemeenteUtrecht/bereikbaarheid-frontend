import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

import { withPageContext } from '../../../../../../test/utils/prohibitorySigns/withPageContext'
import { withQueryClient } from '../../../../../../test/utils/withQueryClient'

import {
  ProhibitorySignsFormScenarioRdwInfo,
  ProhibitorySignsFormScenarioRdwInfoProps,
} from './Form'
import { Vehicle } from '../../../types/vehicle'

describe('ProhibitorySignsFormScenarioRdwInfo', () => {
  const props: ProhibitorySignsFormScenarioRdwInfoProps = {
    addressInputEnabled: true,
  }

  const setup = (children: ReactNode) => {
    return {
      user: userEvent.setup(),
      ...withQueryClient(
        withPageContext(<MemoryRouter>{children}</MemoryRouter>, {
          vehicle: {
            height: 2.34,
            licensePlate: 'BXLS14',
          } as Vehicle,
        }),
      ),
    }
  }

  it('renders correctly', async () => {
    setup(<ProhibitorySignsFormScenarioRdwInfo {...props} />)

    expect(
      await screen.findByTestId('form-scenario-rdw-info'),
    ).toBeInTheDocument()
  })

  it('shows an error message if the payload exceeds the registered maximum', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioRdwInfo {...props} />)

    await user.type(await screen.findByLabelText('Lading'), '10000')

    expect(await screen.findAllByRole('alert')).toHaveLength(2)
    expect(screen.getByText(/Lading mag niet meer zijn dan.*/i)).toBeVisible()
    expect(
      screen.getByText(/Totaal gewicht mag niet meer zijn dan.*/i),
    ).toBeVisible()
  })

  it('shows an error message if the payload is a negative value', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioRdwInfo {...props} />)
    const payloadInput = await screen.findByLabelText('Lading')

    await user.clear(payloadInput)
    await user.type(payloadInput, '-10')

    expect(await screen.findAllByRole('alert')).toHaveLength(2)
    expect(screen.getByText('Lading moet minimaal 0 kg zijn')).toBeVisible()
    expect(
      screen.getByText(/Totaal gewicht moet meer zijn dan.*/i),
    ).toBeVisible()
  })

  it('presets the axle weight input to the legal general maximum if the registered axle weight is higher', async () => {
    // the vehicle in the setup method has an allowed axle weight of 11500
    setup(<ProhibitorySignsFormScenarioRdwInfo {...props} />)

    expect(await screen.findByLabelText('Aslast')).toHaveValue('10000')
  })

  it('shows an error message if the axle weight exceeds the legal general maximum of 10000 kg', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioRdwInfo {...props} />)
    const axleWeightInput = await screen.findByLabelText('Aslast')

    await user.clear(axleWeightInput)
    await user.type(axleWeightInput, '11000')

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(
      screen.getByText(
        'Aslast mag niet meer zijn dan 10000 kg. Neem contact op met het RDW.',
      ),
    ).toBeVisible()
  })

  it('increases the allowed axle and total weight in case of a mobile crane', async () => {
    const user = userEvent.setup()

    withQueryClient(
      withPageContext(
        <MemoryRouter>
          <ProhibitorySignsFormScenarioRdwInfo {...props} />
        </MemoryRouter>,
        {
          vehicle: {
            height: 3.25,
            licensePlate: '85BPF2',
          } as Vehicle,
        },
      ),
    )

    expect(await screen.findByLabelText('Totaal gewicht')).toHaveValue('60000')
    expect(await screen.findByLabelText('Aslast')).toHaveValue('12000')

    await user.click(screen.getByText('Kaart bekijken', { selector: 'button' }))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('shows an error message if vehicle length is more than 22 meter', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioRdwInfo {...props} />)
    const lengthInput = await screen.findByLabelText('Lengte')

    await user.clear(lengthInput)
    await user.type(lengthInput, '23')

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(
      screen.getByText(
        'Lengte mag maximaal 22 m zijn. Neem contact op met het RDW.',
      ),
    ).toBeVisible()
  })

  it('shows an error message if vehicle width is less than registered width', async () => {
    // the vehicle in the setup method has a registered width of 2.55
    const { user } = setup(<ProhibitorySignsFormScenarioRdwInfo {...props} />)
    const widthInput = await screen.findByLabelText('Breedte')

    await user.clear(widthInput)
    await user.type(widthInput, '2.45')

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(screen.getByText('Breedte moet minimaal 2.55 m zijn')).toBeVisible()
  })

  it('shows an error message if vehicle width is more than 3 meters', async () => {
    // the vehicle in the setup method has a registered width of 2.55
    const { user } = setup(<ProhibitorySignsFormScenarioRdwInfo {...props} />)
    const widthInput = await screen.findByLabelText('Breedte')

    await user.clear(widthInput)
    await user.type(widthInput, '3.25')

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(
      screen.getByText(
        'Breedte mag maximaal 3 m zijn. Neem contact op met het RDW.',
      ),
    ).toBeVisible()
  })

  it('accepts a comma as decimal separator for vehicle length and width', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioRdwInfo {...props} />)
    const lengthInput = await screen.findByLabelText('Lengte')
    const widthInput = await screen.findByLabelText('Breedte')

    await user.clear(lengthInput)
    await user.clear(widthInput)

    await user.type(lengthInput, '15,34')
    await user.type(widthInput, '2,65')

    await user.click(screen.getByText('Kaart bekijken', { selector: 'button' }))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('accepts a dot as decimal separator for vehicle length and width', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioRdwInfo {...props} />)
    const lengthInput = await screen.findByLabelText('Lengte')
    const widthInput = await screen.findByLabelText('Breedte')

    await user.clear(lengthInput)
    await user.clear(widthInput)

    await user.type(lengthInput, '12.75')
    await user.type(widthInput, '2.88')

    await user.click(screen.getByText('Kaart bekijken', { selector: 'button' }))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
