import { useFilterSearchParams, useProductFilterOptions } from '@/app/hooks'
import { Styles } from '@/app/types'
import { useSearchParams } from 'next/navigation'
import { FilterGrid } from './FilterGrid'
import { FilterGridSkeleton } from './FilterGridSkeleton'
import { TitleBar } from './TitleBar'

const CoverageFilterMenu = ({ category }: { category: Styles }) => {
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())

  const {
    filterOptions: coverage,
    isLoading,
    error,
  } = useProductFilterOptions({
    filter: 'pa_coverage',
    filters,
    category,
  })
  return (
    <div className="mb-225rem">
      <TitleBar>Choose your coverage</TitleBar>
      {isLoading ? (
        <FilterGridSkeleton />
      ) : (
        <FilterGrid type={'pa_coverage'} filters={coverage} />
      )}
    </div>
  )
}

export default CoverageFilterMenu
