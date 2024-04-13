import Image from 'next/image'
import { Product, Variation, isProduct, isVariation } from '@/app/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { CreatedLosenge } from '@/app/components'
import { useStore } from '@/app/hooks'
import { formatCarat, formatWidth, formatDiamondQuality } from '@/app/utils'
import { useProductUrl } from '../hooks/useProductUrl'

interface Props {
  style: 'product' | 'variation'
  label?: 'code'
  item: Product | Variation
  index: number
}

export const ProductCard = ({ item, label, style, index }: Props) => {
  const searchParams = useSearchParams()
  const url = useProductUrl(item)
  const { filterLayers } = useStore((store) => store.selectedSku)
  const searchByCode = searchParams.get('search')
  const variationId = searchParams.get('variation-id')
  const isDiamondItem = item?.attributes?.['pa_total-carat']
  const isGaugeItem = item?.attributes?.['pa_width']
  const showSkuOnly =
    searchByCode || isDiamondItem || (isGaugeItem && !variationId)
  const showSkuAndWidth = isGaugeItem && isVariation(item) && !searchByCode

  const router = useRouter()
  const carouselImages =
    item?.images && item?.images?.length > 1 ? item.images : [item.images![0]]

  const isCreated =
    (isVariation(item) && item.attributes['pa_diamond-quality'] === 'd-fvs') ||
    (isProduct(item) &&
      item.attributes['pa_diamond-quality']?.includes('D-FVS'))

  return (
    <div className="col-6 col-sm-4 col-lg-6 col-xxl-4 col-product-grid">
      <div className="product-grid-item style-2 bg-grey-light position-relative">
        {style === 'product' && (
          <Image
            src={item?.images?.[0] || ''}
            className="img-fluid w-100"
            width={612}
            height={749}
            sizes="(max-width: 220px) 100vw, (max-width: 240px) 50vw, 33vw"
            alt={item.name}
          />
        )}
        <div
          className={`${
            style === 'variation'
              ? 'product-grid-item-overlay position-relative bg-white has-border visible'
              : 'product-grid-item-overlay position-absolute bg-white'
          }`}
        >
          <div
            id={`${item.sku}_${index}`}
            className="carousel carousel-crossfade bg-grey-light mb-3"
            data-bs-interval="false"
          >
            <div className="carousel-inner">
              {carouselImages.map((image, i) => (
                <div
                  key={i}
                  className={`carousel-item${i === 0 ? ' active' : ''}`}
                >
                  <Image
                    priority={i === 0}
                    src={image}
                    className="img-fluid w-100"
                    width={612}
                    height={749}
                    sizes="(max-width: 220px) 100vw, (max-width: 240px) 50vw, 33vw"
                    alt={item.name}
                  />
                </div>
              ))}
            </div>

            {carouselImages.length > 1 && (
              <>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target={`#${item.sku}_${index}`}
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target={`#${item.sku}_${index}`}
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </>
            )}
            {isCreated && isVariation(item) && <CreatedLosenge />}
          </div>
          {showSkuOnly && label === 'code' && (
            <p className="mb-2 text-start">{item.sku}</p>
          )}
          {showSkuAndWidth && (
            <p className="mb-2 text-start">
              {item.sku} {formatWidth(item.attributes['pa_width'] as string)}
            </p>
          )}
          {isVariation(item) && !item?.attributes?.pa_gauge && (
            <div className="d-flex d-lg-block d-xl-flex justify-content-between mb-2">
              <>
                {filterLayers?.some((filterLayer) =>
                  ['pa_centre-carat', 'pa_total-carat'].includes(filterLayer)
                ) && (
                  <>
                    <p className="mb-0">
                      {formatDiamondQuality(
                        item?.attributes?.['pa_diamond-quality']
                      )}
                    </p>
                  </>
                )}

                {filterLayers?.includes('pa_centre-carat') && (
                  <p className="ms-xl-2">
                    carat {formatCarat(item.attributes['pa_centre-carat'])}
                    <sup>ct</sup>
                  </p>
                )}
                {filterLayers?.includes('pa_total-carat') && (
                  <p className="ms-xl-2">
                    Total carat {formatCarat(item.attributes['pa_total-carat'])}
                    <sup>ct</sup>
                  </p>
                )}
              </>
            </div>
          )}
          <button
            className="btn btn-border w-100"
            onClick={() => router.push(url)}
          >
            <span>View</span>
          </button>
        </div>
      </div>
    </div>
  )
}
