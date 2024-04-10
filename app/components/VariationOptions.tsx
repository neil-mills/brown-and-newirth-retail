'use client'
import { Select } from '@/app/components'
import { useStore, useVariationOptions } from '@/app/hooks'
import { ChangeEvent, useEffect } from 'react'
import { sizesMap } from '@/app/maps'
import { Variation } from '@/app/types'

interface Props {
  showSize: boolean
  showWidth: boolean
}

export const VariationOptions = ({ showSize, showWidth }: Props) => {
  const {
    variations,
    size: selectedSize,
    metal: selectedMetal,
    width: selectedWidth,
    sku,
  } = useStore((store) => store.selectedSku)
  const setVariation = useStore((store) => store.setVariation)
  const productIsLoading = useStore((store) => store.isLoading)
  const { sizes, metals, widths } = useVariationOptions()
  const setSize = useStore((store) => store.setSize)
  const setMetal = useStore((store) => store.setMetal)
  const setWidth = useStore((store) => store.setWidth)

  useEffect(() => {
    let selectedVariation: Variation | null = null
    if (showWidth) {
      if (selectedWidth && selectedSize && selectedMetal) {
        const sizeRange =
          Object.entries(sizesMap).find(([key, value]) =>
            value.includes(selectedSize)
          )?.[0] || null
        if (sizeRange) {
          selectedVariation =
            variations.find(
              (variation) =>
                variation?.sku === sku &&
                variation.attributes['pa_width'] === selectedWidth &&
                variation.attributes['pa_metal-code'] === selectedMetal &&
                variation.attributes.pa_size === sizeRange
            ) || null
        }
      }
    } else if (showSize) {
      if (selectedSize && selectedMetal) {
        const sizeRange =
          Object.entries(sizesMap).find(([key, value]) =>
            value.includes(selectedSize)
          )?.[0] || null
        if (sizeRange) {
          selectedVariation =
            variations.find(
              (variation) =>
                variation?.sku === sku &&
                variation.attributes['pa_metal-code'] === selectedMetal &&
                variation.attributes.pa_size === sizeRange
            ) || null
        }
      }
    } else {
      if (selectedMetal) {
        selectedVariation =
          variations.find(
            (variation) =>
              variation.attributes['pa_metal-code'] === selectedMetal
          ) || null
      }
    }

    if (selectedVariation) setVariation(selectedVariation)
  }, [
    selectedSize,
    selectedMetal,
    setVariation,
    variations,
    showSize,
    sku,
    selectedWidth,
    showWidth,
  ])

  return (
    <div className="row row-pad-sm mb-16px">
      {showWidth && (
        <div className="col-sm col-pad-sm mb-3 mb-sm-0">
          <Select
            options={widths}
            value={selectedWidth}
            defaultLabel="Width"
            disabled={productIsLoading}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setWidth(event.target.value)
            }
          />
        </div>
      )}
      {showSize && (
        <div className="col-sm col-pad-sm mb-3 mb-sm-0">
          <Select
            options={sizes}
            value={selectedSize}
            defaultLabel="Size"
            disabled={productIsLoading}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setSize(event.target.value)
            }
          />
        </div>
      )}
      <div className="col-sm col-pad-sm mb-3 mb-sm-0">
        <Select
          options={metals}
          value={selectedMetal}
          defaultLabel="Metal"
          disabled={productIsLoading}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setMetal(event.target.value)
          }
        />
      </div>
    </div>
  )
}
