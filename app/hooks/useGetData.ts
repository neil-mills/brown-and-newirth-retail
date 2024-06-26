import fetchData from '@/data/fetchData'
import { useQuery } from '@tanstack/react-query'
import { Product } from '@/app/types'

export function useGetData() {
  return useQuery<Product[]>({
    queryFn: async () => fetchData(),
    queryKey: ['products'],
  })
}
