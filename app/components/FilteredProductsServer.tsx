'use client'
import { TitleBar } from '@/app/components'
import { Product } from '@/app/types'
import ProductGrid from '@/app/components/ProductGrid'
import { useProducts, useFilterSearchParams } from '@/app/hooks'
import { useSearchParams } from 'next/navigation'

interface Props {
  categoryProducts: Product[]
}

const FilteredProductsServer = ({ categoryProducts }: Props) => {
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())
  const products = useProducts({ categoryProducts, filters })
  return (
    <>
      <TitleBar>Results ({products.length})</TitleBar>
      <ProductGrid style="variation" items={products} />
    </>
  )
}

export default FilteredProductsServer
