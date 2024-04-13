import { Product, Styles } from '@/app/types'

export const getProductCategory = (product: Product): Styles[] | null => {
  let category: Styles[] | null = []
  if (product?.attributes?.pa_shaped && product.attributes.pa_shaped.length) {
    category.push('Shaped')
  }
  if (
    product?.attributes?.pa_coverage &&
    product.attributes.pa_coverage.includes('Half')
  ) {
    category.push('HALF SET')
  }
  if (
    product?.attributes?.pa_coverage &&
    product.attributes.pa_coverage.includes('Full')
  ) {
    category.push('FULL SET')
  }
  if (
    product?.attributes?.pa_pattern &&
    product.attributes.pa_pattern.includes('MIXED METAL')
  ) {
    category.push('Two Colour')
  }
  if (
    product?.attributes?.pa_pattern &&
    product.attributes.pa_pattern.every(
      (filter) => !['PLAIN', 'CERAMIC', 'MIXED METAL'].includes(filter)
    )
  ) {
    category.push('Patterns')
  }
  if (product.attributes['pa_diamond-set']?.includes('Yes')) {
    category.push('Diamond')
  }
  if (
    product?.attributes?.pa_pattern &&
    product.attributes.pa_pattern.includes('PLAIN')
  ) {
    category.push('PLAIN')
  }
  if (
    product?.attributes?.pa_pattern &&
    product.attributes.pa_pattern.includes('CERAMIC')
  ) {
    category.push('CERAMIC')
  }
  if (product?.attributes?.pa_style) {
    if (product?.attributes?.pa_style?.includes('Trilogy')) {
      category.push('Three Stone')
    } else {
      category = [...category, ...product.attributes.pa_style]
    }
  }
  if (product?.attributes?.['pa_type-2']) {
    category = [...category, ...product.attributes['pa_type-2']]
  }
  if (!category.length) return null
  return category
}
