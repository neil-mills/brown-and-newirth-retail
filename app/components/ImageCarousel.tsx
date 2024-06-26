'use client'
import { useStore } from '@/app/hooks'
import Image from 'next/image'
import { ImageCarouselSkeleton } from '@/app/components'

const ImageCarousel = ({ isLoading }: { isLoading: boolean }) => {
  const { product, images } = useStore((store) => store.selectedSku)
  return (
    <>
      {isLoading || !product || !images ? (
        <ImageCarouselSkeleton />
      ) : (
        <>
          <div
            id="carouselSingle"
            className="carousel carousel-crossfade with-thumbnails d-flex mb-3"
            data-bs-interval="false"
          >
            <div className="carousel-inner">
              {images.map((src: string, i: number) => {
                if (i < 4) {
                  return (
                    <div
                      key={i}
                      data-index={i}
                      className={`carousel-item bg-grey-light${i === 0 ? ' active' : ''}`}
                    >
                      <Image
                        priority={i === 0}
                        src={src}
                        width={720}
                        height={880}
                        className="img-fluid w-75 d-block mx-auto"
                        alt={product?.name || ''}
                        sizes="(max-width: 480px) 100vw, (max-width: 720px) 50vw, 33vw"
                      />
                    </div>
                  )
                }
              })}
              {images.length > 1 && (
                <>
                  <button
                    className="carousel-control-prev align-items-end"
                    type="button"
                    data-bs-target="#carouselSingle"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next align-items-end"
                    type="button"
                    data-bs-target="#carouselSingle"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </>
              )}
            </div>
            <div className="carousel-indicators thumbnails position-relative m-0 flex-column justify-content-start">
              {images.map((src: string, i: number) => {
                if (i < 4) {
                  return (
                    <button
                      key={`tn_${i}`}
                      type="button"
                      data-bs-target="#carouselSingle"
                      data-bs-slide-to={i}
                      className="bg-grey-light mx-0 active"
                    >
                      <Image
                        className="object-fit-cover position-absolute cover bg-cover banner-img"
                        src={src}
                        fill={true}
                        sizes="(max-width: 220px) 20vw, 10vw"
                        alt=""
                        priority
                      />
                    </button>
                  )
                }
              })}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ImageCarousel
