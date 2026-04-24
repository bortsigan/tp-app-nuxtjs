<script setup lang="ts">
const cart = useCartStore()
const route = useRoute()

const links = [
    { to: '/', label: 'Shop' },
    { to: '/?c=tshirt', label: 'Tees' },
    { to: '/?c=sleeveless', label: 'Sleeveless' },
    { to: '/?c=hoodie', label: 'Hoodies' },
]

const mobileOpen = ref(false)
watch(() => route.fullPath, () => (mobileOpen.value = false))
</script>

<template>
    <header class="sticky top-0 z-40 border-b border-ink-100 bg-white/80 backdrop-blur">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <NuxtLink to="/" class="flex items-center gap-2">
                <span class="grid h-9 w-9 place-items-center rounded-lg bg-ink-900 font-display text-xl text-press">
                    P
                </span>
                <span class="font-display text-2xl tracking-wider text-ink-900">
                    THE PRESS <span class="text-press">— PH</span>
                </span>
            </NuxtLink>

            <nav class="hidden items-center gap-8 md:flex">
                <NuxtLink
                    v-for="link in links"
                    :key="link.to"
                    :to="link.to"
                    class="text-sm font-semibold text-ink-700 transition hover:text-press"
                >
                    {{ link.label }}
                </NuxtLink>
            </nav>

            <div class="flex items-center gap-2">
                <button
                    class="btn-ghost !px-3 !py-2"
                    aria-label="Open cart"
                    @click="cart.open()"
                >
                    <span class="relative inline-flex">
                        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.5l2.1 12.4a2.25 2.25 0 0 0 2.22 1.85h8.36a2.25 2.25 0 0 0 2.22-1.85L20.25 8.25H5.13" />
                            <circle cx="9" cy="20" r="1.4" />
                            <circle cx="17" cy="20" r="1.4" />
                        </svg>
                        <span
                            v-if="cart.count"
                            class="absolute -right-2 -top-2 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-press px-1 text-[11px] font-bold text-white"
                        >
                            {{ cart.count }}
                        </span>
                    </span>
                </button>
                <button
                    class="btn-ghost !px-3 !py-2 md:hidden"
                    aria-label="Toggle menu"
                    @click="mobileOpen = !mobileOpen"
                >
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
                    </svg>
                </button>
            </div>
        </div>

        <Transition name="fade">
            <div v-if="mobileOpen" class="border-t border-ink-100 bg-white md:hidden">
                <nav class="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
                    <NuxtLink
                        v-for="link in links"
                        :key="link.to"
                        :to="link.to"
                        class="rounded-lg px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-100"
                    >
                        {{ link.label }}
                    </NuxtLink>
                </nav>
            </div>
        </Transition>
    </header>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 150ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
