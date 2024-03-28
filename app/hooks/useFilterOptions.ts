import { rangeFilterMap } from '@/app/maps'
import { RangeFilterAttribute, Mapping } from '@/app/types'

export const useFilterOptions = (
  rangeFilter: RangeFilterAttribute
): Mapping[] => {
  const allOptions = Object.entries(rangeFilterMap[rangeFilter])
    .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
    .map(([_key, mapping]) => mapping)
  return allOptions
}
