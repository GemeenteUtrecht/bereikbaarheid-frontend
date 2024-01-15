import { CompactThemeProvider } from '@amsterdam/asc-ui'

import { MapLegendItem } from '../../../../shared/components/MapLegendItem'
import {
  LegendWrapper,
  LegendItemsWrapper,
} from '../../../../shared/components/MapLegendStyles'

export const RestrictionsMapLegendRoadNetwork = () => {
  return (
    <>
      <LegendWrapper>
        <CompactThemeProvider>
          <LegendItemsWrapper>
            <MapLegendItem color="#60b20d" text="geen ontheffing nodig" />

            <MapLegendItem color="#91522d" text="voetgangersgebied" />
          </LegendItemsWrapper>
        </CompactThemeProvider>
      </LegendWrapper>
    </>
  )
}
