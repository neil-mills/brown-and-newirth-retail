import { Mapping, ProductProfiles } from '@/app/types'

type PatternMap = { [K in ProductProfiles]: Mapping }

export const profilesMap: PatternMap = {
  BARREL: {
    label: 'Barrel',
    image: '/img/svg/icon-profile-barrel.svg',
    slug: 'barrel',
  },
  'CLASSIC COURT': {
    label: 'Classic Court',
    image: '/img/svg/icon-profile-classic-court.svg',
    slug: 'classic-court',
  },
  Flat: {
    label: 'Flat',
    image: '/img/svg/icon-profile-flat.svg',
    slug: 'flat',
  },
  'MODERN COURT': {
    label: 'Modern Court',
    image: '/img/svg/icon-profile-modern-court.svg',
    slug: 'modern-court',
  },
  OTHER: {
    label: 'Other',
    image: '/img/svg/icon-profile-other.svg',
    slug: 'other',
  },
  'D SHAPED': {
    label: 'D-Shaped',
    image: '/img/svg/icon-profile-d-shaped.svg',
    slug: 'd-shaped',
  },
}
