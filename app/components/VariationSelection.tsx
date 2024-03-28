'use client'
import { AddToBasket, VariationOptions } from '@/app/components'
import { useState, useEffect } from 'react'
import { useStore } from '../hooks'

export const VariationSelection = () => {
  const { product } = useStore((store) => store.selectedSku)
  const showSize = !product?.attributes?.['pa_type-2']?.length
  const [showAddToBasket, setShowAddToBasket] = useState<boolean>(false)
  const { size: selectedSize, metal: selectedMetal } = useStore(
    (store) => store.selectedSku
  )
  useEffect(() => {
    const show = !showSize
      ? selectedMetal !== ''
      : selectedSize !== '' && selectedMetal !== ''
    setShowAddToBasket(show)
  }, [selectedSize, selectedMetal, showSize])

  return (
    <>
      <VariationOptions showSize={showSize} />
      {showAddToBasket && <AddToBasket />}
    </>
  )
}
