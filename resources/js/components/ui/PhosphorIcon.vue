<script setup lang="ts">
import * as PhosphorIcons from '@phosphor-icons/vue'
import {computed} from "vue";

type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'

interface Props {
  name: string
  size?: number | string
  weight?: IconWeight
  color?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  weight: 'regular',
  color: 'currentColor'
})

const iconComponent = computed(() => {
  const iconName = `Ph${props.name.charAt(0).toUpperCase() + props.name.slice(1)}`
  const component = (PhosphorIcons as any)[iconName]

  if (!component) {
    console.warn(`Icon "${props.name}" not found in Phosphor Icons`)
    return (PhosphorIcons as any).PhQuestion
  }

  return component
})

const iconClass = computed(() => props.class)
</script>

<template>
  <component
      :is="iconComponent"
      :size="size"
      :weight="weight"
      :color="color"
      :class="iconClass"
      v-bind="$attrs"
  />
</template>