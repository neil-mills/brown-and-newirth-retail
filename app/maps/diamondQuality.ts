import { ProductDiamondQuality, Mapping } from '@/app/types'

type DiamondQualityMap = { [K in ProductDiamondQuality]: Mapping }

export const diamondQualityMap: DiamondQualityMap = {
  GSI: { label: 'GSI', slug: 'gsi' },
  HSI: { label: 'G/H Si', slug: 'hsi', filterLabel: 'Mined' },
  'D-FVS': { label: 'D-FVS', slug: 'd-fvs', filterLabel: 'Laboratory' },
  GVS: { label: 'GVS', slug: 'gvs' },
}
