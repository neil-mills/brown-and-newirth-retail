import {
  DiamondOrigin,
  ProductDiamondQuality,
  VariationDiamondQuality,
} from '@/app/types'
import { diamondQualityMap, diamondOriginsMap } from '../maps'

export const formatDiamondOrigin = (
  diamondQuality: VariationDiamondQuality | undefined,
  diamondOrigin: DiamondOrigin | undefined
): string => {
  if (diamondQuality && ['hsi', 'd-fvs'].includes(diamondQuality)) {
    const key = diamondQuality.toUpperCase() as ProductDiamondQuality
    return diamondQualityMap[key].filterLabel || ''
  }
  if (diamondOrigin) {
    return diamondOriginsMap[diamondOrigin].label
  }
  return ''
}
