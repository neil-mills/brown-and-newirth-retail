import { useGetParams } from '@/app/hooks'
import dynamic from 'next/dynamic'

import {
  BackLink,
  ImageCarouselSkeleton,
  DataTableSkeleton,
  ProductFilterByMenusSkeleton,
  VariationSelection,
} from '@/app/components'

export const ProductDetails = ({ isLoading }: { isLoading: boolean }) => {
  const { sku } = useGetParams()

  const ImageCarousel = dynamic(
    () => import('@/app/components/ImageCarousel'),
    {
      ssr: false,
      loading: () => <ImageCarouselSkeleton />,
    }
  )
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

  return (
    <>
      <BackLink />
      <div className="col-left-inner d-flex flex-column justify-content-between has-border">
        <ImageCarousel isLoading={isLoading} />
        {!sku && <ProductFilterByMenus />}
        {sku && (
          <>
            <DataTable isLoading={isLoading} />
            <VariationSelection />
          </>
        )}
      </div>
    </>
  )
}
