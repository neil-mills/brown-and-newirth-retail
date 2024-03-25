'use client'
import Image from 'next/image'
import {
  FilterLayerKeys,
  Product,
  ProductAttributeKeys,
  Variation,
  isProduct,
  isVariation,
} from '@/app/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { CreatedLosenge } from '@/app/components'
import { useStore } from '@/app/hooks'
import {
  formatCarat,
  formatWidth,
  formatDiamondQuality,
  formatSearchParams,
} from '@/app/utils'
import { useEffect } from 'react'

interface Props {
  style: 'product' | 'variation'
  label?: 'code'
  item: Product | Variation
}

export const ProductCard = ({ item, label, style }: Props) => {
  const searchParams = useSearchParams()
  const { filterLayers } = useStore((store) => store.selectedSku)
  const router = useRouter()
  let carouselImages: string[] = []
  if (item?.images?.medium) {
    carouselImages =
      item.images.medium.length > 1
        ? item.images.medium.slice(1)
        : item.images.medium
  }

  let hasSecondFilterLayer = false
  const filterLayerKeys: FilterLayerKeys[] = [
    'pa_diamond',
    'pa_width',
    'pa_centre-carat',
    'pa_total-carat',
  ]
  if (isProduct(item)) {
    filterLayerKeys.forEach((filterLayer) => {
      if (
        filterLayers.includes(filterLayer) &&
        item?.attributes?.[filterLayer as ProductAttributeKeys] &&
        item.attributes[filterLayer as ProductAttributeKeys]!.length > 1
      )
        hasSecondFilterLayer = true
    })
  }
  const params = isVariation(item)
    ? formatSearchParams(searchParams.toString(), {
        'variation-id': item['variation-id'].toString(),
      })
    : ''
  const url = isVariation(item)
    ? `sku/${item.sku}?${params}`
    : hasSecondFilterLayer
    ? `productId/${item.productId}`
    : `sku/${item.sku}`

  useEffect(() => {
    router.prefetch(`/products/${url}`)
  }, [url, router])

  const isCreated =
    (isVariation(item) && item.attributes.pa_diamond === 'LAB GROWN') ||
    (isProduct(item) && item.attributes.pa_diamond?.includes('LAB GROWN'))

  return (
    <div className="col-6 col-sm-4 col-lg-6 col-xxl-4 col-product-grid">
      <div className="product-grid-item style-2 bg-grey-light position-relative">
        {style === 'product' && (
          <Image
            className="img-fluid w-100"
            src={item?.images?.medium?.[0] ? item.images.medium[0] : ''}
            width={245}
            height={300}
            quality={100}
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
            id={item.sku}
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
                    src={image}
                    className="img-fluid w-100"
                    width={150}
                    height={150}
                    quality={100}
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
                  data-bs-target="#carouselProductPreview"
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
                  data-bs-target="#carouselProductPreview"
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
            {isCreated && <CreatedLosenge />}
          </div>
          {isVariation(item) && (
            <div className="d-flex d-lg-block d-xl-flex justify-content-between mb-3">
              {label === 'code' ? (
                <p className="mb-0">{item.sku}</p>
              ) : (
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
                  {filterLayers?.includes('pa_width') && (
                    <p className="mb-0">
                      {item.sku} {formatWidth(item.attributes['pa_width'])}
                    </p>
                  )}
                  {filterLayers?.includes('pa_centre-carat') && (
                    <p className="ms-xl-2">
                      carat {formatCarat(item.attributes['pa_centre-carat'])}
                      <sup>ct</sup>
                    </p>
                  )}
                  {filterLayers?.includes('pa_total-carat') && (
                    <p className="ms-xl-2">
                      Total carat{' '}
                      {formatCarat(item.attributes['pa_total-carat'])}
                      <sup>ct</sup>
                    </p>
                  )}
                </>
              )}
            </div>
          )}
          <button
            className="btn btn-border w-100"
            onClick={() => router.push(`/products/${url}`)}
          >
            <span>View</span>
          </button>
        </div>
      </div>
    </div>
  )
}
