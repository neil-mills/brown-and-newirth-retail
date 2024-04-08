import React from 'react'
import { useStore } from '../hooks'

export const ResultsTabs = () => {
  const similarProducts = useStore((store) => store.similarProducts)
  const otherOptionsResults = useStore((store) => store.otherOptionsResults)
  const isLoading = useStore((store) => store.isLoading)
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
            disabled={isLoading}
          >
            {`Other options ${!isLoading ? `(${otherOptionsResults})` : ''}`}
          </button>
        </div>
        <div className="col-6 col-lg-12 col-xl-6">
          <button
            className="nav-link w-100"
            data-bs-toggle="tab"
            data-bs-target="#similar"
            type="button"
            role="tab"
            disabled={isLoading}
          >
            {`Similar products ${!isLoading ? `(${similarProducts.length})` : ''}`}
          </button>
        </div>
      </div>
    </div>
  )
}
