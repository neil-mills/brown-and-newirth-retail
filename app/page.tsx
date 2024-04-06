import fetchData from '@/data/fetchData'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { Suspense } from 'react'
import {
  CategoryGridSkeleton,
  SearchByCode,
  TitleBar,
  SetUserId,
} from '@/app/components'
import dynamic from 'next/dynamic'

const SearchByStyle = dynamic(() => import('@/app/components/SearchByStyle'), {
  ssr: false,
  loading: () => (
    <>
      <TitleBar>Search by style</TitleBar>
      <CategoryGridSkeleton />
    </>
  ),
})

export default async function Home() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: fetchData,
  })

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <SetUserId />
        </Suspense>
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
