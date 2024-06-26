import { create } from 'zustand'
import {
  BasketItem,
  FilterLayerKeys,
  Product,
  Variation,
  VariationMetal,
  StoreFilters,
} from '@/app/types'
import { mountStoreDevtool } from 'simple-zustand-devtools'

interface SelectedSku {
  sku: string | null
  product: Product | null
  variations: Variation[]
  variation?: Variation | null
  images: string[]
  otherOptions: Variation[]
  similarProducts: Product[]
  diamondOrigin?: string
  centreCarat?: string
  filterLayers: FilterLayerKeys[]
  size?: string
  metal?: VariationMetal | string
  width?: string
}

interface Store {
  productsQuery: ProductsQuery
  selectedSku: SelectedSku
  basket: BasketItem[]
  searchParams: string
  filters: StoreFilters
  toastMessage: string
  showModal: boolean
  isLoading: boolean
  isError: boolean
  error: string
  userId: string
  setToastMessage: (toastMessage: string) => void
  setShowModal: (showModal: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  setError: (isError: boolean, error: string) => void
  setUserId: (userId: string) => void
  setFilters: (filters: StoreFilters) => void
  setSearchParams: (searchParams: string) => void
  setSelectedSku: (selectedSku: SelectedSku) => void
  resetSelectedSku: () => void
  setBasket: (basket: BasketItem[]) => void
  setFilterLayers: (filterLayers: FilterLayerKeys[]) => void
  setSize: (size: string) => void
  setMetal: (metal: string) => void
  setWidth: (width: string) => void
  setVariation: (variation: Variation) => void
  setCarat: (carat: string) => void
}

interface ProductsQuery {
  search?: string
  sku?: string
  category?: string
}
export const filters = {
  pa_diamond: [],
  'pa_diamond-quality': [],
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
  pa_coverage: [],
  'pa_ceramic-colour': [],
}
const selectedSku = {
  sku: null,
  product: null,
  variations: [],
  variation: null,
  images: [],
  otherOptions: [],
  similarProducts: [],
  diamondOrigin: '',
  centreCarat: '',
  filterLayers: [],
  size: '',
  metal: '',
  width: '',
}

export const useStore = create<Store>((set) => ({
  selectedSku,
  basket: [],
  searchParams: '',
  toastMessage: '',
  showModal: false,
  isLoading: true,
  isError: false,
  error: '',
  userId: '',
  filters,
  setToastMessage: (toastMessage: string) =>
    set((store) => ({ ...store, toastMessage })),
  setShowModal: (showModal: boolean) =>
    set((store) => ({ ...store, showModal })),
  setIsLoading: (isLoading: boolean) =>
    set((store) => ({ ...store, isLoading })),
  setError: (isError, error) => set((store) => ({ ...store, isError, error })),
  setUserId: (userId: string) => set((store) => ({ ...store, userId })),
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
  setFilters: (filters: StoreFilters) =>
    set((store) => ({ ...store, filters: { ...store.filters, ...filters } })),
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
  setWidth: (width: string) =>
    set((store) => ({
      ...store,
      selectedSku: { ...store.selectedSku, width },
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
