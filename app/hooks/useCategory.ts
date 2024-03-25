import { Mapping, Styles } from '@/app/types'
import { stylesMap } from '@/app/maps'

export const useCategory = (
  slug: string
): [Styles | undefined, Mapping | undefined] => {
  const category = Object.entries(stylesMap).find(
    ([_key, map]) => map.slug === slug
  )
  return [category?.[0] as Styles, category?.[1]]
}
