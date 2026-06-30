<script lang="ts" setup>
import { Form, Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layout/AuthLayout.vue';
import { register } from '@/routes';
import { store } from '@/routes/login';
</script>

<template>
    <AuthLayout>
        <div
            class="w-full space-y-8 rounded-2xl bg-white px-5 py-6 md:max-w-140"
        >
            <h1 class="font-preset-1">Login</h1>
            <div>
                <Form
                    v-slot="{ processing, errors }"
                    :reset-on-error="['password']"
                    :reset-on-success="['password']"
                    class="space-y-8"
                    v-bind="store.form()"
                >
                    <FieldGroup>
                        <Field>
                            <label
                                class="font-preset-5-bold text-grey-500"
                                for="email"
                                >Email</label
                            >
                            <Input
                                id="email"
                                autocomplete="email"
                                autofocus
                                class="py-3"
                                name="email"
                                required
                                tabindex="1"
                                type="email"
                            />
                        </Field>
                        <FieldError v-if="errors.email">{{
                            errors.email
                        }}</FieldError>
                        <FieldSet class="gap-1">
                            <Field>
                                <label
                                    class="font-preset-5-bold text-grey-500"
                                    for="password"
                                >
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    name="password"
                                    required
                                    tabindex="2"
                                    type="password"
                                />
                            </Field>
                            <Field orientation="horizontal">
                                <FieldLabel for="remember"
                                    >Remember me</FieldLabel
                                >
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabindex="3"
                                />
                            </Field>
                            <FieldError v-if="errors.password">{{
                                errors.password
                            }}</FieldError>
                        </FieldSet>
                    </FieldGroup>

                    <Button
                        :disabled="processing"
                        class="w-full bg-grey-900"
                        size="xl"
                        type="submit"
                    >
                        Login
                    </Button>
                </Form>
            </div>
            <p class="text-center font-preset-4 text-grey-500">
                Need to create an account?
                <Link
                    :href="register()"
                    class="font-preset-4-bold text-grey-900 underline"
                    >Sign Up</Link
                >
            </p>
        </div>
    </AuthLayout>
</template>
