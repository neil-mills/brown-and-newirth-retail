import React from 'react'
import { useStore } from '../hooks'

export const ResultsTabs = () => {
  const { otherOptions } = useStore((store) => store.selectedSku)
  return (
    <div className="result-tabs col-pad-sm">
      <div className="nav row g-0" role="tablist">
        <div className="col-6 col-lg-12 col-xl-6">
          <button
            className="nav-link w-100 active"
            data-bs-toggle="tab"
            data-bs-target="#other"
            type="button"
            role="tab"
          >
            Other options ({otherOptions.length})
          </button>
        </div>
        <div className="col-6 col-lg-12 col-xl-6">
          <button
            className="nav-link w-100"
            data-bs-toggle="tab"
            data-bs-target="#similar"
            type="button"
            role="tab"
          >
            Similar products
          </button>
        </div>
      </div>
    </div>
  )
}
