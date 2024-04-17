import {
  Mapping,
  Product,
  ProductFilterAttributeKeys,
  Styles,
} from '@/app/types'
import { getUniqueArrayValues } from '@/app/utils'
import { productFilterAttributesMap as map } from '@/app/maps'

interface Props {
  filteredProducts: Product[]
  category: Styles | undefined | null
  filter: ProductFilterAttributeKeys
}
export const getFilterOptions = ({
  filteredProducts,
  category,
  filter,
}: Props) => {
  let filterOptions: Mapping[] = []
  const filterMap = map[filter]
  if (filteredProducts) {
    filterOptions = getUniqueArrayValues<string[]>(
      filteredProducts?.reduce((acc, product) => {
        if (product?.attributes?.[filter]) {
          acc = [...acc, ...product.attributes[filter]!]
        }
        return acc
      }, [] as string[])
    )
      .map((filter) => filterMap[filter])
      .filter((filter) => filter !== undefined)
    if (category === 'EARRING') {
      filterOptions = filterOptions.filter((option) => option.slug !== 'other')
    }
    if (category === 'Two Colour') {
      filterOptions = filterOptions.filter(
        (option) => option.slug !== 'mixed-metal'
      )
    }
    if (filterMap[Object.keys(filterMap)[0]]?.index) {
      filterOptions = filterOptions.sort((a, b) => a.index! - b.index!)
    }
  }
  return filterOptions
}
