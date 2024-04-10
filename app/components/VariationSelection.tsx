'use client'
import { AddToBasket, VariationOptions } from '@/app/components'
import { useState, useEffect } from 'react'
import { useStore } from '../hooks'

export const VariationSelection = () => {
  const { product } = useStore((store) => store.selectedSku)
  const showSize = !product?.attributes?.['pa_type-2']?.length
  const showWidth =
    product?.attributes?.pa_gauge && product.attributes.pa_gauge.length > 0
      ? true
      : false
  const [showAddToBasket, setShowAddToBasket] = useState<boolean>(false)
  const {
    size: selectedSize,
    metal: selectedMetal,
    width: selectedWidth,
  } = useStore((store) => store.selectedSku)

  useEffect(() => {
    let show = false
    if (!showSize && !showWidth) {
      show = selectedMetal !== ''
    } else if (showWidth && showSize) {
      show =
        ![undefined, ''].includes(selectedWidth) &&
        selectedSize !== '' &&
        selectedMetal !== ''
    } else {
      show = selectedSize !== '' && selectedMetal !== ''
    }
    setShowAddToBasket(show)
  }, [selectedSize, selectedMetal, selectedWidth, showSize, showWidth])

  return (
    <>
      <VariationOptions showSize={showSize} showWidth={showWidth} />
      {showAddToBasket && <AddToBasket />}
    </>
  )
}
