import { widthMap, caratMap, diamondOriginsMap, gaugeMap } from '@/app/maps'
import { RangeFilterMaps } from '@/app/types'

export const rangeFilterMap: RangeFilterMaps = {
  pa_width: widthMap,
  'pa_centre-carat': caratMap,
  'pa_total-carat': caratMap,
  pa_diamond: diamondOriginsMap,
  pa_gauge: gaugeMap,
}
