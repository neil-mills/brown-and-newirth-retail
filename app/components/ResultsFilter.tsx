'use client'
import { ChangeEvent, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useStore } from '@/app/hooks'
import { diamondQualityMap } from '@/app/maps'

export const ResultsFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const value = searchParams.get('pa_diamond-quality') || ''
  const selectRef = useRef<HTMLSelectElement>(null)
  const { sku } = useStore((store) => store.selectedSku)
  const options = Object.entries(diamondQualityMap)
    .filter(([_key, mapping]) => mapping.filterLabel)
    .map(([_key, { filterLabel: label, slug }]) => ({ label, slug }))
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = selectRef?.current?.value || ''
    router.push(
      `/products/sku/${sku}?search=code${value ? `&pa_diamond-quality=${value}` : ''}`
    )
  }

  return (
    <div className="result-filter col-pad-sm d-flex align-items-center">
      <div className="nowrap me-3 filter-label">Filter by:</div>
      <select
        value={value}
        ref={selectRef}
        className="form-select alt bg-grey px-2 fw-300"
        onChange={handleChange}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.slug} value={option.slug}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
