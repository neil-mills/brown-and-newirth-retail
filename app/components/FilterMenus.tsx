import { getCategoryFilterLayers } from '../utils'
import { getCategory } from '../utils/getCategory'
import FilterMenuServer from './FilterMenuServer'
import { fetchCategoryProducts } from '@/data/fetchCategoryProducts'

interface Props {
  slug: string
}

const FilterMenus = async ({ slug }: Props) => {
  //fetch initial filter options from server
  const [category] = getCategory(slug)
  const filterLayers = getCategoryFilterLayers(category)
  const categoryProducts = await fetchCategoryProducts(category)

  return (
    <>
      <FilterMenuServer
        category={category}
        childFilters={['pa_setting', 'pa_coverage']}
        filter={category === 'Shaped' ? 'pa_shaped' : 'pa_shape'}
        label="Choose your shape"
        filterLayers={filterLayers}
        categoryProducts={categoryProducts}
      />
      <FilterMenuServer
        category={category}
        filter={'pa_profile'}
        label="Choose your profile"
        filterLayers={filterLayers}
        categoryProducts={categoryProducts}
      />

      <FilterMenuServer
        category={category}
        filter={'pa_pattern'}
        label="Choose your style"
        filterLayers={filterLayers}
        categoryProducts={categoryProducts}
      />

      <FilterMenuServer
        category={category}
        filter={'pa_ceramic-colour'}
        label="Choose your colour"
        filterLayers={filterLayers}
        categoryProducts={categoryProducts}
      />

      <FilterMenuServer
        category={category}
        filter={'pa_coverage'}
        label="Choose your coverage"
        filterLayers={filterLayers}
        categoryProducts={categoryProducts}
      />
      <FilterMenuServer
        category={category}
        filter={'pa_setting'}
        label="Choose your setting"
        filterLayers={filterLayers}
        categoryProducts={categoryProducts}
      />
    </>
  )
}

export default FilterMenus
