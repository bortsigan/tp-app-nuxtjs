<script setup lang="ts">
const cart = useCartStore()

const form = reactive({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    zip: '',
    notes: '',
})

const submitting = ref(false)
const placed = ref<null | { id: string; total: number }>(null)

const shipping = computed(() => (cart.subtotal >= 1500 ? 0 : 150))
const total = computed(() => cart.subtotal + shipping.value)

const placeOrder = async () => {
    if (!cart.items.length) return
    submitting.value = true
    await new Promise((r) => setTimeout(r, 700))
    placed.value = {
        id: `PRESS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        total: total.value,
    }
    cart.clear()
    submitting.value = false
}

useHead({ title: 'Checkout | The PRESS - PH' })
</script>

<template>
    <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div v-if="placed" class="rounded-2xl border border-ink-100 bg-white p-10 text-center shadow-sm">
            <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-press-soft text-3xl">✅</div>
            <h1 class="mt-4 font-display text-4xl text-ink-900">Order placed!</h1>
            <p class="mt-2 text-ink-600">
                Thanks for supporting local print. Your reference number is
                <span class="font-mono font-bold text-press">{{ placed.id }}</span>.
            </p>
            <p class="mt-1 text-sm text-ink-500">
                Total charged: <strong>{{ formatPHP(placed.total) }}</strong>
            </p>
            <NuxtLink to="/" class="btn-primary mt-6 inline-flex">Continue shopping</NuxtLink>
        </div>

        <template v-else>
            <h1 class="font-display text-4xl text-ink-900">Checkout</h1>
            <p class="mt-1 text-sm text-ink-500">
                Frontend-only demo — real payment/order API later.
            </p>

            <div v-if="!cart.items.length" class="mt-10 rounded-2xl border border-dashed border-ink-200 p-10 text-center">
                <p class="font-display text-2xl text-ink-700">Your cart is empty</p>
                <NuxtLink to="/" class="btn-primary mt-4 inline-flex">Shop the drop</NuxtLink>
            </div>

            <form
                v-else
                class="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]"
                @submit.prevent="placeOrder"
            >
                <section class="space-y-8">
                    <div class="rounded-2xl border border-ink-100 bg-white p-6">
                        <h2 class="font-display text-2xl text-ink-900">Contact</h2>
                        <div class="mt-4 grid gap-4 sm:grid-cols-2">
                            <label class="block">
                                <span class="text-xs font-semibold text-ink-500">Full name</span>
                                <input v-model="form.fullName" required class="input mt-1" />
                            </label>
                            <label class="block">
                                <span class="text-xs font-semibold text-ink-500">Email</span>
                                <input v-model="form.email" type="email" required class="input mt-1" />
                            </label>
                            <label class="block sm:col-span-2">
                                <span class="text-xs font-semibold text-ink-500">Phone</span>
                                <input v-model="form.phone" required class="input mt-1" />
                            </label>
                        </div>
                    </div>

                    <div class="rounded-2xl border border-ink-100 bg-white p-6">
                        <h2 class="font-display text-2xl text-ink-900">Shipping address</h2>
                        <div class="mt-4 grid gap-4 sm:grid-cols-2">
                            <label class="block sm:col-span-2">
                                <span class="text-xs font-semibold text-ink-500">Street address</span>
                                <input v-model="form.address" required class="input mt-1" />
                            </label>
                            <label class="block">
                                <span class="text-xs font-semibold text-ink-500">City</span>
                                <input v-model="form.city" required class="input mt-1" />
                            </label>
                            <label class="block">
                                <span class="text-xs font-semibold text-ink-500">Region / Province</span>
                                <input v-model="form.region" required class="input mt-1" />
                            </label>
                            <label class="block">
                                <span class="text-xs font-semibold text-ink-500">ZIP</span>
                                <input v-model="form.zip" required class="input mt-1" />
                            </label>
                            <label class="block sm:col-span-2">
                                <span class="text-xs font-semibold text-ink-500">Order notes (optional)</span>
                                <textarea v-model="form.notes" rows="3" class="input mt-1" />
                            </label>
                        </div>
                    </div>

                    <div class="rounded-2xl border border-ink-100 bg-white p-6">
                        <h2 class="font-display text-2xl text-ink-900">Payment</h2>
                        <p class="mt-2 text-sm text-ink-500">
                            This demo uses Cash on Delivery. Wire up Stripe / PayMongo / GCash in the service layer.
                        </p>
                        <div class="mt-3 inline-flex items-center gap-2 rounded-full border border-press/30 bg-press-soft px-4 py-2 text-sm font-semibold text-press">
                            <span>💵 Cash on Delivery</span>
                        </div>
                    </div>
                </section>

                <aside class="h-fit rounded-2xl border border-ink-100 bg-white p-6 lg:sticky lg:top-24">
                    <h2 class="font-display text-2xl text-ink-900">Order summary</h2>
                    <ul class="mt-4 divide-y divide-ink-100">
                        <li v-for="item in cart.items" :key="cart.keyOf(item)" class="flex gap-3 py-3">
                            <img :src="item.image" :alt="item.name" class="h-16 w-14 rounded-lg object-cover" />
                            <div class="flex-1 text-sm">
                                <p class="font-semibold text-ink-900">{{ item.name }}</p>
                                <p class="text-xs text-ink-500">{{ truncate(item.description, 50) }}</p>
                                <p class="text-xs text-ink-500">
                                    {{ item.size.toUpperCase() }}
                                    <template v-if="item.color"> · {{ item.color.name }}</template>
                                    · Qty {{ item.quantity }}
                                </p>
                            </div>
                            <p class="font-display text-base">{{ formatPHP(cart.itemTotal(item)) }}</p>
                        </li>
                    </ul>

                    <dl class="mt-4 space-y-2 border-t border-ink-100 pt-4 text-sm">
                        <div class="flex justify-between">
                            <dt class="text-ink-500">Subtotal</dt>
                            <dd>{{ formatPHP(cart.subtotal) }}</dd>
                        </div>
                        <div class="flex justify-between">
                            <dt class="text-ink-500">Shipping</dt>
                            <dd>{{ shipping === 0 ? 'FREE' : formatPHP(shipping) }}</dd>
                        </div>
                        <div class="flex justify-between border-t border-ink-100 pt-3">
                            <dt class="font-display text-xl">Total</dt>
                            <dd class="font-display text-2xl">{{ formatPHP(total) }}</dd>
                        </div>
                    </dl>

                    <button
                        type="submit"
                        :disabled="submitting"
                        class="btn-primary mt-6 w-full"
                    >
                        {{ submitting ? 'Placing order…' : 'Place order' }}
                    </button>
                </aside>
            </form>
        </template>
    </div>
</template>
