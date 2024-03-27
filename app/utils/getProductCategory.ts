import { Product, Styles } from '@/app/types'

export const getProductCategory = (product: Product): Styles[] | null => {
  let category: Styles[] | null = null
  if (
    !category &&
    product?.attributes?.pa_shaped &&
    product.attributes.pa_shaped.length
  ) {
    category = ['Shaped']
  }
  if (
    !category &&
    product?.attributes?.pa_coverage &&
    product.attributes.pa_coverage.includes('Half')
  ) {
    category = ['HALF SET']
  }
  if (
    !category &&
    product?.attributes?.pa_coverage &&
    product.attributes.pa_coverage.includes('Full')
  ) {
    category = ['FULL SET']
  }
  if (
    !category &&
    product?.attributes?.pa_pattern &&
    product.attributes.pa_pattern.includes('MIXED METAL')
  ) {
    category = ['Two Colour']
  }
  if (
    !category &&
    product?.attributes?.pa_pattern &&
    product.attributes.pa_pattern.every(
      (filter) => !['PLAIN', 'CERAMIC', 'MIXED METAL'].includes(filter)
    )
  ) {
    category = ['Patterns']
  }
  if (!category && product.attributes.pa_shoulders?.includes('Diamond')) {
    category = ['Diamond']
  }
  if (
    !category &&
    product?.attributes?.pa_pattern &&
    product.attributes.pa_pattern.includes('PLAIN')
  ) {
    category = ['PLAIN']
  }
  if (
    !category &&
    product?.attributes?.pa_pattern &&
    product.attributes.pa_pattern.includes('CERAMIC')
  ) {
    category = ['CERAMIC']
  }
  if (!category && product?.attributes?.pa_style) {
    category = product.attributes.pa_style
  }
  if (!category && product?.attributes?.['pa_type-2']) {
    category = product.attributes['pa_type-2']
  }
  return category
}
