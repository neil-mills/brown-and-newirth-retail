import React from 'react'
import { ProductCardSkeleton } from '@/app/components'

export const ProductGridSkeleton = () => {
  return (
    <div className="row row-product-grid text-uppercase text-xs text-center">
      {Array.from({ length: 12 }).map((_item, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
