'use client'
import { useFilterSearchParams, useRangeFilter, useStore } from '@/app/hooks'
import { Widths } from '@/app/types'
import { getFilterSearchParamUrl } from '@/app/utils'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

export const WidthFilter = () => {
  const storeFilters = useStore((store) => store.filters)
  const setFilters = useStore((store) => store.setFilters)
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())
  const [widths, availableWidths] = useRangeFilter<Widths>({
    rangeFilter: 'pa_width',
    filters,
  })
  const handleClick = (value: string) => {
    const newOptions = storeFilters.pa_width.includes(value)
      ? storeFilters.pa_width.filter((option) => option !== value)
      : [value, ...storeFilters.pa_width]
    const newUrl = getFilterSearchParamUrl({
      type: 'pa_width',
      selectedOptions: newOptions,
    })
    setFilters({ ...storeFilters, pa_width: newOptions })
    window.history.pushState({ path: newUrl }, '', newUrl)
  }

  return (
    <div className="row row-pad-xs row-panels-sm row-gauges justify-content-center text-xs text-center">
      {widths.map((width) => (
        <div key={width.slug} className="col-tenth col-pad-xs col-panel-xs">
          <button
            className="btn btn-icon gauge alt w-100 ultra-light"
            onClick={() => handleClick(width.slug)}
            disabled={
              !availableWidths.includes(width.slug as Widths) ||
              availableWidths.length === 1
            }
            aria-pressed={
              storeFilters.pa_width.includes(width.slug) ||
              availableWidths.length === 1
            }
          >
            <div className="icon-wrapper-gauge d-flex align-items-center justify-content-center py-3 px-2">
              <Image
                src={width.image || ''}
                width={0}
                height={0}
                alt={width.label}
              />
            </div>
          </button>
          <p className="mt-2">{width.label}</p>
        </div>
      ))}
    </div>
  )
}
