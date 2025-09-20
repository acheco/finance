<script setup lang="ts">

import {Link} from "@inertiajs/vue3";
import {cn} from "@/lib/utils";
import PhosphorIcon from "@/components/ui/PhosphorIcon.vue";

interface Props {
  name: string;
  href: string;
  icon: string;
}

const props = defineProps<Props>()

</script>

<template>
  <div class="flex flex-col items-center justify-center gap-1">
    <Link :href="props.href">
      <phosphor-icon
          :name="props.icon"
          :size="24"
          weight="fill"
          :color="cn($page.url === href ? '#277C78' : '#B3B3B3')"
      />
    </Link>
    <p
        :class="cn('text-xs text-grey-300 font-bold hidden md:block', { 'text-grey-900': $page.url === href})"
    >
      {{ props.name }}
    </p>
  </div>
</template>
