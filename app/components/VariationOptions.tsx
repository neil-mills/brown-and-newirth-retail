'use client'
import { Select } from '@/app/components'
import { useStore, useVariationOptions } from '@/app/hooks'
import { ChangeEvent, useEffect, useState } from 'react'
import { sizesMap } from '@/app/maps'
import { Variation } from '@/app/types'
import axios, { AxiosError } from 'axios'

export const VariationOptions = ({ showSize }: { showSize: boolean }) => {
  const {
    variations,
    size: selectedSize,
    metal: selectedMetal,
    variation,
  } = useStore((store) => store.selectedSku)
  const setVariation = useStore((store) => store.setVariation)
  const setToastMessage = useStore((store) => store.setToastMessage)
  const productIsLoading = useStore((store) => store.isLoading)
  const { sizes, metals } = useVariationOptions()
  const setSize = useStore((store) => store.setSize)
  const setMetal = useStore((store) => store.setMetal)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setToastMessage('')
    if (variation) {
      const variationId = variation['variation-id']
      try {
        setIsLoading(true)
        const res = await axios.post('/api/save', { variationId })
        if (res.status === 200) {
          setToastMessage('Item successfully saved.')
        }
        setIsLoading(false)
      } catch (err) {
        const error = err as AxiosError
        setToastMessage(`Error: ${error.message}`)
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    let selectedVariation: Variation | null = null
    if (showSize) {
      if (selectedSize && selectedMetal) {
        const sizeRange =
          Object.entries(sizesMap).find(([key, value]) =>
            value.includes(selectedSize)
          )?.[0] || null
        if (sizeRange) {
          selectedVariation =
            variations.find(
              (variation) =>
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
  }, [selectedSize, selectedMetal, setVariation, variations, showSize])

  return (
    <div className="row row-pad-sm mb-16px">
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
      <div className="col col-pad-sm">
        <button
          className="btn btn-border w-100"
          onClick={handleClick}
          disabled={isLoading || !variation}
        >
          <span>Save/Compare</span>
        </button>
      </div>
    </div>
  )
}
