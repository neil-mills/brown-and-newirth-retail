'use client'
import { FilterGrid, TitleBar } from '@/app/components'
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
  const setIsLoading = useStore((store) => store.setIsLoading)
  const { filterOptions: shapes, isLoading } = useProductFilterOptions({
    filter,
    filters: hasChild ? null : filters,
    category,
  })

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  return (
    <div className="mb-225rem">
      <TitleBar>Choose your shape</TitleBar>
      <FilterGrid
        type={filter}
        filters={shapes}
        childType={hasChild ? ['pa_setting', 'pa_coverage'] : null}
      />
    </div>
  )
}

export default ShapeFilterMenu
