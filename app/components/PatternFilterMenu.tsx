'use client'
import { useSearchParams } from 'next/navigation'
import {
  useFilterSearchParams,
  useProductFilterOptions,
  useStore,
} from '@/app/hooks'
import { FilterGrid, TitleBar, FilterGridSkeleton } from '@/app/components'
import { Styles } from '@/app/types'
import { useEffect } from 'react'

const PatternFilterMenu = ({ category }: { category: Styles }) => {
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())
  const setIsLoading = useStore((store) => store.setIsLoading)

  const {
    filterOptions: patterns,
    isLoading,
    error,
  } = useProductFilterOptions({
    filter: 'pa_pattern',
    filters,
    category,
  })

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  if (error) return <p>{error.message}</p>
  return (
    <div className="mb-225rem">
      <TitleBar>Choose your style</TitleBar>
      {isLoading ? (
        <FilterGridSkeleton />
      ) : (
        <FilterGrid type={'pa_pattern'} filters={patterns} />
      )}
    </div>
  )
}

export default PatternFilterMenu
