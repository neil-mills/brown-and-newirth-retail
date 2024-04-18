import Image from 'next/image'
import SearchByCodeForm from './SearchByCodeForm'
import fetchDataServer from '@/data/fetchDataServer'

export const revalidate = 36000

export const SearchByCode = async () => {
  const products = await fetchDataServer()
  return (
    <>
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
          <SearchByCodeForm products={products} />
        </div>
      </div>
    </>
  )
}
