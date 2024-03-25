export const upperCaseFirst = (str: string | undefined): string => {
  if (!str) return ''
  return `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`
}
