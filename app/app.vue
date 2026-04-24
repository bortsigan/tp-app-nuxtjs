<script setup lang="ts">
const cart = useCartStore()
onMounted(() => cart.hydrate())
</script>

<template>
    <div>
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
