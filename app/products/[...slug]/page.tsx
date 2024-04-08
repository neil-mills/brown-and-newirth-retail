'use client'
import { useEffect } from 'react'
import {
  ProductDetails,
  OtherOptions,
  ResultsFilter,
  ResultsTabs,
  SimilarProducts,
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
  const setIsLoading = useStore((store) => store.setIsLoading)
  const searchByCode = searchParams.get('search') === 'code'
  const filters = useFilterSearchParams(searchParams.toString())
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
      diamondOrigin: searchParams.get('pa_diamond') || '',
      centreCarat: searchParams.get('pa_centre-carat') || '',
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
