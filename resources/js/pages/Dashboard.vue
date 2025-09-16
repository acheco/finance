<script setup lang="ts">
import AppLayout from "../../layouts/AppLayout.vue";
import {logout} from "@/routes";
import {Link} from "@inertiajs/vue3";

defineProps<{}>()
</script>

<template>
  <AppLayout title="Dashboard">

    <Link :href="logout()">Logout</Link>
  </AppLayout>
</template>
