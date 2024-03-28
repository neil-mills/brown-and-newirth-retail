'use client'
import { FilterGrid, FilterGridSkeleton, TitleBar } from '@/app/components'
import { useFilterSearchParams, useProductFilterOptions } from '@/app/hooks'
import { useSearchParams } from 'next/navigation'
import { Styles } from '@/app/types'

const ProfileFilterMenu = ({ category }: { category: Styles }) => {
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())
  const {
    filterOptions: profiles,
    isLoading,
    error,
  } = useProductFilterOptions({
    filter: 'pa_profile',
    filters,
    category,
  })
  if (error) return <p>{error.message}</p>
  return (
    <div className="mb-225rem">
      <TitleBar>Choose your profile</TitleBar>
      {isLoading ? (
        <FilterGridSkeleton />
      ) : (
        <FilterGrid type={'pa_profile'} filters={profiles} />
      )}
    </div>
  )
}

export default ProfileFilterMenu
