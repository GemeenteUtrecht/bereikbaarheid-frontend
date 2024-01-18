import { Label, Radio, RadioGroup } from '@amsterdam/asc-ui'

import { aerialImages, topoBlackWhite } from '../../../../shared/map/mapLayers'

import { useRestrictionsMapContext } from '../../contexts/MapContext'

export const RestrictionsMapLegendBaseLayers = () => {
  const { activeBaseLayer, setActiveBaseLayer } = useRestrictionsMapContext()
  const baseLayers = [
    aerialImages,
    {
      ...topoBlackWhite,
      label: 'Topografie',
    },
  ]

  return (
    <RadioGroup name="group">
      {baseLayers.map(item => {
        return (
          <Label htmlFor={item.id} key={item.id} label={item.label}>
            <Radio
              id={item.id}
              checked={item.id === activeBaseLayer}
              onClick={e => {
                setActiveBaseLayer(item.id)
                e.currentTarget.blur()
              }}
            />
          </Label>
        )
      })}
    </RadioGroup>
  )
}
