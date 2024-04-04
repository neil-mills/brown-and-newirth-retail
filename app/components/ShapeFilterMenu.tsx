'use client'
import { FilterGrid, TitleBar, FilterGridSkeleton } from '@/app/components'
import {
  useFilterSearchParams,
  useProductFilterOptions,
  useStore,
} from '../hooks'
import { useSearchParams } from 'next/navigation'
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
  const setIsLoading = useStore((store) => store.setIsLoading)

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
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  if (error) return <p>{error.message}</p>

  return (
    <div className="mb-225rem">
      <TitleBar>Choose your shape</TitleBar>
      {isLoading ? (
        <FilterGridSkeleton />
      ) : (
        <FilterGrid
          type={filter}
          filters={shapes}
          childType={hasChild ? ['pa_setting', 'pa_coverage'] : null}
        />
      )}
    </div>
  )
}

export default ShapeFilterMenu
