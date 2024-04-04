export type VariationAttributeKeys =
  | 'pa_metal-code'
  | 'pa_total-carat'
  | 'pa_centre-carat'
  | 'pa_diamond-quality'
  | 'pa_diamond'
  | 'pa_gauge'
  | 'pa_width'
  | 'pa_size'
  | 'pa_ceramic-colour'

export type FilterLayerKeys =
  | VariationAttributeKeys
  | 'pa_pattern'
  | 'pa_shape'
  | 'pa_shaped'
  | 'pa_setting'
  | 'pa_diamond-set'
  | 'pa_profile'
  | 'pa_style'
  | 'pa_coverage'

export type ProductAttributeKeys =
  | VariationAttributeKeys
  | 'pa_style'
  | 'pa_type-2'
  | 'pa_profile'
  | 'pa_shape'
  | 'pa_shoulders'
  | 'pa_finish'
  | 'pa_pattern'
  | 'pa_coverage'
  | 'pa_setting'
  | 'pa_shaped'
  | 'pa_ceramic-colour'

export type ProductFilterAttributeKeys =
  | 'pa_shape'
  | 'pa_shaped'
  | 'pa_profile'
  | 'pa_diamond'
  | 'pa_centre-carat'
  | 'pa_total-carat'
  | 'pa_pattern'
  | 'pa_setting'
  | 'pa_ceramic-colour'

export type SearchParamKeys =
  | 'pa_diamond'
  | 'pa_centre-carat'
  | 'pa_total-carat'
  | 'pa_shape'
  | 'pa_shaped'
  | 'pa_diamond-set'
  | 'pa_profile'
  | 'pa_gauge'
  | 'pa_width'
  | 'pa_pattern'
  | 'pa_setting'
  | 'pa_ceramic-colour'

export type Filters = {
  [TKey in FilterLayerKeys]?: string[]
}

export type ProductFilters = {
  [TKey in ProductAttributeKeys]?: string[]
}

export type VariationFilters = {
  [TKey in VariationAttributeKeys]?: string
}
