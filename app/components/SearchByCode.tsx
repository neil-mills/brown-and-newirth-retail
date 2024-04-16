'use client'
import Image from 'next/image'
import { SetIsLoading } from './SetIsLoading'
import SearchByCodeForm from './SearchByCodeForm'
import { useGetData } from '@/app/hooks'

export const SearchByCode = () => {
  const { data: products, error, isError, isLoading } = useGetData()
  return (
    <>
      <SetIsLoading isError={isError} isLoading={isLoading} error={error} />
      <Image
        className="object-fit-cover position-absolute cover bg-cover banner-img"
        src={'/img/768x970_01.jpg'}
        fill={true}
        sizes="(max-width: 220px) 100vw,  60vw"
        alt=""
        priority
      />
      <div className="row g-0 justify-content-center w-100 position-relative text-center">
        <div className="col-9">
          <SearchByCodeForm
            products={products}
            isError={isError}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  )
}
