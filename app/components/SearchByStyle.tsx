'use client'
import { TitleBar } from '@/app/components'
import { useStyles } from '@/app/hooks'
import ProductGrid from '@/app/components/ProductGrid'

const SearchByStyle = () => {
  const { styles, isLoading, error } = useStyles()
  // const [showGrid, setShowGrid] = useState(false)
  const allStyles = [
    ...styles,
    { label: 'Shaped', slug: 'shaped', image: '/img/09_shaped.png' },
  ]

  if (error) return <p>{error.message}</p>
  if (isLoading) return null
  return (
    <>
      <TitleBar>Search by style</TitleBar>
      <ProductGrid items={allStyles} />
    </>
  )
}
export default SearchByStyle
