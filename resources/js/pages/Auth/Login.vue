<script setup lang="ts">
import GuestLayout from "@/layouts/GuestLayout.vue";
import {Form, Link} from "@inertiajs/vue3";
import Label from "@/components/ui/Label.vue";
import Input from "@/components/ui/Input.vue";
import {register} from "@/routes";
import InputError from "@/components/InputError.vue";
import Button from "@/components/ui/Button.vue";
import AuthenticatedSessionController from "@/actions/Laravel/Fortify/Http/Controllers/AuthenticatedSessionController";
import {request} from "@/routes/password";
import {PhCircleNotch} from "@phosphor-icons/vue";
import {cn} from "@/lib/utils";

defineProps<{
  canResetPassword?: boolean;
}>()
</script>

<template>
  <GuestLayout
      title="Login"
  >
    <Form
        v-bind="AuthenticatedSessionController.store.form()"
        :reset-on-error="['password']"
        v-slot="{ errors, processing }"
        class="flex flex-col mt-5 gap-4 w-full">
      <div>
        <Label for="email">Email</Label>
        <Input id="email" type="email" name="email" required autocomplete="email" :tabindex="2"/>
        <input-error :message="errors.email"/>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <Label for="password" class="font-bold text-beige-500">Password</Label>
          <Link :href="request()" class="text-sm underline" :tabindex="5">Forgot password?</Link>
        </div>
        <Input id="password" type="password" name="password" required autocomplete="new-password" :tabindex="3"/>
        <input-error :message="errors.password"/>
      </div>

      <div class="flex items-center justify-between">
        <Label for="remember" class="flex items-center space-x-3">
          <Input type="checkbox" id="remember" name="remember" :tabindex="3" class="h-4 w-4"/>
          <span>Remember me</span>
        </Label>
      </div>

      <Button
          type="submit"
          class="mt-4"
          :disabled="processing"
          :class="cn({'cursor-not-allowed opacity-50': processing})"
      >
        <PhCircleNotch :size="32" v-if="processing" class="h-4 w-4 animate-spin"/>
        Login
      </Button>

      <div class="flex items-center justify-center gap-2 mt-4">
          <span class="text-sm text-grey-500">
            Need to create an account?
          </span>
        <Link
            :href="register()"
            class="underline underline-offset-4 text-sm font-bold transition-colors duration-300 ease-out hover:text-beige-500!"
        >
          Sign Up
        </Link>
      </div>
    </Form>
  </GuestLayout>
</template>
