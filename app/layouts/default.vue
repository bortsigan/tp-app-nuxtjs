<template>
    <div class="min-h-screen flex flex-col bg-ink-50">
        <AppHeader />
        <main class="flex-1">
            <slot />
        </main>
        <AppFooter />
        <CartDrawer />
    </div>
</template>
