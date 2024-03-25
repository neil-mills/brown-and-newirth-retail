import { Mapping, Map, Carats } from '@/app/types'

export type CaratMapType = { [K in Carats]: Mapping }

export const caratMap: Map = {
  '0.25': {
    label: '0.25',
    slug: '0.25',
    class: 'carat-025',
    start: 0.25,
    end: 0.29,
  },
  '0.30': {
    label: '0.30',
    slug: '0.30',
    class: 'carat-030',
    start: 0.3,
    end: 0.39,
  },
  '0.40': {
    label: '0.40',
    slug: '0.40',
    class: 'carat-040',
    start: 0.4,
    end: 0.49,
  },
  '0.50': {
    label: '0.50',
    slug: '0.50',
    class: 'carat-050',
    start: 0.5,
    end: 0.69,
  },
  '0.70': {
    label: '0.70',
    slug: '0.70',
    class: 'carat-070',
    start: 0.7,
    end: 0.99,
  },
  '1.00': {
    label: '1.00',
    slug: '1.00',
    class: 'carat-100',
    start: 1,
    end: 1.49,
  },
  '1.50': {
    label: '1.50',
    slug: '1.50',
    class: 'carat-150',
    start: 1.5,
    end: 1.99,
  },
  '2.00': {
    label: '2.00',
    slug: '2.00',
    class: 'carat-200',
    start: 2,
    end: 2.49,
  },
  '2.50': {
    label: '2.50',
    slug: '2.50',
    class: 'carat-250',
    start: 2.5,
  },
}
