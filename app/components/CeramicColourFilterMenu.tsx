import { TitleBar } from '@/app/components/TitleBar'
import { useSearchParams } from 'next/navigation'
import { useFilterSearchParams, useProductFilterOptions } from '@/app/hooks'
import { Styles } from '@/app/types'
import { FilterGrid, FilterGridSkeleton } from '@/app/components'

const CeramicColourFilterMenu = ({ category }: { category: Styles }) => {
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())

  const {
    filterOptions: colours,
    isLoading,
    error,
  } = useProductFilterOptions({
    filter: 'pa_ceramic-colour',
    filters,
    category,
  })
  return (
    <div className="mb-225rem">
      <TitleBar>Choose your colour</TitleBar>
      {isLoading ? (
        <FilterGridSkeleton />
      ) : (
        <FilterGrid type={'pa_ceramic-colour'} filters={colours} />
      )}
    </div>
  )
}

export default CeramicColourFilterMenu
