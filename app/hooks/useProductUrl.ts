import { isProduct, isVariation, Variation, Product } from '@/app/types'
import {
  formatSearchParams,
  hasSingleVariation,
  hasSecondFilterLayer,
} from '@/app/utils'
import { useSearchParams } from 'next/navigation'
import { useStore } from './useStore'

export const useProductUrl = (item: Product | Variation) => {
  const { filterLayers } = useStore((store) => store.selectedSku)
  const searchParams = useSearchParams()
  const secondFilterLayer = hasSecondFilterLayer(item, filterLayers)
  let url = ''
  const params = isVariation(item)
    ? formatSearchParams(searchParams.toString(), {
        'variation-id': item['variation-id'].toString(),
      })
    : ''
  // let singleVariation = isProduct(item) && hasSingleVariation(item)
  if (isVariation(item)) {
    url = `/products/sku/${item.sku}?${params}`
  }
  if (isProduct(item)) {
    url = `/products/productId/${item.productId}`
    // if (secondFilterLayer && !singleVariation) {
    //   url = `/products/productId/${item.productId}`
    // }
    // if ((secondFilterLayer && singleVariation) || !hasSecondFilterLayer) {
    //   url = `/products/sku/${item.sku}`
    // }
    // if (singleVariation) {
    //   url = `/products/sku/${item.sku}?variation-id=${item.variations[0]['variation-id']}&single=true`
    // }
  }
  return url
}
