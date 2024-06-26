'use client'
import { ProductGridSkeleton, SetIsLoading, TitleBar } from '@/app/components'
import { useProducts, useStore } from '@/app/hooks'
import { ProductFilters, Styles } from '@/app/types'
import ProductGrid from '@/app/components/ProductGrid'
import { useEffect } from 'react'

const FilteredProducts = ({
  category,
  filters,
}: {
  category: Styles
  filters: ProductFilters | null
}) => {
  const setIsLoading = useStore((store) => store.setIsLoading)
  const { products, isLoading, isError, error } = useProducts(category, filters)

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  return (
    <>
      <SetIsLoading isLoading={isLoading} isError={isError} error={error} />
      {isLoading || error ? (
        <>
          <TitleBar>{'  '}</TitleBar>
          <ProductGridSkeleton />
        </>
      ) : (
        <>
          <TitleBar>Results ({products.length})</TitleBar>
          <ProductGrid style="variation" items={products} />
        </>
      )}
    </>
  )
}

export default FilteredProducts
