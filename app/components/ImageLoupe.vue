<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        src: string
        alt?: string
        zoom?: number
        size?: number
        imgClass?: string
        rounded?: string
    }>(),
    {
        alt: '',
        zoom: 2.5,
        size: 140,
        imgClass: '',
        rounded: 'rounded-2xl',
    },
)

const container = ref<HTMLElement | null>(null)
const active = ref(false)
const x = ref(0)
const y = ref(0)
const bgX = ref(0)
const bgY = ref(0)
const bgW = ref(0)
const bgH = ref(0)

const onMove = (e: MouseEvent) => {
    const el = container.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    if (px < 0 || py < 0 || px > rect.width || py > rect.height) {
        active.value = false
        return
    }
    active.value = true
    x.value = px
    y.value = py
    bgW.value = rect.width * props.zoom
    bgH.value = rect.height * props.zoom
    bgX.value = -(px * props.zoom - props.size / 2)
    bgY.value = -(py * props.zoom - props.size / 2)
}

const onLeave = () => {
    active.value = false
}
</script>

<template>
    <div
        ref="container"
        class="group relative overflow-hidden bg-ink-100"
        :class="rounded"
        @mousemove="onMove"
        @mouseleave="onLeave"
    >
        <img
            :src="src"
            :alt="alt"
            loading="lazy"
            class="h-full w-full object-cover transition-transform duration-500 ease-out"
            :class="[imgClass, active ? 'scale-[1.02]' : '']"
        />

        <slot name="overlay" />

        <div
            v-show="active"
            class="pointer-events-none absolute hidden rounded-full border-2 border-white shadow-lift ring-1 ring-ink-900/20 md:block"
            :style="{
                width: size + 'px',
                height: size + 'px',
                left: x - size / 2 + 'px',
                top: y - size / 2 + 'px',
                backgroundImage: `url(${src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: bgW + 'px ' + bgH + 'px',
                backgroundPosition: bgX + 'px ' + bgY + 'px',
            }"
        />

        <div
            v-show="!active"
            class="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink-900/0 opacity-0 transition duration-300 group-hover:bg-ink-900/20 group-hover:opacity-100"
        >
            <span
                class="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-ink-900 shadow-lift ring-1 ring-ink-900/10"
                aria-hidden="true"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                    <circle cx="10" cy="10" r="6" />
                    <line x1="14.5" y1="14.5" x2="21" y2="21" />
                </svg>
            </span>
        </div>
    </div>
</template>
