import ProductGrid from '@/app/components/ProductGrid'
import { useStore } from '@/app/hooks'

export const SimilarProducts = () => {
  const { similarProducts } = useStore((store) => store.selectedSku)
  return <ProductGrid style="variation" items={similarProducts} />
}
