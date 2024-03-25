import {
  Product,
  Variation,
  VariationStatus,
  VariationStockStatus,
  VariationAttributes,
} from '@/app/types'

export const productToVariation = (product: Product): Variation => {
  const {
    productId,
    name,
    sku,
    price,
    'sale-price': salePrice,
    'product-images': productImages,
    attributes: productAttributes,
  } = product

  const attributes: VariationAttributes = Object.entries(
    productAttributes
  ).reduce((acc, [key, valueArr]) => {
    return { ...acc, [key]: valueArr[0].toLowerCase().replace('.', '-') }
  }, {} as VariationAttributes)

  const variation = {
    'variation-id': productId,
    name,
    sku,
    slug: name.toLowerCase().replace(' ', '-'),
    price,
    'sale-price': salePrice,
    'variation-images': productImages,
    status: 'publish' as VariationStatus,
    'stock-status': 'instock' as VariationStockStatus,
    attributes,
  }
  return variation
}
