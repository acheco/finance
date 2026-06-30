<script setup lang="ts">
import AuthImage from '@/components/AuthImage.vue';
import LogoLarge from '@/components/LogoLarge.vue';
</script>

<template>
    <main
        class="h-screen w-full bg-beige-100 lg:grid lg:grid-cols-[450px_1fr] xl:grid-cols-[600px_1fr]"
    >
        <div
            class="relative flex items-center justify-center overflow-hidden rounded-b-lg bg-grey-900 px-10 py-6 lg:m-5 lg:grid lg:content-between lg:rounded-lg lg:py-10"
        >
            <div class="absolute inset-0 hidden lg:block">
                <AuthImage class="h-full w-full" />
            </div>

            <LogoLarge class="relative z-10" />

            <div class="relative z-10 hidden lg:block lg:space-y-6">
                <h2 class="font-preset-1 text-white">
                    Keep track of your money and save for your future
                </h2>
                <p class="font-preset-4 text-white">
                    Personal finance app puts you in control of your spending.
                    Track transactions, set budgets, and add to savings pots
                    easily.
                </p>
            </div>
        </div>
        <div
            class="flex h-full w-full flex-col items-center justify-center gap-6 px-4 py-6 md:px-8 md:py-10"
        >
            <slot />
        </div>
    </main>
</template>
