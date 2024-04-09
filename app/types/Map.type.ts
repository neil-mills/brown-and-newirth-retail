import {
  diamondOriginsMap,
  caratMap,
  widthMap,
  gaugeMap,
  diamondQualityMap,
} from '@/app/maps'

export interface Mapping {
  label: string
  filterLabel?: string
  image?: string
  class?: string
  disabled?: boolean
  slug: string
  filter?: string[]
  start?: number
  end?: number
  index?: number
}

export interface Map {
  [key: string]: Mapping
}

export type RangeFilterAttribute =
  | 'pa_width'
  | 'pa_centre-carat'
  | 'pa_total-carat'
  | 'pa_diamond'
  | 'pa_diamond-quality'
  | 'pa_gauge'

export type RangeFilterMaps = {
  [K in RangeFilterAttribute]: Map
}

export const maps: RangeFilterMaps = {
  pa_width: widthMap,
  'pa_centre-carat': caratMap,
  'pa_total-carat': caratMap,
  pa_diamond: diamondOriginsMap,
  'pa_diamond-quality': diamondQualityMap,
  pa_gauge: gaugeMap,
}
