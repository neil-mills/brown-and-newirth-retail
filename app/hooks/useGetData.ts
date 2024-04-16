import { fetchProducts } from '@/server/actions'
import { useQuery } from '@tanstack/react-query'
import { Product } from '@/app/types'

export function useGetData() {
  return useQuery<Product[]>({
    queryFn: fetchProducts,
    queryKey: ['products'],
  })
}
