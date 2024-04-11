'use client'
import { useStore } from '@/app/hooks'
import { BasketModal } from '@/app/components'
import { basket as basketUtils } from '@/app/utils'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'

export const AddToBasket = () => {
  const {
    variation,
    metal = '',
    size = '',
    width = '',
  } = useStore((store) => store.selectedSku)
  const basket = useStore((store) => store.basket)
  const userId = useStore((store) => store.userId)
  const setBasket = useStore((store) => store.setBasket)
  const setShowModal = useStore((store) => store.setShowModal)
  const setToastMessage = useStore((store) => store.setToastMessage)
  const [isLoadingBasket, setIsLoadingBasket] = useState(false)
  const [isLoadingSave, setIsLoadingSave] = useState(false)

  const handleSaveClick = async () => {
    setToastMessage('')
    if (variation) {
      const variationId = variation['variation-id']
      try {
        setIsLoadingSave(true)
        const res = await axios.post('/api/save', { variationId, userId })
        if (res.status === 200) {
          setToastMessage('Item successfully saved.')
        }
        setIsLoadingSave(false)
      } catch (err) {
        const error = err as AxiosError
        setToastMessage(`Error: ${error.message}`)
        setIsLoadingSave(false)
      }
    }
  }

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
        setIsLoadingBasket(true)
        const res = await axios.post('/api/basket', {
          variationId,
          userId,
          width,
          metal,
          size,
        })
        if (res.status === 200) {
          setShowModal(true)
        }
        setIsLoadingBasket(false)
      } catch (err) {
        const error = err as AxiosError
        setToastMessage(`Error: ${error.message}`)
        setIsLoadingBasket(false)
      }
    }
  }
  return (
    <>
      <div className="row row-pad-sm">
        <div className="col-sm-4 col-pad-sm mb-3 mb-sm-0">
          <button
            className="btn btn-border w-100"
            onClick={handleSaveClick}
            disabled={isLoadingSave || !variation}
          >
            {isLoadingSave && (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                {` `}
              </>
            )}
            Save/Compare
          </button>
        </div>
        <div className="col-sm-8 col-pad-sm">
          <div className="row g-0 h-100">
            <div className="product-single-price-wrapper d-flex align-items-center product-single-price-wrapper">
              <span className="text-xs text-uppercase letter-spacing me-2 me-sm-3">
                Price
              </span>
              <span className="fw-300 ms-0">
                &pound;{variation?.price || ''}
              </span>
            </div>
            <div className="product-single-add-to-basket">
              <button
                className="btn bg-pink w-100 h-100"
                disabled={isLoadingBasket}
                onClick={() => handleClick()}
              >
                {isLoadingBasket && (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {` `}
                  </>
                )}
                {`Add to basket`}
              </button>
            </div>
          </div>
        </div>
      </div>
      <BasketModal />
    </>
  )
}
