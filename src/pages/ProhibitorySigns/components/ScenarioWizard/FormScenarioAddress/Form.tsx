import { ChevronLeft } from '@amsterdam/asc-assets'
import {
  Button,
  CompactThemeProvider,
  ErrorMessage,
  Input,
  Link,
  List,
  ListItem,
  styles,
  themeColor,
  themeSpacing,
} from '@amsterdam/asc-ui'
import debounce from 'lodash/debounce'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'

import { suggest, PdokSuggestItem } from '../../../../../api/pdok/suggest'
import { useProhibitorySignsPageContext } from '../../../contexts/PageContext'
import { FormLabel } from '../../../../../shared/components/FormLabel'
import { wktPointToLocation } from '../../../../../shared/map/wktPointToLocation'
import { theme } from '../../../../../styles/Theme'
import { Address } from '../../../../../types/address'

import ScenarioWizardNav from '../ScenarioWizardNav'

const AddressOptionsContainer = styled.div`
  min-height: 220px;

  ${styles.ListStyle} {
    border-color: ${themeColor('tint', 'level2')};
    border-style: solid;
    border-width: 0 1px 1px 1px;
    padding: ${themeSpacing(1)} ${themeSpacing(2)};
  }

  ${styles.ListItemStyle} {
    margin-bottom: ${themeSpacing(1)};
  }
`

const AddressOptionsContainerFooter = styled(ListItem)`
  color: ${themeColor('tint', 'level5')};
  font-size: 14px;
  margin-top: ${themeSpacing(1)};
`

const debouncedHandler = debounce((e, handler) => handler(e), 500)

type FormScenarioAddressInputs = {
  searchAddress: Address['label']
}

export const ProhibitorySignsFormScenarioAddress = () => {
  const { setActiveStepWizard, address, setAddress } =
    useProhibitorySignsPageContext()
  const [addressOptions, setAddressOptions] = useState<PdokSuggestItem[] | []>(
    [],
  )
  const {
    handleSubmit,
    formState: { errors },
    register,
    clearErrors,
    setError,
    setValue,
  } = useForm<FormScenarioAddressInputs>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  })

  const { onBlur, name, ref } = register('searchAddress')

  const lookupAddress = async (e: ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value
    clearErrors('searchAddress')

    if (searchString.length < 3) {
      setError('searchAddress', {
        type: 'custom',
        message: 'Voer tenminste 3 letters in',
      })

      return
    }

    suggest(searchString)
      .then(search => {
        if (search.response.numFound === 0) {
          setError('searchAddress', {
            type: 'custom',
            message: 'Geen adres gevonden',
          })
        }

        setAddressOptions(search.response.docs)
      })
      .catch(() => {
        setError('searchAddress', {
          type: 'custom',
          message:
            'De PDOK API is momenteel niet beschikbaar. Hierdoor kan er niet worden gezocht op een adres. Probeer het later nog een keer.',
        })
      })
  }

  const onClickAddress = (e: MouseEvent, item: PdokSuggestItem) => {
    e.preventDefault()

    const location = wktPointToLocation(item.centroide_ll)

    setAddress({
      label: item.weergavenaam,
      lat: location.lat,
      lon: location.lng,
    })

    clearErrors('searchAddress')
    setValue('searchAddress', item.weergavenaam)
    setAddressOptions([])
  }

  const onSubmit: SubmitHandler<FormScenarioAddressInputs> = () => {
    if (!address.label || !address.lon || !address.lat) {
      setError('searchAddress', {
        type: 'custom',
        message: 'Selecteer een adres uit de lijst',
      })

      return
    }

    setActiveStepWizard(2)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormLabel htmlFor="searchAddress" label="Adres van uw bestemming" />
      <Input
        id="searchAddress"
        autoComplete="off"
        defaultValue={address?.label}
        error={Boolean(errors.searchAddress)}
        placeholder="Type een adres en selecteer"
        onChange={e => debouncedHandler(e, lookupAddress)}
        onBlur={onBlur}
        name={name}
        ref={ref}
      />
      {errors.searchAddress && (
        <ErrorMessage message={errors.searchAddress.message!} />
      )}

      <AddressOptionsContainer>
        {addressOptions.length > 0 && (
          <CompactThemeProvider overrides={theme}>
            <List>
              {addressOptions.map((item, index) => (
                <ListItem key={index}>
                  <Link
                    href="#"
                    onClick={(e: MouseEvent) => onClickAddress(e, item)}
                    variant="inline"
                  >
                    {item.weergavenaam}
                  </Link>
                </ListItem>
              ))}
              <AddressOptionsContainerFooter>
                Selecteer een adres of type verder
              </AddressOptionsContainerFooter>
            </List>
          </CompactThemeProvider>
        )}
      </AddressOptionsContainer>

      <ScenarioWizardNav>
        <Button
          variant="textButton"
          iconSize={14}
          iconLeft={<ChevronLeft />}
          onClick={() => setActiveStepWizard(0)}
        >
          Vorige
        </Button>

        <Button variant="secondary" taskflow type="submit">
          Volgende
        </Button>
      </ScenarioWizardNav>
    </form>
  )
}
