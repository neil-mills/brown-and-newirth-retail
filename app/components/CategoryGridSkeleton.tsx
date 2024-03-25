import { CategoryCardSkeleton } from '@/app/components'

export const CategoryGridSkeleton = () => {
  return (
    <div className="row row-product-grid text-uppercase text-xs text-center">
      {Array.from({ length: 20 }).map((_item, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  )
}
