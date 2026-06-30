<script lang="ts" setup>
import { Form, Link } from '@inertiajs/vue3';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AuthLayout from '@/layout/AuthLayout.vue';
import { login } from '@/routes';
import { store } from '@/routes/register';
</script>

<template>
    <AuthLayout>
        <div
            class="w-full space-y-8 rounded-2xl bg-white px-5 py-6 md:max-w-140"
        >
            <h1 class="font-preset-1">Sign Up</h1>
            <div>
                <Form
                    v-slot="{ errors, processing }"
                    :reset-on-error="['password']"
                    :reset-on-success="['password']"
                    class="space-y-8"
                    v-bind="store.form()"
                >
                    <FieldGroup>
                        <Field>
                            <FieldLabel
                                class="font-preset-5-bold text-grey-500"
                                for="name"
                                >Name</FieldLabel
                            >
                            <Input
                                id="name"
                                autofocus
                                name="name"
                                required
                                tabindex="1"
                                type="text"
                            />
                        </Field>
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
                                tabindex="2"
                                type="email"
                            />
                        </Field>
                        <FieldError v-if="errors.email">{{
                            errors.email
                        }}</FieldError>
                        <FieldSet class="gap-1">
                            <Field>
                                <FieldLabel
                                    class="font-preset-5-bold text-grey-500"
                                    for="password"
                                    >Create Password</FieldLabel
                                >
                                <Input
                                    id="password"
                                    name="password"
                                    required
                                    tabindex="3"
                                    type="password"
                                />
                            </Field>
                            <FieldDescription align="end">
                                Password must be at least 8 characters.
                            </FieldDescription>

                            <FieldError v-if="errors.password">{{
                                errors.password
                            }}</FieldError>
                        </FieldSet>
                    </FieldGroup>

                    <Button
                        :disabled="processing"
                        class="w-full bg-grey-900"
                        size="xl"
                        tabindex="4"
                        type="submit"
                    >
                        Create Account
                    </Button>
                </Form>
            </div>
            <p class="text-center font-preset-4 text-grey-500">
                Already have an account?
                <Link
                    :href="login()"
                    class="font-preset-4-bold text-grey-900 underline"
                    >Login</Link
                >
            </p>
        </div>
    </AuthLayout>
</template>
