import { defineStore } from 'pinia'
import type {
    Product,
    ProductCategory,
    SortKey,
    Size,
} from '~/types/product'
import { SIZES } from '~/types/product'

interface State {
    items: Product[]
    loading: boolean
    error: string | null
    category: ProductCategory | 'all'
    sort: SortKey
    search: string
}

const sizeRank = (s: Size) => SIZES.indexOf(s)
const smallestSizeRank = (p: Product) =>
    Math.min(...p.sizes.map((s) => sizeRank(s)))

export const useProductsStore = defineStore('products', {
    state: (): State => ({
        items: [],
        loading: false,
        error: null,
        category: 'all',
        sort: 'az',
        search: '',
    }),
    getters: {
        filtered(state): Product[] {
            let list = [...state.items]
            if (state.category !== 'all') {
                list = list.filter((p) => p.category === state.category)
            }
            if (state.search.trim()) {
                const q = state.search.toLowerCase()
                list = list.filter(
                    (p) =>
                        p.name.toLowerCase().includes(q) ||
                        p.description.toLowerCase().includes(q),
                )
            }
            switch (state.sort) {
                case 'az':
                    list.sort((a, b) => a.name.localeCompare(b.name))
                    break
                case 'price-asc':
                    list.sort((a, b) => a.price - b.price)
                    break
                case 'price-desc':
                    list.sort((a, b) => b.price - a.price)
                    break
                case 'size-asc':
                    list.sort((a, b) => smallestSizeRank(a) - smallestSizeRank(b))
                    break
            }
            return list
        },
        featured(state): Product[] {
            return state.items.filter((p) => p.featured)
        },
        byId: (state) => (id: string) => state.items.find((p) => p.id === id),
    },
    actions: {
        async fetchAll() {
            if (this.items.length) return
            this.loading = true
            this.error = null
            try {
                const { list } = useProductService()
                const res = await list()
                this.items = res.data
            } catch (e: any) {
                this.error = e?.message ?? 'Failed to load products'
            } finally {
                this.loading = false
            }
        },
        async fetchOne(id: string) {
            const cached = this.byId(id)
            if (cached) {
                return cached
            }
            const { get } = useProductService()
            const res = await get(id)
            const idx = this.items.findIndex((p) => p.id === id)
            if (idx >= 0) {
                this.items[idx] = res.data
            } else {
                this.items.push(res.data)
            }
            return res.data
        },
        setCategory(c: ProductCategory | 'all') {
            this.category = c
        },
        setSort(s: SortKey) {
            this.sort = s
        },
        setSearch(q: string) {
            this.search = q
        },
    },
})
