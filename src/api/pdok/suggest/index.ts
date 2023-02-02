//
// PDOK Locatieserver - suggest
//

import axios from 'axios'

export interface PdokSuggestItem {
  centroide_ll: string
  huis_nlt: string
  id: string
  postcode: string
  straatnaam: string
  weergavenaam: string
  woonplaatsnaam: string
}

export interface PdokSuggestItems {
  response: {
    docs: PdokSuggestItem[] | []
    maxScore: number
    numFound: number
    start: number
  }
}

export const pdokSuggestItemFieldList = ['id', 'weergavenaam', 'centroide_ll']

export function suggest(searchString: string): Promise<PdokSuggestItems> {
  return axios
    .get('https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest', {
      params: {
        q: `${searchString} and type:adres`,
        fl: pdokSuggestItemFieldList.join(','),
        fq: 'gemeentenaam:Utrecht',
      },
    })
    .then(response => response.data)
}
