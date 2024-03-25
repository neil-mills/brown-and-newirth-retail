import { Mapping, ProductSettings } from '@/app/types'

type SettingMap = { [K in ProductSettings]: Mapping }

export const settingMap: SettingMap = {
  PAVE: {
    label: 'Pave',
    slug: 'pave',
    image: '/img/svg/icon-setting-pave.svg',
  },
  'RUB OVER': {
    label: 'Rub Over',
    slug: 'rub-over',
    image: '/img/svg/icon-setting-rub-over.svg',
  },
  CLAW: {
    label: 'Claw',
    slug: 'claw',
    image: '/img/svg/icon-setting-claw.svg',
  },
  'FOUR CLAW': {
    label: 'Four Claw',
    slug: 'four-claw',
    image: '/img/svg/icon-setting-four-claw.svg',
  },
  BAR: {
    label: 'Bar',
    slug: 'bar',
    image: '/img/svg/icon-setting-bar.svg',
  },
  CHANNEL: {
    label: 'Channel',
    slug: 'channel',
    image: '/img/svg/icon-setting-channel.svg',
  },
  MIXED: {
    label: 'Mixed',
    slug: 'mixed',
    image: '/img/svg/icon-setting-mixed.svg',
  },
}
