'use client'
import { ProductGridSkeleton, TitleBar } from '@/app/components'
import { useStore, useVariations } from '@/app/hooks'
import { FilterLayerKeys, Filters } from '@/app/types'
import ProductGrid from '@/app/components/ProductGrid'

const FilteredVariations = ({
  filters,
  isLoading = true,
  sku,
}: {
  filters: Filters | null
  isLoading: boolean
  sku?: string | null
}) => {
  const { filterLayers } = useStore((store) => store.selectedSku)
  const setOtherOptionsResults = useStore(
    (store) => store.setOtherOptionsResults
  )
  const filterByAttribute: FilterLayerKeys =
    filterLayers[filterLayers.length - 1]
  const variations = useVariations({ filterByAttribute, filters, sku })
  if (sku) setOtherOptionsResults(variations.length)
  return (
    <>
      {isLoading ? (
        <>
          <>
            {!sku && (
              <TitleBar>
                <span style={{ visibility: 'hidden' }}>Loading</span>
              </TitleBar>
            )}
            <ProductGridSkeleton />
          </>
        </>
      ) : (
        <>
          {!sku && <TitleBar>Results ({variations.length})</TitleBar>}
          <ProductGrid style="variation" items={variations} />
        </>
      )}
    </>
  )
}

export default FilteredVariations
