import { useFilterOptions, useStore } from '@/app/hooks'
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
  let allOptions = useFilterOptions(rangeFilter)
  allOptions = allOptions.sort(
    (a, b) => parseFloat(a.slug) - parseFloat(b.slug)
  )
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
        const allValues = [
          ...values.map((value) => value.toLowerCase()),
          ...values.map((value) => value.toUpperCase()),
        ]
        if (
          ![rangeFilter, childRangeFilter].includes(
            filter as RangeFilterAttribute
          )
        ) {
          filteredVariations = filteredVariations.filter(
            (variation) =>
              variation?.attributes?.[filter as VariationAttributeKeys] &&
              allValues.includes(
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
            const index =
              numericOption < lastOption!
                ? allOptions.findIndex(
                    ({ start, end }) =>
                      numericOption >= start! && numericOption <= end!
                  )
                : allOptions.length - 1
            return allOptions[index].slug
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
