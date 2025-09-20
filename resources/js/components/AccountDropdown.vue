<script setup lang="ts">

import {logout} from "@/routes";
import DropDown from "@/components/ui/DropDown.vue";
import {Link, router} from "@inertiajs/vue3";

const dropdownRoutes = [
  {
    name: 'Account settings',
    href: '#',
    icon: 'user',
  },
  {
    name: 'App settings',
    href: '#',
    icon: 'questionMarkCircle',
  }
]

function handleLogout() {
  router.flushAll()
}

let props = defineProps<{ isOpen: boolean }>()

</script>

<template>

  <drop-down v-if="props.isOpen" class="mt-2 w-48">
    <Link
        v-for="route in dropdownRoutes"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-beige-500 hover:text-beige-100 border-b border-grey-300"
    >
      {{ route.name }}
    </Link>
    <Link
        :href="logout()"
        @click="handleLogout" as="link"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-beige-500 hover:text-beige-100 cursor-pointer"
    >
      Logout
    </Link>
  </drop-down>
</template>
