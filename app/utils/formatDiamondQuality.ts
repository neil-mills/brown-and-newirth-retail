import { diamondQualityMap } from '@/app/maps'
import { ProductDiamondQuality, VariationDiamondQuality } from '@/app/types'

export const formatDiamondQuality = (
  diamondQuality: VariationDiamondQuality | undefined
): string => {
  if (!diamondQuality) return ''
  return diamondQualityMap?.[
    diamondQuality.toUpperCase() as ProductDiamondQuality
  ]?.label
}
