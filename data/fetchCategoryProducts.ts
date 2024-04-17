'use server'
import { Product, Styles } from '@/app/types'
import { stylesMap } from '@/app/maps'
import { getCategoryProducts } from '@/app/utils'
import fetchDataServer from './fetchDataServer'

export const fetchCategoryProducts = async (
  category: Styles | undefined
): Promise<Product[]> => {
  let products: Product[] = []
  try {
    products = await fetchDataServer()
  } catch (err) {
    const error = err as Error
    throw new Error(error.message)
  }
  let categoryProducts: Product[] = []
  if (products) {
    if (category) {
      categoryProducts = getCategoryProducts(products, category)
      stylesMap[category].filterLayers.forEach((filterLayer) => {
        categoryProducts = categoryProducts.filter(
          (product) => product?.attributes?.[filterLayer]
        )
      })
    }
  }
  return categoryProducts
}
