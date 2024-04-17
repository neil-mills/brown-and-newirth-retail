'use client'
import { FilterGrid, FilterGridSkeleton, TitleBar } from '@/app/components'
import {
  FilterLayerKeys,
  Product,
  ProductFilterAttributeKeys,
  Styles,
} from '@/app/types'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { useFilterSearchParams, useProductFilterOptions } from '@/app/hooks'

interface Props {
  category: Styles | undefined
  filter: ProductFilterAttributeKeys
  filterLayers: FilterLayerKeys[]
  childFilters?: ProductFilterAttributeKeys[]
  categoryProducts: Product[]
  label: string
}
const FilterMenuServer = ({
  category,
  filter,
  childFilters,
  label,
  filterLayers,
  categoryProducts,
}: Props) => {
  const searchParams = useSearchParams()
  const paDiamondSet = searchParams.get('pa_diamond-set')
  const isShapeFilter = filterLayers.includes('pa_shape')
  const filters = useFilterSearchParams(searchParams.toString())
  const filterOptions = useProductFilterOptions({
    categoryProducts,
    filter,
    filters,
    category,
  })
  useEffect(() => {}, [filters])
  let showMenu =
    (isShapeFilter && category !== 'Shaped') ||
    (isShapeFilter && category === 'Shaped' && paDiamondSet)
  if (!showMenu) {
    showMenu = filterLayers.includes(filter)
  }
  if (!showMenu) return null
  return (
    <Suspense
      fallback={
        <div className="mb-225rem">
          <TitleBar>Choose your shape</TitleBar>
          <FilterGridSkeleton />
        </div>
      }
    >
      <div className="mb-225rem">
        <TitleBar>{label}</TitleBar>
        <FilterGrid
          type={filter}
          filters={filterOptions}
          childType={childFilters || null}
        />
      </div>
    </Suspense>
  )
}

export default FilterMenuServer
