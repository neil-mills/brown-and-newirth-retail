'use client'
import { useStore } from '@/app/hooks'
import { BasketModal } from '@/app/components'
import { basket as basketUtils } from '@/app/utils'

export const AddToBasket = () => {
  const { variation } = useStore((store) => store.selectedSku)
  const basket = useStore((store) => store.basket)
  const setBasket = useStore((store) => store.setBasket)

  const handleClick = () => {
    if (variation) {
      const variationId = variation['variation-id']
      const updatedBasket = basketUtils.add({
        variationId,
        quantity: 1,
        currentBasket: basket,
      })
      setBasket(updatedBasket)
    }
  }

  return (
    <>
      <div className="row g-0">
        <div className="product-single-price-wrapper d-flex align-items-center product-single-price-wrapper">
          <span className="text-xs text-uppercase letter-spacing me-2 me-sm-3">
            Price
          </span>
          <span className="fw-300 ms-0">&pound;{variation?.price || ''}</span>
        </div>
        <div className="product-single-add-to-basket">
          <button
            className="btn bg-pink w-100"
            data-bs-toggle="modal"
            data-bs-target="#modalBasket"
            onClick={() => handleClick()}
          >
            <span>Add to basket</span>
          </button>
        </div>
      </div>
      <BasketModal />
    </>
  )
}
