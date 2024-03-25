'use client'
import { Select } from '@/app/components'
import { useStore, useVariationOptions } from '@/app/hooks'
import { ChangeEvent, useEffect } from 'react'
import { sizesMap } from '@/app/maps'
import { Variation } from '@/app/types'

export const VariationOptions = ({ showSize }: { showSize: boolean }) => {
  const {
    variations,
    size: selectedSize,
    metal: selectedMetal,
  } = useStore((store) => store.selectedSku)
  const setVariation = useStore((store) => store.setVariation)
  const { sizes, metals } = useVariationOptions()
  const setSize = useStore((store) => store.setSize)
  const setMetal = useStore((store) => store.setMetal)
  useEffect(() => {
    let selectedVariation: Variation | null = null
    if (selectedSize) {
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
    if (selectedVariation) setVariation(selectedVariation)
  }, [selectedSize, selectedMetal, setVariation, variations])

  return (
    <div className="row row-pad-sm mb-16px">
      {showSize && (
        <div className="col-sm col-pad-sm mb-3 mb-sm-0">
          <Select
            options={sizes}
            value={selectedSize}
            defaultLabel="Size"
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
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setMetal(event.target.value)
          }
        />
      </div>
      <div className="col col-pad-sm">
        <button className="btn btn-border w-100">
          <span>Save/Compare</span>
        </button>
      </div>
    </div>
  )
}
