import { useFilterOptions } from '@/app/hooks'

export const ProductFilterByMenusSkeleton = () => {
  return (
    <div className="row row-pad-xs row-panels-sm">
      {Array.from({ length: 5 }).map((_item, i) => (
        <div key={i} className="col col-pad-xs col-panel-sm">
          <div className={`btn btn-filter btn-border h-100 w-100 px-1`}>
            <span className="placeholder-wave">
              <span
                className="placeholder col-6"
                style={{ backgroundColor: '#ccc' }}
              ></span>
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
