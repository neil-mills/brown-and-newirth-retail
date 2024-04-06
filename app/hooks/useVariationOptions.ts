import { useStore } from '@/app/hooks'
import { getUniqueArrayValues } from '@/app/utils'
import { sizesMap, metalsMap } from '@/app/maps'
import { VariationMetal } from '../types'

interface Option {
  label: string
  value: string
}

export const useVariationOptions = () => {
  const { variations } = useStore((store) => store.selectedSku)

  let widths: Option[] | null = null
  let sizes: Option[] = []
  let metals: Option[] = []

  if (variations?.length) {
    if (variations[0]?.attributes?.pa_size) {
      const allVariationSizes = getUniqueArrayValues<string[]>(
        variations.reduce((acc, variation) => {
          if (variation.attributes?.pa_size) {
            acc = [...acc, variation.attributes.pa_size]
          }
          return acc
        }, [] as string[])
      )
      sizes = allVariationSizes.reduce((acc, size) => {
        acc = [
          ...acc,
          ...sizesMap[size].map((s) => ({
            label: s.toUpperCase(),
            value: s,
          })),
        ]
        return acc
      }, [] as Option[])
    }
    if (variations[0]?.attributes['pa_metal-code']) {
      metals = getUniqueArrayValues<string[]>(
        variations.reduce((acc, variation) => {
          if (variation.attributes['pa_metal-code']) {
            acc = [...acc, variation.attributes['pa_metal-code']]
          }
          return acc
        }, [] as string[])
      )
        .map((metal) => ({
          label: metalsMap?.[metal as VariationMetal]?.label || '',
          value: metalsMap?.[metal as VariationMetal]?.slug,
          index: metalsMap?.[metal as VariationMetal]?.index,
        }))
        .sort((a, b) => a.index! - b.index!)
    }
  }

  return { widths, sizes, metals }
}
