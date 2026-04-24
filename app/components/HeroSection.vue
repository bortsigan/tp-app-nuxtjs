<template>
    <section class="relative overflow-hidden bg-ink-900 text-white">
        <div
            class="absolute inset-0 opacity-30"
            :style="{
                backgroundImage:
                    'radial-gradient(circle at 20% 20%, rgba(255,61,46,0.5), transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,61,46,0.25), transparent 50%)',
            }"
        />
        <div class="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28 lg:px-8">
            <div class="flex flex-col justify-center">
                <!-- <span class="chip !border-white/20 !text-white/80">
                    New drop · Autumn '26
                </span> -->
                <h1 class="mt-5 font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl lg:text-7xl">
                    Wear the
                    <span class="text-press">press</span>.<br />
                    Print the
                    <span class="text-press">streets</span>.
                </h1>
                <p class="mt-5 max-w-xl text-lg text-white/70">
                    Heavyweight cotton. Hand-pulled prints. Tees, sleeveless, and hoodies
                    built for the grind — and for looking real good doing it.
                </p>
                <div class="mt-8 flex flex-wrap gap-3">
                    <NuxtLink to="#catalog" class="btn-primary">
                        Shop now
                        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                    </NuxtLink>
                    <NuxtLink to="/?c=hoodie" class="btn-outline !border-white !text-white hover:!bg-white hover:!text-ink-900">
                        Browse hoodies
                    </NuxtLink>
                </div>
                <!-- <dl class="mt-10 grid max-w-md grid-cols-3 gap-6 text-sm text-white/70">
                    <div>
                        <dt class="font-display text-3xl text-white">500<span class="text-press">gsm</span></dt>
                        <dd>Heavyweight fleece</dd>
                    </div>
                    <div>
                        <dt class="font-display text-3xl text-white">100%</dt>
                        <dd>Ring-spun cotton</dd>
                    </div>
                    <div>
                        <dt class="font-display text-3xl text-white">PH<span class="text-press">🇵🇭</span></dt>
                        <dd>Printed locally</dd>
                    </div>
                </dl> -->
            </div>
            <div class="relative">
                <div class="grid grid-cols-2 gap-4">
                    <img
                        src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80&auto=format&fit=crop"
                        alt="Hoodie"
                        class="aspect-[3/4] w-full rounded-2xl object-cover shadow-lift"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80&auto=format&fit=crop"
                        alt="Tee"
                        class="mt-10 aspect-[3/4] w-full rounded-2xl object-cover shadow-lift"
                    />
                </div>
                <div class="absolute -bottom-6 left-6 hidden rounded-2xl bg-white p-4 text-ink-900 shadow-lift sm:block">
                    <p class="font-display text-2xl">Free shipping</p>
                    <p class="text-sm text-ink-500">On orders over ₱1,500</p>
                </div>
            </div>
        </div>
    </section>
</template>
