import { Mapping, Styles } from '../types'
import { useGetData } from './'
import { stylesMap } from '../maps'
import { isAxiosError } from 'axios'

export const useStyles = (): {
  styles: Mapping[]
  isLoading: boolean
  isError: boolean
  error: Error | null
} => {
  const { data: products, error, isError, isLoading } = useGetData()

  let styles: Mapping[] = []
  if (!isLoading && !error && products && !isAxiosError(products)) {
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
        index: map?.index,
        display: map?.display,
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
      .filter((style) => style?.display === true)
      .sort((a, b) => a.index! - b.index!)
  }

  return { styles, isLoading, isError, error }
}
