'use client'
import { ProductGridSkeleton, TitleBar } from '@/app/components'
import { useProducts } from '@/app/hooks'
import { ProductFilters, Styles } from '@/app/types'
import ProductGrid from '@/app/components/ProductGrid'

const FilteredProducts = ({
  category,
  filters,
}: {
  category: Styles
  filters: ProductFilters | null
}) => {
  const { products, isLoading, error } = useProducts(category, filters)
  return (
    <>
      {isLoading || error ? (
        <>
          <TitleBar>{'  '}</TitleBar>
          <ProductGridSkeleton />
        </>
      ) : (
        <>
          <TitleBar>Results ({products.length})</TitleBar>
          <ProductGrid style="product" items={products} />
        </>
      )}
    </>
  )
}

export default FilteredProducts
