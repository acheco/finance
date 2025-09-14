<script setup lang="ts">
import type {HTMLAttributes} from 'vue';
import {cn} from '@/lib/utils';
import {useVModel} from '@vueuse/core';

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
      v-model="modelValue"
      data-slot="input"
      :class="cn(
      'flex h-12 w-full min-w-0 rounded-md border border-beige-500 bg-transparent px-3 py-1 text-base shadow-xs',
       'transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent',
       'file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[2px] ring-beige-500',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      props.class,
    )"
  >
</template>