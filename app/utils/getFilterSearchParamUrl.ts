interface Props {
  type: string
  childType?: string | null
  selectedOptions: string[]
}

export const getFilterSearchParamUrl = ({
  type,
  childType,
  selectedOptions,
}: Props) => {
  const searchParams = window.location.search.replace('?', '')
  const allSearchParams = searchParams.toString()
    ? searchParams.toString().split('&')
    : []
  let newParams: Record<string, string> = {}
  let query = ''
  if (allSearchParams.length) {
    newParams = allSearchParams.reduce((acc, searchParam) => {
      const [key, values] = searchParam.split('=')
      return { ...acc, [key]: values }
    }, {})
    if (newParams[type] && selectedOptions.length === 0) {
      delete newParams[type]
    }
    if (childType) {
      delete newParams[childType]
    }
    if (selectedOptions.length) {
      newParams[type] = selectedOptions.join(',')
    }
    query = Object.entries(newParams)
      .reduce(
        (acc, [key, value]) => [...acc, `${key}=${value}`],
        [] as string[]
      )
      .join('&')
  }
  if (!allSearchParams.length && selectedOptions.length) {
    query = `${type}=${selectedOptions.join(',')}`
  }
  const { protocol, host, pathname } = window.location
  const newUrl = `${protocol}//${host}${pathname}${query ? `?${query}` : ''}`
  return newUrl
}
