import { Styles } from '@/app/types'

type MetalCode =
  | '9W'
  | '18W'
  | '9Y'
  | '18Y'
  | '9R'
  | '18R'
  | '9K'
  | '18K'
  | '9PL'
  | '18PL'
  | 'PL18'
  | 'PLT'

type ProductSize = 'A-Q' | 'R-Z' | 'Z+'

export interface VariationAttributes {
  'pa_metal-code'?: string
  'pa_total-carat'?: string
  'pa_centre-carat'?: string
  'pa_diamond-quality'?: VariationDiamondQuality
  pa_diamond?: string
  pa_gauge?: VariationGauge
  pa_width?: string
  pa_size?: VariationSize
  'pa_ceramic-colour'?: VariationCeramicColours
}
export type VariationStatus = 'publish'
export type VariationStockStatus = 'instock'
export type VariationSize = 'a-q' | 'r-z' | 'z'
export type VariationGauge =
  | 'ultralight'
  | 'light'
  | 'medium'
  | 'heavy'
  | 'super-heavy'
export type ProductDiamondQuality = 'GSI' | 'HSI' | 'D-FVS' | 'GVS'
export type VariationDiamondQuality = 'gsi' | 'hsi' | 'd-fvs' | 'gvs'
export type VariationCeramicColours = 'Black' | 'Grey' | 'Blue' | 'Red'
export type ProductCeramicColours = 'BLACK' | 'GREY' | 'BLUE' | 'RED'

export interface Images<T> {
  thumbnail: T
  medium: T
  large: T
}
export type DiamondOrigin = 'NATURAL' | 'LAB GROWN'
export type ProductType = 'DRESS RING' | 'PENDANT' | 'EARRING' | 'BRACELET'
export type ProductShoulders = 'Plain' | 'Diamond'
export type ProductPatterns =
  | 'CELTIC'
  | 'CERAMIC'
  | 'CONTEMPORARY'
  | 'SPARKLE'
  | 'TRINITY'
  | 'MIXED METAL'
export type ProductProfiles =
  | 'Flat'
  | 'CLASSIC COURT'
  | 'MODERN COURT'
  | 'BARREL'
  | 'D SHAPED'
  | 'OTHER'
export type ProductSettings =
  | 'PAVE'
  | 'RUB OVER'
  | 'CLAW'
  | 'FOUR CLAW'
  | 'BAR'
  | 'CHANNEL'
  | 'MIXED'

export interface Product {
  productId: number
  name: string
  sku: string
  permalink: string
  category: string
  attributes: {
    'pa_metal-code': MetalCode[]
    pa_gauge?: ('Light' | 'Medium' | 'Heavy' | 'Super Heavy')[]
    'pa_total-carat'?: ('0.410' | string)[]
    'pa_centre-carat'?: ('0.330' | string)[]
    'pa_diamond-quality'?: ProductDiamondQuality[]
    pa_width: string[]
    pa_size: ProductSize[]
    pa_style?: Styles[]
    'pa_type-2'?: Styles[]
    pa_profile?: ProductProfiles[]
    pa_shape?: (
      | 'Marquise'
      | 'Brilliant'
      | 'Mixed'
      | 'Baguette'
      | 'Princess Cut'
      | 'Oval'
      | 'Emerald'
      | 'Cushion'
      | 'Pear'
      | string
    )[]
    pa_shoulders?: ProductShoulders[]
    pa_finish?: ('Matte' | 'Polished' | 'Matte &amp; Polished')[]
    pa_pattern?: Styles[]
    pa_coverage?: ('Third' | 'Half' | 'Three Quarter' | 'Full')[]
    pa_setting?: ProductSettings[]
    pa_shaped?: ('Pinch' | 'Twist' | 'Curved' | 'Cutaway')[]
    'pa_diamond-set'?: 'Yes' | 'No'
    pa_diamond?: DiamondOrigin[]
    'pa_ceramic-colour'?: ProductCeramicColours[]
  }
  collection: string | null
  'product-images': Images<string>
  images?: Images<string[]>
  price: number
  'sale-price': number
  'related-upsell': number[]
  'related-cross-sell': number[]
  variations: Variation[]
}

export interface Variation {
  'variation-id': number
  name: string
  slug: string
  status: VariationStatus
  sku: string
  price: number
  'sale-price': number
  'stock-status': VariationStockStatus
  'variation-images': Images<string>
  images?: Images<string[]>
  attributes: VariationAttributes
  productId?: number
}
