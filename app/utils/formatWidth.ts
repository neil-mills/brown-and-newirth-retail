export const formatWidth = (width: string | undefined): string => {
  if (!width) return ''
  return `${parseFloat(width.split('-').join('.'))}mm`
}
