'use client'
import { Mapping, ProductFilterAttributeKeys } from '@/app/types'
import { getFilterSearchParamUrl } from '@/app/utils'
import { useStore } from '@/app/hooks'
import Image from 'next/image'

interface Props {
  type: ProductFilterAttributeKeys
  filters: Mapping[]
  childType?: ProductFilterAttributeKeys | null
}

export const FilterGrid = ({ type, filters, childType }: Props) => {
  const storeFilters = useStore((store) => store.filters)
  const setFilters = useStore((store) => store.setFilters)

  const handleClick = (value: string) => {
    const newOptions = storeFilters[type].includes(value)
      ? storeFilters[type].filter((option) => option !== value)
      : [value, ...storeFilters[type]]
    const newUrl = getFilterSearchParamUrl({
      type,
      childType,
      selectedOptions: newOptions,
    })
    if (childType) {
      setFilters({ ...storeFilters, [type]: newOptions, [childType]: [] })
    } else {
      setFilters({ ...storeFilters, [type]: newOptions })
    }
    window.history.pushState({ path: newUrl }, '', newUrl)
  }

  return (
    <div className="row row-pad-sm row-panels-sm justify-content-center">
      {filters.map((filter) => (
        <div
          className="col-fifth col-pad-sm col-panel-sm col-panel-sm"
          key={filter.slug}
        >
          <button
            className="btn btn-icon bg-gradient-grey w-100"
            onClick={() => handleClick(filter.slug)}
            disabled={filters.length === 1}
            aria-pressed={
              storeFilters[type].includes(filter.slug) || filters.length === 1
            }
          >
            <p className="pt-2 mb-0">{filter.label}</p>
            <div className="icon-wrapper-square d-flex align-items-center justify-content-center px-4 pb-2">
              <Image
                src={filter.image || ''}
                width={0}
                height={0}
                alt={filter.label}
              />
            </div>
          </button>
        </div>
      ))}
    </div>
  )
}
