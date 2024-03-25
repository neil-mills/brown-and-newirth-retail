import { getUniqueArrayValues, productToVariation } from '@/app/utils'
import {
  Product,
  ProductAttributeKeys,
  Images,
  ProductFilters,
  Styles,
} from '@/app/types'
import { useGetData } from '@/app/hooks'
import { stylesMap } from '@/app/maps'

interface Result {
  products: Product[]
  isLoading: boolean
  error: Error | null
}

export const useProducts = (
  category: Styles,
  filters: ProductFilters | null
): Result => {
  let products: Product[] = []
  const { data, error, isLoading } = useGetData()
  if (!isLoading && !error && data) {
    if (
      [
        'Shaped',
        'Patterns',
        'PLAIN',
        'CERAMIC',
        'HALF SET',
        'FULL SET',
        'Two Colour',
        'Diamond',
      ].includes(category)
    ) {
      if (category === 'Diamond') {
        products = data.filter((product) =>
          product.attributes.pa_shoulders?.includes('Diamond')
        )
      }
      if (category === 'Shaped') {
        products = data.filter(
          (product) => product.attributes.pa_shaped?.length
        )
      }
      if (category === 'HALF SET') {
        products = data.filter(
          (product) =>
            product?.attributes?.pa_coverage &&
            product.attributes.pa_coverage.includes('Half')
        )
      }
      if (category === 'FULL SET') {
        products = data.filter(
          (product) =>
            product?.attributes?.pa_coverage &&
            product.attributes.pa_coverage.includes('Full')
        )
      }
      if (category === 'Patterns') {
        products = data.filter(
          (product) =>
            product?.attributes?.pa_pattern &&
            product.attributes.pa_pattern.some(
              (filter) => !['PLAIN', 'CERAMIC'].includes(filter)
            )
        )
      }
      if (category === 'Two Colour') {
        products = data.filter(
          (product) =>
            product?.attributes?.pa_pattern &&
            product.attributes.pa_pattern.includes('MIXED METAL')
        )
      }
      if (category === 'PLAIN') {
        products = data.filter(
          (product) =>
            product?.attributes?.pa_pattern &&
            product.attributes.pa_pattern.includes('PLAIN')
        )
      }
      if (category === 'CERAMIC') {
        products = data.filter(
          (product) =>
            product?.attributes?.pa_pattern &&
            product.attributes.pa_pattern.includes('CERAMIC')
        )
      }
    } else {
      products =
        category === 'Shaped'
          ? data.filter((product) => product.attributes.pa_shaped?.length)
          : data.filter(
              (product) =>
                product?.attributes?.pa_style?.includes(category) ||
                product?.attributes?.['pa_type-2']?.includes(category)
            )
    }
    stylesMap[category].filterLayers.forEach((filterLayer) => {
      products = products.filter(
        (product) => product?.attributes?.[filterLayer]
      )
    })

    if (filters) {
      Object.entries(filters).forEach(([filter, values]) => {
        products = products.filter((product) =>
          product?.attributes?.[filter as ProductAttributeKeys]?.some(
            (attrValue) => values.includes(attrValue)
          )
        )
      })
    }
    products = products.map((product) => {
      const variations = !product?.variations?.length
        ? [productToVariation(product)]
        : product.variations
      const images: Images<string[]> = {
        thumbnail: getUniqueArrayValues(
          variations.map((variation) => variation['variation-images'].thumbnail)
        ),
        medium: getUniqueArrayValues(
          variations.map((variation) => variation['variation-images'].medium)
        ),
        large: getUniqueArrayValues(
          variations.map((variation) => variation['variation-images'].large)
        ),
      }
      return { ...product, images }
    })
  }
  return { products, isLoading, error }
}
