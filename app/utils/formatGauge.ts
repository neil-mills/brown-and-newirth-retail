import { gaugeMap } from '@/app/maps'
import { VariationGauge } from '@/app/types'

export const formatGauge = (value: VariationGauge) => {
  if (!gaugeMap?.[value]) return value
  return gaugeMap[value].label
}
