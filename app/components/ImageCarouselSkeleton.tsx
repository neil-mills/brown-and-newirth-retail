import { ImageCarouselTnSkeleton } from './ImageCarouselTnSkeleton'

export const ImageCarouselSkeleton = () => {
  return (
    <div
      id="carouselSingle"
      className="carousel carousel-crossfade with-thumbnails d-flex mb-3"
    >
      <div className="carousel-inner">
        <div className="carousel-item bg-grey-light active">
          <img
            src={''}
            width={720}
            height={880}
            className="img-fluid w-75 d-block mx-auto"
            alt=""
            style={{ visibility: 'hidden' }}
          />
        </div>
      </div>
      <div className="carousel-indicators thumbnails position-relative m-0 flex-column justify-content-start">
        {Array.from({ length: 4 }).map((_item, i) => (
          <ImageCarouselTnSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
