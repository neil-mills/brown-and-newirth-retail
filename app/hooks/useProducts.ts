import { getCategoryProducts, getImages } from '@/app/utils'
import {
  Product,
  ProductAttributeKeys,
  ProductFilters,
  Styles,
} from '@/app/types'
import { useGetData } from '@/app/hooks'
import { stylesMap } from '@/app/maps'
import { isAxiosError } from 'axios'

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
  if (!isLoading && !error && data && !isAxiosError(data)) {
    products = getCategoryProducts(data, category)

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
      const images = getImages(product)
      return { ...product, images }
    })
  }
  return { products, isLoading, error }
}
