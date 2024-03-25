export const formatSearchParams = (
  searchParams: string,
  query: Record<string, string>
): string => {
  const params = new URLSearchParams(searchParams)
  Object.entries(query).forEach(([key, value]) => {
    params.set(key, value)
  })
  return params.toString()
}
