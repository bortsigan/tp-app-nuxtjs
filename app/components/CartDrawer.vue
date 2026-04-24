<script setup lang="ts">
const cart = useCartStore()

const goCheckout = () => {
    cart.close()
    navigateTo('/checkout')
}
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div
                v-if="cart.isOpen"
                class="fixed inset-0 z-50 bg-ink-900/50 backdrop-blur-sm"
                @click.self="cart.close()"
            >
                <Transition name="slide">
                    <aside
                        v-if="cart.isOpen"
                        class="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
                    >
                        <header class="flex items-center justify-between border-b border-ink-100 px-6 py-5">
                            <div>
                                <h2 class="font-display text-2xl text-ink-900">Your cart</h2>
                                <p class="text-xs text-ink-500">{{ cart.count }} item(s)</p>
                            </div>
                            <button class="btn-ghost !p-2" aria-label="Close cart" @click="cart.close()">
                                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
                                </svg>
                            </button>
                        </header>

                        <div class="flex-1 overflow-y-auto px-6 py-4">
                            <div v-if="!cart.items.length" class="grid h-full place-items-center text-center">
                                <div>
                                    <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ink-100 text-2xl">🛒</div>
                                    <p class="mt-4 font-semibold text-ink-700">Your cart is empty</p>
                                    <p class="text-sm text-ink-500">Browse the drops and find your fit.</p>
                                    <button class="btn-primary mt-5" @click="cart.close()">Start shopping</button>
                                </div>
                            </div>

                            <ul v-else class="divide-y divide-ink-100">
                                <li
                                    v-for="item in cart.items"
                                    :key="cart.keyOf(item)"
                                    class="flex gap-3 py-4"
                                >
                                    <img :src="item.image" :alt="item.name" class="h-24 w-20 shrink-0 rounded-lg object-cover" />
                                    <div class="flex flex-1 flex-col">
                                        <div class="flex items-start justify-between gap-2">
                                            <div>
                                                <h3 class="text-sm font-bold text-ink-900">{{ item.name }}</h3>
                                                <p class="text-xs text-ink-500">{{ truncate(item.description, 50) }}</p>
                                                <div class="mt-1 flex items-center gap-2 text-[11px] text-ink-500">
                                                    <span class="chip !px-2 !py-0.5">{{ item.size.toUpperCase() }}</span>
                                                    <span v-if="item.color" class="inline-flex items-center gap-1">
                                                        <span class="h-3 w-3 rounded-full border border-ink-200" :style="{ backgroundColor: item.color.hex }" />
                                                        {{ item.color.name }}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                class="text-xs text-ink-400 hover:text-press"
                                                aria-label="Remove item"
                                                @click="cart.remove(cart.keyOf(item))"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div class="mt-auto flex items-center justify-between pt-2">
                                            <div class="flex items-center rounded-full border border-ink-200">
                                                <button class="px-2.5 py-1 text-ink-600 hover:text-press" @click="cart.updateQty(cart.keyOf(item), item.quantity - 1)">−</button>
                                                <span class="w-7 text-center text-sm font-semibold">{{ item.quantity }}</span>
                                                <button class="px-2.5 py-1 text-ink-600 hover:text-press" @click="cart.updateQty(cart.keyOf(item), item.quantity + 1)">+</button>
                                            </div>
                                            <p class="font-display text-lg">{{ formatPHP(cart.itemTotal(item)) }}</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <footer v-if="cart.items.length" class="border-t border-ink-100 p-6">
                            <div class="flex items-center justify-between text-sm text-ink-500">
                                <span>Subtotal</span>
                                <span>{{ formatPHP(cart.subtotal) }}</span>
                            </div>
                            <div class="mt-1 flex items-center justify-between">
                                <span class="font-display text-xl">Total</span>
                                <span class="font-display text-2xl text-ink-900">{{ formatPHP(cart.subtotal) }}</span>
                            </div>
                            <button class="btn-primary mt-4 w-full" @click="goCheckout">
                                Checkout
                            </button>
                            <button class="btn-ghost mt-2 w-full text-sm" @click="cart.clear()">
                                Clear cart
                            </button>
                        </footer>
                    </aside>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 200ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: transform 300ms cubic-bezier(.2,.8,.2,1); }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
