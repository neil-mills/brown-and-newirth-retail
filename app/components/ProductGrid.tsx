import { ProductCard, CategoryCard } from '@/app/components'
import {
  Product,
  Variation,
  Mapping,
  isProduct,
  isVariation,
} from '@/app/types'
import { Fragment } from 'react'

interface Props {
  style?: 'product' | 'variation'
  label?: 'code'
  items: Product[] | Variation[] | Mapping[]
}

const ProductGrid = ({ items, label, style }: Props) => {
  return (
    <div className="row row-product-grid text-uppercase text-xs text-center">
      {items.map((item, i) => (
        <Fragment key={i}>
          {isProduct(item) || isVariation(item) ? (
            <ProductCard
              key={i}
              item={item}
              style={style || 'product'}
              label={label}
            />
          ) : (
            <CategoryCard key={i} item={item} />
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default ProductGrid
