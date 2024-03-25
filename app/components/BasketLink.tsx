'use client'
import Image from 'next/image'
import { useStore } from '@/app/hooks'
import { basket as basketUtils } from '@/app/utils'

export const BasketLink = () => {
  const basket = useStore((store) => store.basket)
  const total = basketUtils.total(basket)
  return (
    <a
      href="https://staging.retailer.brownandnewirth.com/my-account/qpl-basket/"
      target="_blank"
      className="btn nav-btn h-100 d-flex align-items-center text-sm px-lg-4 px-xxl-5"
    >
      <span className="d-none d-lg-inline-block">
        Basket{total > 0 && ` (${total})`}
      </span>
      <Image
        className="d-block d-lg-none mx-auto"
        src="/img/svg/icon-basket.svg"
        alt="Basket"
        width={16}
        height={16}
      />
    </a>
  )
}
