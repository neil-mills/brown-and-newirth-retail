'use client'
import { TitleBar } from '@/app/components'
import { useStore, useVariations } from '@/app/hooks'
import { FilterLayerKeys, Filters } from '@/app/types'
import ProductGrid from '@/app/components/ProductGrid'

export const FilteredVariations = ({
  filters,
}: {
  filters: Filters | null
}) => {
  const { filterLayers } = useStore((store) => store.selectedSku)
  const filterByAttribute: FilterLayerKeys =
    filterLayers[filterLayers.length - 1]
  const variations = useVariations({ filterByAttribute, filters })
  return (
    <>
      <TitleBar>Results ({variations.length})</TitleBar>
      <ProductGrid style="variation" items={variations} />
    </>
  )
}
