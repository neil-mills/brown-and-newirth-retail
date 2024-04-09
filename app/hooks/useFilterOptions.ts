import { rangeFilterMap } from '@/app/maps'
import { RangeFilterAttribute, Mapping } from '@/app/types'

export const useFilterOptions = (
  rangeFilter: RangeFilterAttribute
): Mapping[] => {
  let allOptions = Object.entries(rangeFilterMap[rangeFilter])
    .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
    .map(([_key, mapping]) => mapping)
  if (rangeFilter === 'pa_diamond-quality') {
    allOptions = allOptions.filter((option) => option.filterLabel)
  }
  return allOptions
}
