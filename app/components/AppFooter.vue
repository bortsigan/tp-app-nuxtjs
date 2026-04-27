<template>
    <footer class="mt-16 border-t border-ink-100 bg-white">
        <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div class="grid gap-8 md:grid-cols-3">
                <div>
                    <div class="font-display text-2xl tracking-wider text-ink-900">
                        THE PRESS <span class="text-press">— PH</span>
                    </div>
                    <p class="mt-3 max-w-sm text-sm text-ink-500">
                        Custom-printed tees, sleeveless, and hoodies. Heavyweight cotton, proudly made in the Philippines.
                    </p>
                    <p class="mt-3 max-w-sm text-sm text-ink-500">
                        Like the Demo? Check out the code on
                        <NuxtLink to="https://github.com/bortsigan/tp-app-nuxtjs" class="text-press-dark font-bold underline hover:text-press">Github</NuxtLink>
                    </p>
                </div>
                <div>
                    <h4 class="text-sm font-bold uppercase tracking-wider text-ink-900">Shop</h4>
                    <ul class="mt-3 space-y-2 text-sm text-ink-600">
                        <li><NuxtLink to="/?c=tshirt" class="hover:text-press">T-Shirts</NuxtLink></li>
                        <li><NuxtLink to="/?c=sleeveless" class="hover:text-press">Sleeveless</NuxtLink></li>
                        <li><NuxtLink to="/?c=hoodie" class="hover:text-press">Hoodies</NuxtLink></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-sm font-bold uppercase tracking-wider text-ink-900">Stay in the loop</h4>
                    <p class="mt-3 text-sm text-ink-600">Drops, restocks, and discount codes — no spam, promise.</p>
                    <form class="mt-3 flex gap-2" @submit.prevent>
                        <input type="email" required placeholder="you@email.com" class="input" />
                        <button class="btn-primary !px-4 !py-2 text-sm">Join</button>
                    </form>
                </div>
            </div>
            <div class="mt-10 flex flex-col items-center justify-between gap-2 border-t border-ink-100 pt-6 text-xs text-ink-400 md:flex-row">
                <p>© {{ new Date().getFullYear() }} The Press — PH. All rights reserved.</p>
                <p>Made in Cebu, Philippines.</p>
            </div>
        </div>
    </footer>
</template>
