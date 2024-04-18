import { isProduct, isVariation, Variation, Product } from '@/app/types'
import { formatSearchParams, hasSingleVariation } from '@/app/utils'
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
    const singleVariation = hasSingleVariation(item)
    if (singleVariation) {
      url = `/products/sku/${item.sku}`
    }
    if (!singleVariation) {
      url = `/products/productId/${item.productId}`
    }
  }
  return url
}
