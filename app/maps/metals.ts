import { VariationMetal, Mapping } from '@/app/types'

type MetalsMap = { [K in VariationMetal]: Mapping }

export const metalsMap: MetalsMap = {
  '9k': { label: 'Gold 9ct', slug: '9k', index: 0 },
  '14k': { label: 'Gold 14ct', slug: '14k', index: 1 },
  '18k': { label: 'Gold 18ct', slug: '18k', index: 2 },
  '22k': { label: 'Gold 22ct', slug: '22k', index: 3 },
  '9w': { label: 'White Gold 9ct', slug: '9w', index: 4 },
  '18w': { label: 'White Gold 18ct', slug: '18w', index: 5 },
  '18wf': { label: 'White Gold F 18ct', slug: '18wf', index: 6 },
  '9y': { label: 'Yellow Gold 9ct', slug: '9y', index: 7 },
  '14y': { label: 'Yellow Gold 14ct', slug: '18y', index: 8 },
  '18y': { label: 'Yellow Gold 18ct', slug: '18y', index: 9 },
  '18yf': { label: 'Yellow Gold F 18ct', slug: '18yf', index: 10 },
  '9r': { label: 'Rose Gold 9ct', slug: '9r', index: 11 },
  '18r': { label: 'Rose Gold 18ct', slug: '18r', index: 12 },
  plt: { label: 'Platinum', slug: 'plt', index: 13 },
  pl9: { label: 'Platinum pl9', slug: 'pl9', index: 14 },
  '9pl': { label: 'Platinum 9pl', slug: '9pl', index: 15 },
  '18pl': { label: 'Platinum 18pl', slug: '18pl', index: 16 },
  pl18: { label: 'Platinum pl18', slug: 'pl18', index: 17 },
  pd: { label: 'Palladium', slug: '18wf', index: 18 },
  '9pd': { label: 'Palladium 9pd', slug: '9pd', index: 19 },
  '18pd': { label: 'Palladium 18pd', slug: '18pd', index: 20 },
  pd9: { label: 'Palladium pd9', slug: 'pd9', index: 21 },
  pd18: { label: 'Palladium pd18', slug: 'pd18', index: 22 },
  pd500: { label: 'Palladium pd500', slug: 'pd500', index: 23 },
}
