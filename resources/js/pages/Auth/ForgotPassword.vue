<script setup lang="ts">

import GuestLayout from "../../../layouts/GuestLayout.vue";
import PasswordResetLinkController from "@/actions/Laravel/Fortify/Http/Controllers/PasswordResetLinkController";
import {Form, Link} from "@inertiajs/vue3";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";
import Button from "@/components/ui/Button.vue";
import InputError from "@/components/InputError.vue";
import {login} from "@/routes";
import {computed, ref} from "vue";
import {PhCircleNotch} from "@phosphor-icons/vue";

const status = ref('')

const statusMessage = computed(() => {
  status.value = 'A reset link will be sent if the account exists.';
  return status.value;
});

</script>

<template>
  <GuestLayout title="Forgot Password" description="Enter your email to receive a password reset link">
    <div v-if="status" class="my-4 text-center text-sm font-medium text-green-600">
      {{ status }}
    </div>

    <Form
        v-bind="PasswordResetLinkController.store.form()"
        :reset-on-success="['email']"
        :on-success="() => statusMessage"
        v-slot="{ errors, processing }"
        class="flex flex-col mt-5 gap-4 w-full"
    >

      <div>
        <Label for="email">Email address</Label>
        <Input
            id="email"
            type="email"
            name="email"
            required
            autocomplete="off"
            placeholder="email.example.com"
        />
        <InputError :message="errors.email"/>
      </div>

      <Button type="submit" :disabled="processing">
        <PhCircleNotch :size="32" v-if="processing" class="h-4 w-4 animate-spin"/>
        Email password reset link
      </Button>

      <div class="flex items-center justify-center gap-2">
        <span class="text-sm">Or, return to</span>
        <Link :href="login()" class="underline font-bold">log in</Link>
      </div>
    </Form>

  </GuestLayout>
</template>
