import {
  FilterLayerKeys,
  isProduct,
  Product,
  ProductAttributeKeys,
  Variation,
} from '@/app/types'

const filterLayerKeys: FilterLayerKeys[] = [
  'pa_diamond-quality',
  'pa_width',
  'pa_centre-carat',
  'pa_total-carat',
]

export const hasSecondFilterLayer = (
  item: Product | Variation,
  filterLayers: FilterLayerKeys[]
): boolean => {
  let secondFilterLayer = false
  if (isProduct(item)) {
    filterLayerKeys.forEach((filterLayer) => {
      if (
        filterLayers.includes(filterLayer) &&
        item?.attributes?.[filterLayer as ProductAttributeKeys] &&
        item.attributes[filterLayer as ProductAttributeKeys]!.length > 1
      )
        secondFilterLayer = true
    })
  }
  return secondFilterLayer
}
