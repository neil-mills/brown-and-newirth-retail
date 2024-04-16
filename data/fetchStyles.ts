import fetchDataServer from '@/data/fetchDataServer'
import { Mapping, Styles, Product } from '@/app/types'
import { stylesMap } from '@/app/maps'
export const revalidate = 10

export const fetchStyles = async (): Promise<Mapping[]> => {
  let products: Product[] = []
  let styles: Mapping[] = []
  try {
    products = await fetchDataServer()
  } catch (err) {
    const error = err as Error
    throw new Error(error.message)
  }
  if (products.length) {
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
  return styles
}
