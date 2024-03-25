'use client'
import { useRangeFilter, useStore } from '@/app/hooks'
import { getFilterSearchParamUrl, searchParamsToObject } from '@/app/utils'
import classNames from 'classnames'
import { decode } from 'html-entities'

export const DiamondOriginFilter = ({
  childType,
}: {
  childType: 'pa_centre-carat' | 'pa_total-carat'
}) => {
  const storeFilters = useStore((store) => store.filters)
  const setFilters = useStore((store) => store.setFilters)
  const searchParams = useStore((store) => store.searchParams)
  const searchParamsObj = searchParamsToObject(searchParams)

  const [diamondOrigins, availableDiamondOrigins] = useRangeFilter({
    rangeFilter: 'pa_diamond',
    filters: null,
  })

  const handleClick = (value: string) => {
    const newOptions = storeFilters.pa_diamond.includes(value)
      ? storeFilters.pa_diamond.filter((option) => option !== value)
      : [value, ...storeFilters.pa_diamond]
    const newUrl = getFilterSearchParamUrl({
      type: 'pa_diamond',
      childType,
      selectedOptions: newOptions,
    })
    setFilters({ ...storeFilters, pa_diamond: newOptions, [childType]: [] })
    window.history.pushState({ path: newUrl }, '', newUrl)
  }

  return (
    <>
      <div className="row row-pad-sm">
        {diamondOrigins.map((diamondOrigin, i) => {
          const btnClass = classNames({
            'bg-pink': diamondOrigin.slug === searchParamsObj?.pa_diamond,
            'btn-border': diamondOrigin.slug !== searchParamsObj?.pa_diamond,
          })
          return (
            <div
              key={diamondOrigin.slug}
              className={`col-sm-6 col-lg-12 col-xl-6 col-pad-sm ${
                i === 0 ? 'mb-2 mb-sm-0 mb-lg-2 mb-xl-0' : ''
              }`}
            >
              <button
                className={`btn btn-filter ${btnClass} ${diamondOrigin.class} w-100`}
                onClick={() => handleClick(diamondOrigin.slug)}
                disabled={
                  !availableDiamondOrigins.includes(diamondOrigin.slug) ||
                  availableDiamondOrigins.length === 1
                }
                aria-pressed={
                  storeFilters.pa_diamond.includes(diamondOrigin.slug) ||
                  availableDiamondOrigins.length === 1
                }
              >
                <span>{decode(diamondOrigin.label, { level: 'html5' })}</span>
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}
