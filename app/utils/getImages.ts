import { Product, Variation } from '@/app/types'
import { getUniqueArrayValues } from '@/app/utils'

export const getImages = (product: Product, sku?: string): string[] => {
  let firstImage = ''
  let secondImage = ''
  let otherImages = []

  const getImageInfo = (
    url: string
  ): { file: string; code: string; path: string } => {
    const file = url.split('/').pop() || ''
    const code = file ? file.split('_')[0] : ''
    const path = url.split('/').slice(0, -1).join('/')
    return { file, code, path }
  }

  const getAllVariationImages = (variations: Variation[] | undefined) => {
    if (variations) {
      return variations.reduce((acc, variation) => {
        const {
          thumbnail = '',
          medium = '',
          large = '',
        } = variation['variation-images']
        return [...acc, thumbnail, medium, large]
      }, [] as string[])
    }
    return []
  }

  if (!sku) {
    firstImage = product['product-images']?.large || ''
    const { code, path } = getImageInfo(firstImage)
    secondImage = `${path}/${code}_1.jpg`
    otherImages = getAllVariationImages(product.variations).filter(
      (image) => image && ![firstImage, secondImage].includes(image)
    )
  } else {
    const variations = product.variations.filter(
      (variation) => variation.sku === sku
    )
    const variationImages = getAllVariationImages(variations)
    firstImage = variationImages.find((image) => image.includes('_3.jpg')) || ''
    secondImage =
      variationImages.find((image) => image.includes('_1.jpg')) || ''
    otherImages = variationImages.filter(
      (image) => ![firstImage, secondImage].includes(image)
    )
  }
  return [
    firstImage,
    secondImage,
    ...getUniqueArrayValues<string[]>(otherImages),
  ]
}
