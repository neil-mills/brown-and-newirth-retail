import { useStore } from '../hooks'

export const ResultsTabs = () => {
  const { otherOptions, similarProducts } = useStore(
    (store) => store.selectedSku
  )
  const showOtherOptions =
    otherOptions.length > 0 || similarProducts.length === 0
  const showSimilarProducts =
    otherOptions.length === 0 && similarProducts.length > 0
  return (
    <div className="result-tabs col-pad-sm">
      <div className="nav row g-0" role="tablist">
        <div className="col-6 col-lg-12 col-xl-6">
          <button
            className={`nav-link w-100${showOtherOptions ? ' active' : ''}`}
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
            className={`nav-link w-100${showSimilarProducts ? ' active' : ''}`}
            data-bs-toggle="tab"
            data-bs-target="#similar"
            type="button"
            role="tab"
          >
            Similar products ({similarProducts.length})
          </button>
        </div>
      </div>
    </div>
  )
}
