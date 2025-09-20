<script setup lang="ts">

const props = defineProps<{
  src: string;
  alt: string;
}>()
</script>

<template>
  <img
      data-slot="avatar-image"
      :src="props.src"
      :alt="props.alt"
      class="aspect-auto size-full"
  >
</template>
