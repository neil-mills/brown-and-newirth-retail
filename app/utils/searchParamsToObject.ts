export const searchParamsToObject = (
  searchParamsStr: string
): Record<string, string> => {
  const searchParams = new URLSearchParams(searchParamsStr)
  const searchParamsObj: Record<string, string> = {}
  for (const [key, value] of searchParams.entries()) {
    searchParamsObj[key] = value
  }
  return searchParamsObj
}
