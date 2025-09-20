<script setup lang="ts">

import {cn} from "@/lib/utils";
import {computed, HTMLAttributes} from "vue";

const props = defineProps<{ class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const {class: _, ...delegated} = props

  return delegated
})

</script>

<template>
  <div
      data-slot="avatar-fallback"
      v-bind="delegatedProps"
      :class="cn('bg-muted flex size-full items-center justify-center rounded-full', props.class)"
  >
    <slot/>
  </div>
</template>
