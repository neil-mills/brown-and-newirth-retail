import {
  Mapping,
  Product,
  Filters,
  Styles,
  ProductFilterAttributeKeys,
} from '@/app/types'
import { productFilterAttributesMap, stylesMap } from '@/app/maps'
import { getCategoryProducts, getFilterOptions } from '@/app/utils'

const map = productFilterAttributesMap

interface Props {
  products: Product[]
  filter: ProductFilterAttributeKeys
  filters?: Filters | null
  category?: Styles | undefined | null
}

export const useProductFilterOptions = ({
  products,
  filter,
  filters,
  category,
}: Props): Mapping[] => {
  let filteredProducts: Product[] = products
  let filterOptions: Mapping[] = []
  if (category) {
    filteredProducts = getCategoryProducts(products, category)
    stylesMap[category].filterLayers.forEach((filterLayer) => {
      filteredProducts = filteredProducts.filter(
        (product) => product?.attributes?.[filterLayer]
      )
    })
  }
  if (filters) {
    Object.entries(filters).forEach(([filterKey, values]) => {
      if (filterKey !== filter) {
        filteredProducts = filteredProducts?.filter(
          (product) =>
            product?.attributes?.[filterKey as ProductFilterAttributeKeys] &&
            values.some((value) =>
              product.attributes[
                filterKey as ProductFilterAttributeKeys
              ]?.includes(value as never)
            )
        )
      }
    })
  }
  if (filteredProducts) {
    filterOptions = getFilterOptions({
      filteredProducts,
      category,
      filter,
    })
  }

  return filterOptions
}
