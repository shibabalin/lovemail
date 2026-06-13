import type { Stamp } from '../types'

// Import automatique des timbres depuis /public/stamps
// Pour ajouter un timbre, déposez un SVG dans /public/stamps et ajoutez une entrée ici
export const STAMPS: Stamp[] = [
  {
    id: 'bear',
    name: 'Ours amoureux',
    file: '/lovemail/stamps/bear.svg',
    label: '🐻 Ours amoureux',
  },
  {
    id: 'lake',
    name: 'Lac romantique',
    file: '/lovemail/stamps/lake.svg',
    label: '🦢 Lac aux cygnes',
  },
  {
    id: 'night',
    name: 'Nuit romantique',
    file: '/lovemail/stamps/night.svg',
    label: '🌙 Nuit romantique',
  },
]
