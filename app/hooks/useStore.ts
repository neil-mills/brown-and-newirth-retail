import { create } from 'zustand'
import {
  BasketItem,
  FilterLayerKeys,
  Images,
  Product,
  Variation,
  SearchParamKeys,
} from '@/app/types'
import { mountStoreDevtool } from 'simple-zustand-devtools'

interface SelectedSku {
  sku: string | null
  product: Product | null
  variations: Variation[]
  variation?: Variation | null
  images: Images<string[]>
  otherOptions: Variation[]
  diamondOrigin?: string
  centreCarat?: string
  filterLayers: FilterLayerKeys[]
  size?: string
  metal?: string
}
interface Store {
  productsQuery: ProductsQuery
  selectedSku: SelectedSku
  basket: BasketItem[]
  searchParams: string
  filters: Filters
  setFilters: (filters: Filters) => void
  setSearchParams: (searchParams: string) => void
  setSelectedSku: (selectedSku: SelectedSku) => void
  resetSelectedSku: () => void
  setBasket: (basket: BasketItem[]) => void
  setFilterLayers: (filterLayers: FilterLayerKeys[]) => void
  setSize: (size: string) => void
  setMetal: (metal: string) => void
  setVariation: (variation: Variation) => void
  setCarat: (carat: string) => void
}

interface ProductsQuery {
  search?: string
  sku?: string
  category?: string
}

type Filters = {
  [TKey in SearchParamKeys]: string[]
}

const selectedSku = {
  sku: null,
  product: null,
  variations: [],
  variationId: null,
  images: { thumbnail: [], medium: [], large: [] },
  otherOptions: [],
  diamondOrigin: '',
  centreCarat: '',
  filterLayers: [],
  size: '',
  metal: '',
}

export const useStore = create<Store>((set) => ({
  selectedSku,
  basket: [],
  searchParams: '',
  filters: {
    pa_diamond: [],
    'pa_centre-carat': [],
    'pa_total-carat': [],
    pa_shape: [],
    pa_shaped: [],
    'pa_diamond-set': [],
    pa_gauge: [],
    pa_width: [],
    pa_pattern: [],
    pa_setting: [],
    pa_profile: [],
    'pa_ceramic-colour': [],
  },
  productsQuery: {} as ProductsQuery,
  setSelectedSku: (selectedSku: SelectedSku) =>
    set((store) => ({ ...store, selectedSku })),
  setBasket: (basket: BasketItem[]) => set((store) => ({ ...store, basket })),
  setSearchParams: (searchParams: string) =>
    set((store) => ({ ...store, searchParams })),
  setFilterLayers: (filterLayers: FilterLayerKeys[]) =>
    set((store) => ({
      ...store,
      selectedSku: { ...store.selectedSku, filterLayers },
    })),
  setFilters: (filters: Filters) => set((store) => ({ ...store, filters })),
  setSize: (size: string) =>
    set((store) => ({
      ...store,
      selectedSku: { ...store.selectedSku, size },
    })),
  setMetal: (metal: string) =>
    set((store) => ({
      ...store,
      selectedSku: { ...store.selectedSku, metal },
    })),
  setVariation: (variation: Variation) =>
    set((store) => ({
      ...store,
      selectedSku: { ...store.selectedSku, variation },
    })),
  resetSelectedSku: () => set((store) => ({ ...store, selectedSku })),
  setCarat: (carat: string) =>
    set((store) => ({
      ...store,
      selectedSku: { ...store.selectedSku, carat },
    })),
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore)
}
