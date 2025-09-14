<script setup lang="ts">

import {Head} from "@inertiajs/vue3";

defineProps<{
  title?: string
}>()

</script>

<template>
  <Head :title="title"/>
  <div class="flex flex-col min-h-screen bg-beige-100">
    <header class="flex items-center justify-center h-20 bg-grey-900 text-white rounded-b-xl">
      <h1 class="font-black text-3xl">Finance</h1>
    </header>
    <main class="flex flex-col items-center justify-center flex-grow p-4">
      <slot/>
    </main>
  </div>
</template>

<style scoped>

</style>