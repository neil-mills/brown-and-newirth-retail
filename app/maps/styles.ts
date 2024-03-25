import { Styles, Mapping, FilterLayerKeys } from '@/app/types'

interface StyleMapping extends Mapping {
  filterLayers: FilterLayerKeys[]
}

type StyleMap = { [K in Styles]: StyleMapping }

export const stylesMap: StyleMap = {
  Halo: {
    label: 'Halos',
    slug: 'halo',
    image: '/img/02_halos.png',
    filterLayers: ['pa_shape', 'pa_diamond', 'pa_centre-carat'],
  },
  Solitaire: {
    label: 'Solitaires',
    slug: 'solitaire',
    image: '/img/01_solitaires.png',
    filterLayers: ['pa_shape', 'pa_diamond', 'pa_total-carat'],
  },
  Cluster: {
    label: 'Clusters',
    slug: 'cluster',
    image: '/img/03_clusters.png',
    filterLayers: ['pa_shape', 'pa_diamond', 'pa_total-carat'],
  },
  'Three Stone': {
    label: '3-Stones',
    slug: '3-stone',
    image: '/img/04_3-stones.png',
    filterLayers: ['pa_shape', 'pa_diamond', 'pa_centre-carat'],
  },
  'Five Stone': {
    label: '5-Stones',
    slug: '5-stone',
    image: '/img/04_3-stones.png',
    filterLayers: ['pa_shape', 'pa_diamond', 'pa_centre-carat'],
  },
  Trilogy: {
    label: 'Trilogies',
    slug: 'trilogy',
    image: '/img/04_3-stones.png',
    filterLayers: ['pa_shape', 'pa_diamond', 'pa_centre-carat'],
  },
  Other: {
    label: 'Others',
    slug: 'other',
    image: '/img/04_3-stones.png',
    filterLayers: ['pa_shape', 'pa_diamond', 'pa_centre-carat'],
  },
  BRACELET: {
    label: 'Bracelets',
    slug: 'bracelet',
    image: '/img/16_bracelets.png',
    filterLayers: ['pa_shape', 'pa_diamond', 'pa_total-carat'],
  },
  EARRING: {
    label: 'Earrings',
    slug: 'earring',
    image: '/img/14_earrings.png',
    filterLayers: ['pa_shape', 'pa_diamond', 'pa_total-carat'],
  },
  PENDANT: {
    label: 'Pendants',
    slug: 'pendant',
    image: '/img/15_pendants.png',
    filterLayers: ['pa_shape', 'pa_diamond', 'pa_centre-carat'],
  },
  'DRESS RING': {
    label: 'Dress',
    slug: 'dress',
    image: '/img/13_dress.png',
    filterLayers: ['pa_coverage', 'pa_shape', 'pa_setting', 'pa_total-carat'],
  },
  'FULL SET': {
    label: 'Full set',
    slug: 'full-set',
    image: '/img/12_full-set.png',
    filterLayers: ['pa_shape', 'pa_setting', 'pa_diamond', 'pa_total-carat'],
  },
  'HALF SET': {
    label: 'Half set',
    slug: 'half-set',
    image: '/img/11_half-set.png',
    filterLayers: ['pa_shape', 'pa_setting', 'pa_diamond', 'pa_total-carat'],
  },
  Shaped: {
    label: 'Shaped',
    slug: 'shaped',
    image: '/img/09_shaped.png',
    filterLayers: ['pa_diamond-set', 'pa_shape', 'pa_width'],
  },
  PLAIN: {
    label: 'Plains',
    slug: 'plains',
    image: '/img/05_plains.png',
    filterLayers: ['pa_profile', 'pa_gauge', 'pa_width'],
  },
  Patterns: {
    label: 'Patterns',
    slug: 'patterns',
    image: '/img/06_patterns.png',
    filterLayers: ['pa_pattern', 'pa_gauge', 'pa_width'],
  },
  CERAMIC: {
    label: 'Ceramic',
    slug: 'ceramic',
    image: '/img/08_ceramic.png',
    filterLayers: ['pa_ceramic-colour', 'pa_width'],
  },
  CELTIC: {
    label: 'Celtic',
    slug: 'celtic',
    filterLayers: ['pa_gauge', 'pa_width'],
  },
  CONTEMPORARY: {
    label: 'Contemporary',
    slug: 'contemporary',
    filterLayers: ['pa_gauge', 'pa_width'],
  },
  SPARKLE: {
    label: 'Sparkle',
    slug: 'sparkle',
    filterLayers: ['pa_gauge', 'pa_width'],
  },
  'MIXED METAL': {
    label: 'Mixed Metal',
    slug: 'mixed-metal',
    filterLayers: ['pa_gauge', 'pa_width'],
  },
  TRINITY: {
    label: 'Trinity',
    slug: 'trinity',
    filterLayers: ['pa_gauge', 'pa_width'],
  },
  Diamond: {
    label: 'Diamond',
    slug: 'diamond',
    image: '/img/10_diamond.png',
    filterLayers: ['pa_shape', 'pa_setting'],
  },
  'Two Colour': {
    label: '2-Colour',
    slug: '2-colour',
    image: '/img/07_2-colour.png',
    filterLayers: ['pa_profile', 'pa_gauge', 'pa_width'],
  },
}
