import { getCategoryProducts, getImages } from '@/app/utils'
import {
  Product,
  ProductAttributeKeys,
  ProductFilters,
  Styles,
} from '@/app/types'
import { stylesMap } from '@/app/maps'
import fetchDataServer from './fetchDataServer'

export const fetchProducts = async (
  category: Styles,
  filters: ProductFilters | null
): Promise<Product[]> => {
  let products: Product[] = []
  const data = await fetchDataServer()
  if (data) {
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
  return products
}
