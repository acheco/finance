<script setup lang="ts">

import {Link} from "@inertiajs/vue3";
import PhosphorIcon from "@/components/ui/PhosphorIcon.vue";
import {cn} from "@/lib/utils";

interface Props {
  href: string;
  name: string;
  icon: string;
}

const props = defineProps<Props>()

</script>

<template>
  <div
      :class="cn('w-full pl-8 py-4', {'bg-beige-100 rounded-r-lg border-l-4 border-green': $page.url === props.href})"
  >
    <Link
        :href="props.href"
        class="flex items-center gap-2 text-sm font-bold text-grey-300 hover:text-grey-100"
    >
      <PhosphorIcon
          :name="props.icon"
          :size="24"
          weight="fill"
          :class="$page.url === props.href ? 'text-green' : 'text-grey-300'"
      />
      <span class="text-[16px]" :class="$page.url === props.href && 'text-grey-900'">
      {{ props.name }}
      </span>
    </Link>
  </div>
</template>
