import { VariationMetal, Mapping } from '@/app/types'

type MetalsMap = { [K in VariationMetal]: Mapping }

export const metalsMap: MetalsMap = {
  '9k': { label: '9ct Gold', slug: '9k', index: 0 },
  '14k': { label: '14ct Gold', slug: '14k', index: 1 },
  '18k': { label: '18ct Gold', slug: '18k', index: 2 },
  '22k': { label: '22ct Gold', slug: '22k', index: 3 },
  '9w': { label: '9ct White Gold', slug: '9w', index: 4 },
  '18w': { label: '18ct White Gold', slug: '18w', index: 5 },
  '18wf': { label: 'F 18ct White Gold', slug: '18wf', index: 6 },
  '9y': { label: '9ct Yellow Gold', slug: '9y', index: 7 },
  '14y': { label: '14ct Yellow Gold', slug: '18y', index: 8 },
  '18y': { label: '18ct Yellow Gold', slug: '18y', index: 9 },
  '18yf': { label: 'F 18ct Yellow Gold', slug: '18yf', index: 10 },
  '9r': { label: '9ct Rose Gold', slug: '9r', index: 11 },
  '18r': { label: '18ct Rose Gold', slug: '18r', index: 12 },
  plt: { label: 'Platinum', slug: 'plt', index: 13 },
  pl9: { label: 'pl9 Platinum', slug: 'pl9', index: 14 },
  '9pl': { label: '9pl Platinum ', slug: '9pl', index: 15 },
  '18pl': { label: '18pl Platinum', slug: '18pl', index: 16 },
  pl18: { label: 'pl18 Platinum', slug: 'pl18', index: 17 },
  pd: { label: 'Palladium', slug: '18wf', index: 18 },
  '9pd': { label: '9pd Palladium', slug: '9pd', index: 19 },
  '18pd': { label: '18pd Palladium', slug: '18pd', index: 20 },
  pd9: { label: 'pd9 Palladium', slug: 'pd9', index: 21 },
  pd18: { label: 'pd18 Palladium', slug: 'pd18', index: 22 },
  pd500: { label: 'pd500 Palladium', slug: 'pd500', index: 23 },
}
