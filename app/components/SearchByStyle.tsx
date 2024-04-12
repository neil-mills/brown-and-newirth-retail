'use client'
import { CategoryGridSkeleton, SetIsLoading, TitleBar } from '@/app/components'
import { useStyles } from '@/app/hooks'
import ProductGrid from '@/app/components/ProductGrid'

const SearchByStyle = () => {
  const { styles, isLoading, isError, error } = useStyles()
  return (
    <>
      <SetIsLoading isLoading={isLoading} isError={isError} error={error} />
      <TitleBar>Search by style</TitleBar>
      {isLoading ? <CategoryGridSkeleton /> : <ProductGrid items={styles} />}
    </>
  )
}
export default SearchByStyle
