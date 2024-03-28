'use client'
import { CategoryGridSkeleton, TitleBar } from '@/app/components'
import { useStyles } from '@/app/hooks'
import ProductGrid from '@/app/components/ProductGrid'

const SearchByStyle = () => {
  const { styles, isLoading, error } = useStyles()
  if (error) return <p>{error.message}</p>
  if (!isLoading && styles) console.log(styles)
  return (
    <>
      <TitleBar>Search by style</TitleBar>
      {isLoading ? <CategoryGridSkeleton /> : <ProductGrid items={styles} />}
    </>
  )
}
export default SearchByStyle
