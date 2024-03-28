'use client'
import { useGetParams, useStore } from '@/app/hooks'
import dynamic from 'next/dynamic'

import {
  VariationOptions,
  AddToBasket,
  BackLink,
  ImageCarouselSkeleton,
  DataTableSkeleton,
  ProductFilterByMenusSkeleton,
} from '@/app/components'
import { useEffect, useState } from 'react'

export const ProductDetails = () => {
  const [showAddToBasket, setShowAddToBasket] = useState<boolean>(false)
  const {
    size: selectedSize,
    metal: selectedMetal,
    product,
  } = useStore((store) => store.selectedSku)
  const isLoading = useStore((store) => store.isLoading)
  const showSize = !product?.attributes?.['pa_type-2']?.length
  const { sku } = useGetParams()

  useEffect(() => {
    const show = !showSize
      ? selectedMetal !== ''
      : selectedSize !== '' && selectedMetal !== ''
    setShowAddToBasket(show)
  }, [selectedSize, selectedMetal, showSize])

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
        <ImageCarousel />
        {!sku && <ProductFilterByMenus />}
        {sku && (
          <>
            <DataTable />
            <VariationOptions showSize={showSize} />
            {showAddToBasket && <AddToBasket />}
          </>
        )}
      </div>
    </>
  )
}
