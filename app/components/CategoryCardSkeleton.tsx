export const CategoryCardSkeleton = () => {
  return (
    <div className="col-6 col-sm-4 col-lg-6 col-xl-4 col-xxl-3 col-product-grid">
      <div className="product-grid-item style-1 letter-spacing bg-cover d-flex flex-column justify-content-between position-relative">
        <div
          className="spinner-border spinner-border-sm text-secondary"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            margin: '-10px 0 0 -10px',
          }}
          role="status"
        >
          <span className="sr-only" style={{ display: 'none' }}>
            Loading...
          </span>
        </div>
        <div
          className="img-fluid w-100"
          style={{ visibility: 'hidden', width: '114', height: '114' }}
        ></div>
        <div style={{ visibility: 'hidden' }}> </div>
      </div>
    </div>
  )
}
