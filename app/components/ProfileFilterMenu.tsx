'use client'
import { FilterGrid, TitleBar } from '@/app/components'
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
    <>
      <TitleBar>Choose your profile</TitleBar>
      <FilterGrid type={'pa_profile'} filters={profiles} />
    </>
  )
}

export default ProfileFilterMenu
