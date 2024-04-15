import { Suspense } from 'react'
import {
  CategoryGridSkeleton,
  SearchByCode,
  SetUserId,
  TitleBar,
} from '@/app/components'
import SearchByStyle from '@/app/components/SearchByStyle'
import ResetFilters from './components/ResetFilters'

export default async function Home() {
  return (
    <>
      <ResetFilters />
      <Suspense>
        <SetUserId />
      </Suspense>
      <div className="col-left is-search h-100 position-relative bg-black d-flex align-items-center">
        <SearchByCode />
      </div>
      <div className="col col-right h-100">
        <Suspense
          fallback={
            <>
              <TitleBar>Search by style</TitleBar>
              <CategoryGridSkeleton />
            </>
          }
        >
          <SearchByStyle />
        </Suspense>
      </div>
    </>
  )
}
