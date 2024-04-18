import { getCategoryProducts, getImages } from '@/app/utils'
import {
  Product,
  ProductAttributeKeys,
  ProductFilters,
  Styles,
} from '@/app/types'
import { stylesMap } from '../maps'

interface Props {
  products: Product[]
  filters: ProductFilters | null
  category: Styles | undefined
}

export const useProducts = ({
  products,
  filters,
  category,
}: Props): Product[] => {
  let categoryProducts: Product[] = []

  if (products?.length && category) {
    categoryProducts = getCategoryProducts(products, category)
    stylesMap[category].filterLayers.forEach((filterLayer) => {
      categoryProducts = categoryProducts.filter(
        (product) => product?.attributes?.[filterLayer]
      )
    })
    if (filters) {
      Object.entries(filters).forEach(([filter, values]) => {
        categoryProducts = categoryProducts.filter((product) =>
          product?.attributes?.[filter as ProductAttributeKeys]?.some(
            (attrValue) => values.includes(attrValue)
          )
        )
      })
    }
    categoryProducts = categoryProducts.map((product) => {
      const images = getImages(product)
      return { ...product, images }
    })
  }

  return categoryProducts
}
