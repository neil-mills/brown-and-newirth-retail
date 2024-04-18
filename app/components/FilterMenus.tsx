import FilterMenuServer from './FilterMenuServer'
import { Product } from '../types'

const FilterMenus = async ({ products }: { products: Product[] }) => {
  return (
    <>
      <FilterMenuServer
        childFilters={['pa_setting', 'pa_coverage']}
        filter={'pa_shape'}
        label="Choose your shape"
        products={products}
      />
      <FilterMenuServer
        filter={'pa_profile'}
        label="Choose your profile"
        products={products}
      />
      <FilterMenuServer
        filter={'pa_pattern'}
        label="Choose your style"
        products={products}
      />
      <FilterMenuServer
        filter={'pa_ceramic-colour'}
        label="Choose your colour"
        products={products}
      />
      <FilterMenuServer
        filter={'pa_coverage'}
        label="Choose your coverage"
        products={products}
      />
      <FilterMenuServer
        filter={'pa_setting'}
        label="Choose your setting"
        products={products}
      />
    </>
  )
}

export default FilterMenus
