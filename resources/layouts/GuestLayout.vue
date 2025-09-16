<script setup lang="ts">

import {dashboard} from "@/routes";
import {Link} from "@inertiajs/vue3";
import {ref} from "vue";
import AppLogoIcon from "@/components/AppLogoIcon.vue";

defineProps<{
  title?: string
  description?: string
}>()

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const name = ref(appName)

</script>

<template>
  <div class="sticky top-0 z-40 lg:hidden">
    <header class="flex justify-center rounded-b-xl bg-grey-900">
      <h1 class="py-6 text-4xl font-bold text-white">Finance</h1>
    </header>
  </div>
  <div class="relative grid h-dvh flex-col items-center bg-beige-100 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div class="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex">
      <div class="absolute inset-0 bg-grey-900"/>
      <Link :href="dashboard()" class="relative z-20 flex items-center text-lg font-medium">
        <AppLogoIcon class="mr-2 size-8"/>
        {{ name }}
      </Link>

      <div class="relative z-20 mt-auto flex items-center justify-center">
        <AppLogoIcon class="150"/>
      </div>

      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-3xl font-bold m-0">Keep track of your money</p>
          <p class="text-3xl font-bold">and save for your future</p>
          <footer class="text-sm text-neutral-300">
            <p>Personal finance app puts you in control of your spending. Track</p>
            <p>transactions, set budgets, and add to savings pots easily.</p>
          </footer>
        </blockquote>
      </div>
    </div>
    <div class="p-4 lg:mx-auto lg:p-0">
      <div
          class="mx-auto flex w-full flex-col justify-center space-y-6 rounded-xl bg-white p-8 sm:w-[350px] md:w-[450px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="self-start text-[32px] font-bold tracking-tight" v-if="title">{{ title }}</h1>
          <p class="text-muted-foreground text-sm" v-if="description">{{ description }}</p>
        </div>
        <slot/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>