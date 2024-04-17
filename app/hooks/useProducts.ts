import { getImages } from '@/app/utils'
import { Product, ProductAttributeKeys, ProductFilters } from '@/app/types'

interface Props {
  categoryProducts: Product[]
  filters: ProductFilters | null
}

export const useProducts = ({
  categoryProducts,
  filters,
}: Props): Product[] => {
  let products: Product[] = categoryProducts

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

  return products
}
