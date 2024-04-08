import ProductGrid from '@/app/components/ProductGrid'
import { useStore } from '@/app/hooks'

export const SimilarProducts = () => {
  const similarProducts = useStore((store) => store.similarProducts)
  return <ProductGrid style="product" label="code" items={similarProducts} />
}
