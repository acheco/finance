<script setup lang="ts">
import GuestLayout from "../../../layouts/GuestLayout.vue";
import NewPasswordController from "@/actions/Laravel/Fortify/Http/Controllers/NewPasswordController";
import {Form} from "@inertiajs/vue3";
import Label from "@/components/ui/Label.vue";
import Input from "@/components/ui/Input.vue";
import InputError from "@/components/InputError.vue";
import Button from "@/components/ui/Button.vue";
import {ref} from "vue";
import {PhCircleNotch} from "@phosphor-icons/vue";

const props = defineProps<{
  token: string;
  email: string;
}>()

const inputEmail = ref(props.email)

</script>

<template>
  <GuestLayout title="Reset Password">
    <Form
        v-bind="NewPasswordController.store.form()"
        :transform="(data) => ({ ...data, token, email })"
        :reset-on-success="['password', 'password_confirmation']"
        v-slot="{ errors, processing }"
    >
      <div class="grid gap-6">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" name="email" autocomplete="email" v-model="inputEmail"
                 class="mt-1 block w-full" readonly/>
          <InputError :message="errors.email" class="mt-2"/>
        </div>

        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
              id="password"
              type="password"
              name="password"
              autocomplete="new-password"
              class="mt-1 block w-full"
              autofocus
              placeholder="Password"
          />
          <InputError :message="errors.password"/>
        </div>

        <div class="grid gap-2">
          <Label for="password_confirmation"> Confirm Password </Label>
          <Input
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              autocomplete="new-password"
              class="mt-1 block w-full"
              placeholder="Confirm password"
          />
          <InputError :message="errors.password_confirmation"/>
        </div>

        <Button type="submit" class="mt-4 w-full" :disabled="processing" data-test="reset-password-button">
          <PhCircleNotch :size="32" v-if="processing" class="h-4 w-4 animate-spin"/>
          Reset password
        </Button>
      </div>
    </Form>
  </GuestLayout>
</template>
