import React from 'react'

export const FilterButtonSkeleton = () => {
  return (
    <div className="col-fifth col-pad-sm col-panel-sm col-panel-sm">
      <div className="btn btn-icon bg-gradient-grey w-100">
        {/* <p className="pt-2 mb-0" style={{ visibility: 'hidden' }}>
          {'Loading'}
        </p> */}
        <div className="icon-wrapper-square d-flex align-items-center justify-content-center px-4 pt-4 pb-4">
          <div
            className="spinner-border spinner-border-sm text-secondary"
            role="status"
          >
            <span className="sr-only" style={{ display: 'none' }}>
              Loading...
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
