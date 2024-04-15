'use client'
import { notFound, useSearchParams } from 'next/navigation'
import { stylesMap } from '@/app/maps'
import { Filters, StoreFilters, Styles } from '@/app/types'
import { searchParamsToObject } from '@/app/utils'
import dynamic from 'next/dynamic'
import {
  BackLink,
  CategoryBanner,
  DiamondSetFilter,
  FilterGridSkeleton,
  ProductGridSkeleton,
  TitleBar,
} from '@/app/components'
import { useCategory, useFilterSearchParams, useStore } from '@/app/hooks'
import { Suspense, useEffect } from 'react'
import FilteredProducts from '@/app/components/FilteredProducts'
import ShapeFilterMenu from '@/app/components/ShapeFilterMenu'
import SettingFilterMenu from '@/app/components/SettingFilterMenu'
import PatternFilterMenu from '@/app/components/PatternFilterMenu'
import ProfileFilterMenu from '@/app/components/ProfileFilterMenu'
import CeramicColourFilterMenu from '@/app/components/CeramicColourFilterMenu'
import CoverageFilterMenu from '@/app/components/CoverageFilterMenu'

interface Props {
  params: { slug: string }
}

const ProductCategoryPage = ({ params: { slug } }: Props) => {
  const setFilterLayers = useStore((store) => store.setFilterLayers)
  const setFilters = useStore((store) => store.setFilters)
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())
  if (filters) {
    const filterStore = Object.entries(
      searchParamsToObject(searchParams.toString())
    ).reduce((acc, [key, value]) => {
      acc = { [key]: value.split(',') }
      return acc
    }, {} as Filters)
    setFilters(filterStore as StoreFilters)
  }

  const [category, categoryData] = useCategory(slug)
  const { filterLayers } = stylesMap[category!]

  useEffect(() => {
    setFilterLayers(filterLayers)
  }, [setFilterLayers, filterLayers])

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
    (hasShapeFilter &&
      category === 'Shaped' &&
      searchParams.get('pa_diamond-set'))
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
            <ShapeFilterMenu category={category} hasChild={showSettingFilter} />
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
              <SettingFilterMenu category={category} />
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
              <ProfileFilterMenu category={category} />
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
              <PatternFilterMenu category={category} />
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
              <CeramicColourFilterMenu category={category} />
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
              <CoverageFilterMenu category={category} />
            </Suspense>
          )}
        </div>
      </div>
      <div className="col col-right h-100">
        <FilteredProducts filters={filters} category={category} />
      </div>
    </>
  )
}

export default ProductCategoryPage
