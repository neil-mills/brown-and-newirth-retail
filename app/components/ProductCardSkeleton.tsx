import React from 'react'

export const ProductCardSkeleton = () => {
  return (
    <div className="col-6 col-sm-4 col-lg-6 col-xxl-4 col-product-grid">
      <div className="product-grid-item style-2 bg-grey-light position-relative">
        <img
          alt=""
          width="612"
          height="749"
          className="img-fluid w-100"
          src=""
          style={{ visibility: 'hidden' }}
        />
      </div>
    </div>
  )
}
