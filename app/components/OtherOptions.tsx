import ProductGrid from '@/app/components/ProductGrid'
import { useStore } from '@/app/hooks'
import { ProductGridSkeleton } from './ProductGridSkeleton'

const OtherOptions = () => {
  const { otherOptions } = useStore((store) => store.selectedSku)
  const isLoading = useStore((store) => store.isLoading)
  return (
    <>
      {isLoading ? (
        <ProductGridSkeleton />
      ) : (
        <ProductGrid style="variation" label="code" items={otherOptions} />
      )}
    </>
  )
}

export default OtherOptions
