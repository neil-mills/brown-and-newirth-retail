'use client'
import { TitleBar } from '@/app/components/TitleBar'
import { useSearchParams } from 'next/navigation'
import {
  useFilterSearchParams,
  useProductFilterOptions,
  useStore,
} from '@/app/hooks'
import { Styles } from '@/app/types'
import { FilterGrid, FilterGridSkeleton } from '@/app/components'
import { useEffect } from 'react'

const CeramicColourFilterMenu = ({ category }: { category: Styles }) => {
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())
  const setIsLoading = useStore((store) => store.setIsLoading)

  const {
    filterOptions: colours,
    isLoading,
    error,
  } = useProductFilterOptions({
    filter: 'pa_ceramic-colour',
    filters,
    category,
  })

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

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
