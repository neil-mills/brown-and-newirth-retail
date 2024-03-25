'use client'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useFilterSearchParams, useProductFilterOptions } from '@/app/hooks'
import { FilterGrid, TitleBar } from '@/app/components'
import { Styles } from '@/app/types'
import { useEffect } from 'react'

const SettingFilterMenu = ({ category }: { category: Styles }) => {
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())
  const router = useRouter()
  const pathname = usePathname()

  const {
    filterOptions: settings,
    isLoading,
    error,
  } = useProductFilterOptions({
    filter: 'pa_setting',
    filters,
    category,
  })
  const { filterOptions: shapes } = useProductFilterOptions({
    filter: 'pa_shape',
    filters,
    category,
  })

  useEffect(() => {
    settings.forEach((setting) =>
      router.prefetch(`${pathname}?pa_setting=${setting.slug}`)
    )
  }, [settings, router, pathname])

  if (error) return <p>{error.message}</p>
  return (
    <div className="mb-225rem">
      <TitleBar>Choose your setting</TitleBar>
      <FilterGrid type={'pa_setting'} filters={settings} />
    </div>
  )
}

export default SettingFilterMenu
