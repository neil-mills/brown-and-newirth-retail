import { getUniqueArrayValues, productToVariation } from '@/app/utils'
import { useStore } from '@/app/hooks'
import { Variation, Images } from '@/app/types'

export const useOtherOptions = () => {
  const { product, variations: productVariations } = useStore(
    (store) => store.selectedSku
  )
  let otherOptions: Variation[] = []
  if (product) {
    const variations = !productVariations?.length
      ? [productToVariation(product)]
      : productVariations
    const otherSkus = getUniqueArrayValues<string[]>(
      variations
        .filter((variation) => variation.sku !== variations[0].sku)
        .map((variation) => variation.sku)
    )

    otherOptions = otherSkus.map((sku) => {
      const allVariations = variations.filter(
        (variation) => variation.sku === sku
      )
      const images: Images<string[]> = {
        thumbnail: getUniqueArrayValues<string[]>(
          allVariations.map(
            (variation) => variation['variation-images'].thumbnail
          )
        ),
        medium: getUniqueArrayValues<string[]>(
          allVariations.map((variation) => variation['variation-images'].medium)
        ),
        large: getUniqueArrayValues<string[]>(
          allVariations.map((variation) => variation['variation-images'].large)
        ),
      }
      return {
        ...variations[0],
        images,
      }
    })
  }

  return otherOptions
}
