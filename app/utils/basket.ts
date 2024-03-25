import { BasketItem } from '@/app/types'

interface AddProps {
  variationId: number
  quantity: number
  currentBasket: BasketItem[]
}

export const basket = {
  add: ({ variationId, quantity, currentBasket }: AddProps) => {
    const currentItem: BasketItem | undefined = currentBasket.find(
      (basketItem) => basketItem.variationId === variationId
    )
    const newBasket = currentItem
      ? [
          { variationId, quantity: currentItem.quantity + quantity },
          ...currentBasket.filter(
            (basketItem) => basketItem.variationId !== variationId
          ),
        ]
      : [{ variationId, quantity }, ...currentBasket]
    return newBasket
  },
  total: (currentBasket: BasketItem[]) =>
    currentBasket.reduce((acc, basketItem) => (acc += basketItem.quantity), 0),
}
