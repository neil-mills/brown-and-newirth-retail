'use client'
import { ChangeEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../hooks'

export const ResultsFilter = () => {
  const router = useRouter()
  const [filter, setFilter] = useState('')
  const selectRef = useRef<HTMLSelectElement>(null)
  const { sku } = useStore((store) => store.selectedSku)

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = selectRef?.current?.value || ''
    setFilter(value)
    router.push(`/products/${sku}${value ? `?diamondOrigin=${value}` : ''}`)
  }

  return (
    <div className="result-filter col-pad-sm d-flex align-items-center">
      <div className="nowrap me-3 filter-label">Filter by:</div>
      <select
        value={filter}
        ref={selectRef}
        className="form-select alt bg-grey px-2 fw-300"
        onChange={handleChange}
      >
        <option value="">Select</option>
        <option value="mined">Naturally Formed, Mined</option>
        <option value="lab-grown">Created&reg; Lab-grown</option>
      </select>
    </div>
  )
}
