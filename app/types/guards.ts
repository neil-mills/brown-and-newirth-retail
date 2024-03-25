import { Product, Variation, Mapping } from '@/app/types'

export const isProduct = (
  item: Product | Variation | Mapping
): item is Product => {
  return (item as Product).productId !== undefined
}
export const isVariation = (
  item: Product | Variation | Mapping
): item is Variation => {
  return (item as Variation)['variation-id'] !== undefined
}
