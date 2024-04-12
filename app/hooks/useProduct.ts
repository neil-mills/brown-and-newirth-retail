import {
  Product,
  Variation,
  Styles,
  FilterLayerKeys,
  Filters,
  VariationAttributeKeys,
} from '@/app/types'
import { useGetData } from '@/app/hooks'
import {
  getImages,
  getProductCategory,
  getUniqueArrayValues,
  productToVariation,
} from '@/app/utils'
import { stylesMap } from '@/app/maps'
import { isAxiosError } from 'axios'

interface ReturnValues {
  isLoading: boolean
  isError: boolean
  error: Error | null
  product: Product | null
  variations: Variation[]
  images: string[]
  otherOptions: Variation[]
  similarProducts: Product[]
  category: Styles[] | null
  filterLayers: FilterLayerKeys[]
}

interface Props {
  sku: string | null
  productId: string | null
  filters?: Filters | null
}

export const useProduct = ({
  sku,
  productId,
  filters,
}: Props): ReturnValues => {
  let product: Product | null = null
  let variations: Variation[] = []
  let images: string[] = []
  let otherOptions: Variation[] = []
  let similarProducts: Product[] = []
  let category: Styles[] | null = null
  let filterLayers: FilterLayerKeys[] = []

  const { data: products, error, isLoading, isError } = useGetData()

  if (!isLoading && !error && products && !isAxiosError(products)) {
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

      category = getProductCategory(product)
      if (category) filterLayers = stylesMap[category[0]].filterLayers

      if (variations?.length) {
        images = getImages(product)
        const otherSkus = Array.from(
          new Set(
            productVariations
              .filter((variation) => variation.sku !== variations[0].sku)
              .map((variation) => variation.sku)
          )
        )

        similarProducts = products?.filter((p) =>
          p?.variations.some((variation) =>
            product?.['related-cross-sell'].includes(variation.sku)
          )
        )
        if (filters) {
          Object.entries(filters).forEach(([filterAttr, filterValues]) => {
            const values = [
              ...filterValues.map((value) => value.toLowerCase()),
              ...filterValues.map((value) => value.toUpperCase()),
            ]
            similarProducts = similarProducts.filter(
              (product) =>
                Object.keys(product.attributes).includes(filterAttr) &&
                (
                  product.attributes[filterAttr as FilterLayerKeys] as string[]
                ).some((value) => values.includes(value))
            )
          })
        }
        similarProducts = similarProducts.map((p) => ({
          ...p,
          images: getImages(p),
        }))

        otherOptions = otherSkus.map((sku) => {
          const variations = productVariations.filter(
            (variation) => variation.sku === sku
          )
          const images = getImages(product!, sku)
          return {
            ...variations[0],
            images,
          }
        })
        if (filters) {
          Object.entries(filters).forEach(([filterAttr, filterValues]) => {
            const values = [
              ...filterValues.map((value) => value.toLowerCase()),
              ...filterValues.map((value) => value.toUpperCase()),
            ]
            otherOptions = otherOptions.filter(
              (variation) =>
                Object.keys(variation.attributes).includes(filterAttr) &&
                values.includes(
                  variation.attributes[filterAttr as VariationAttributeKeys]!
                )
            )
          })
        }
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
    similarProducts,
    isLoading,
    isError,
    error,
  }
}
