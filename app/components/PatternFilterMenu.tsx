'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useFilterSearchParams, useProductFilterOptions } from '@/app/hooks'
import { FilterGrid, TitleBar } from '@/app/components'
import { Styles } from '@/app/types'
import { useEffect } from 'react'

const PatternFilterMenu = ({ category }: { category: Styles }) => {
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())
  const router = useRouter()
  const pathname = usePathname()
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
    patterns.forEach((pattern) =>
      router.prefetch(`${pathname}?pa_pattern=${pattern.slug}`)
    )
  }, [patterns, router, pathname])

  if (error) return <p>{error.message}</p>
  return (
    <>
      <TitleBar>Choose your style</TitleBar>
      <FilterGrid type={'pa_pattern'} filters={patterns} />
    </>
  )
}

export default PatternFilterMenu
