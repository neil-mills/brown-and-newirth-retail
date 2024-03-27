import { CategoryCardSkeleton, TitleBar } from '@/app/components'

export const CategoryGridSkeleton = () => {
  return (
    <>
      <TitleBar>Search by style</TitleBar>
      <div className="row row-product-grid text-uppercase text-xs text-center">
        {Array.from({ length: 16 }).map((_item, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </div>
    </>
  )
}
