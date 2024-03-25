export const formatCarat = (carat: string | undefined) => {
  if (!carat) return ''
  return carat.replace('-', '.').substring(0, 4)
}
