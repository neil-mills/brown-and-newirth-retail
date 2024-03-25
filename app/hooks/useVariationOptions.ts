import { useStore } from '@/app/hooks'
import { getUniqueArrayValues } from '@/app/utils'
import { sizesMap, metalsMap } from '@/app/maps'

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
      sizes = sizesMap[variations[0].attributes.pa_size].map((size) => ({
        label: size.toUpperCase(),
        value: size,
      }))
    }
    if (variations[0]?.attributes['pa_metal-code']) {
      metals = getUniqueArrayValues<string[]>(
        variations.map((variation) => variation.attributes['pa_metal-code']!)
      ).map((metal) => ({ label: metalsMap?.[metal] || '', value: metal }))
    }
  }

  return { widths, sizes, metals }
}
