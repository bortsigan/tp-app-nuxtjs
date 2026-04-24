export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@vueuse/nuxt'],
    css: ['~/assets/css/main.css'],
    tailwindcss: {
        cssPath: ['~/assets/css/main.css', { injectPosition: 'first' }],
        configPath: '~/tailwind.config.ts',
    },
    app: {
        head: {
            title: 'The PRESS - PH | Custom Tees, Sleeveless & Hoodies',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                {
                    name: 'description',
                    content:
                        'The PRESS - PH — custom printed tees, sleeveless, and hoodies. Built for creatives, athletes, and everyone in between.',
                },
            ],
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
                { rel: 'preconnect', href: 'https://images.unsplash.com' },
            ],
        },
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
        },
    },
    pinia: {
        storesDirs: ['./app/stores/**'],
    },
    imports: {
        dirs: ['stores'],
    },
})
