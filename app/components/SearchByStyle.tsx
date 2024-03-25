'use client'
import { CategoryGridSkeleton, TitleBar } from '@/app/components'
import { useStyles } from '@/app/hooks'
import dynamic from 'next/dynamic'

const ProductGrid = dynamic(() => import('@/app/components/ProductGrid'), {
  ssr: false,
  loading: () => <CategoryGridSkeleton />,
})

export const SearchByStyle = () => {
  const { styles, isLoading, error } = useStyles()
  const allStyles = [
    ...styles,
    { label: 'Shaped', slug: 'shaped', image: '/img/09_shaped.png' },
  ]
  if (error) return <p>{error.message}</p>
  return (
    <>
      <TitleBar>Search by style</TitleBar>
      <ProductGrid items={allStyles} />
    </>
  )
}
