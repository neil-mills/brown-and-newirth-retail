import { stylesMap } from '@/app/maps'
import { FilterLayerKeys, Styles } from '@/app/types'

export const getCategoryFilterLayers = (category: Styles | undefined) => {
  let filterLayers: FilterLayerKeys[] = []
  const attributes: FilterLayerKeys[] = [
    'pa_pattern',
    'pa_diamond-set',
    'pa_shape',
    'pa_setting',
    'pa_profile',
    'pa_ceramic-colour',
    'pa_coverage',
  ]
  attributes.forEach((attr) => {
    if (stylesMap[category as Styles].filterLayers.includes(attr)) {
      filterLayers.push(attr)
    }
  })
  return filterLayers
}
