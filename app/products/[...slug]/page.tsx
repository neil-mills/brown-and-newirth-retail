'use client'
import { useEffect } from 'react'
import {
  ProductDetails,
  OtherOptions,
  ResultsFilter,
  ResultsTabs,
  FilteredVariations,
} from '@/app/components'
import {
  useProduct,
  useStore,
  useFilterSearchParams,
  useGetParams,
} from '@/app/hooks'
import { useSearchParams } from 'next/navigation'

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
  const searchByCode = searchParams.get('search') === 'code'
  const filters = useFilterSearchParams(searchParams.toString())
  const {
    product,
    filterLayers,
    category,
    variations,
    images,
    otherOptions,
    isLoading,
    error,
  } = useProduct({ productId, sku })

  useEffect(() => {
    setSelectedSku({
      sku,
      product,
      variations,
      images,
      otherOptions,
      filterLayers,
      metal: '',
      size: '',
      diamondOrigin: searchParams.get('pa_diamond') || '',
      centreCarat: searchParams.get('pa_centre-carat') || '',
    })
    setSearchParams(searchParams.toString())
    return () => resetSelectedSku()
  }, [
    setSelectedSku,
    product,
    variations,
    images,
    otherOptions,
    sku,
    searchParams,
    setSearchParams,
    filterLayers,
    resetSelectedSku,
  ])
  // if (isLoading) return null
  if (error) return <p>{error.message}</p>
  // if (!product) return <p>No product found</p>

  return (
    <>
      <div className="col-left is-single h-100 d-flex flex-column">
        <ProductDetails />
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
            </div>
          </>
        ) : (
          <FilteredVariations filters={filters} />
        )}
      </div>
    </>
  )
}

export default ProductDetailsPage
