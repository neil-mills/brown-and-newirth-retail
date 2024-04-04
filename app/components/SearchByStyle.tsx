'use client'
import { CategoryGridSkeleton, TitleBar } from '@/app/components'
import { useStore, useStyles } from '@/app/hooks'
import ProductGrid from '@/app/components/ProductGrid'
import { useEffect } from 'react'

const SearchByStyle = () => {
  const { styles, isLoading, error } = useStyles()
  const setIsLoading = useStore((store) => store.setIsLoading)

  useEffect(() => {
    setIsLoading(isLoading)
  }, [isLoading, setIsLoading])
  if (error) return <p>{error.message}</p>

  return (
    <>
      <TitleBar>Search by style</TitleBar>
      {isLoading ? <CategoryGridSkeleton /> : <ProductGrid items={styles} />}
    </>
  )
}
export default SearchByStyle
