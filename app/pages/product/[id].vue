<script setup lang="ts">
import { SIZES, getProductStatus, type Size, type ColorOption } from '~/types/product'

const route = useRoute()
const products = useProductsStore()
const cart = useCartStore()

const id = computed(() => route.params.id as string)

const { data } = await useAsyncData(`product-${id.value}`, () =>
    products.fetchOne(id.value),
)

const product = computed(() => data.value)

const selectedSize = ref<Size>()
const selectedColor = ref<ColorOption | undefined>()
const quantity = ref(1)
const activeImage = ref(0)

const status = computed(() => (product.value ? getProductStatus(product.value) : 'available'))
const isAvailable = computed(() => status.value === 'available')
const isSoldOut = computed(() => status.value === 'sold-out')
const isComingSoon = computed(() => status.value === 'coming-soon')

watchEffect(() => {
    if (product.value) {
        selectedSize.value = product.value.sizes[0]
        selectedColor.value = product.value.colors?.[0]
    }
})

/**
 * Sizes this product comes in, sorted.
 * @return Size[] sizes to show, or [] if product not loaded
 **/
const availableSizes = computed(() =>
    product.value ? SIZES.filter((s) => product.value!.sizes.includes(s)) : [],
)

/**
 * Pretty print a date.
 * @param iso date string like "2026-06-15"
 * @return string like "June 15, 2026"
 **/
