import fetchData from '@/data/fetchData'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { SearchByCode, SearchByStyle } from '@/app/components'

export default async function Home() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: fetchData,
  })

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="col-left is-search h-100 position-relative bg-black d-flex align-items-center">
          <SearchByCode />
        </div>
        <div className="col col-right h-100">
          <SearchByStyle />
        </div>
      </HydrationBoundary>
    </>
  )
}
