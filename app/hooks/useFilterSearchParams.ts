import {
  caratMap,
  diamondOriginsMap,
  shapesMap,
  shapedMap,
  diamondSetMap,
  profilesMap,
  gaugeMap,
  widthMap,
  patternMap,
  settingMap,
  ceramicColoursMap,
} from '@/app/maps'
import { Map, SearchParamKeys, Filters } from '@/app/types'
import { searchParamsToObject } from '@/app/utils'

type FilterSearchParamsMap = {
  [K in SearchParamKeys]: Map
}

const map: FilterSearchParamsMap = {
  pa_diamond: diamondOriginsMap,
  'pa_centre-carat': caratMap,
  'pa_total-carat': caratMap,
  pa_shape: shapesMap,
  pa_shaped: shapedMap,
  'pa_diamond-set': diamondSetMap,
  pa_profile: profilesMap,
  pa_gauge: gaugeMap,
  pa_width: widthMap,
  pa_pattern: patternMap,
  pa_setting: settingMap,
  'pa_ceramic-colour': ceramicColoursMap,
}

export const useFilterSearchParams = (
  searchParamsStr: string
): Filters | null => {
  const searchParams = searchParamsToObject(searchParamsStr)
  let filters: Filters | null = null
  if (!searchParams || Object.keys(searchParams).length === 0) return filters
  filters = Object.entries(searchParams).reduce((acc, [key, values]) => {
    if (Object.keys(map).includes(key)) {
      const filterValues = values
        ? values.split(',').map((value) => {
            const index = Object.entries(map[key as SearchParamKeys]).findIndex(
              ([_mapKey, mapping]) => mapping.slug === value
            )
            return Object.keys(map[key as SearchParamKeys])[index]
          })
        : []
      acc = { ...acc, [key]: filterValues }
    }
    return acc
  }, {} as Filters)
  return filters
}
