import { TitleBar } from '@/app/components/TitleBar'
import { useSearchParams } from 'next/navigation'
import { useFilterSearchParams, useProductFilterOptions } from '@/app/hooks'
import { Styles } from '@/app/types'
import { FilterGrid } from '@/app/components/FilterGrid'

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
    <>
      <TitleBar>Choose your colour</TitleBar>
      <FilterGrid type={'pa_profile'} filters={colours} />
    </>
  )
}

export default CeramicColourFilterMenu
