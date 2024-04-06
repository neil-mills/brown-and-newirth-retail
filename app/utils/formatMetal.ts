import { metalsMap } from '@/app/maps'
import { VariationMetal } from '@/app/types'

export const formatMetal = (metalCode: VariationMetal | string): string => {
  if (Object.keys(metalsMap).some((key) => metalCode === key)) {
    return metalsMap?.[metalCode as VariationMetal].label || ''
  }
  return ''
}
