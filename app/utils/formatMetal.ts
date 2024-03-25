import { metalsMap } from '@/app/maps'

type MetalCode = 'plt' | '18y' | '18w' | '18r'
const keys = ['y', 'w', 'r'] as const

type Key = typeof keys[number]

const isMetalCode = (str: string | MetalCode): str is MetalCode => {
  return ['plt', '18w', '18y', '18r'].includes(str)
}
// const keys = Object.keys(metals)

export const formatMetal = (metalCode: string): string => {
  if (Object.keys(metalsMap).some((key) => metalCode.includes(key))) {
    const key = metalCode === 'plt' ? metalCode : (metalCode.slice(-1) as Key)
    return metalsMap?.[key] || ''
  }
  return ''
}
