import { isProduct, isVariation, Variation, Product } from '@/app/types'
import { formatSearchParams } from '@/app/utils'
import { useSearchParams } from 'next/navigation'

export const useProductUrl = (item: Product | Variation) => {
  const searchParams = useSearchParams()
  const searchByCode = searchParams.get('search') === 'code'
  let url = ''
  const params = isVariation(item)
    ? formatSearchParams(searchParams.toString(), {
        'variation-id': item['variation-id'].toString(),
      })
    : ''
  if (isVariation(item) && !searchByCode) {
    url = `/products/sku/${item.sku}?${params}`
  }
  if (isVariation(item) && searchByCode) {
    url = `/products/sku/${item.sku}?search=code`
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
