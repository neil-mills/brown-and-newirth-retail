import { FilterGrid, TitleBar } from '@/app/components'
import { Filters, ProductFilterAttributeKeys, Styles } from '@/app/types'
import { fetchProductFilterOptions } from '@/data/fetchProductFilterOptions'

interface Props {
  category: Styles | undefined
  filter: ProductFilterAttributeKeys
  filters: Filters | null
  childFilters?: ProductFilterAttributeKeys[]
  label: string
}
const FilterMenu = async ({
  category,
  filter,
  filters,
  childFilters,
  label,
}: Props) => {
  const filterOptions = await fetchProductFilterOptions({
    filter,
    filters: childFilters ? null : filters,
    category,
  })
  return (
    <div className="mb-225rem">
      <TitleBar>{label}</TitleBar>
      <FilterGrid
        type={filter}
        filters={filterOptions}
        childType={childFilters || null}
      />
    </div>
  )
}

export default FilterMenu
