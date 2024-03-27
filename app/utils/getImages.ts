import { Product, Variation, isProduct } from '@/app/types'
import { getUniqueArrayValues, productToVariation } from '@/app/utils'

export const getImages = (item: Variation | Product): string[] => {
  let images: string[] = []
  if (isProduct(item)) {
    const mainImageUrl: string =
      item?.['product-images']?.large ||
      item?.['product-images']?.thumbnail ||
      item?.['product-images']?.medium ||
      ''
    const variations = !item?.variations?.length
      ? [productToVariation(item)]
      : item.variations
    const otherImageUrls = getUniqueArrayValues<string[]>(
      variations
        .reduce((acc, variation) => {
          const variationImages = Object.entries(
            variation['variation-images']
          ).map(([_key, url]) => url)
          return [...acc, ...variationImages]
        }, [] as string[])
        .filter((url) => url !== mainImageUrl)
    )
    images = [mainImageUrl, ...otherImageUrls]
  } else {
    const mainImageUrl =
      item?.['variation-images']?.large ||
      item?.['variation-images']?.thumbnail ||
      item?.['variation-images']?.medium ||
      ''
    const otherImageUrls = getUniqueArrayValues<string[]>(
      Object.entries(item['variation-images'])
        .map(([_key, url]) => url)
        .filter((url) => url !== mainImageUrl)
    )
    images = [mainImageUrl, ...otherImageUrls]
  }
  return images
}
