import { defineStore } from 'pinia'
import type { CartItem, Product, Size, ColorOption } from '~/types/product'
import { isPurchasable } from '~/types/product'

interface State {
    items: CartItem[]
    isOpen: boolean
}

const STORAGE_KEY = 'press-ph:cart'

const keyOf = (i: Pick<CartItem, 'productId' | 'size' | 'color'>) => `${i.productId}::${i.size}::${i.color?.name ?? 'default'}`

export const useCartStore = defineStore('cart', {
    state: (): State => ({ items: [], isOpen: false }),
    getters: {
        count: (s) => s.items.reduce((n, i) => n + i.quantity, 0),
        subtotal: (s) =>
            s.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        itemTotal: () => (i: CartItem) => i.price * i.quantity,
    },
    actions: {
        hydrate() {
            if (!import.meta.client) {
                return
            }
            const raw = localStorage.getItem(STORAGE_KEY)
            if (!raw) {
                return
            }
            try {
                const parsed = JSON.parse(raw) as CartItem[]
                if (Array.isArray(parsed)) {
                    this.items = parsed
                }
            } catch {
                return
            }
        },
        persist() {
            if (!import.meta.client) {
                return
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items))
        },
        open() {
            this.isOpen = true
        },
        close() {
            this.isOpen = false
        },
        toggle() {
            this.isOpen = !this.isOpen
        },
        add(
            product: Product,
            opts: { size: Size; color?: ColorOption; quantity?: number },
        ) {
            if (!isPurchasable(product)) {
                return;
            }

            const qty = Math.max(1, opts.quantity ?? 1)
            const incoming: CartItem = {
                productId: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.images[0] ?? '',
                size: opts.size,
                color: opts.color,
                quantity: qty,
            }

            const existing = this.items.find((i) => keyOf(i) === keyOf(incoming))
            
            if (existing) {
                existing.quantity += qty
            } else {
                this.items.push(incoming)
            }

            this.persist()
            this.isOpen = true
        },
        updateQty(key: string, qty: number) {
            const item = this.items.find((i) => keyOf(i) === key)
            if (!item) {
                return
            }

            if (qty <= 0) {
                this.remove(key)
            } else {
                item.quantity = qty
                this.persist()
            }
        },
        remove(key: string) {
            this.items = this.items.filter((i) => keyOf(i) !== key)
            this.persist()
        },
        clear() {
            this.items = []
            this.persist()
        },
        keyOf,
    },
})
