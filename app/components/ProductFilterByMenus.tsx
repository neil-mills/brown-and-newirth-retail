import { useStore } from '@/app/hooks'
import {
  DiamondCaratFilter,
  DiamondQualityFilter,
  WidthFilter,
  GaugeFilter,
  ProductFilterByMenusSkeleton,
} from '@/app/components'

const ProductFilterByMenus = ({ isLoading }: { isLoading: boolean }) => {
  const { filterLayers } = useStore((store) => store.selectedSku)
  console.log({ filterLayers })
  const showCentreCaratFilter = filterLayers.includes('pa_centre-carat')
  const showTotalCaratFilter = filterLayers.includes('pa_total-carat')
  return (
    <>
      {isLoading ? (
        <>
          <p className="fw-300">Filter By:</p>
          <ProductFilterByMenusSkeleton />
          <hr />
          <ProductFilterByMenusSkeleton />
        </>
      ) : (
        <>
          <p className="fw-300">Filter By:</p>
          {filterLayers.some((filterLayer) =>
            ['pa_gauge', 'pa_diamond-quality'].includes(filterLayer)
          ) && (
            <>
              {filterLayers.includes('pa_gauge') && <GaugeFilter />}
              {filterLayers.includes('pa_diamond-quality') && (
                <>
                  <DiamondQualityFilter
                    childType={
                      showCentreCaratFilter
                        ? ['pa_centre-carat']
                        : ['pa_total-carat']
                    }
                  />
                </>
              )}
              <hr />
            </>
          )}
          {filterLayers.includes('pa_width') && <WidthFilter />}
          {showCentreCaratFilter && (
            <DiamondCaratFilter attribute="pa_centre-carat" />
          )}
          {showTotalCaratFilter && (
            <DiamondCaratFilter attribute="pa_total-carat" />
          )}
        </>
      )}
    </>
  )
}

export default ProductFilterByMenus
