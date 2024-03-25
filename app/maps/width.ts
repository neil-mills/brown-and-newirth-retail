import { Widths, Mapping, Map } from '@/app/types'

export type WidthMapType = { [K in Widths]: Mapping }

export const widthMap: Map = {
  '1.5': {
    label: '1.5mm',
    slug: '1.5',
    image: '/img/svg/icon-gauge-15.svg',
    start: 1.5,
    end: 1.99,
  },
  '2': {
    label: '2mm',
    slug: '2',
    image: '/img/svg/icon-gauge-20.svg',
    start: 2,
    end: 2.49,
  },
  '2.5': {
    label: '2.5mm',
    slug: '2.5',
    image: '/img/svg/icon-gauge-25.svg',
    start: 2.5,
    end: 2.99,
  },
  '3': {
    label: '3mm',
    slug: '3',
    image: '/img/svg/icon-gauge-30.svg',
    start: 3,
    end: 3.49,
  },
  '3.5': {
    label: '3.5mm',
    slug: '3.5',
    image: '/img/svg/icon-gauge-35.svg',
    start: 3.5,
    end: 3.99,
  },
  '4': {
    label: '4mm',
    slug: '4',
    image: '/img/svg/icon-gauge-40.svg',
    start: 4,
    end: 4.99,
  },
  '5': {
    label: '5mm',
    slug: '5',
    image: '/img/svg/icon-gauge-50.svg',
    start: 5,
    end: 5.99,
  },
  '6': {
    label: '6mm',
    slug: '6',
    image: '/img/svg/icon-gauge-60.svg',
    start: 6,
    end: 6.99,
  },
  '7': {
    label: '7mm',
    slug: '7',
    image: '/img/svg/icon-gauge-70.svg',
    start: 7,
    end: 7.99,
  },
  '8': {
    label: '8mm',
    slug: '8',
    image: '/img/svg/icon-gauge-80.svg',
    start: 8,
  },
}
