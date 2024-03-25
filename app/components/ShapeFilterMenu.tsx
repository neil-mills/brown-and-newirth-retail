'use client'
import { FilterGrid, TitleBar } from '@/app/components'
import { useFilterSearchParams, useProductFilterOptions } from '../hooks'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Styles } from '@/app/types'
import { useEffect } from 'react'

interface Props {
  category: Styles
  hasChild?: boolean
}

const ShapeFilterMenu = ({ category, hasChild = false }: Props) => {
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())
  const filter = category === 'Shaped' ? 'pa_shaped' : 'pa_shape'
  const shapeCategory = category === 'Shaped' ? null : category
  const router = useRouter()
  const pathname = usePathname()
  const {
    filterOptions: shapes,
    isLoading,
    error,
  } = useProductFilterOptions({
    filter,
    filters: hasChild ? null : filters,
    category: shapeCategory,
  })
  useEffect(() => {
    shapes.forEach((shape) =>
      router.prefetch(`${pathname}?pa_shape=${shape.slug}`)
    )
  }, [shapes, router, pathname])

  if (error) return <p>{error.message}</p>

  return (
    <div className="mb-225rem">
      <TitleBar>Choose your shape</TitleBar>
      <FilterGrid
        type={filter}
        filters={shapes}
        childType={hasChild ? 'pa_setting' : null}
      />
    </div>
  )
}

export default ShapeFilterMenu
