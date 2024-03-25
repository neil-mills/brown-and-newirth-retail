'use client'
import { getFilterSearchParamUrl } from '@/app/utils'
import { TitleBar } from '@/app/components'
import { useSearchParams } from 'next/navigation'
import { useStore } from '@/app/hooks'

type DiamondSet = 'yes' | 'no'
export const DiamondSetFilter = () => {
  const searchParams = useSearchParams()
  const storeFilters = useStore((store) => store.filters)
  const setFilters = useStore((store) => store.setFilters)

  const diamondSet = searchParams.get('pa_diamond-set')

  const handleClick = (value: string) => {
    const newOptions = storeFilters['pa_diamond-set'].includes(value)
      ? storeFilters['pa_diamond-set'].filter((option) => option !== value)
      : [value, ...storeFilters.pa_diamond]
    const newUrl = getFilterSearchParamUrl({
      type: 'pa_diamond-set',
      childType: 'pa_shaped',
      selectedOptions: newOptions,
    })
    setFilters({
      ...storeFilters,
      'pa_diamond-set': newOptions,
      pa_shaped: [],
    })
    window.history.pushState({ path: newUrl }, '', newUrl)
  }

  return (
    <>
      <TitleBar>
        {diamondSet ? `Choose your shape - Diamond Set` : `Diamond set?`}
      </TitleBar>
      <div className="nav nav-pills mb-225rem row row-pad-sm" role="tablist">
        {['yes', 'no'].map((option, i) => {
          const isActive = diamondSet === option
          return (
            <div
              className={`nav-item col-sm-6 col-lg-12 col-xl-6 col-pad-sm ${
                i === 0 ? 'mb-2 mb-sm-0 mb-lg-2 mb-xl-0' : ''
              }`}
              role="presentation"
              key={option}
            >
              <button
                className={`btn btn-border w-100${isActive ? ' active' : ''}`}
                data-bs-toggle="pill"
                data-bs-target={`#diamond-set-${option}`}
                type="button"
                role="tab"
                onClick={() => handleClick(option as DiamondSet)}
                aria-selected={isActive}
              >
                {option}
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}
