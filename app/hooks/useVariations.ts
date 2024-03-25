import {
  VariationAttributeKeys,
  FilterLayerKeys,
  Variation,
  RangeFilterAttribute,
  Filters,
} from '@/app/types'
import { useStore } from '@/app/hooks'
import { getUniqueArrayValues, productToVariation } from '@/app/utils'
import { rangeFilterMap } from '@/app/maps'

interface Props {
  filterByAttribute: FilterLayerKeys
  filters: Filters | null
}

export const useVariations = ({
  filterByAttribute,
  filters,
}: Props): Variation[] => {
  const { product, filterLayers } = useStore((store) => store.selectedSku)
  const rangeAttributes: RangeFilterAttribute[] = [
    'pa_width',
    'pa_total-carat',
    'pa_centre-carat',
  ]
  let filteredVariations: Variation[] = []
  if (product) {
    const productVariations = product?.variations?.length
      ? product.variations
      : [productToVariation(product)]
    filteredVariations = productVariations
    if (filters && Object.keys(filters)) {
      Object.entries(filters).forEach(([filter, values]) => {
        if (rangeAttributes.includes(filter as RangeFilterAttribute))
          values = values.map((value) => value.replace('.', '-'))
        if (!rangeAttributes.includes(filter as RangeFilterAttribute)) {
          filteredVariations = filteredVariations.filter((variation) =>
            values.includes(
              variation?.attributes?.[filter as VariationAttributeKeys]!
            )
          )
        } else {
          values = values.map((value) => value.replace('-', '.'))
          filteredVariations = filteredVariations.filter((variation) => {
            const numericValue = variation?.attributes?.[
              filter as RangeFilterAttribute
            ]
              ? parseFloat(
                  variation.attributes[
                    filter as VariationAttributeKeys
                  ]!.replace('-', '.')
                )
              : null
            const map = rangeFilterMap[filter as RangeFilterAttribute]

            const ranges = values.map((value) => {
              const { start, end } = map[value]
              return { start, end }
            })

            const allKeys = Object.keys(map).sort(
              (a, b) => parseFloat(a) - parseFloat(b)
            )
            const lastOption = parseFloat(allKeys[allKeys.length - 1])
            if (numericValue && numericValue < lastOption) {
              for (const range of ranges) {
                if (
                  numericValue >= range.start! &&
                  numericValue <= range.end!
                ) {
                  return true
                }
              }
              return false
            }
            return false
          })
        }
      })
    }
    const productSkus = getUniqueArrayValues<string[]>(
      filteredVariations.map((variation) => variation.sku)
    )
    let uniqueAtts: string[] = []
    filteredVariations.forEach((variation) => {
      if (variation?.attributes?.[filterByAttribute as VariationAttributeKeys])
        uniqueAtts.push(
          variation.attributes[filterByAttribute as VariationAttributeKeys]!
        )
    })
    uniqueAtts = getUniqueArrayValues<string[]>(uniqueAtts)

    const groupedFilteredVariations: Variation[] = []
    productSkus.forEach((sku) => {
      uniqueAtts.forEach((attr) => {
        const variation = filteredVariations.find(
          (variation) =>
            variation.sku === sku &&
            variation.attributes[
              filterByAttribute as VariationAttributeKeys
            ] === attr
        )
        if (variation) groupedFilteredVariations.push(variation)
      })
    })
    if (!groupedFilteredVariations.length) {
      filteredVariations = [filteredVariations[0]]
    } else {
      filteredVariations = groupedFilteredVariations
    }

    filteredVariations = filteredVariations.map((variation) => ({
      ...variation,
      images: {
        thumbnail: [variation['variation-images'].thumbnail],
        medium: [variation['variation-images'].medium],
        large: [variation['variation-images'].large],
      },
    }))
    let sortBy: RangeFilterAttribute | null = null
    if (filterLayers.includes('pa_width')) sortBy = 'pa_width'
    if (filterLayers.includes('pa_total-carat')) sortBy = 'pa_total-carat'
    if (filterLayers.includes('pa_centre-carat')) sortBy = 'pa_centre-carat'

    if (sortBy) {
      filteredVariations = filteredVariations.sort(
        (a, b) =>
          parseInt(a.attributes[sortBy!]!.replace('-', '.')) -
          parseInt(b.attributes[sortBy!]!.replace('-', '.'))
      )
    }
  }

  return filteredVariations
}
