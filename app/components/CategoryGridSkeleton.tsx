import { CategoryCardSkeleton, TitleBar } from '@/app/components'

export const CategoryGridSkeleton = () => {
  return (
    <>
      <div className="row row-product-grid text-uppercase text-xs text-center">
        {Array.from({ length: 16 }).map((_item, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </div>
    </>
  )
}
