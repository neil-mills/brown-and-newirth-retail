'use client'
import { notFound, useSearchParams } from 'next/navigation'
import { stylesMap } from '@/app/maps'
import { Styles } from '@/app/types'
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

interface Props {
  params: { slug: string }
}

const ShapeFilterMenu = dynamic(
  () => import('@/app/components/ShapeFilterMenu'),
  {
    ssr: false,
    loading: () => (
      <div className="mb-225rem">
        <TitleBar>Choose your shape</TitleBar>
        <FilterGridSkeleton />
      </div>
    ),
  }
)

const SettingFilterMenu = dynamic(
  () => import('@/app/components/SettingFilterMenu'),
  {
    ssr: false,
    loading: () => (
      <div className="mb-225rem">
        <TitleBar>Choose your setting</TitleBar>
        <FilterGridSkeleton />
      </div>
    ),
  }
)
const PatternFilterMenu = dynamic(
  () => import('@/app/components/PatternFilterMenu'),
  {
    ssr: false,
    loading: () => (
      <div className="mb-225rem">
        <TitleBar>Choose your style</TitleBar>
        <FilterGridSkeleton />
      </div>
    ),
  }
)
const ProfileFilterMenu = dynamic(
  () => import('@/app/components/ProfileFilterMenu'),
  {
    ssr: false,
    loading: () => (
      <div className="mb-225rem">
        <TitleBar>Choose your profile</TitleBar>
        <FilterGridSkeleton />
      </div>
    ),
  }
)
const CeramicColourFilterMenu = dynamic(
  () => import('@/app/components/CeramicColourFilterMenu'),
  {
    ssr: false,
    loading: () => (
      <div className="mb-225rem">
        <TitleBar>Choose your colour</TitleBar>
        <FilterGridSkeleton />
      </div>
    ),
  }
)

const FilteredProducts = dynamic(
  () => import('@/app/components/FilteredProducts'),
  {
    ssr: false,
    loading: () => (
      <>
        <TitleBar>
          <span style={{ visibility: 'hidden' }}>Loading</span>
        </TitleBar>
        <ProductGridSkeleton />
      </>
    ),
  }
)

const ProductCategoryPage = ({ params: { slug } }: Props) => {
  const setFilterLayers = useStore((store) => store.setFilterLayers)
  const searchParams = useSearchParams()
  const filters = useFilterSearchParams(searchParams.toString())
  const [category, categoryData] = useCategory(slug)
  if (!category || !categoryData) {
    return notFound()
  }
  const { filterLayers } = stylesMap[category]

  setFilterLayers(filterLayers)

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
          {showSettingFilter && <SettingFilterMenu category={category} />}
          {showProfileFilter && <ProfileFilterMenu category={category} />}
          {showPatternFilter && <PatternFilterMenu category={category} />}
          {showCeramicColourFilter && (
            <CeramicColourFilterMenu category={category} />
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
