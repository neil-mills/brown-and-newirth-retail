import {
  getImages,
  getUniqueArrayValues,
  productToVariation,
} from '@/app/utils'
import { useStore } from '@/app/hooks'
import { Variation, Images } from '@/app/types'

export const useOtherOptions = () => {
  const { product, variations: productVariations } = useStore(
    (store) => store.selectedSku,
  )
  let otherOptions: Variation[] = []
  if (product) {
    const variations = !productVariations?.length
      ? [productToVariation(product)]
      : productVariations
    const otherSkus = getUniqueArrayValues<string[]>(
      variations
        .filter((variation) => variation.sku !== variations[0].sku)
        .map((variation) => variation.sku),
    )

    otherOptions = otherSkus.map((sku) => {
      const allVariations = variations.filter(
        (variation) => variation.sku === sku,
      )
      const images = getImages(product)

      return {
        ...variations[0],
        images,
      }
    })
  }

  return otherOptions
}
