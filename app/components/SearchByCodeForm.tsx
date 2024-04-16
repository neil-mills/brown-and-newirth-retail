'use client'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent, useRef, useState } from 'react'
import Image from 'next/image'
import { Product } from '@/app/types'

interface Props {
  products: Product[] | undefined
  isLoading: boolean
  isError: boolean
}
const SearchByCodeForm = ({ products, isLoading, isError }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isInvalidCode, setIsInvalidCode] = useState(false)
  const router = useRouter()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const code = inputRef?.current?.value.toUpperCase()
    if (code && !isAxiosError(products)) {
      const product = products?.find((product) =>
        product.variations.some((variation) => variation.sku === code)
      )
      if (product) {
        const url = `/products/sku/${code}?search=code`
        router.push(url)
      } else {
        setIsInvalidCode(true)
      }
    }
  }
  return (
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
            disabled={isLoading || isError}
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
        disabled={isLoading || isError}
      >
        <span>Search</span>
      </button>
    </form>
  )
}

export default SearchByCodeForm
