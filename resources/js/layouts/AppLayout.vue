<script setup lang="ts">
import BottomNav from "@/components/BottomNav.vue";
import Sidebar from "@/components/Sidebar.vue";
import {dashboard} from "@/routes";
import UserInfo from "@/components/UserInfo.vue";
import {usePage} from "@inertiajs/vue3";
import PhosphorIcon from "@/components/ui/PhosphorIcon.vue";
import AccountDropdown from "@/components/AccountDropdown.vue";
import {ref} from "vue";

interface Props {
  title?: string;
}

const routes = [
  {
    name: 'Overview',
    href: dashboard().url,
    icon: 'house',
  },
  {
    name: 'Transactions',
    href: "#",
    icon: 'ArrowsDownUp',
  },
  {
    name: 'Budgets',
    href: '#',
    icon: 'ChartDonut',
  },
  {
    name: 'Pots',
    href: '#',
    icon: 'TipJar',
  },
  {
    name: 'Recurring bills',
    href: '#',
    icon: 'receipt',
  }
]

const props = defineProps<Props>()
const user = usePage().props.auth.user;
const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

</script>

<template>
  <div
      class="grid grid-cols-1 grid-rows-[auto_1fr_auto] h-screen bg-beige-100 lg:grid-cols-[250px_1fr] lg:grid-rows-[auto_1fr]">

    <aside class="hidden lg:block bg-grey-900 rounded-br-2xl rounded-tr-2xl lg:row-start-1 lg:row-end-3">
      <sidebar :routes="routes"/>
    </aside>

    <header
        class="flex justify-between items-center bg-grey-900 text-white lg:bg-beige-100 lg:text-grey-900 px-4 py-2 lg:col-start-2 ">
      <h1 class="font-bold text-[32px]">{{ props.title }}</h1>
      <div class="relative">
        <div class="flex items-center gap-2 lg:hidden" @click="toggleDropdown">
          <user-info :user="user"/>
          <PhosphorIcon name="CaretUpDown" :size="18" weight="regular"/>
        </div>
        <AccountDropdown :isOpen="isOpen"/>
      </div>
    </header>

    <main class="overflow-auto p-4 lg:col-start-2">
      <slot/>
    </main>

    <footer class=" flex justify-center items-end px-2 bg-grey-900 rounded-tl-xl rounded-tr-xl lg:hidden min-h-[52px] ">
      <bottom-nav :routes="routes"/>
    </footer>
  </div>
</template>