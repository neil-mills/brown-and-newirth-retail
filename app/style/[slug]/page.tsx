import { notFound } from 'next/navigation'
import {
  BackLink,
  CategoryBanner,
  ProductGridSkeleton,
  TitleBar,
} from '@/app/components'
import { Suspense } from 'react'

import { getCategory } from '@/app/utils/getCategory'
import FilterMenus from '@/app/components/FilterMenus'
import FilteredProductsServer from '@/app/components/FilteredProductsServer'
import { fetchCategoryProducts } from '@/data/fetchCategoryProducts'

interface Props {
  params: { slug: string }
  searchParams: string
}

const ProductStylePage = async ({ params: { slug } }: Props) => {
  const [category, categoryData] = getCategory(slug)
  const categoryProducts = await fetchCategoryProducts(category)
  if (!category || !categoryData) {
    return notFound()
  }

  return (
    <>
      <div className="col-left h-100 d-flex flex-column">
        <BackLink />
        <div className="col-left-inner flex-grow-1 d-flex flex-column p-0">
          <CategoryBanner category={categoryData} />
          <FilterMenus slug={slug} />
        </div>
      </div>
      <div className="col col-right h-100">
        <Suspense
          fallback={
            <>
              <TitleBar>
                <span style={{ visibility: 'hidden' }}>Loading</span>{' '}
              </TitleBar>
              <ProductGridSkeleton />
            </>
          }
        >
          <FilteredProductsServer categoryProducts={categoryProducts} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductStylePage
