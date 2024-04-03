import { Product, Styles } from '@/app/types'

export const getCategoryProducts = (
  data: Product[] | undefined,
  category: Styles
): Product[] => {
  let products: Product[] = []
  if (data) {
    if (['Solitaire', 'Halo', 'Cluster', 'Three Stone'].includes(category)) {
      products = data.filter(
        (product) =>
          product?.attributes?.pa_style?.includes(category) &&
          product.category === 'ENGAGEMENT'
      )
    } else if (['EARRING', 'PENDANT', 'BRACELET'].includes(category)) {
      products = data.filter(
        (product) =>
          product?.attributes?.['pa_type-2']?.includes(category) &&
          product.category === 'JEWELLERY'
      )
    } else if (category === 'DRESS RING') {
      products = data.filter((product) =>
        product?.attributes?.['pa_type-2']?.includes(category)
      )
    } else if (category === 'Diamond') {
      products = data.filter(
        (product) =>
          product.attributes.pa_shoulders?.includes('Diamond') &&
          product.category === 'WEDDING'
      )
    } else if (category === 'Shaped') {
      products = data.filter(
        (product) =>
          product.attributes.pa_shaped?.length &&
          ['WEDDING', 'ETERNITY'].includes(product.category)
      )
    } else if (category === 'HALF SET') {
      products = data.filter(
        (product) =>
          product?.attributes?.pa_coverage &&
          product.attributes.pa_coverage.includes('Half') &&
          product.category === 'ETERNITY'
      )
    } else if (category === 'FULL SET') {
      products = data.filter(
        (product) =>
          product?.attributes?.pa_coverage &&
          product.attributes.pa_coverage.includes('Full') &&
          product.category === 'ETERNITY'
      )
    } else if (category === 'Patterns') {
      products = data.filter(
        (product) =>
          product?.attributes?.pa_pattern &&
          product.attributes.pa_pattern.every(
            (filter) => !['PLAIN', 'CERAMIC', 'MIXED METAL'].includes(filter)
          ) &&
          product.category === 'WEDDING'
      )
    } else if (category === 'Two Colour') {
      products = data.filter(
        (product) =>
          product?.attributes?.pa_pattern &&
          product.attributes.pa_pattern.includes('MIXED METAL') &&
          product.category === 'WEDDING'
      )
    } else if (category === 'PLAIN') {
      products = data.filter(
        (product) =>
          product?.attributes?.pa_pattern &&
          product.attributes.pa_pattern.includes('PLAIN') &&
          product.category === 'WEDDING'
      )
    } else if (category === 'CERAMIC') {
      products = data.filter(
        (product) =>
          product?.attributes?.pa_pattern &&
          product.attributes.pa_pattern.includes('CERAMIC') &&
          product.category === 'WEDDING'
      )
    } else {
      products = data.filter(
        (product) =>
          product?.attributes?.pa_style?.includes(category) ||
          product?.attributes?.['pa_type-2']?.includes(category)
      )
    }
  }
  return products
}
