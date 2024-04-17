'use client'
import { FilterGrid, FilterGridSkeleton, TitleBar } from '@/app/components'
import { Filters, ProductFilterAttributeKeys, Styles } from '@/app/types'
import { useProductFilterOptions } from '@/app/hooks'

interface Props {
  category: Styles | undefined
  filter: ProductFilterAttributeKeys
  filters: Filters | null
  childFilters?: ProductFilterAttributeKeys[]
  label: string
}
const FilterMenu = ({
  category,
  filter,
  filters,
  childFilters,
  label,
}: Props) => {
  const { filterOptions, isLoading, isError } = useProductFilterOptions({
    filter,
    filters: childFilters ? null : filters,
    category,
  })
  return (
    <div className="mb-225rem">
      {isLoading || isError ? ( 
        <>
          <TitleBar>{label}</TitleBar>
          <FilterGridSkeleton />
        </>
      ) : (
        <>
          <TitleBar>{label}</TitleBar>
          <FilterGrid
            type={filter}
            filters={filterOptions}
            childType={childFilters || null}
          />
        </>
      )}
    </div>
  )
}

export default FilterMenu
