import { Mapping, Styles } from '../types'
import { useGetData } from './'
import { stylesMap } from '../maps'

export const useStyles = (): {
  styles: Mapping[]
  isLoading: boolean
  error: Error | null
} => {
  const { data: products, error, isLoading } = useGetData()
  let styles: Mapping[] = []
  if (!isLoading && !error && products) {
    const productStyles = Array.from(
      new Set(
        products
          .filter(
            (product) =>
              product?.attributes?.pa_style ||
              product?.attributes?.['pa_type-2']
          )
          .reduce((acc, product) => {
            return [
              ...acc,
              ...(product?.attributes?.pa_style || []),
              ...(product?.attributes?.['pa_type-2'] || []),
            ]
          }, [] as string[])
      )
    )
    styles = productStyles.map((style) => {
      const map = stylesMap?.[style as Styles]
      return {
        label: map?.label || '',
        slug: map?.slug || '',
        image: map?.image || '',
      }
    })

    styles = [
      ...styles,
      stylesMap.Shaped,
      stylesMap['HALF SET'],
      stylesMap['FULL SET'],
      stylesMap.Patterns,
      stylesMap.Diamond,
      stylesMap.CERAMIC,
      stylesMap.PLAIN,
      stylesMap['Two Colour'],
    ]
  }

  return { styles, isLoading, error }
}
