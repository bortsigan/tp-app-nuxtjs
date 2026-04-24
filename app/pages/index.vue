<script setup lang="ts">
import type { ProductCategory } from '~/types/product'

const products = useProductsStore()
const route = useRoute()

await useAsyncData('products', async () => {
    await products.fetchAll()
    return products.items
})

watch(
    () => route.query.c,
    (c) => {
        const valid: ProductCategory[] = ['tshirt', 'sleeveless', 'hoodie', 'sleeve']
        if (typeof c === 'string' && (valid as string[]).includes(c)) {
            products.setCategory(c as ProductCategory)
            if (import.meta.client) {
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
            }
        } else {
            products.setCategory('all')
        }
    },
    { immediate: true },
)
</script>

<template>
    <div>
        <HeroSection />

        <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div class="mb-8 flex items-end justify-between">
                <div>
                    <p class="text-sm font-bold uppercase tracking-wider text-press">Best sellers</p>
                    <h2 class="font-display text-4xl text-ink-900">Fresh off the press</h2>
                </div>
                <NuxtLink to="#catalog" class="hidden text-sm font-semibold text-ink-700 hover:text-press sm:block">
                    View all →
                </NuxtLink>
            </div>
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <ProductCard
                    v-for="p in products.featured.slice(0, 3)"
                    :key="p.id"
                    :product="p"
                />
            </div>
        </section>

        <section id="catalog" class="bg-white">
            <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div class="mb-6">
                    <p class="text-sm font-bold uppercase tracking-wider text-press">The catalog</p>
                    <h2 class="font-display text-4xl text-ink-900">Shop the drop</h2>
                </div>

                <ProductFilters class="mb-8" />

                <div v-if="products.loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div v-for="i in 8" :key="i" class="aspect-[4/5] animate-pulse rounded-2xl bg-ink-100" />
                </div>
                <div
                    v-else-if="products.filtered.length"
                    class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    <ProductCard v-for="p in products.filtered" :key="p.id" :product="p" />
                </div>
                <div v-else class="rounded-2xl border border-dashed border-ink-200 py-16 text-center">
                    <p class="font-display text-2xl text-ink-700">No drops match that filter</p>
                    <p class="mt-1 text-sm text-ink-500">Try clearing your search or another category.</p>
                </div>
            </div>
        </section>
    </div>
</template>
