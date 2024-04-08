'use client'
import { useEffect } from 'react'
import {
  ProductDetails,
  ProductGridSkeleton,
  ResultsFilter,
  ResultsTabs,
  SimilarProducts,
  TitleBar,
} from '@/app/components'
import {
  useProduct,
  useStore,
  useFilterSearchParams,
  useGetParams,
} from '@/app/hooks'
import { useSearchParams } from 'next/navigation'
import FilteredVariations from '@/app/components/FilteredVariations'

interface Props {
  params: {
    slug: string[]
  }
}

const ProductDetailsPage = ({ params: { slug } }: Props) => {
  const searchParams = useSearchParams()
  const { sku, productId } = useGetParams()
  const setSelectedSku = useStore((store) => store.setSelectedSku)
  const resetSelectedSku = useStore((store) => store.resetSelectedSku)
  const setSearchParams = useStore((store) => store.setSearchParams)
  const setSimilarProducts = useStore((store) => store.setSimilarProducts)
  const setIsLoading = useStore((store) => store.setIsLoading)
  const searchByCode = searchParams.get('search') === 'code'
  const filters = useFilterSearchParams(searchParams.toString())
  const {
    product,
    filterLayers,
    variations,
    images,
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
      filterLayers,
      metal: '',
      size: '',
      diamondOrigin: searchParams.get('pa_diamond') || '',
      centreCarat: searchParams.get('pa_centre-carat') || '',
    })
    setSimilarProducts(similarProducts)
    setSearchParams(searchParams.toString())
    setIsLoading(isLoading)
    return () => resetSelectedSku()
  }, [
    setSelectedSku,
    product,
    variations,
    images,
    similarProducts,
    setSimilarProducts,
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
        <ProductDetails isLoading={isLoading} />
      </div>
      <div className="col col-right h-100">
        {searchByCode ? (
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
                <FilteredVariations
                  isLoading={isLoading}
                  filters={filters}
                  sku={sku}
                />
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
