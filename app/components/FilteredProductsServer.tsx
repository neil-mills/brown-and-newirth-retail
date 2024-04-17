import { TitleBar } from '@/app/components'
import { ProductFilters, Styles } from '@/app/types'
import ProductGrid from '@/app/components/ProductGrid'
import { fetchProducts } from '@/data/fetchProducts'

const FilteredProductsServer = async ({
  category,
  filters,
}: {
  category: Styles
  filters: ProductFilters | null
}) => {
  const products = await fetchProducts(category, filters)

  return (
    <>
      <TitleBar>Results ({products.length})</TitleBar>
      <ProductGrid style="variation" items={products} />
    </>
  )
}

export default FilteredProductsServer
