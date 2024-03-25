import { useStore } from '@/app/hooks'
import { formatMetal } from '../utils'
import Image from 'next/image'

export const BasketModal = () => {
  const { variation, size, metal } = useStore((store) => store.selectedSku)
  return (
    <div
      className={`modal modal-added-to-basket fade`}
      id="modalBasket"
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered mx-auto">
        <div className="modal-content">
          <button
            type="button"
            className="btn-close position-absolute"
            data-bs-dismiss="modal"
          ></button>
          <p className="text-center fw-300">Item added to basket</p>
          <div>
            <div className="row row-pad-sm align-items-center">
              <div className="col-sm-6 col-pad-sm mb-16px">
                <div className="bg-grey-light">
                  <Image
                    src={variation?.['variation-images'].medium || ''}
                    className="img-fluid w-100"
                    width={150}
                    height={150}
                    quality={75}
                    alt={variation?.name || ''}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-pad-sm text-uppercase mb-16px">
                {variation?.sku && (
                  <>
                    <h6>Product Code</h6>
                    <p className="fw-300">{variation?.sku}</p>
                  </>
                )}
                {size && (
                  <>
                    <h6>Size</h6>
                    <p className="fw-300">{size.toUpperCase()}</p>
                  </>
                )}
                {metal && (
                  <>
                    <h6>Metal</h6>
                    <p className="fw-300">{formatMetal(metal)}</p>
                  </>
                )}
                {variation?.price && (
                  <>
                    <h6>Price</h6>
                    <p className="fw-300">&pound;{variation.price}</p>
                  </>
                )}
              </div>
              <div className="col-sm-6 col-pad-sm">
                <button
                  className="btn btn-border w-100 mb-2 mb-sm-0"
                  data-bs-dismiss="modal"
                >
                  <span>Continue Shopping</span>
                </button>
              </div>
              <div className="col-sm-6 col-pad-sm">
                <a href="#" className="btn bg-pink w-100">
                  <span>Checkout</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
