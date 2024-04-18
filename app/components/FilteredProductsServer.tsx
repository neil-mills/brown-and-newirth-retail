'use client'
import { TitleBar } from '@/app/components'
import { Product } from '@/app/types'
import ProductGrid from '@/app/components/ProductGrid'
import { useProducts, useFilterSearchParams } from '@/app/hooks'
import { useParams, useSearchParams } from 'next/navigation'
import { getCategory } from '../utils/getCategory'

interface Props {
  products: Product[]
}

const FilteredProductsServer = ({ products }: Props) => {
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())
  const { slug } = useParams()
  const [category] = getCategory(slug as string)
  const categoryProducts = useProducts({ products, filters, category })
  return (
    <>
      <TitleBar>Results ({categoryProducts.length})</TitleBar>
      <ProductGrid style="variation" items={categoryProducts} />
    </>
  )
}

export default FilteredProductsServer
