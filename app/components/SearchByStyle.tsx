import { TitleBar } from '@/app/components'
import ProductGrid from '@/app/components/ProductGrid'
import { fetchStyles } from '@/server/actions'

const SearchByStyle = async () => {
  const styles = await fetchStyles()
  return (
    <>
      <TitleBar>Search by style</TitleBar>
      <ProductGrid items={styles} />
    </>
  )
}
export default SearchByStyle
