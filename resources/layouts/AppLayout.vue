<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="h-screen bg-beige-100">
    <header>
      {{ props.title }}
    </header>
    <main>
      <slot/>
    </main>
  </div>
</template>