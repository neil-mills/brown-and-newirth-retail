import { FilterButtonSkeleton } from '@/app/components'

export const FilterGridSkeleton = () => {
  return (
    <div className="row row-pad-sm row-panels-sm justify-content-center">
      {Array.from({ length: 8 }).map((_item, i) => (
        <FilterButtonSkeleton key={i} />
      ))}
    </div>
  )
}
