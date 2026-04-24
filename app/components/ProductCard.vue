<script setup lang="ts">
import type { Product, Size, ColorOption } from '~/types/product'
import { SIZES, getProductStatus } from '~/types/product'

const props = defineProps<{ product: Product }>()

const cart = useCartStore()

const status = computed(() => getProductStatus(props.product))
const isAvailable = computed(() => status.value === 'available')
const isSoldOut = computed(() => status.value === 'sold-out')
const isComingSoon = computed(() => status.value === 'coming-soon')

const selectedSize = ref<Size>(props.product.sizes[0]!)
const selectedColor = ref<ColorOption | undefined>(props.product.colors?.[0])
const quantity = ref(1)

const availableSizes = computed(() =>
    SIZES.filter((s) => props.product.sizes.includes(s)),
)

const ctaLabel = computed(() => {
    if (isSoldOut.value) return 'Sold out'
    if (isComingSoon.value) return 'Coming soon'
    return 'Add to cart'
})

const handleAdd = () => {
    if (!isAvailable.value) return
    cart.add(props.product, {
        size: selectedSize.value,
        color: selectedColor.value,
        quantity: quantity.value,
    })
}
</script>

<template>
    <article
        class="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-press/30 hover:shadow-lift"
        :class="!isAvailable && 'opacity-95'"
    >
        <NuxtLink :to="`/product/${product.id}`" class="relative block cursor-pointer overflow-hidden bg-ink-100">
            <div class="aspect-[4/5] w-full overflow-hidden">
                <img
                    :src="product.images[0]"
                    :alt="product.name"
                    loading="lazy"
                    class="h-full w-full grayscale object-cover"
                />
            </div>

            <span
                v-if="isSoldOut"
                class="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 bg-ink-900/80 py-2 text-center font-display text-2xl tracking-widest text-white"
            >
                SOLD OUT
            </span>
            <span
                v-else-if="isComingSoon"
                class="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 bg-press/85 py-2 text-center font-display text-2xl tracking-widest text-white"
            >
                COMING SOON
            </span>

            <span
                v-if="product.featured && isAvailable"
                class="pointer-events-none absolute left-3 top-3 rounded-full bg-press px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
            >
                Featured
            </span>
            <span
                v-if="isAvailable && product.stock < 15"
                class="pointer-events-none absolute right-3 top-3 rounded-full bg-ink-900/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
            >
                Low stock
            </span>
            <span
                v-else-if="isSoldOut"
                class="pointer-events-none absolute right-3 top-3 rounded-full bg-ink-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
            >
                Out of stock
            </span>
            <span
                v-else-if="isComingSoon"
                class="pointer-events-none absolute right-3 top-3 rounded-full bg-press px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
            >
                New drop
            </span>
        </NuxtLink>

        <div class="flex flex-1 flex-col gap-3 p-5">
            <div class="flex items-start justify-between gap-3">
                <div>
                    <p class="text-[11px] font-bold uppercase tracking-wider text-press">
                        {{ product.category }}
                    </p>
                    <h3 class="mt-1 text-lg font-bold text-ink-900">
                        <NuxtLink :to="`/product/${product.id}`" class="cursor-pointer hover:text-press">
                            {{ product.name }}
                        </NuxtLink>
                    </h3>
                </div>
                <p class="whitespace-nowrap font-display text-xl text-ink-900">
                    {{ formatPHP(product.price) }}
                </p>
            </div>

            <p class="text-sm text-ink-500">{{ truncate(product.description, 90) }}</p>

            <p
                v-if="isComingSoon && product.releaseDate"
                class="text-xs font-semibold text-press"
            >
                Drops {{ new Date(product.releaseDate).toLocaleDateString('en-PH', { month: 'long', day: 'numeric', year: 'numeric' }) }}
            </p>

            <div v-if="product.colors?.length" class="flex items-center gap-2">
                <button
                    v-for="c in product.colors"
                    :key="c.name"
                    type="button"
                    :title="c.name"
                    :aria-label="`Color ${c.name}`"
                    :disabled="!isAvailable"
                    class="h-5 w-5 cursor-pointer rounded-full border border-ink-200 transition ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    :class="
                        selectedColor?.name === c.name
                            ? 'ring-2 ring-press'
                            : isAvailable && 'hover:scale-110'
                    "
                    :style="{ backgroundColor: c.hex }"
                    @click.prevent="isAvailable && (selectedColor = c)"
                />
            </div>

            <div class="flex flex-wrap gap-1.5">
                <button
                    v-for="s in availableSizes"
                    :key="s"
                    type="button"
                    :disabled="!isAvailable"
                    class="chip cursor-pointer text-[11px] disabled:cursor-not-allowed disabled:opacity-50"
                    :class="isAvailable && selectedSize === s && 'chip-active'"
                    @click.prevent="isAvailable && (selectedSize = s)"
                >
                    {{ s.toUpperCase() }}
                </button>
            </div>

            <div class="mt-auto flex items-center gap-2 pt-2">
                <div
                    class="flex items-center rounded-full border border-ink-200"
                    :class="!isAvailable && 'opacity-50'"
                >
                    <button
                        type="button"
                        :disabled="!isAvailable"
                        class="cursor-pointer px-3 py-1.5 text-lg leading-none text-ink-600 hover:text-press disabled:cursor-not-allowed disabled:hover:text-ink-600"
                        aria-label="Decrease quantity"
                        @click="quantity = Math.max(1, quantity - 1)"
                    >−</button>
                    <span class="w-8 text-center text-sm font-semibold">{{ quantity }}</span>
                    <button
                        type="button"
                        :disabled="!isAvailable"
                        class="cursor-pointer px-3 py-1.5 text-lg leading-none text-ink-600 hover:text-press disabled:cursor-not-allowed disabled:hover:text-ink-600"
                        aria-label="Increase quantity"
                        @click="quantity = Math.min(product.stock, quantity + 1)"
                    >+</button>
                </div>
                <button
                    type="button"
                    :disabled="!isAvailable"
                    class="flex-1 cursor-pointer !px-4 !py-2 text-sm"
                    :class="isAvailable ? 'btn-primary' : 'btn bg-ink-200 text-ink-500 cursor-not-allowed'"
                    @click="handleAdd"
                >
                    {{ ctaLabel }}
                </button>
            </div>
        </div>
    </article>
</template>
