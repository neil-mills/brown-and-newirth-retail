import {
  BackLink,
  CategoryBanner,
  ProductGridSkeleton,
  TitleBar,
} from '@/app/components'
import { Suspense } from 'react'
import FilterMenus from '@/app/components/FilterMenus'
import FilteredProductsServer from '@/app/components/FilteredProductsServer'
import fetchDataServer from '@/data/fetchDataServer'

const ProductStylePage = async () => {
  const products = await fetchDataServer()
  return (
    <>
      <div className="col-left h-100 d-flex flex-column">
        <BackLink />
        <div className="col-left-inner flex-grow-1 d-flex flex-column p-0">
          <CategoryBanner />
          <FilterMenus products={products} />
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
          <FilteredProductsServer products={products} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductStylePage
