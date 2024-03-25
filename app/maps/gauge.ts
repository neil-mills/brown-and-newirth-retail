import { VariationGauge, Mapping } from '@/app/types'

type GaugeMap = { [K in VariationGauge]: Mapping }

export const gaugeMap: GaugeMap = {
  ultralight: {
    label: 'Ultra Light',
    slug: 'ultra-light',
  },
  light: {
    label: 'Light',
    slug: 'light',
  },
  medium: {
    label: 'Medium',
    slug: 'medium',
  },
  heavy: {
    label: 'Heavy',
    slug: 'heavy',
  },
  'super-heavy': {
    label: 'Super Heavy',
    slug: 'super-heavy',
  },
}
