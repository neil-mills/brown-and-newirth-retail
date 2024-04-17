import { ProductFilterAttributeKeys, Map } from '@/app/types'
import {
  caratMap,
  ceramicColoursMap,
  coverageMap,
  diamondOriginsMap,
  patternMap,
  profilesMap,
  settingMap,
  shapedMap,
  shapesMap,
} from '@/app/maps'

type ProductFilterAttributesMap = { [K in ProductFilterAttributeKeys]: Map }

export const productFilterAttributesMap: ProductFilterAttributesMap = {
  pa_shape: shapesMap,
  pa_shaped: shapedMap,
  pa_profile: profilesMap,
  pa_diamond: diamondOriginsMap,
  pa_pattern: patternMap,
  pa_setting: settingMap,
  'pa_centre-carat': caratMap,
  'pa_total-carat': caratMap,
  'pa_ceramic-colour': ceramicColoursMap,
  pa_coverage: coverageMap,
}
