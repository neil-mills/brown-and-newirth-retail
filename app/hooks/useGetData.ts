import fetchData from '@/data/fetchData'
import { useQuery } from '@tanstack/react-query'
import { Product } from '@/app/types'
import { AxiosError } from 'axios'

export function useGetData() {
  return useQuery<Product[] | AxiosError>({
    queryFn: async () => await fetchData(),
    queryKey: ['products'],
  })
}
