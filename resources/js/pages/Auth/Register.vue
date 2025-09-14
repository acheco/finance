<script setup lang="ts">
import GuestLayout from "../../../layouts/GuestLayout.vue";
import {store} from "@/actions/Laravel/Fortify/Http/Controllers/RegisteredUserController";
import {Link, useForm} from "@inertiajs/vue3";
import Input from "@/components/ui/Input.vue";
import Label from "@/components/ui/Label.vue";
import Button from "@/components/ui/Button.vue";
import {login} from "@/routes";

defineProps<{}>()

const form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms: false,
});

function submit() {
  form.submit(store())
}

</script>

<template>
  <GuestLayout title="Register">
    <div class="flex flex-col items-center justify-center bg-white w-full p-4 rounded-lg shadow-sm">
      <h1 class="font-bold text-[32px] pt-2 text-grey-900 self-start">Sign Up</h1>
      <form @submit.prevent="submit" class="flex flex-col mt-5 gap-4 w-full">
        <div>
          <Label for="name">Name</Label>
          <Input
              id="name"
              type="text"
              v-model="form.name"
              required
              autofocus
              autocomplete="name"
              :tabindex="1"
          />
        </div>
        <div>
          <Label for="email">Email</Label>
          <Input type="email" name="email" v-model="form.email" required/>
        </div>
        <div>
          <Label for="password">Password</Label>
          <Input type="password" name="password" v-model="form.password" required/>
        </div>
        <div>
          <Label for="password_confirmation">Confirm Password</Label>
          <Input type="password" name="password_confirmation" v-model="form.password_confirmation" required/>
        </div>
        <Button type="submit" class="mt-4">Create Account</Button>
        <div class="flex items-center justify-center gap-2 mt-4">
          <span class="text-sm text-grey-500">
            Already have an account?
          </span>
          <Link :href="login()" class="underline underline-offset-4 text-sm font-bold transition-colors duration-300 ease-out hover:text-beige-500!">Login</Link>
        </div>
      </form>
    </div>
  </GuestLayout>
</template>
