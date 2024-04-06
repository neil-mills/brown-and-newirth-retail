'use client'
import { useStore } from '@/app/hooks'
import { BasketModal } from '@/app/components'
import { basket as basketUtils } from '@/app/utils'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'

export const AddToBasket = () => {
  const { variation } = useStore((store) => store.selectedSku)
  const basket = useStore((store) => store.basket)
  const userId = useStore((store) => store.userId)
  const setBasket = useStore((store) => store.setBasket)
  const setShowModal = useStore((store) => store.setShowModal)
  const setToastMessage = useStore((store) => store.setToastMessage)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setToastMessage('')
    if (variation) {
      const variationId = variation['variation-id']
      const updatedBasket = basketUtils.add({
        variationId,
        quantity: 1,
        currentBasket: basket,
      })
      setBasket(updatedBasket)
      try {
        setIsLoading(true)
        const res = await axios.post('/api/basket', { variationId, userId })
        if (res.status === 200) {
          setShowModal(true)
        }
        setIsLoading(false)
      } catch (err) {
        const error = err as AxiosError
        setToastMessage(`Error: ${error.message}`)
        setIsLoading(false)
      }
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
            disabled={isLoading}
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
