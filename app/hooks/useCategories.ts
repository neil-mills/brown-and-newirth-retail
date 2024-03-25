import { Product } from '../types'
import { useGetData } from './'

export const useCategories = () => {
  const { data: products, error, isLoading } = useGetData()
  let categories: string[] = []
  let categoryProducts: Product[] = []
  if (!isLoading && !error && products) {
    const hasCategories = products.some((product) => product.category)
    categories = hasCategories
      ? Array.from(new Set(products.map((product) => product.category)))
      : []
    categoryProducts = categories.length
      ? categories
          .filter((category) => category)
          .map(
            (category) =>
              products.filter((product) => product.category === category)[0]
          )
      : []
  }
  return { categoryProducts, categories, isLoading, error }
}
