'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useGetData, useStore } from '@/app/hooks'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getProductCategory, getUniqueArrayValues } from '../utils'
import { stylesMap } from '../maps'
import { isAxiosError } from 'axios'

const bgStyle = {
  backgroundImage: `url('/img/768x970_01.jpg')`,
}

export const SearchByCode = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { data: products, error, isLoading } = useGetData()
  const [isInvalidCode, setIsInvalidCode] = useState(false)
  const router = useRouter()
  const setIsLoading = useStore((store) => store.setIsLoading)

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const code = inputRef?.current?.value.toUpperCase()
    if (code && !isAxiosError(products)) {
      const product = products?.find((product) =>
        product.variations.some((variation) => variation.sku === code)
      )
      if (product) {
        const variations = product.variations.filter(
          (variation) => variation.sku === code
        )
        const category = getProductCategory(product)
        const { filterLayers } = stylesMap[category![0]]
        const variationFilterLayerAttr = filterLayers[filterLayers.length - 1]
        const hasMultipleVariations =
          getUniqueArrayValues<string[]>(
            variations.reduce((acc, variation) => {
              if (variation.attributes[variationFilterLayerAttr]) {
                acc = [...acc, variation.attributes[variationFilterLayerAttr]!]
              }
              return acc
            }, [] as string[])
          ).length > 1
        let url = `/products/sku/${code}?search=code`
        if (hasMultipleVariations) {
          url = `/products/productId/${product.productId}${code === 'XN' ? `?pa_gauge=light` : ''}`
        }
        https: router.push(url)
      } else {
        setIsInvalidCode(true)
      }
    }
  }

  return (
    <>
      <Image
        className="position-absolute cover bg-cover banner-img"
        src={'/img/768x970_01.jpg'}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt=""
        priority
      />
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
