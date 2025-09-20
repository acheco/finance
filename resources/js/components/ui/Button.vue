<script setup lang="ts">
import {HTMLAttributes} from "vue";
import {cn} from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

</script>

<template>
  <button
      :class="cn(
          'flex items-center justify-center w-full h-14 rounded-md bg-grey-900 text-white font-bold text-sm',
          props.class,
      )"
  >
    <slot/>
  </button>
</template>
