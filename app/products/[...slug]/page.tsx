'use client'
import { Suspense, useEffect } from 'react'
import {
  ResultsFilter,
  ResultsTabs,
  SimilarProducts,
  BackLink,
  DataTableSkeleton,
  ImageCarouselSkeleton,
  ProductFilterByMenusSkeleton,
  VariationSelection,
  TitleBar,
  ProductGridSkeleton,
  SetIsLoading,
} from '@/app/components'
import {
  useProduct,
  useStore,
  useFilterSearchParams,
  useGetParams,
} from '@/app/hooks'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Filters, ProductDiamondQuality, StoreFilters } from '@/app/types'
import { searchParamsToObject, hasSingleVariation } from '@/app/utils'

interface Props {
  params: {
    slug: string[]
  }
}

const ImageCarousel = dynamic(() => import('@/app/components/ImageCarousel'), {
  ssr: false,
  loading: () => <ImageCarouselSkeleton />,
})
const DataTable = dynamic(() => import('@/app/components/DataTable'), {
  ssr: false,
  loading: () => <DataTableSkeleton />,
})

const ProductFilterByMenus = dynamic(
  () => import('@/app/components/ProductFilterByMenus'),
  {
    ssr: false,
    loading: () => (
      <>
        <p className="fw-300">Filter By:</p>
        <ProductFilterByMenusSkeleton />
        <hr />
        <ProductFilterByMenusSkeleton />
      </>
    ),
  }
)

const OtherOptions = dynamic(() => import('@/app/components/OtherOptions'), {
  ssr: false,
  loading: () => <ProductGridSkeleton />,
})

const FilteredVariations = dynamic(
  () => import('@/app/components/FilteredVariations'),
  {
    ssr: false,
    loading: () => (
      <>
        <TitleBar>
          <span style={{ visibility: 'hidden' }}>Loading</span>
        </TitleBar>
        <ProductGridSkeleton />
      </>
    ),
  }
)

const ProductDetailsPage = ({ params: { slug } }: Props) => {
  const searchParams = useSearchParams()
  const { sku, productId } = useGetParams()
  const setSelectedSku = useStore((store) => store.setSelectedSku)
  const resetSelectedSku = useStore((store) => store.resetSelectedSku)
  const setSearchParams = useStore((store) => store.setSearchParams)
  const setFilters = useStore((store) => store.setFilters)
  const searchByCode = searchParams.get('search') === 'code'
  const variationId = searchParams.get('variation-id')
  const filters = useFilterSearchParams(searchParams.toString())

  const {
    product,
    filterLayers,
    variations,
    images,
    otherOptions,
    similarProducts,
    isLoading,
    isError,
    error,
  } = useProduct({ productId, sku, filters, variationId })
  useEffect(() => {
    setSelectedSku({
      sku,
      product,
      variations,
      images,
      otherOptions,
      similarProducts,
      filterLayers,
      metal: '',
      size: '',
    })

    setSearchParams(searchParams.toString())

    if (filters) {
      const filterStore = Object.entries(
        searchParamsToObject(searchParams.toString())
      ).reduce((acc, [key, value]) => {
        acc = { [key]: value.split(',') }
        return acc
      }, {} as Filters)
      setFilters(filterStore as StoreFilters)
    }

    return () => resetSelectedSku()
  }, [
    setSelectedSku,
    product,
    variations,
    images,
    otherOptions,
    similarProducts,
    sku,
    searchParams,
    setSearchParams,
    filterLayers,
    resetSelectedSku,
    filters,
    setFilters,
  ])
  const singleVariation = hasSingleVariation(product)
  const showOtherOptions =
    otherOptions.length > 0 || similarProducts.length === 0
  const showSimilarProducts =
    otherOptions.length === 0 && similarProducts.length > 0
  const showDiamondQualityFilter =
    product?.attributes?.['pa_diamond-quality'] &&
    ['HSI', 'D-FVS'].every((quality) =>
      product.attributes['pa_diamond-quality']?.includes(
        quality as ProductDiamondQuality
      )
    ) &&
    (otherOptions.length > 0 || similarProducts.length > 0)

  return (
    <>
      <SetIsLoading isLoading={isLoading} isError={isError} error={error} />
      <div className="col-left is-single h-100 d-flex flex-column">
        <BackLink />
        <div className="col-left-inner d-flex flex-column justify-content-between has-border">
          <ImageCarousel isLoading={isLoading} />
          {!sku && <ProductFilterByMenus isLoading={isLoading} />}
          {sku && (
            <>
              <DataTable isLoading={isLoading} />
              <VariationSelection />
            </>
          )}
        </div>
      </div>
      <div className="col col-right h-100">
        {searchByCode || singleVariation ? (
          <>
            <div className="row row-pad-sm align-items-center">
              {showDiamondQualityFilter && <ResultsFilter />}
              <ResultsTabs />
            </div>

            <div className="tab-content">
              <div
                className={`tab-pane fade${showOtherOptions ? ' show active' : ''}`}
                id="other"
                role="tabpanel"
                tabIndex={0}
              >
                <Suspense>
                  <OtherOptions />
                </Suspense>
              </div>
              <div
                className={`tab-pane fade${showSimilarProducts ? ' show active' : ''}`}
                id="similar"
                role="tabpanel"
                tabIndex={0}
              >
                <SimilarProducts />
              </div>
            </div>
          </>
        ) : (
          <Suspense>
            <FilteredVariations isLoading={isLoading} filters={filters} />
          </Suspense>
        )}
      </div>
    </>
  )
}

export default ProductDetailsPage
