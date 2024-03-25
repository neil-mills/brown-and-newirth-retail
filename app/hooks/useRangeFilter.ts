import { useStore } from '@/app/hooks'
import { rangeFilterMap } from '@/app/maps'
import {
  Mapping,
  Filters,
  VariationAttributeKeys,
  Variation,
  RangeFilterAttribute,
} from '@/app/types'
import { productToVariation, getUniqueArrayValues } from '@/app/utils'

interface Props {
  rangeFilter: RangeFilterAttribute
  childRangeFilter?: RangeFilterAttribute
  filters: Filters | null
}

export const useRangeFilter = <T>({
  rangeFilter,
  childRangeFilter,
  filters,
}: Props): [Mapping[], T[]] => {
  const allOptions = Object.entries(rangeFilterMap[rangeFilter])
    .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
    .map(([_key, mapping]) => mapping)
  let availableOptions: T[] = []

  const { product } = useStore((store) => store.selectedSku)
  let filteredVariations: Variation[] = []
  if (product) {
    const productVariations = product?.variations?.length
      ? product.variations
      : [productToVariation(product)]
    filteredVariations = productVariations
    if (filters) {
      Object.entries(filters).forEach(([filter, values]) => {
        if (
          ![rangeFilter, childRangeFilter].includes(
            filter as RangeFilterAttribute
          )
        ) {
          filteredVariations = filteredVariations.filter(
            (variation) =>
              variation?.attributes?.[filter as VariationAttributeKeys] &&
              values.includes(
                variation.attributes[filter as VariationAttributeKeys]!
              )
          )
        }
      })
    }
    if (
      ['pa_centre-carat', 'pa_total-carat', 'pa_width'].includes(rangeFilter)
    ) {
      availableOptions = getUniqueArrayValues<T[]>(
        filteredVariations
          .filter(
            (variation) =>
              variation?.attributes?.[rangeFilter as VariationAttributeKeys]
          )
          .map(
            (variation) =>
              variation.attributes[rangeFilter as VariationAttributeKeys]
          )
          .map((option) => {
            const numericOption = parseFloat(
              option?.replace('-', '.') as string
            )
            const lastOption = allOptions[allOptions.length - 1].start
            const rangeMap = rangeFilterMap[rangeFilter]
            const index =
              numericOption < lastOption!
                ? Object.entries(rangeMap).findIndex(
                    ([_widthKey, { start, end }]) =>
                      numericOption >= start! && numericOption <= end!
                  )
                : Object.keys(rangeMap).length - 1
            return Object.keys(rangeMap)[index]
          })
          .filter((option) => option !== undefined)
      )
    } else {
      availableOptions = getUniqueArrayValues<T[]>(
        filteredVariations
          .filter(
            (variation) =>
              variation?.attributes?.[rangeFilter as VariationAttributeKeys]
          )
          .map((variation) => variation.attributes[rangeFilter]!)
      )
    }
  }

  return [allOptions, availableOptions]
}
