<script setup lang="ts">

import SidebarLink from "@/components/ui/SidebarLink.vue";
import UserInfo from "@/components/UserInfo.vue";
import {usePage} from "@inertiajs/vue3";
import PhosphorIcon from "@/components/ui/PhosphorIcon.vue";
import AccountDropdown from "@/components/AccountDropdown.vue";
import {ref} from "vue";

interface Props {
  routes: {
    name: string;
    href: string;
    icon: string;
  }[]
}

const props = defineProps<Props>()
const user = usePage().props.auth.user;
const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

</script>

<template>
  <div class="grid grid-cols-1 grid-rows-[auto_1fr_auto] h-screen gap-y-6 ">
    <section class="my-10 mx-8">
      <h1 class="text-white font-black text-4xl">Finance</h1>
    </section>

    <section class="flex flex-col gap-2 ">
      <div v-for="route in props.routes" class="rounded-lg text-grey-300 pr-4">
        <sidebar-link :href="route.href" :name="route.name" :icon="route.icon"/>
      </div>
    </section>

    <section @click="toggleDropdown"
             class="relative flex items-center gap-2 text-white mx-4 mb-10 hover:bg-grey-300/50 hover:rounded-lg p-2 ">
      <user-info :user="user"/>
      <PhosphorIcon name="CaretUpDown" :size="18" weight="regular"/>
      <AccountDropdown :isOpen="isOpen" class="bottom-full "/>
    </section>
  </div>
</template>
