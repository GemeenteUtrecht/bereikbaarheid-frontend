// Utrecht colors & typography
// see: https://nl-design-system.github.io/utrecht/docs/tmp/huisstijl/kleuren
// and logo: https://nl-design-system.github.io/utrecht/docs/componenten/branding/Logo

import { Theme } from '@amsterdam/asc-ui'

export const theme: Partial<Theme.ThemeInterface> = {
  colors: {
    primary: {
      main: '#24578f',
      dark: '#143252',
    },
    secondary: {
      main: '#cc0000',
      dark: '#660000',
    },
    tint: {
      level1: '#ffffff', // unchanged
      level2: '#f2f2f2',
      level3: '#e6e6e6',
      level4: '#cccccc',
      level5: '#666666',
      level6: '#4d4d4d',
      level7: '#000000',
    },
    support: {
      valid: '#80a659',
      invalid: '#990000',
      focus: '#ffcc00',
    },
    error: {
      main: '#990000',
    },
  },
  typography: {
    fontFamily:
      '"Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "Arial", sans-serif',
  },
}
