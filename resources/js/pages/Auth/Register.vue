<script setup lang="ts">
import GuestLayout from "@/layouts/GuestLayout.vue";
import {Form, Link} from "@inertiajs/vue3";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";
import Button from "@/components/ui/Button.vue";
import {login} from "@/routes";
import InputError from "@/components/InputError.vue";
import RegisteredUserController from "@/actions/Laravel/Fortify/Http/Controllers/RegisteredUserController";
import {PhCircleNotch} from "@phosphor-icons/vue";
</script>

<template>
  <GuestLayout title="Register">
    <Form
        v-bind="RegisteredUserController.store.form()"
        :reset-on-error="['password', 'password_confirmation']"
        v-slot="{ errors, processing }"
        class="flex flex-col gap-2 w-full"
    >
      <div>
        <Label for="name">Name</Label>
        <Input
            id="name"
            type="text"
            name="name"
            required
            autofocus
            autocomplete="name"
            :tabindex="1"
        />
        <input-error :message="errors.name"/>
      </div>
      <div>
        <Label for="email">Email</Label>
        <Input id="email" type="email" name="email" required autocomplete="email" :tabindex="2"/>
        <input-error :message="errors.email"/>
      </div>
      <div>
        <Label for="password">Password</Label>
        <Input id="password" type="password" name="password" required autocomplete="new-password" :tabindex="3"/>
        <input-error :message="errors.password"/>
      </div>
      <div>
        <Label for="password_confirmation">Confirm Password</Label>
        <Input id="password_confirmation" type="password" name="password_confirmation" required
               autocomplete="new-password" :tabindex="4"/>
      </div>

      <Button type="submit" class="mt-4" :disabled="processing">
        <PhCircleNotch :size="32" v-if="processing" class="h-4 w-4 animate-spin"/>
        Create Account
      </Button>

      <div class="flex items-center justify-center gap-2 mt-4">
          <span class="text-sm text-grey-500">
            Already have an account?
          </span>
        <Link :href="login()"
              class="underline underline-offset-4 text-sm font-bold transition-colors duration-300 ease-out hover:text-beige-500!">
          Login
        </Link>
      </div>
    </Form>
  </GuestLayout>
</template>
