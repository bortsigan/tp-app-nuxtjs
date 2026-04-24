<script setup lang="ts">
import type { ProductCategory, SortKey } from '~/types/product'

const products = useProductsStore()

const categories: { key: ProductCategory | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'tshirt', label: 'T-Shirts' },
    { key: 'sleeveless', label: 'Sleeveless' },
    { key: 'hoodie', label: 'Hoodies' },
]

const sortOptions: { key: SortKey; label: string }[] = [
    { key: 'az', label: 'Name: A → Z' },
    { key: 'price-asc', label: 'Price: Low → High' },
    { key: 'price-desc', label: 'Price: High → Low' },
    { key: 'size-asc', label: 'Size: XS → XXL' },
]
</script>

<template>
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div class="flex flex-wrap gap-2">
            <button
                v-for="c in categories"
                :key="c.key"
                type="button"
                class="chip cursor-pointer"
                :class="products.category === c.key && 'chip-active'"
                @click="products.setCategory(c.key)"
            >
                {{ c.label }}
            </button>
        </div>

        <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div class="relative">
                <input
                    :value="products.search"
                    type="search"
                    placeholder="Search drops…"
                    class="input sm:w-64"
                    @input="products.setSearch(($event.target as HTMLInputElement).value)"
                />
            </div>
            <select
                :value="products.sort"
                class="input sm:w-52"
                @change="products.setSort(($event.target as HTMLSelectElement).value as SortKey)"
            >
                <option v-for="s in sortOptions" :key="s.key" :value="s.key">
                    {{ s.label }}
                </option>
            </select>
        </div>
    </div>
</template>
