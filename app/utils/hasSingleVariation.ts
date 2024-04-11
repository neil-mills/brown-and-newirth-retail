import { Product } from '@/app/types'
import { getUniqueArrayValues } from '@/app/utils'

export const hasSingleVariation = (product: Product) => {
  const skus = getUniqueArrayValues<string>(
    product.variations.map((variation) => variation.sku)
  )
  const isDiamond = product.variations.every(
    (variation) => variation?.attributes?.['pa_total-carat']
  )
  const attr = isDiamond ? 'pa_total-carat' : 'pa_gauge'
  const totalVariants = getUniqueArrayValues<string>(
    product.variations.reduce((acc, variation) => {
      if (variation?.attributes?.[attr]) {
        acc = [...acc, variation.attributes[attr]!]
      }
      return acc
    }, [] as string[])
  )
  return skus.length < 2 && totalVariants.length < 2
}
