'use client'
import { useFilterSearchParams, useRangeFilter, useStore } from '@/app/hooks'
import { VariationGauge } from '@/app/types'
import { getFilterSearchParamUrl } from '@/app/utils'
import { useSearchParams } from 'next/navigation'
import classNames from 'classnames'

export const GaugeFilter = () => {
  const storeFilters = useStore((store) => store.filters)
  const setFilters = useStore((store) => store.setFilters)
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())
  const [gauges, availableGauges] = useRangeFilter<VariationGauge>({
    rangeFilter: 'pa_gauge',
    childRangeFilter: 'pa_width',
    filters,
  })

  const handleClick = (value: string) => {
    const newOptions = storeFilters.pa_gauge.includes(value)
      ? storeFilters.pa_gauge.filter((option) => option !== value)
      : [value, ...storeFilters.pa_gauge]
    const newUrl = getFilterSearchParamUrl({
      type: 'pa_gauge',
      childType: ['pa_width'],
      selectedOptions: newOptions,
    })
    setFilters({ ...storeFilters, pa_gauge: newOptions, pa_width: [] })
    window.history.pushState({ path: newUrl }, '', newUrl)
  }

  return (
    <>
      <div className="row row-pad-xs row-panels-sm">
        {gauges.map((gauge) => {
          const btnClass = classNames({
            'bg-pink btn-border':
              storeFilters['pa_gauge'].includes(gauge.slug) ||
              (availableGauges.length === 1 &&
                availableGauges.includes(gauge.slug as VariationGauge)),
            'btn-border': !storeFilters['pa_gauge'].includes(gauge.slug),
          })

          return (
            <div key={gauge.slug} className="col col-pad-xs col-panel-sm">
              <button
                className={`btn btn-filter ${btnClass} h-100 w-100 px-1`}
                onClick={() => handleClick(gauge.slug)}
                disabled={
                  !availableGauges.includes(gauge.slug as VariationGauge) ||
                  availableGauges.length === 1
                }
                aria-pressed={
                  storeFilters['pa_diamond-quality'].includes(
                    gauge.slug as VariationGauge
                  ) || availableGauges.includes(gauge.slug as VariationGauge)
                }
              >
                <span>{gauge.label}</span>
              </button>
            </div>
          )
        })}
      </div>
      <hr />
    </>
  )
}
