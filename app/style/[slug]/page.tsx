import { notFound, useSearchParams } from 'next/navigation'
import { stylesMap } from '@/app/maps'
import { Filters, StoreFilters, Styles } from '@/app/types'
import { getFilterSearchParams, searchParamsToObject } from '@/app/utils'
import {
  BackLink,
  CategoryBanner,
  DiamondSetFilter,
  FilterGridSkeleton,
  ProductGridSkeleton,
  TitleBar,
} from '@/app/components'
import { Suspense } from 'react'
import FilteredProducts from '@/app/components/FilteredProducts'
import FilterMenuServer from '@/app/components/FilterMenuServer'
import { headers } from 'next/headers'
import { getCategory } from '@/app/utils/getCategory'

interface Props {
  params: { slug: string }
}

const ProductStylePage = ({ params: { slug } }: Props) => {
  const headersList = headers()
  const searchParams = headersList.get('x-search-params')
  const paDiamondSet = headersList.get('x-pa_diamond-set')
  // const setFilterLayers = useStore((store) => store.setFilterLayers)
  // const setFilters = useStore((store) => store.setFilters)
  const filters = getFilterSearchParams(
    searchParams ? searchParams.toString() : ''
  )
  // const setFilterLayers = useStore((store) => store.setFilterLayers)
  // const setFilters = useStore((store) => store.setFilters)
  // const searchParams = useSearchParams()

  // if (filters) {
  //   const filterStore = Object.entries(
  //     searchParamsToObject(searchParams.toString())
  //   ).reduce((acc, [key, value]) => {
  //     acc = { [key]: value.split(',') }
  //     return acc
  //   }, {} as Filters)
  //   setFilters(filterStore as StoreFilters)
  // }

  const [category, categoryData] = getCategory(slug)
  const { filterLayers } = stylesMap[category!]

  // useEffect(() => {
  //   setFilterLayers(filterLayers)
  // }, [setFilterLayers, filterLayers])

  if (!category || !categoryData) {
    return notFound()
  }

  const showPatternFilter =
    stylesMap[category as Styles].filterLayers.includes('pa_pattern')
  const showDiamondSetFilter =
    stylesMap[category as Styles].filterLayers.includes('pa_diamond-set')
  const hasShapeFilter =
    stylesMap[category as Styles].filterLayers.includes('pa_shape')
  const showShapeFilter =
    (hasShapeFilter && category !== 'Shaped') ||
    (hasShapeFilter && category === 'Shaped' && paDiamondSet)
  const showSettingFilter =
    stylesMap[category as Styles].filterLayers.includes('pa_setting')
  const showProfileFilter =
    stylesMap[category as Styles].filterLayers.includes('pa_profile')
  const showCeramicColourFilter =
    stylesMap[category as Styles].filterLayers.includes('pa_ceramic-colour')
  const showCoverageFilter =
    stylesMap[category as Styles].filterLayers.includes('pa_coverage')
  return (
    <>
      <div className="col-left h-100 d-flex flex-column">
        <BackLink />
        <div className="col-left-inner flex-grow-1 d-flex flex-column p-0">
          <CategoryBanner category={categoryData} />
          {showDiamondSetFilter && <DiamondSetFilter />}
          {showShapeFilter && (
            <Suspense
              fallback={
                <div className="mb-225rem">
                  <TitleBar>Choose your shape</TitleBar>
                  <FilterGridSkeleton />
                </div>
              }
            >
              <FilterMenuServer
                category={category}
                childFilters={['pa_setting', 'pa_coverage']}
                filters={filters}
                filter={category === 'Shaped' ? 'pa_shaped' : 'pa_shape'}
                label="Choose your shape"
              />
            </Suspense>
          )}
          {showSettingFilter && (
            <Suspense
              fallback={
                <div className="mb-225rem">
                  <TitleBar>Choose your setting</TitleBar>
                  <FilterGridSkeleton />
                </div>
              }
            >
              <FilterMenuServer
                category={category}
                filters={filters}
                filter={'pa_setting'}
                label="Choose your setting"
              />
            </Suspense>
          )}
          {showProfileFilter && (
            <Suspense
              fallback={
                <div className="mb-225rem">
                  <TitleBar>Choose your profile</TitleBar>
                  <FilterGridSkeleton />
                </div>
              }
            >
              <FilterMenuServer
                category={category}
                filters={filters}
                filter={'pa_profile'}
                label="Choose your profile"
              />
            </Suspense>
          )}
          {showPatternFilter && (
            <Suspense
              fallback={
                <div className="mb-225rem">
                  <TitleBar>Choose your style</TitleBar>
                  <FilterGridSkeleton />
                </div>
              }
            >
              <FilterMenuServer
                category={category}
                filters={filters}
                filter={'pa_pattern'}
                label="Choose your style"
              />
            </Suspense>
          )}
          {showCeramicColourFilter && (
            <Suspense
              fallback={
                <div className="mb-225rem">
                  <TitleBar>Choose your colour</TitleBar>
                  <FilterGridSkeleton />
                </div>
              }
            >
              <FilterMenuServer
                category={category}
                filters={filters}
                filter={'pa_ceramic-colour'}
                label="Choose your colour"
              />
            </Suspense>
          )}
          {showCoverageFilter && (
            <Suspense
              fallback={
                <div className="mb-225rem">
                  <TitleBar>Choose your coverage</TitleBar>
                  <FilterGridSkeleton />
                </div>
              }
            >
              <FilterMenuServer
                category={category}
                filters={filters}
                filter={'pa_coverage'}
                label="Choose your coverage"
              />
            </Suspense>
          )}
        </div>
      </div>
      <div className="col col-right h-100">
        Grid here
        {/* <Suspense
          fallback={
            <>
              <TitleBar>
                <span style={{ visibility: 'hidden' }}>Loading</span>{' '}
              </TitleBar>
              <ProductGridSkeleton />{' '}
            </>
          }
        >
          <FilteredProducts filters={filters} category={category} />
        </Suspense> */}
      </div>
    </>
  )
}

export default ProductStylePage
