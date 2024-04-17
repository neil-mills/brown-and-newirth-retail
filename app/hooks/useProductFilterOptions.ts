import {
  Mapping,
  Product,
  Filters,
  Styles,
  ProductFilterAttributeKeys,
} from '@/app/types'
import { productFilterAttributesMap } from '@/app/maps'
import { getFilterOptions } from '@/app/utils'

const map = productFilterAttributesMap

interface Props {
  categoryProducts: Product[]
  filter: ProductFilterAttributeKeys
  filters?: Filters | null
  category?: Styles | undefined | null
}

export const useProductFilterOptions = ({
  categoryProducts,
  filter,
  filters,
  category,
}: Props): Mapping[] => {
  let filteredProducts: Product[] = categoryProducts
  let filterOptions: Mapping[] = []
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
