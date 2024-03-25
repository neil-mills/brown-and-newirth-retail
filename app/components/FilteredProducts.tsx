'use client'
import { TitleBar } from '@/app/components'
import { useProducts } from '@/app/hooks'
import { ProductFilters, Styles } from '@/app/types'
import ProductGrid from '@/app/components/ProductGrid'

export const FilteredProducts = ({
  category,
  filters,
}: {
  category: Styles
  filters: ProductFilters | null
}) => {
  const { products, isLoading, error } = useProducts(category, filters)
  if (isLoading || error) return null
  return (
    <>
      <TitleBar>Results ({products.length})</TitleBar>
      <ProductGrid style="product" items={products} />
    </>
  )
}
