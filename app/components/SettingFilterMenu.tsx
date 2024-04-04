'use client'
import { useSearchParams } from 'next/navigation'
import {
  useFilterSearchParams,
  useProductFilterOptions,
  useStore,
} from '@/app/hooks'
import { FilterGrid, FilterGridSkeleton, TitleBar } from '@/app/components'
import { Styles } from '@/app/types'
import { useEffect } from 'react'

const SettingFilterMenu = ({ category }: { category: Styles }) => {
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())
  const setIsLoading = useStore((store) => store.setIsLoading)

  const {
    filterOptions: settings,
    isLoading,
    error,
  } = useProductFilterOptions({
    filter: 'pa_setting',
    filters,
    category,
  })

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  if (error) return <p>{error.message}</p>
  return (
    <div className="mb-225rem">
      <TitleBar>Choose your setting</TitleBar>
      {isLoading ? (
        <FilterGridSkeleton />
      ) : (
        <FilterGrid type={'pa_setting'} filters={settings} />
      )}
    </div>
  )
}

export default SettingFilterMenu
