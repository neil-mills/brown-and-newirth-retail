'use client'
import { useEffect } from 'react'
import {
  OtherOptions,
  ResultsFilter,
  ResultsTabs,
  SimilarProducts,
  BackLink,
  DataTableSkeleton,
  ImageCarouselSkeleton,
  ProductFilterByMenusSkeleton,
  VariationSelection,
} from '@/app/components'
import {
  useProduct,
  useStore,
  useFilterSearchParams,
  useGetParams,
} from '@/app/hooks'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import FilteredVariations from '@/app/components/FilteredVariations'
import { Filters, StoreFilters } from '@/app/types'
import { searchParamsToObject } from '@/app/utils'

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

const ProductDetailsPage = ({ params: { slug } }: Props) => {
  const searchParams = useSearchParams()
  const { sku, productId } = useGetParams()
  const setSelectedSku = useStore((store) => store.setSelectedSku)
  const resetSelectedSku = useStore((store) => store.resetSelectedSku)
  const setSearchParams = useStore((store) => store.setSearchParams)
  const setFilters = useStore((store) => store.setFilters)
  const setIsLoading = useStore((store) => store.setIsLoading)
  const searchByCode = searchParams.get('search') === 'code'
  const singleVariation = searchParams.get('variation-id')
  const filters = useFilterSearchParams(searchParams.toString())
  if (filters) {
    const filterStore = Object.entries(
      searchParamsToObject(searchParams.toString())
    ).reduce((acc, [key, value]) => {
      acc = { [key]: value.split(',') }
      return acc
    }, {} as Filters)
    setFilters(filterStore as StoreFilters)
  }
  const {
    product,
    filterLayers,
    variations,
    images,
    otherOptions,
    similarProducts,
    isLoading,
    error,
  } = useProduct({ productId, sku, filters })
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
    setIsLoading(isLoading)
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
    isLoading,
    setIsLoading,
  ])
  if (error) return <p>{error.message}</p>

  return (
    <>
      <div className="col-left is-single h-100 d-flex flex-column">
        <BackLink />
        <div className="col-left-inner d-flex flex-column justify-content-between has-border">
          {/* <ImageCarouselSkeleton /> */}
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
              <ResultsFilter />
              <ResultsTabs />
            </div>

            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="other"
                role="tabpanel"
                tabIndex={0}
              >
                <OtherOptions />
              </div>
              <div
                className="tab-pane fade"
                id="similar"
                role="tabpanel"
                tabIndex={0}
              >
                <SimilarProducts />
              </div>
            </div>
          </>
        ) : (
          <FilteredVariations isLoading={isLoading} filters={filters} />
        )}
      </div>
    </>
  )
}

export default ProductDetailsPage
