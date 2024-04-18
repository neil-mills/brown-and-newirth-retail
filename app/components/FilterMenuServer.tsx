'use client'
import { FilterGrid, FilterGridSkeleton, TitleBar } from '@/app/components'
import { Product, ProductFilterAttributeKeys } from '@/app/types'
import { useParams, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { useFilterSearchParams, useProductFilterOptions } from '@/app/hooks'
import { getCategory } from '../utils/getCategory'
import { getCategoryFilterLayers } from '../utils'

interface Props {
  filter: ProductFilterAttributeKeys
  childFilters?: ProductFilterAttributeKeys[]
  products: Product[]
  label: string
}
const FilterMenuServer = ({ filter, childFilters, label, products }: Props) => {
  const searchParams = useSearchParams()
  const paDiamondSet = searchParams.get('pa_diamond-set')
  const isShapeFilter = filter === 'pa_shape'
  const filters = useFilterSearchParams(searchParams.toString())
  const { slug } = useParams()
  const [category] = getCategory(slug as string)
  if (category === 'Shaped' && filter === 'pa_shape') filter = 'pa_shaped'
  const filterLayers = getCategoryFilterLayers(category)
  const filterOptions = useProductFilterOptions({
    products,
    filter,
    filters,
    category,
  })
  useEffect(() => {}, [filters])
  let showMenu = false
  if (
    (isShapeFilter && category !== 'Shaped') ||
    (isShapeFilter && category === 'Shaped' && paDiamondSet)
  ) {
    showMenu = true
  }
  if (!isShapeFilter) {
    showMenu = filterLayers.includes(filter)
  }
  if (!showMenu) return null
  return (
    <Suspense
      fallback={
        <div className="mb-225rem">
          <TitleBar>{label}</TitleBar>
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
