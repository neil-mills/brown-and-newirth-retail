import { useGetData } from '@/app/hooks'
import {
  Mapping,
  Product,
  Filters,
  Map,
  Styles,
  ProductFilterAttributeKeys,
} from '@/app/types'
import {
  shapesMap,
  shapedMap,
  profilesMap,
  diamondOriginsMap,
  patternMap,
  stylesMap,
  settingMap,
  caratMap,
  ceramicColoursMap,
  coverageMap,
} from '@/app/maps'
import { getCategoryProducts, getUniqueArrayValues } from '@/app/utils'

type ProductFilterAttributesMap = { [K in ProductFilterAttributeKeys]: Map }

const map: ProductFilterAttributesMap = {
  pa_shape: shapesMap,
  pa_shaped: shapedMap,
  pa_profile: profilesMap,
  pa_diamond: diamondOriginsMap,
  pa_pattern: patternMap,
  pa_setting: settingMap,
  'pa_centre-carat': caratMap,
  'pa_total-carat': caratMap,
  'pa_ceramic-colour': ceramicColoursMap,
  pa_coverage: coverageMap,
}

interface Props {
  filter: ProductFilterAttributeKeys
  filters?: Filters | null
  category?: Styles | undefined | null
  productId?: string | undefined
}

export const useProductFilterOptions = ({
  filter,
  filters,
  category,
  productId,
}: Props): {
  filterOptions: Mapping[]
  isLoading: boolean
  error: Error | null
} => {
  const filterMap = map[filter]
  const { data: products = [], error, isLoading } = useGetData()
  let filterOptions: Mapping[] = []
  let filteredProducts = products
  if (!isLoading && !error && products) {
    if (category) {
      filteredProducts = getCategoryProducts(products, category)

      stylesMap[category].filterLayers.forEach((filterLayer) => {
        filteredProducts = filteredProducts.filter(
          (product) => product?.attributes?.[filterLayer]
        )
      })
    }
    if (productId) {
      filteredProducts = products.filter(
        (product: Product) => product.productId === parseInt(productId)
      )
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
      if (filterMap[Object.keys(filterMap)[0]]?.index) {
        filterOptions = filterOptions.sort((a, b) => a.index! - b.index!)
      }
    }
  }
  return { filterOptions, isLoading, error }
}
