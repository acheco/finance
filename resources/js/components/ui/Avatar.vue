<script setup lang="ts">
import {cn} from '@/lib/utils'
import {HTMLAttributes} from "vue";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

</script>

<template>
  <div
      data-slot="avatar"
      :class="cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', props.class)">
    <slot/>
  </div>
</template>
