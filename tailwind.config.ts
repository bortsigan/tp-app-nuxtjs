import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    content: [
        './app/components/**/*.{vue,js,ts}',
        './app/layouts/**/*.vue',
        './app/pages/**/*.vue',
        './app/composables/**/*.{js,ts}',
        './app/plugins/**/*.{js,ts}',
        './app/app.vue',
        './app/error.vue',
    ],
    theme: {
        extend: {
            colors: {
                ink: {
                    50: '#f6f6f7',
                    100: '#e2e2e5',
                    200: '#c4c5cb',
                    300: '#9ea0a9',
                    400: '#73757f',
                    500: '#4f5159',
                    600: '#3b3c43',
                    700: '#2a2b31',
                    800: '#1a1b20',
                    900: '#0c0d11',
                },
                press: {
                    DEFAULT: '#ff3d2e',
                    soft: '#ffece9',
                    dark: '#c21d10',
                },
            },
            fontFamily: {
                display: ['"Bebas Neue"', 'Impact', 'system-ui', 'sans-serif'],
                sans: [
                    '"Inter"',
                    'ui-sans-serif',
                    'system-ui',
                    '-apple-system',
                    'Segoe UI',
                    'Roboto',
                    'sans-serif',
                ],
            },
            boxShadow: {
                lift: '0 20px 40px -20px rgba(12, 13, 17, 0.35)',
                glow: '0 0 0 3px rgba(255, 61, 46, 0.25)',
            },
        },
    },
}
