'use client'
import { useEffect } from 'react'
import {
  ProductDetails,
  OtherOptions,
  ResultsFilter,
  ResultsTabs,
  TitleBar,
  ProductGridSkeleton,
} from '@/app/components'
import {
  useProduct,
  useStore,
  useFilterSearchParams,
  useGetParams,
} from '@/app/hooks'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'

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
    category,
    variations,
    images,
    otherOptions,
    isLoading,
    error,
  } = useProduct({ productId, sku })

  // useEffect(() => {
  //   setIsLoading(isLoading)
  // }, [isLoading, setIsLoading])

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
  if (error) return <p>{error.message}</p>

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
