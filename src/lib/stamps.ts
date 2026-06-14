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
  {
    id: 'roses',
    name: 'Roses éternelles',
    file: '/lovemail/stamps/roses.svg',
    label: '🌹 Roses éternelles',
  },
  {
    id: 'paris',
    name: 'Paris by night',
    file: '/lovemail/stamps/paris.svg',
    label: '🗼 Paris by night',
  },
  {
    id: 'cherry',
    name: 'Sakura',
    file: '/lovemail/stamps/cherry.svg',
    label: '🌸 Sakura',
  },
  {
    id: 'hearts',
    name: 'Avec amour',
    file: '/lovemail/stamps/hearts.svg',
    label: '❤️ Avec amour',
  },
  {
    id: 'sunset',
    name: 'Coucher de soleil',
    file: '/lovemail/stamps/sunset.svg',
    label: '🌅 Coucher de soleil',
  },
  {
    id: 'lighthouse',
    name: "Phare de l'amour",
    file: '/lovemail/stamps/lighthouse.svg',
    label: "🏮 Phare de l'amour",
  },
  {
    id: 'butterfly',
    name: "Papillon d'amour",
    file: '/lovemail/stamps/butterfly.svg',
    label: "🦋 Papillon d'amour",
  },
  {
    id: 'aurora',
    name: 'Aurore boréale',
    file: '/lovemail/stamps/aurora.svg',
    label: '🌌 Aurore boréale',
  },
  {
    id: 'birds',
    name: "Chant d'amour",
    file: '/lovemail/stamps/birds.svg',
    label: "🐦 Chant d'amour",
  },
  {
    id: 'mountains',
    name: 'Cimes enneigées',
    file: '/lovemail/stamps/mountains.svg',
    label: '🏔️ Cimes enneigées',
  },
  {
    id: 'venice',
    name: 'Venise éternelle',
    file: '/lovemail/stamps/venice.svg',
    label: '🚤 Venise éternelle',
  },
  {
    id: 'moon',
    name: 'Clair de lune',
    file: '/lovemail/stamps/moon.svg',
    label: '🌙 Clair de lune',
  },
]