const formatReleaseDate = (iso?: string) => {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('en-PH', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

/**
 * Add the current pick to the cart.
 * Skips if no product, no size, or not available.
 * @return void
 **/
const addToCart = () => {
    if (!product.value || !selectedSize.value || !isAvailable.value) return
    cart.add(product.value, {
        size: selectedSize.value,
        color: selectedColor.value,
        quantity: quantity.value,
    })
}

useHead(() => ({
    title: product.value
        ? `${product.value.name} | The PRESS - PH`
        : 'The PRESS - PH',
}))
</script>

<template>
    <div v-if="product" class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <NuxtLink to="/" class="text-sm text-ink-500 hover:text-press">← Back to shop</NuxtLink>

        <div class="mt-6 grid gap-10 lg:grid-cols-2">
            <div>
                <div class="relative">
                    <ImageLoupe
                        v-if="isAvailable"
                        :src="product.images[activeImage]!"
                        :alt="product.name"
                        :zoom="2.75"
                        :size="200"
                        class="aspect-[4/5] w-full"
                    />
                    <div v-else class="relative overflow-hidden rounded-2xl bg-ink-100">
                        <img
                            :src="product.images[activeImage]"
                            :alt="product.name"
                            class="aspect-[4/5] w-full grayscale object-cover"
                        />
                    </div>
                    <div
                        v-if="isSoldOut"
                        class="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 bg-ink-900/80 py-3 text-center font-display text-3xl tracking-widest text-white"
                    >
                        SOLD OUT
                    </div>
                    <div
                        v-else-if="isComingSoon"
                        class="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 bg-press/85 py-3 text-center font-display text-3xl tracking-widest text-white"
                    >
                        COMING SOON
                    </div>
                </div>

                <div v-if="product.images.length > 1" class="mt-3 flex gap-3">
                    <button
                        v-for="(img, i) in product.images"
                        :key="img"
                        class="h-20 w-16 cursor-pointer overflow-hidden rounded-lg border-2 transition"
                        :class="activeImage === i ? 'border-press' : 'border-transparent opacity-70 hover:opacity-100'"
                        @click="activeImage = i"
                    >
                        <img :src="img" :alt="`${product.name} view ${i + 1}`" class="h-full w-full object-cover" />
                    </button>
                </div>
            </div>

            <div>
                <p class="text-sm font-bold uppercase tracking-wider text-press">{{ product.category }}</p>
                <h1 class="mt-2 font-display text-4xl text-ink-900">{{ product.name }}</h1>
                <p class="mt-3 font-display text-3xl text-ink-900">{{ formatPHP(product.price) }}</p>

                <div
                    v-if="isSoldOut"
                    class="mt-4 inline-flex items-center gap-2 rounded-full bg-ink-100 px-4 py-2 text-sm font-semibold text-ink-700"
                >
                    <span class="h-2 w-2 rounded-full bg-ink-500" />
                    Currently sold out — restock TBA
                </div>
                <div
                    v-else-if="isComingSoon"
                    class="mt-4 inline-flex items-center gap-2 rounded-full bg-press-soft px-4 py-2 text-sm font-semibold text-press"
                >
                    <span class="h-2 w-2 animate-pulse rounded-full bg-press" />
                    Coming soon
                    <template v-if="product.releaseDate">
                        · drops {{ formatReleaseDate(product.releaseDate) }}
                    </template>
                </div>

                <p class="mt-5 text-ink-600">{{ product.description }}</p>

                <div v-if="product.colors?.length" class="mt-6">
                    <p class="text-xs font-bold uppercase tracking-wider text-ink-500">Color</p>
                    <div class="mt-2 flex items-center gap-3">
                        <button
                            v-for="c in product.colors"
                            :key="c.name"
                            :title="c.name"
                            :disabled="!isAvailable"
                            class="h-8 w-8 cursor-pointer rounded-full border border-ink-200 transition disabled:cursor-not-allowed disabled:opacity-50"
                            :class="selectedColor?.name === c.name ? 'ring-2 ring-press ring-offset-2' : isAvailable && 'hover:scale-110'"
                            :style="{ backgroundColor: c.hex }"
                            @click="isAvailable && (selectedColor = c)"
                        />
                    </div>
                </div>

                <div class="mt-6">
                    <p class="text-xs font-bold uppercase tracking-wider text-ink-500">Size</p>
                    <div class="mt-2 flex flex-wrap gap-2">
                        <button
                            v-for="s in availableSizes"
                            :key="s"
                            :disabled="!isAvailable"
                            class="chip cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                            :class="isAvailable && selectedSize === s && 'chip-active'"
                            @click="isAvailable && (selectedSize = s)"
                        >
                            {{ s.toUpperCase() }}
                        </button>
                    </div>
                </div>

                <div class="mt-6 flex items-center gap-3">
                    <div
                        class="flex items-center rounded-full border border-ink-200"
                        :class="!isAvailable && 'opacity-50'"
                    >
                        <button
                            :disabled="!isAvailable"
                            class="cursor-pointer px-4 py-2 text-lg text-ink-600 hover:text-press disabled:cursor-not-allowed disabled:hover:text-ink-600"
                            @click="quantity = Math.max(1, quantity - 1)"
                        >−</button>
                        <span class="w-10 text-center font-semibold">{{ quantity }}</span>
                        <button
                            :disabled="!isAvailable"
                            class="cursor-pointer px-4 py-2 text-lg text-ink-600 hover:text-press disabled:cursor-not-allowed disabled:hover:text-ink-600"
                            @click="quantity = Math.min(product.stock, quantity + 1)"
                        >+</button>
                    </div>
                    <button
                        :disabled="!isAvailable"
                        class="flex-1 cursor-pointer"
                        :class="isAvailable ? 'btn-primary' : 'btn bg-ink-200 text-ink-500 cursor-not-allowed'"
                        @click="addToCart"
                    >
                        <template v-if="isSoldOut">Sold out</template>
                        <template v-else-if="isComingSoon">Coming soon — notify me</template>
                        <template v-else>
                            Add to cart · {{ formatPHP(product.price * quantity) }}
                        </template>
                    </button>
                </div>

                <p v-if="isAvailable" class="mt-4 text-xs text-ink-500">
                    {{ product.stock }} in stock · Ships within 3–5 business days
                </p>
                <p v-else-if="isSoldOut" class="mt-4 text-xs text-ink-500">
                    This drop has sold out. Follow us to be the first to know when it restocks.
                </p>
                <p v-else class="mt-4 text-xs text-ink-500">
                    Not available for purchase yet. Check back on launch day!
                </p>
            </div>
        </div>
    </div>
</template>
