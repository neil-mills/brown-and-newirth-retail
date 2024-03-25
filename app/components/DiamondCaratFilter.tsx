'use client'
import { useFilterSearchParams, useRangeFilter, useStore } from '@/app/hooks'
import { getFilterSearchParamUrl } from '@/app/utils'
import icon from '@/public/img/svg/icon-shape-round.svg'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Carats } from '../types'

interface Props {
  attribute: 'pa_centre-carat' | 'pa_total-carat'
}

export const DiamondCaratFilter = ({ attribute }: Props) => {
  const storeFilters = useStore((store) => store.filters)
  const setFilters = useStore((store) => store.setFilters)
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())
  const [carats, availableCarats] = useRangeFilter<Carats>({
    rangeFilter: attribute,
    filters,
  })

  const handleClick = (value: string) => {
    const newOptions = storeFilters[attribute].includes(value)
      ? storeFilters[attribute].filter((option) => option !== value)
      : [value, ...storeFilters[attribute]]
    const newUrl = getFilterSearchParamUrl({
      type: attribute,
      selectedOptions: newOptions,
    })
    setFilters({ ...storeFilters, [attribute]: newOptions })
    window.history.pushState({ path: newUrl }, '', newUrl)
  }

  return (
    <div className="row row-pad-xs row-panels-sm row-natural-created justify-content-center text-xs text-uppercase text-center">
      {carats.map((carat) => (
        <div key={carat.slug} className="col-ninth col-pad-xs col-panel-xs">
          <button
            className={`btn btn-icon alt w-100 natural ${carat.class}`}
            disabled={
              !availableCarats.includes(carat.slug as Carats) ||
              availableCarats.length === 1
            }
            onClick={() => handleClick(carat.slug)}
            aria-pressed={
              storeFilters[attribute].includes(carat.slug) ||
              availableCarats.length === 1
            }
          >
            <div className="icon-wrapper-square d-flex align-items-center justify-content-center">
              <Image src={icon} alt="Round" />
            </div>
          </button>
          <p className="mt-2">
            {carat.label}
            <sup>ct</sup>
          </p>
        </div>
      ))}
    </div>
  )
}
