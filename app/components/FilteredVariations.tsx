'use client'
import { ProductGridSkeleton, TitleBar } from '@/app/components'
import { useStore, useVariations } from '@/app/hooks'
import { FilterLayerKeys, Filters } from '@/app/types'
import ProductGrid from '@/app/components/ProductGrid'

const FilteredVariations = ({
  filters,
  isLoading = true,
}: {
  filters: Filters | null
  isLoading: boolean
}) => {
  const { filterLayers } = useStore((store) => store.selectedSku)
  const filterByAttribute: FilterLayerKeys =
    filterLayers[filterLayers.length - 1]
  const variations = useVariations({ filterByAttribute, filters })
  return (
    <>
      {isLoading ? (
        <>
          <TitleBar>
            <span style={{ visibility: 'hidden' }}>Loading</span>
          </TitleBar>
          <ProductGridSkeleton />
        </>
      ) : (
        <>
          <TitleBar>Results ({variations.length})</TitleBar>
          <ProductGrid style="variation" items={variations} />
        </>
      )}
    </>
  )
}

export default FilteredVariations
