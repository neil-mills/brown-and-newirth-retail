import { Map, Mapping, Variation, Filters } from '@/app/types'
import { useStore } from '@/app/hooks'
import { getUniqueArrayValues, productToVariation } from '@/app/utils'
import { widthMap, gaugeMap } from '@/app/maps'

interface Props {
  filter: 'pa_gauge' | 'pa_width'
  filters?: Filters
}

type FilterAttributes = 'pa_gauge' | 'pa_width'

type FilterMap = { [K in FilterAttributes]: Map }

const map: FilterMap = {
  pa_gauge: gaugeMap,
  pa_width: widthMap,
}

export const useVariationFilterOptions = ({
  filter,
  filters,
}: Props): Mapping[] => {
  let options: Mapping[] = []
  let filteredVariations: Variation[] = []
  const filterMap = map[filter]
  const { product } = useStore((store) => store.selectedSku)
  if (product) {
    const productVariations = product?.variations?.length
      ? product.variations
      : [productToVariation(product)]
    filteredVariations = productVariations
    if (filters) {
      Object.entries(filters).forEach(([filter, values]) => {
        filteredVariations = filteredVariations.filter(
          (variation) =>
            variation?.attributes?.[filter as FilterAttributes] &&
            values.includes(variation.attributes[filter as FilterAttributes]!)
        )
      })
    }
    options = getUniqueArrayValues<string[]>(
      productVariations
        .filter((variation) => variation?.attributes?.[filter])
        .map((variation) => variation.attributes[filter]!)
    ).map((value) => filterMap[value])
  }

  return options
}
