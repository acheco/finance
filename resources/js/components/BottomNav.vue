<script setup lang="ts">
import BottomBarLink from "@/components/BottomBarLink.vue";
import {cn} from "@/lib/utils";

interface Props {
  routes: {
    name: string;
    href: string;
    icon: string;
  }[]
}

const props = defineProps<Props>()

</script>

<template>
  <nav class="flex items-center justify-around gap-1 w-full bg-grey-900 ">
    <div
        v-for="route in props.routes"
        :class="cn('flex justify-center items-center w-[68.6px] h-[44px] md:w-[104px] md:h-[66px] rounded-t-lg md:mt-3',
         {'bg-beige-100 border-b-3 border-green': $page.url === route.href})"
    >
      <bottom-bar-link :name="route.name" :href="route.href" :icon="route.icon" :active="$page.url === route.href"/>
    </div>
  </nav>
</template>
