import {
  Product,
  Variation,
  Images,
  Styles,
  FilterLayerKeys,
} from '@/app/types'
import { useGetData } from '@/app/hooks'
import { getUniqueArrayValues, productToVariation } from '@/app/utils'
import { stylesMap } from '@/app/maps'

interface ReturnValues {
  isLoading: boolean
  error: Error | null
  product: Product | null
  variations: Variation[]
  images: Images<string[]>
  otherOptions: Variation[]
  relatedProducts: Product[]
  category: Styles[] | null
  filterLayers: FilterLayerKeys[]
}

interface Props {
  sku: string | null
  productId: string | null
}

export const useProduct = ({ sku, productId }: Props): ReturnValues => {
  let product: Product | null = null
  let variations: Variation[] = []
  let images: Images<string[]> = { thumbnail: [], medium: [], large: [] }
  let otherOptions: Variation[] = []
  let relatedProducts: Product[] = []
  let category: Styles[] | null = null
  let filterLayers: FilterLayerKeys[] = []

  const { data: products, error, isLoading } = useGetData()
  if (!isLoading && !error && products) {
    if (productId) {
      product =
        products?.find(
          (product) => product?.productId.toString() === productId
        ) || null
    }

    if (sku) {
      product =
        products?.find((product) =>
          product.variations.some((variation) => variation.sku === sku)
        ) || null
    }

    if (product) {
      relatedProducts = products?.filter((p) =>
        product?.['related-cross-sell'].includes(p.productId)
      )
      const productVariations = product?.variations?.length
        ? product.variations
        : [productToVariation(product)]
      if (productId) {
        const skus = getUniqueArrayValues<string[]>(
          productVariations.map((variation) => variation.sku)
        )
        variations =
          skus.map(
            (sku) =>
              productVariations.filter((variation) => variation.sku === sku)[0]
          ) || []
      }
      if (sku) {
        variations = sku
          ? productVariations.filter((variation) => variation.sku === sku)
          : []
      }

      category =
        product?.attributes?.['pa_type-2'] ||
        product?.attributes?.pa_style ||
        product?.attributes?.pa_pattern ||
        null
      if (
        !category &&
        product?.attributes?.pa_shaped &&
        product.attributes.pa_shaped.length
      ) {
        category = ['Shaped']
      }
      if (
        !category &&
        product?.attributes?.pa_coverage &&
        product.attributes.pa_coverage.includes('Half')
      ) {
        category = ['HALF SET']
      }
      if (
        !category &&
        product?.attributes?.pa_coverage &&
        product.attributes.pa_coverage.includes('Full')
      ) {
        category = ['FULL SET']
      }
      if (category) {
        category.forEach((cat) => {
          filterLayers = [...filterLayers, ...stylesMap[cat].filterLayers]
        })
        filterLayers = getUniqueArrayValues<FilterLayerKeys[]>(filterLayers)
      }

      if (variations?.length) {
        images = {
          thumbnail: getUniqueArrayValues<string[]>(
            variations.map(
              (variation) => variation['variation-images'].thumbnail
            )
          ),
          medium: getUniqueArrayValues<string[]>(
            variations.map((variation) => variation['variation-images'].medium)
          ),
          large: getUniqueArrayValues<string[]>(
            variations.map((variation) => variation['variation-images'].large)
          ),
        }
        const otherSkus = Array.from(
          new Set(
            productVariations
              .filter((variation) => variation.sku !== variations[0].sku)
              .map((variation) => variation.sku)
          )
        )
        otherOptions = otherSkus.map((sku) => {
          const variations = productVariations.filter(
            (variation) => variation.sku === sku
          )
          const images: Images<string[]> = {
            thumbnail: getUniqueArrayValues<string[]>(
              variations.map(
                (variation) => variation['variation-images'].thumbnail
              )
            ),
            medium: getUniqueArrayValues<string[]>(
              variations.map(
                (variation) => variation['variation-images'].medium
              )
            ),
            large: getUniqueArrayValues<string[]>(
              variations.map((variation) => variation['variation-images'].large)
            ),
          }

          return {
            ...variations[0],
            images,
          }
        })
      }
    }
  }
  return {
    product,
    category,
    filterLayers,
    variations,
    images,
    otherOptions,
    relatedProducts,
    isLoading,
    error,
  }
}
