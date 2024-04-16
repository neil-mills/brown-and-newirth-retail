import { Product, Variation } from '@/app/types'
import { getUniqueArrayValues } from '@/app/utils'

export const getImages = (
  product: Product,
  sku?: string,
  width?: string | undefined
): string[] => {
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
    let widthCode = width ? width.replace('-', '').substring(0, 2) : ''
    if (widthCode?.charAt(1) === '5') {
      widthCode = `${parseInt(widthCode.charAt(0)) + 1}0`
    }
    if (['90', '10'].includes(widthCode)) widthCode = '80'

    widthCode = widthCode ? `W${widthCode}` : widthCode
    firstImage =
      variationImages.find((image) => image.includes(`${widthCode}_3.jpg`)) ||
      ''
    secondImage =
      variationImages.find((image) => image.includes(`${widthCode}_1.jpg`)) ||
      ''
    otherImages = variationImages.filter(
      (image) =>
        ![firstImage, secondImage].includes(image) && image.includes(widthCode)
    )
    if (widthCode) {
      otherImages = otherImages.filter((image) => image.includes(widthCode))
    }
  }
  return [
    firstImage,
    secondImage,
    ...getUniqueArrayValues<string[]>(otherImages),
  ]
}
