'use client'
import { useRangeFilter, useStore } from '@/app/hooks'
import { getFilterSearchParamUrl } from '@/app/utils'
import classNames from 'classnames'
import { decode } from 'html-entities'

export const DiamondQualityFilter = ({
  childType,
}: {
  childType: ('pa_centre-carat' | 'pa_total-carat')[]
}) => {
  const storeFilters = useStore((store) => store.filters)
  const setFilters = useStore((store) => store.setFilters)

  const [diamondQualities, availableDiamondQualities] = useRangeFilter<string>({
    rangeFilter: 'pa_diamond-quality',
    filters: null,
  })
  const filteredAvailableDiamondQualities = availableDiamondQualities.filter(
    (quality) => ['hsi', 'd-fvs'].includes(quality)
  )
  const handleClick = (value: string) => {
    const newOptions = storeFilters['pa_diamond-quality'].includes(value)
      ? storeFilters['pa_diamond-quality'].filter((option) => option !== value)
      : [value, ...storeFilters['pa_diamond-quality']]
    const newUrl = getFilterSearchParamUrl({
      type: 'pa_diamond-quality',
      childType,
      selectedOptions: newOptions,
    })
    const childTypes = childType?.reduce((acc, type) => {
      return { ...acc, [type]: [] }
    }, {})
    setFilters({
      ...storeFilters,
      ['pa_diamond-quality']: newOptions,
      ...childTypes,
    })
    window.history.pushState({ path: newUrl }, '', newUrl)
  }
  if (filteredAvailableDiamondQualities.length === 0) return null
  return (
    <>
      <div className="row row-pad-sm">
        {diamondQualities.map((diamondQuality, i) => {
          const value = diamondQuality.slug.toLowerCase()
          const btnClass = classNames({
            'bg-pink btn-border':
              storeFilters['pa_diamond-quality'].includes(value) ||
              (filteredAvailableDiamondQualities.length === 1 &&
                filteredAvailableDiamondQualities.includes(value)),
            'btn-border': !storeFilters['pa_diamond-quality'].includes(value),
          })
          return (
            <div
              key={diamondQuality.slug}
              className={`col-sm-6 col-lg-12 col-xl-6 col-pad-sm ${
                i === 0 ? 'mb-2 mb-sm-0 mb-lg-2 mb-xl-0' : ''
              }`}
            >
              <button
                className={`btn btn-filter ${btnClass} ${diamondQuality.class} w-100`}
                onClick={() => handleClick(diamondQuality.slug)}
                disabled={
                  !filteredAvailableDiamondQualities.includes(value) ||
                  filteredAvailableDiamondQualities.length === 1
                }
                aria-pressed={
                  storeFilters['pa_diamond-quality'].includes(value) ||
                  filteredAvailableDiamondQualities.includes(value)
                }
              >
                <span>
                  {decode(diamondQuality.filterLabel, { level: 'html5' })}
                </span>
              </button>
            </div>
          )
        })}
      </div>
      <hr />
    </>
  )
}
