import { Mapping, ProductPatterns } from '../types'

type PatternMap = { [K in ProductPatterns]: Mapping }

export const patternMap: PatternMap = {
  CELTIC: {
    label: 'Celtic',
    image: '/img/svg/icon-pattern-celtic.svg',
    slug: 'celtic',
  },
  CERAMIC: {
    label: 'Ceramic',
    image: '/img/svg/icon-pattern-ceramic.svg',
    slug: 'ceramic',
  },
  CONTEMPORARY: {
    label: 'Contemporary',
    image: '/img/svg/icon-pattern-contemporary.svg',
    slug: 'contemporary',
  },
  SPARKLE: {
    label: 'Sparkle',
    image: '/img/svg/icon-pattern-sparkle.svg',
    slug: 'sparkle',
  },
  TRINITY: {
    label: 'Trinity',
    image: '/img/svg/icon-pattern-trinity.svg',
    slug: 'trinity',
  },
  'MIXED METAL': {
    label: 'Mixed Metal',
    image: '/img/svg/icon-pattern-mixed-metal.svg',
    slug: 'mixed-metal',
  },
}
