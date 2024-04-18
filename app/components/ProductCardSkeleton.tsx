import Image from 'next/image'
import React from 'react'

export const ProductCardSkeleton = () => {
  return (
    <div className="col-6 col-sm-4 col-lg-6 col-xxl-4 col-product-grid">
      <div className="product-grid-item style-2 bg-grey-light position-relative">
        <div className="product-grid-item-overlay position-relative bg-white has-border visible">
          <div
            id="EN127R25_0"
            className="carousel carousel-crossfade bg-grey-light mb-3"
            data-bs-interval="false"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div
                  className="spinner-border spinner-border-sm text-secondary"
                  role="status"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    margin: '-10px 0 0 -10px',
                  }}
                >
                  <span className="sr-only" style={{ display: 'none' }}>
                    Loading...
                  </span>
                </div>
                <Image
                  alt=""
                  width="612"
                  height="749"
                  className="img-fluid w-100"
                  src=""
                  style={{ visibility: 'hidden' }}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-border w-100" disabled>
            <span>View</span>
          </button>
        </div>
      </div>
    </div>
  )
  // return (
  //   <div className="col-6 col-sm-4 col-lg-6 col-xxl-4 col-product-grid">
  //     <div className="product-grid-item style-2 bg-grey-light position-relative d-flex justify-content-center">
  //       <div className="spinner-border spinner-border-sm" role="status">
  //         <span className="sr-only" style={{ display: 'none' }}>
  //           Loading...
  //         </span>
  //       </div>
  //       <Image
  //         alt=""
  //         width="612"
  //         height="749"
  //         className="img-fluid w-100"
  //         src=""
  //         style={{ visibility: 'hidden' }}
  //       />
  //     </div>
  //   </div>
  // )
}
