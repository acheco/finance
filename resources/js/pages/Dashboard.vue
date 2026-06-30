<script lang="ts" setup>
import { Link } from '@inertiajs/vue3';
import { logout } from '@/routes';
</script>

<template>
    <h1 class="font-preset-1">Dashboard</h1>
    <Link :href="logout()">Log out</Link>
</template>
