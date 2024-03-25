import { useStore } from '@/app/hooks'
import {
  formatCarat,
  formatDiamondQuality,
  formatGauge,
  formatWidth,
  upperCaseFirst,
} from '@/app/utils'
import { diamondOriginsMap } from '@/app/maps'
import { useSearchParams } from 'next/navigation'

export const DataTable = () => {
  const { product, variations } = useStore((store) => store.selectedSku)
  const searchParams = useSearchParams()
  const variationId = searchParams.get('variation-id')
  if (!product) return null
  const variation = variationId
    ? variations.find(
        (variation) => variation['variation-id'] === parseInt(variationId)
      )
    : variations[0]
  if (!variation) return null
  return (
    <>
      {!product?.attributes?.pa_gauge && (
        <div className="product-single-data-table position-relative">
          <div className="row g-0">
            {!product?.attributes?.pa_gauge && (
              <>
                {!product?.attributes?.['pa_centre-carat']?.includes(
                  '0.000'
                ) ? (
                  <div className="col-6 col-sm-4">
                    <div className="px-2 px-xl-3 pb-2 pb-sm-3">
                      <h6>Diamond Shape</h6>
                      <p className="fw-300">{product?.attributes?.pa_shape}</p>
                    </div>
                  </div>
                ) : (
                  <div className="col-6 col-sm-4">
                    <div className="px-2 px-xl-3 pb-2 pb-sm-3">
                      <h6>Width</h6>
                      <p className="fw-300">
                        {formatWidth(variation?.attributes?.pa_width || '')}
                      </p>
                    </div>
                  </div>
                )}
                <div className="col-6 col-sm-4">
                  <div className="px-2 px-xl-3 pb-2 pb-sm-3">
                    <h6>Diamond Quality</h6>
                    <p className="fw-300">
                      {formatDiamondQuality(
                        variation?.attributes?.['pa_diamond-quality']
                      )}
                    </p>
                  </div>
                </div>
                <div className="col-6 col-sm-4">
                  <div className="px-2 px-xl-3 pb-2 pb-sm-3 pt-2 pt-sm-0">
                    <h6>Diamond Origin</h6>
                    <p className="fw-300">
                      {variation?.attributes?.['pa_diamond']
                        ? diamondOriginsMap[variation.attributes['pa_diamond']]
                            .label
                        : ''}
                    </p>
                  </div>
                </div>
              </>
            )}
            {variation?.attributes?.['pa_centre-carat'] && (
              <>
                <div className="col-6 col-sm-4">
                  <div className="px-2 px-xl-3 pt-2 pt-sm-3">
                    <h6>Centre Carat</h6>
                    <p className="fw-300">
                      {formatCarat(
                        variation?.attributes?.['pa_centre-carat'] || ''
                      )}
                      <sup>ct</sup>
                    </p>
                  </div>
                </div>
                <div className="col-6 col-sm-4">
                  <div className="px-2 px-xl-3 pt-2 pt-sm-3">
                    <h6>Total Carat</h6>
                    <p className="fw-300">
                      {formatCarat(
                        variation?.attributes?.['pa_total-carat'] || ''
                      )}
                      <sup>ct</sup>
                    </p>
                  </div>
                </div>
                <div className="col-6 col-sm-4">
                  <div className="px-2 px-xl-3 pt-2 pt-sm-3">
                    <h6>Product Code</h6>
                    <p className="fw-300">{variation.sku}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {variation?.attributes?.pa_gauge && (
        <div className="product-single-data-table x3 position-relative">
          <div className="row g-0">
            <div className="col-sm-4">
              <div className="px-2 px-xl-3 pb-2 pb-sm-0">
                <h6>Width</h6>
                <p className="fw-300">
                  {formatWidth(variation?.attributes?.['pa_width'] || '')}
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="px-2 px-xl-3 pb-2 pb-sm-0 pt-2 pt-sm-0">
                <h6>Gauge</h6>
                <p className="fw-300">
                  {formatGauge(variation?.attributes?.['pa_gauge'] || '')}
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="px-2 px-xl-3 pt-2 pt-sm-0">
                <h6>Product Code</h6>
                <p className="fw-300">{variation.sku}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
