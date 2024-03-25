'use client'
import { FormEvent, useRef, useState } from 'react'
import { useGetData } from '../hooks'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const bgStyle = {
  backgroundImage: `url('/img/768x970_01.jpg')`,
}

export const SearchByCode = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { data: products, error, isLoading } = useGetData()
  const [isInvalidCode, setIsInvalidCode] = useState(false)
  const router = useRouter()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const code = inputRef?.current?.value
    if (code) {
      const product = products?.find((product) =>
        product.variations.some((variation) => variation.sku === code)
      )
      if (product) {
        router.push(`/products/sku/${code}?search=code`)
      } else {
        setIsInvalidCode(true)
      }
    }
  }

  return (
    <>
      <div
        className="position-absolute cover bg-cover banner-img"
        style={bgStyle}
      ></div>
      <div className="row g-0 justify-content-center w-100 position-relative text-center">
        <div className="col-9">
          <form onSubmit={handleSubmit}>
            <div className="mb-225rem">
              <label
                htmlFor="inputProductCode"
                className="form-label text-white mb-2rem"
              >
                Search by Code
              </label>
              <div className="form-input-code-search position-relative">
                <input
                  type="text"
                  className="form-control fw-300 br-5 bg-white"
                  id="inputProductCode"
                  placeholder="Enter Code..."
                  required
                  ref={inputRef}
                  disabled={isLoading || !!error}
                />
                <Image
                  className="position-absolute"
                  src="img/svg/icon-search.svg"
                  alt="Search"
                  width={15}
                  height={15}
                />
              </div>
              {isInvalidCode && (
                <div className="alert alert-danger mt-3" role="alert">
                  Oops! We didn&#39;t recognise that code, please try again
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-lg bg-pink"
              disabled={isLoading || !!error}
            >
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
