export const getUniqueArrayValues = <T>(values: string[] | undefined): T => {
  if (!values || typeof values !== 'object') return [] as T
  return Array.from(new Set(values)) as T
}
